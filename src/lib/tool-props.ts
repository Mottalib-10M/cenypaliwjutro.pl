/** Props (build) de chaque calculateur, tirées des données officielles : un seul endroit pour les pages et l'accueil. */
import { LISTA, OSTATNIA, POPRZEDNIA, OSTATNIA_MP, OKRESY, WOB, WOB_OST, LPG_ZL, zlL, wobZl, maxWTygodniu, prog, widelki, skladOstatni, STAWKI_CPN, STAWKI_2027, mies, KRAJE_PL, PLN_ZA_EUR, type Paliwo } from './dane';
import { ostatniDzienOtwartej } from './engine/ceny';
import { P } from './params';

const r2 = (x: number) => Math.round(x * 100) / 100;
const r4 = (x: number) => Math.round(x * 10000) / 10000;
const PAL: Paliwo[] = ['pb95', 'pb98', 'on'];
const per = <T,>(f: (p: Paliwo) => T) => Object.fromEntries(PAL.map((p) => [p, f(p)])) as Record<Paliwo, T>;

/** Annonce compacte pour le navigateur : [od, do|'', pb95, pb98, on, poz|0, ogl, url]. */
export type Wiersz = [string, string, number, number, number, number, string, string];
export const wiersze = (): Wiersz[] => LISTA.map((o) => [o.od, o.do ?? '', o.brutto.pb95, o.brutto.pb98, o.brutto.on, o.poz ?? 0, o.ogl, o.url]);

export const ostatnia = () => ({ od: OSTATNIA.od, doDnia: ostatniDzienOtwartej(OSTATNIA), ogl: OSTATNIA.ogl, poz: OSTATNIA.poz, url: OSTATNIA.url, ceny: OSTATNIA.brutto, poprzednie: POPRZEDNIA.brutto });
export const lpg = () => ({ cena: r2(LPG_ZL), tydzien: WOB_OST.d });
export const przyklady = () => P.przyklady;

export function toolProps(tool: string) {
  switch (tool) {
    case 'dzis': return { ost: ostatnia(), lpg: lpg(), bak: P.przyklady.bak_l };
    case 'data': return { wiersze: wiersze(), okresy: OKRESY.map((o) => [o.od, o.do]) as Array<[string, string]>, pierwszy: LISTA[0].od, ost: ostatnia() };
    case 'jutro': return { ost: ostatnia(), widelki: per((p) => widelki(p, 1)), bak: P.przyklady.bak_l };
    case 'prognoza': return { ost: ostatnia(), w1: per((p) => widelki(p, 1)), w5: per((p) => widelki(p, 5)), prog: per((p) => { const f = prog(p); return { zmiana: f.zmiana, cena: f.cena, pub: f.publikowana, mae: r4(f.ocena.mae), mae0: r4(f.ocena.maeStale), n: f.ocena.n, k: f.ocena.k, alfa: f.ocena.alfa }; }), litry: 150 };
    case 'koszt': return { ceny: { ...OSTATNIA.brutto, lpg: r2(LPG_ZL) }, spalanie: { pb95: P.przyklady.spalanie_pb, pb98: P.przyklady.spalanie_pb, on: P.przyklady.spalanie_on, lpg: P.przyklady.spalanie_lpg }, km: P.przyklady.km_rok, bak: P.przyklady.bak_l, od: OSTATNIA.od };
    case 'roznica': return { ceny: OSTATNIA.brutto, km: P.przyklady.km_rok, spalanie: P.przyklady.spalanie_pb, od: OSTATNIA.od };
    case 'lpg': return { pb95: OSTATNIA.brutto.pb95, lpg: r2(LPG_ZL), tydzien: WOB_OST.d, km: 20000, spalaniePb: P.przyklady.spalanie_pb, spalanieLpg: P.przyklady.spalanie_lpg };
    case 'po2027':
    case 'cpn': return {
      sklad: per((p) => { const s = skladOstatni(p); return { brutto: s.brutto, netto: r4(s.netto), hurt: r4(s.hurt), akcyza: s.akcyza, oplata: r4(s.oplata), marza: s.marza, vat: s.vat }; }),
      cpn: STAWKI_CPN, s2027: STAWKI_2027, s2026bez: per((p) => ({ ...STAWKI_2027[p], oplata: STAWKI_CPN[p].oplata })),
      poz: OSTATNIA_MP.poz, ogl: OSTATNIA_MP.ogl, km: P.przyklady.km_rok, spalanie: { pb95: P.przyklady.spalanie_pb, pb98: P.przyklady.spalanie_pb, on: P.przyklady.spalanie_on },
    };
    case 'sklad': return { sklad: per((p) => { const s = skladOstatni(p); return { brutto: s.brutto, netto: r4(s.netto), hurt: r4(s.hurt), akcyza: s.akcyza, oplata: r4(s.oplata), marza: s.marza, vat: r4(s.vat) }; }), poz: OSTATNIA_MP.poz, ogl: OSTATNIA_MP.ogl };
    case 'trasa': return { ceny: { ...OSTATNIA.brutto, lpg: r2(LPG_ZL) }, km: P.przyklady.trasa_km, spalanie: { pb95: P.przyklady.spalanie_pb, pb98: P.przyklady.spalanie_pb, on: P.przyklady.spalanie_on, lpg: P.przyklady.spalanie_lpg } };
    case 'europa': return {
      tydzien: WOB.tydzien, kurs: r4(PLN_ZA_EUR),
      kraje: WOB.kraje.map((k) => ({ k: k.k, pl: KRAJE_PL[k.k] ?? k.en, en: k.en, pb95: k.pb95 ? r2(zlL(k.pb95)) : null, on: k.on ? r2(zlL(k.on)) : null, lpg: k.lpg ? r2(zlL(k.lpg)) : null, pb95e: k.pb95 ? r2(k.pb95 / 1000) : null, one: k.on ? r2(k.on / 1000) : null })),
      bak: P.przyklady.bak_l,
    };
    case 'historia': return { mies: per((p) => mies(p).map((m) => [m.m, r2(m.srednia), m.min, m.max, m.n] as [string, number, number, number, number])), wiersze: wiersze() };
    case 'kontrola': return { wiersze: wiersze(), pierwszy: LISTA[0].od, ost: ostatnia(), kara: P.cena_maksymalna.kara_max };
    case 'srednia': {
      const tyg = WOB.pl.filter((w) => w.d >= '2026-03-30').map((w) => { const z = wobZl(w); return { d: w.d, pb95: r2(z.pb95), on: r2(z.on), lpg: r2(z.lpg), max95: maxWTygodniu(w.d, 'pb95'), maxOn: maxWTygodniu(w.d, 'on') }; });
      return { tyg };
    }
    default: return {};
  }
}
