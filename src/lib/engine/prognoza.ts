/**
 * Prévision de la prochaine annonce (fonctions pures), sans prix de gros : le prix de gros d'ORLEN n'est pas
 * réutilisable (mentions légales d'orlen.pl), on ne le lit donc pas. La prévision part de la seule série officielle
 * des prix maximaux annoncés.
 *
 * Méthode (rétro-testée « en marchant » : chaque point est prévu avec les seules annonces antérieures) :
 *   variation prévue = moyenne des k dernières variations × α ; k et α sont choisis dans une petite grille
 *   (k ∈ {1, 3, 5}, α ∈ {0,5 ; 1}) par l'erreur absolue moyenne obtenue AVANT le point prévu.
 *   La référence est « pas de changement ». La prévision n'est publiée que si elle bat cette référence ;
 *   sinon la page affiche « pas de prévision » et l'erreur des deux méthodes.
 * Seules comptent les variations entre annonces d'une même période (une reprise après une suspension n'est pas une
 * variation de marché).
 */
import type { Obwieszczenie, Paliwo } from './ceny';

export interface Ocena { k: number; alfa: number; mae: number; maeStale: number; n: number; trafnyKierunek: number }
export interface Prognoza { zmiana: number; cena: number; ocena: Ocena; publikowana: boolean; ostatnia: Obwieszczenie }

/** Variations successives à l'intérieur de chaque période. */
export function zmiany(lista: Obwieszczenie[], p: Paliwo): number[][] {
  const okresy: number[][] = [];
  let cur: number[] = [];
  for (let i = 1; i < lista.length; i++) {
    if (lista[i].okres !== lista[i - 1].okres) { if (cur.length) okresy.push(cur); cur = []; continue; }
    cur.push(Math.round((lista[i].brutto[p] - lista[i - 1].brutto[p]) * 100) / 100);
  }
  if (cur.length) okresy.push(cur);
  return okresy;
}

const srednia = (v: number[]) => (v.length ? v.reduce((s, x) => s + x, 0) / v.length : 0);

/** Erreur absolue moyenne d'une règle (k, α) sur toutes les variations prévisibles (au moins 5 précédentes). */
export function ocena(okresy: number[][], k: number, alfa: number): Ocena {
  let e = 0, e0 = 0, n = 0, dobry = 0, ruchy = 0;
  for (const z of okresy) {
    for (let i = 5; i < z.length; i++) {
      const pred = alfa * srednia(z.slice(i - k, i));
      e += Math.abs(z[i] - pred); e0 += Math.abs(z[i]); n++;
      if (Math.abs(z[i]) >= 0.005) { ruchy++; if (Math.sign(Math.round(pred * 100)) === Math.sign(z[i])) dobry++; }
    }
  }
  return { k, alfa, mae: n ? e / n : 0, maeStale: n ? e0 / n : 0, n, trafnyKierunek: ruchy ? dobry / ruchy : 0 };
}

const REGULY = [1, 3, 5].flatMap((k) => [0.5, 1].map((alfa) => ({ k, alfa })));
type Punkt = { z: number; hist: number[] };
const punkty = (okresy: number[][]): Punkt[] => okresy.flatMap((z) => z.map((x, i) => ({ z: x, hist: z.slice(0, i) })).filter((p) => p.hist.length >= 5));
const przewid = (hist: number[], r: { k: number; alfa: number }) => r.alfa * srednia(hist.slice(-r.k));
/** Règle retenue avec les points d'avant seulement (au moins 10 points ; sinon k = 1, α = 0,5). */
function wybierz(pts: Punkt[]) {
  if (pts.length < 10) return { k: 1, alfa: 0.5 };
  let best = REGULY[0], be = Infinity;
  for (const r of REGULY) { const e = pts.reduce((s, p) => s + Math.abs(p.z - przewid(p.hist, r)), 0); if (e < be) { be = e; best = r; } }
  return best;
}
/** Rétro-test en marchant : erreur de la prévision et de « pas de changement » sur les mêmes points. */
export function retroTest(okresy: number[][]): Ocena {
  const pts = punkty(okresy);
  let e = 0, e0 = 0, n = 0, dobry = 0, ruchy = 0;
  for (let i = 10; i < pts.length; i++) {
    const r = wybierz(pts.slice(0, i));
    const pred = przewid(pts[i].hist, r);
    e += Math.abs(pts[i].z - pred); e0 += Math.abs(pts[i].z); n++;
    if (Math.abs(pts[i].z) >= 0.005) { ruchy++; if (Math.sign(Math.round(pred * 100)) === Math.sign(pts[i].z)) dobry++; }
  }
  const r = wybierz(pts);
  return { k: r.k, alfa: r.alfa, mae: n ? e / n : 0, maeStale: n ? e0 / n : 0, n, trafnyKierunek: ruchy ? dobry / ruchy : 0 };
}

export function prognoza(lista: Obwieszczenie[], p: Paliwo): Prognoza {
  const okresy = zmiany(lista, p);
  const o = retroTest(okresy);
  const ost = lista[lista.length - 1];
  const biez = okresy[okresy.length - 1] ?? [];
  const zm = Math.round(przewid(biez, o) * 100) / 100;
  return { zmiana: zm, cena: Math.round((ost.brutto[p] + zm) * 100) / 100, ocena: o, publikowana: o.mae < o.maeStale, ostatnia: ost };
}

/** Fourchette empirique : variations observées sur h annonces consécutives (à l'intérieur d'une période),
 *  quantiles bas et haut qui encadrent la part `udzial` des cas (0,8 = 8 cas sur 10). */
export function przedzial(okresy: number[][], h: number, udzial = 0.8) {
  const sumy: number[] = [];
  for (const z of okresy) for (let i = 0; i + h <= z.length; i++) sumy.push(z.slice(i, i + h).reduce((s, x) => s + x, 0));
  sumy.sort((a, b) => a - b);
  const q = (t: number) => sumy[Math.min(sumy.length - 1, Math.max(0, Math.round(t * (sumy.length - 1))))];
  const r2 = (x: number) => Math.round(x * 100) / 100;
  return { dol: r2(q((1 - udzial) / 2)), gora: r2(q(1 - (1 - udzial) / 2)), n: sumy.length, bezZmian: sumy.filter((x) => Math.abs(x) < 0.005).length / Math.max(1, sumy.length) };
}
