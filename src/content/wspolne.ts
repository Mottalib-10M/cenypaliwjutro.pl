/** Valeurs dérivées partagées par les textes (toutes calculées, aucune saisie à la main). */
import * as D from '../lib/dane';
import { cenaZ } from '../lib/engine/podatki';
import { rocznie } from '../lib/engine/koszty';
import { P } from '../lib/params';
import type { Paliwo } from '../lib/engine/ceny';

export const O = D.OSTATNIA;
export const POP = D.POPRZEDNIA;
export const zm = (p: Paliwo) => O.brutto[p] - POP.brutto[p];
export const sk = (p: Paliwo) => D.skladOstatni(p);
/** Prix TTC le 1er janvier 2027 si le CPN n'est pas prolongé, au même prix de gros. */
const r2 = (x: number) => Math.round(x * 100) / 100;
/** Prix scénario arrondis au grosz, comme un prix affiché à la pompe (le plein de 50 l reste égal à 50 × l'écart affiché). */
export const po2027 = (p: Paliwo) => r2(cenaZ(sk(p).hurt, D.STAWKI_2027[p]));
/** Même prix de gros, sans les deux baisses du CPN (TVA 23 %, accise pleine), redevance 2026. */
export const bezCpn = (p: Paliwo) => r2(cenaZ(sk(p).hurt, { ...D.STAWKI_2027[p], oplata: D.STAWKI_CPN[p].oplata }));
export const podatki = (p: Paliwo) => { const s = sk(p); return s.akcyza + s.oplata + s.vat; };
export const EX = P.przyklady;
export const rok = (p: Paliwo | 'lpg', km = EX.km_rok) => {
  const sp = p === 'on' ? EX.spalanie_on : p === 'lpg' ? EX.spalanie_lpg : EX.spalanie_pb;
  const c = p === 'lpg' ? D.LPG_ZL : O.brutto[p];
  return rocznie(km, sp, c);
};
export const eu = (k: string) => D.WOB.kraje.find((x) => x.k === k);
export const euZl = (k: string, p: 'pb95' | 'on' | 'lpg') => { const v = eu(k)?.[p]; return v ? D.zlL(v) : null; };
export const ranking = (p: 'pb95' | 'on') => [...D.WOB.kraje].filter((x) => x[p] != null).sort((a, b) => (a[p] as number) - (b[p] as number));
export const miejscePL = (p: 'pb95' | 'on') => ranking(p).findIndex((x) => x.k === 'PL') + 1;
export const ueZl = (p: 'pb95' | 'on') => D.zlL(D.WOB.ue[p] as number);
/** Nombre d'annonces par période et nombre total de jours couverts par un prix maximal jusqu'à la dernière annonce. */
export const nOkres = (i: number) => D.LISTA.filter((o) => o.okres === i).length;
export const MP_N = D.LISTA.filter((o) => o.src === 'mp').length;
export const zmianyN = (p: Paliwo) => { let w = 0, s = 0, b = 0; for (let i = 1; i < D.LISTA.length; i++) { if (D.LISTA[i].okres !== D.LISTA[i - 1].okres) continue; const z = D.LISTA[i].brutto[p] - D.LISTA[i - 1].brutto[p]; if (z > 0.004) w++; else if (z < -0.004) s++; else b++; } return { w, s, b, n: w + s + b }; };
import type { Helpers } from '../lib/strona-typy';
import type { Obwieszczenie } from '../lib/engine/ceny';
import { ostatniDzienOtwartej, addDays } from '../lib/engine/ceny';
export const OST_DO = ostatniDzienOtwartej(O);
/** Jour où la prochaine annonce est attendue (dernier jour couvert, l'après-midi) et premier jour de la prochaine cena. */
export const NAST_OGL = OST_DO;
export const NAST_OD = addDays(OST_DO, 1);
const BIER = ['niedzielę', 'poniedziałek', 'wtorek', 'środę', 'czwartek', 'piątek', 'sobotę'];
/** « w sobotę 14 listopada » (biernik, après « w ») ; en : « Saturday 14 November ». */
export const dzienW = (h: Helpers, iso: string) => (h.lang === 'pl' ? `${BIER[new Date(`${iso}T12:00:00Z`).getUTCDay()]} ${h.dzien(iso)}` : h.dzienD(iso));
/** « w poniedziałek 16 listopada », « we wtorek 17 listopada » ; en : « Monday 16 November ». */
export const wDniu = (h: Helpers, iso: string) => (h.lang === 'pl' ? `${new Date(`${iso}T12:00:00Z`).getUTCDay() === 2 ? 'we' : 'w'} ${dzienW(h, iso)}` : dzienW(h, iso));
/** « od soboty 14 listopada do poniedziałku 16 listopada » / « from Saturday 14 November to Monday 16 November ». */
export const okresTxt = (h: Helpers) => (OST_DO === O.od
  ? (h.lang === 'pl' ? wDniu(h, O.od) : `on ${h.dzienD(O.od)}`)
  : (h.lang === 'pl' ? `od ${h.dzienD(O.od)} do ${h.dzienD(OST_DO)}` : `from ${h.dzienD(O.od)} to ${h.dzienD(OST_DO)}`));
/** Fourchette de la prochaine cena, en zł/l (prix + variation, 8 cas sur 10), arrondie au grosz. */
export const nastWidelki = (p: Paliwo) => { const w = D.widelki(p, 1); const r = (x: number) => Math.round(x * 100) / 100; return { lo: r(O.brutto[p] + w.dol), hi: r(O.brutto[p] + w.gora) }; };
/** « 7–9 listopada » : jours où une annonce s'applique (la dernière : jusqu'au jour ouvré sûr). */
export const kiedy = (h: Helpers, o: Obwieszczenie) => { const d = o.do ?? ostatniDzienOtwartej(o); return d === o.od ? h.dzien(o.od) : d.slice(0, 7) === o.od.slice(0, 7) ? `${Number(o.od.slice(8))}–${h.dzien(d)}` : `${h.dzien(o.od)} – ${h.dzien(d)}`; };
export const zrodlo = (h: Helpers, o: Obwieszczenie) => (o.poz ? h.mp(o.poz) : `<a href="${o.url}" target="_blank" rel="nofollow noopener noreferrer">gov.pl</a>`);
/** Tableau des n dernières annonces. */
export const ostatnieTab = (h: Helpers, n: number) => {
  const pl = h.lang === 'pl';
  const l = D.LISTA.slice(-n).reverse();
  return h.table([pl ? 'Obowiązuje' : 'In force', pl ? 'Benzyna 95' : 'Petrol 95', pl ? 'Benzyna 98' : 'Petrol 98', pl ? 'Olej napędowy' : 'Diesel', pl ? 'Źródło' : 'Source'], l.map((o) => [kiedy(h, o), h.l(o.brutto.pb95), h.l(o.brutto.pb98), h.l(o.brutto.on), zrodlo(h, o)]), pl ? `Ostatnie ${n} cen maksymalnych z VAT` : `Latest ${n} maximum prices including VAT`, ['l', 'r', 'r', 'r', 'l']);
};
