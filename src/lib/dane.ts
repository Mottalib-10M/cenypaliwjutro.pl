/**
 * Données officielles chargées une fois au build, et les références qu'en tirent pages et calculateurs.
 * Tout chiffre d'une page vient d'ici, du moteur ou de params-2026.json : aucun n'est écrit à la main.
 */
import cenyRaw from '../data/ceny.json';
import wobRaw from '../data/wob.json';
import { P } from './params';
import { PALIWA, statystyki, miesiecznie, type Obwieszczenie, type Okres, type Paliwo } from './engine/ceny';
import { prognoza } from './engine/prognoza';
import { sklad, type Stawki } from './engine/podatki';

export const CENY = cenyRaw as unknown as { odczyt: string; okresy: Okres[]; ceny: Obwieszczenie[] };
export const LISTA = CENY.ceny;
export const OKRESY = CENY.okresy;
export const OSTATNIA = LISTA[LISTA.length - 1];
export const POPRZEDNIA = LISTA[LISTA.length - 2];
/** Dernière annonce lue au Monitor Polski lui-même (position connue). */
export const OSTATNIA_MP = [...LISTA].reverse().find((o) => o.src === 'mp')!;
export const PIERWSZA = LISTA[0];
export { PALIWA };
export type { Paliwo, Obwieszczenie };

export const NAZWA: Record<'pl' | 'en', Record<Paliwo | 'lpg', string>> = {
  pl: { pb95: 'benzyna 95', pb98: 'benzyna 98', on: 'olej napędowy', lpg: 'LPG (autogaz)' },
  en: { pb95: 'petrol 95', pb98: 'petrol 98', on: 'diesel', lpg: 'LPG (autogas)' },
};
export const SKROT: Record<Paliwo | 'lpg', string> = { pb95: 'Pb95', pb98: 'Pb98', on: 'ON', lpg: 'LPG' };

export const stat = (p: Paliwo, od?: string, doDnia?: string) => statystyki(LISTA, p, od, doDnia)!;
export const mies = (p: Paliwo) => miesiecznie(LISTA, p);
export const prog = (p: Paliwo) => prognoza(LISTA, p);
/** Annonces de la période en cours (la dernière). */
export const BIEZACY_OKRES = OKRESY[OSTATNIA.okres ?? OKRESY.length - 1];
export const wOkresie = (i: number) => LISTA.filter((o) => o.okres === i);

/* ——— Taxes (params-2026.json) ——— */
const L = (zl1000: number) => zl1000 / 1000;
export const STAWKI_CPN: Record<Paliwo, Stawki> = {
  pb95: { vat: P.vat.obnizony, akcyza: L(P.akcyza.pb_obnizona), oplata: L(P.oplata_paliwowa.pb_2026), marza: P.cena_maksymalna.koszty_operacyjne },
  pb98: { vat: P.vat.obnizony, akcyza: L(P.akcyza.pb_obnizona), oplata: L(P.oplata_paliwowa.pb_2026), marza: P.cena_maksymalna.koszty_operacyjne },
  on: { vat: P.vat.obnizony, akcyza: L(P.akcyza.on_obnizona), oplata: L(P.oplata_paliwowa.on_2026), marza: P.cena_maksymalna.koszty_operacyjne },
};
export const STAWKI_2027: Record<Paliwo, Stawki> = {
  pb95: { vat: P.vat.podstawowy, akcyza: L(P.akcyza.pb_ustawowa), oplata: L(P.oplata_paliwowa.pb_2027), marza: P.cena_maksymalna.koszty_operacyjne },
  pb98: { vat: P.vat.podstawowy, akcyza: L(P.akcyza.pb_ustawowa), oplata: L(P.oplata_paliwowa.pb_2027), marza: P.cena_maksymalna.koszty_operacyjne },
  on: { vat: P.vat.podstawowy, akcyza: L(P.akcyza.on_ustawowa), oplata: L(P.oplata_paliwowa.on_2027), marza: P.cena_maksymalna.koszty_operacyjne },
};
/** Composition du prix maximal en vigueur (le même partout sur le site, test naïf du 2026-11-14) : netto officiel
 *  quand l'annonce est déjà au Monitor Polski, sinon netto = prix TTC ÷ (1 + TVA 8 %), formule de l'art. 34a ust. 2. */
export const skladOstatni = (p: Paliwo) => sklad(OSTATNIA.brutto[p], STAWKI_CPN[p], OSTATNIA.net?.[p]);

/* ——— Weekly Oil Bulletin (CC BY 4.0) ——— */
export interface WobPl { d: string; kurs: number; pb95: number; on: number; lpg: number; pb95_bez: number | null; on_bez: number | null; lpg_bez: number | null; ue95: number }
export interface WobKraj { k: string; en: string; pb95: number | null; on: number | null; lpg: number | null }
export const WOB = wobRaw as unknown as { tydzien: string; odczyt: string; pl: WobPl[]; kraje: WobKraj[]; ue: { pb95: number; on: number | null } };
export const WOB_OST = WOB.pl[WOB.pl.length - 1];
/** EUR pour 1000 l → zł par litre, au taux que le bulletin publie pour la même semaine. */
export const zlL = (eur1000: number, kurs = WOB_OST.kurs) => eur1000 / kurs / 1000;
export const PLN_ZA_EUR = 1 / WOB_OST.kurs;
export const wobZl = (w: WobPl) => ({ d: w.d, pb95: zlL(w.pb95, w.kurs), on: zlL(w.on, w.kurs), lpg: zlL(w.lpg, w.kurs), ue95: zlL(w.ue95, w.kurs) });
export const LPG_ZL = zlL(WOB_OST.lpg);

/** Prix maximal en vigueur le lundi d'une semaine du bulletin (pour comparer moyenne réelle et plafond). */
export function maxWTygodniu(d: string, p: Paliwo) {
  const o = LISTA.find((x) => x.od <= d && (x.do === null || d <= x.do));
  return o ? o.brutto[p] : null;
}

export const KRAJE_PL: Record<string, string> = {
  AT: 'Austria', BE: 'Belgia', BG: 'Bułgaria', CY: 'Cypr', CZ: 'Czechy', DE: 'Niemcy', DK: 'Dania', EE: 'Estonia', ES: 'Hiszpania', FI: 'Finlandia',
  FR: 'Francja', GR: 'Grecja', HR: 'Chorwacja', HU: 'Węgry', IE: 'Irlandia', IT: 'Włochy', LT: 'Litwa', LU: 'Luksemburg', LV: 'Łotwa', MT: 'Malta',
  NL: 'Holandia', PL: 'Polska', PT: 'Portugalia', RO: 'Rumunia', SE: 'Szwecja', SI: 'Słowenia', SK: 'Słowacja',
};
import { przedzial, zmiany } from './engine/prognoza';
/** Fourchette de la prochaine annonce (h = 1) ou de la cinquième suivante (h = 5), 8 cas sur 10. */
export const widelki = (p: Paliwo, h = 1, udzial = 0.8) => przedzial(zmiany(LISTA, p), h, udzial);
