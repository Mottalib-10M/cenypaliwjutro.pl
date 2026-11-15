import { describe, expect, it } from 'vitest';
import { LISTA, OSTATNIA, prog, skladOstatni, STAWKI_2027, zlL, WOB_OST, maxWTygodniu } from '../src/lib/dane';
import { naDzien, ostatniDzienOtwartej } from '../src/lib/engine/ceny';
import { scenariusz, cenaZ } from '../src/lib/engine/podatki';
import { rocznie, trasa, lpg, kontrola } from '../src/lib/engine/koszty';

describe('annonces du Monitor Polski', () => {
  it('chaque annonce a trois prix et un TTC cohérent avec le netto (TVA 8 %, sauf la toute première)', () => {
    for (const o of LISTA.slice(1)) {
      if (!o.net) continue;
      for (const p of ['pb95', 'pb98', 'on'] as const) expect(Math.abs(o.net[p] * 1.08 - o.brutto[p])).toBeLessThanOrEqual(0.011);
    }
  });
  it('règle de l’art. 34a ust. 6 : dates de validité publiées par le ministère (gov.pl)', () => {
    // « obowiązująca w dniach 11-12 listopada 2026 r. » : 6,10 zł
    expect(naDzien(LISTA, '2026-11-11')!.brutto.pb95).toBe(6.1);
    expect(naDzien(LISTA, '2026-11-12')!.brutto.pb95).toBe(6.1);
    // « w dniach 7-9 listopada » : 6,12 zł
    expect(naDzien(LISTA, '2026-11-07')!.brutto.pb95).toBe(6.12);
    expect(naDzien(LISTA, '2026-11-09')!.brutto.on).toBe(7.83);
    // « w okresie 30 maja - 1 czerwca » : 6,05 zł
    expect(naDzien(LISTA, '2026-05-31')!.brutto.pb95).toBe(6.05);
    // « obowiązująca 13 listopada » : 6,06 zł (gov.pl, 12.11.2026)
    expect(naDzien(LISTA, '2026-11-13')!.brutto.on).toBe(7.54);
    // juillet et septembre : pas de prix maximal (TVA 8 % suspendue)
    expect(naDzien(LISTA, '2026-07-15')).toBeNull();
    expect(naDzien(LISTA, '2026-09-15')).toBeNull();
    // 17 août 2026 : annonce du 14 août, la période ne commence que ce jour-là
    expect(naDzien(LISTA, '2026-08-17')!.ogl).toBe('2026-08-14');
    expect(naDzien(LISTA, '2026-08-16')).toBeNull();
  });
  it('annonce d’un vendredi : elle couvre samedi, dimanche et lundi (gov.pl « w dniach 14-16 listopada »)', () => {
    // Retrouvée par sa date (et non comme « dernière annonce ») : la relecture planifiée ajoute des annonces.
    const o = LISTA.find((x) => x.ogl === '2026-11-13')!;
    expect(o.od).toBe('2026-11-14');
    expect(o.do ?? ostatniDzienOtwartej(o)).toBe('2026-11-16');
    expect(OSTATNIA.ogl >= '2026-11-13').toBe(true);
  });
  it('date lue dans le texte officiel, jamais de période qui finit avant de commencer (test naïf du 2026-11-14)', () => {
    for (const o of LISTA) if (o.do !== null) expect(o.do >= o.od).toBe(true);
    // poz. 1034 (23 octobre) : 24-26 octobre ; poz. 1036 (26 octobre) : 27 octobre ; poz. 601 (12 juin) : 13-15 juin
    expect(naDzien(LISTA, '2026-10-25')!.poz).toBe(1034);
    expect(naDzien(LISTA, '2026-10-27')!.poz).toBe(1036);
    expect(naDzien(LISTA, '2026-06-14')!.poz).toBe(601);
    expect(naDzien(LISTA, '2026-06-05')!.poz).toBe(557);
  });
});

describe('taxes et scénario après le CPN', () => {
  it('composition du litre : la somme refait le netto', () => {
    const s = skladOstatni('pb95');
    expect(s.hurt + s.akcyza + s.oplata + s.marza).toBeCloseTo(s.netto, 6);
    expect(s.akcyza).toBeCloseTo(1.239, 6);
  });
  it('même prix de gros avec TVA 23 %, accise pleine et opłata 2027 : plus cher', () => {
    const s = skladOstatni('pb95');
    const r = scenariusz(s, STAWKI_2027.pb95, 50);
    expect(r.cena).toBeCloseTo((s.hurt + 1.529 + 0.21639 + 0.3) * 1.23, 6);
    expect(r.roznica).toBeGreaterThan(1);
    expect(cenaZ(1, { vat: 0.23, akcyza: 0, oplata: 0, marza: 0 })).toBeCloseTo(1.23, 9);
  });
});

describe('coûts', () => {
  it('budget, trajet, LPG, contrôle', () => {
    expect(rocznie(15000, 6.5, 6).koszt).toBeCloseTo(5850, 6);
    expect(trasa(300, 6, 6, 2, true).naOsobe).toBeCloseTo(108, 6);
    const g = lpg(20000, 8, 6, 10, 3, 3000);
    expect(g.oszczednosc).toBeCloseTo(9600 - 6000, 6);
    expect(g.miesiace).toBeCloseTo(10, 6);
    expect(kontrola(6.2, 6.06, 40).naLitry).toBeCloseTo(5.6, 6);
  });
  it('bulletin pétrolier : conversion en zł au taux du bulletin', () => {
    expect(zlL(WOB_OST.pb95)).toBeGreaterThan(4);
    expect(zlL(WOB_OST.pb95)).toBeLessThan(9);
    expect(maxWTygodniu('2026-11-09', 'pb95')).toBe(6.12);
  });
});

describe('prévision', () => {
  it('rétro-test calculé et affiché', () => {
    for (const p of ['pb95', 'pb98', 'on'] as const) {
      const f = prog(p);
      console.log(p, JSON.stringify({ zmiana: f.zmiana, cena: f.cena, ...f.ocena, pub: f.publikowana }));
      expect(f.ocena.n).toBeGreaterThan(30);
    }
  });
});
import { widelki } from '../src/lib/dane';
describe('fourchette', () => {
  it('quantiles des variations', () => {
    for (const p of ['pb95', 'on'] as const) for (const h of [1, 5]) { const w = widelki(p, h); console.log(p, h, JSON.stringify(w)); expect(w.dol).toBeLessThanOrEqual(w.gora); }
  });
});
