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
export const po2027 = (p: Paliwo) => cenaZ(sk(p).hurt, D.STAWKI_2027[p]);
/** Même prix de gros, sans les deux baisses du CPN (TVA 23 %, accise pleine), redevance 2026. */
export const bezCpn = (p: Paliwo) => cenaZ(sk(p).hurt, { ...D.STAWKI_2027[p], oplata: D.STAWKI_CPN[p].oplata });
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
import { ostatniDzienOtwartej } from '../lib/engine/ceny';
export const OST_DO = ostatniDzienOtwartej(O);
/** « 7–9 listopada » : jours où une annonce s'applique (la dernière : jusqu'au jour ouvré sûr). */
export const kiedy = (h: Helpers, o: Obwieszczenie) => { const d = o.do ?? ostatniDzienOtwartej(o); return d === o.od ? h.dzien(o.od) : `${h.dzien(o.od)} – ${h.dzien(d)}`; };
export const zrodlo = (h: Helpers, o: Obwieszczenie) => (o.poz ? h.mp(o.poz) : `<a href="${o.url}" target="_blank" rel="nofollow noopener noreferrer">gov.pl</a>`);
/** Tableau des n dernières annonces. */
export const ostatnieTab = (h: Helpers, n: number) => {
  const pl = h.lang === 'pl';
  const l = D.LISTA.slice(-n).reverse();
  return h.table([pl ? 'Obowiązuje' : 'In force', 'Pb95', 'Pb98', 'ON', pl ? 'Źródło' : 'Source'], l.map((o) => [kiedy(h, o), h.l(o.brutto.pb95), h.l(o.brutto.pb98), h.l(o.brutto.on), zrodlo(h, o)]), pl ? `Ostatnie ${n} cen maksymalnych z VAT` : `Latest ${n} maximum prices including VAT`, ['l', 'r', 'r', 'r', 'l']);
};
