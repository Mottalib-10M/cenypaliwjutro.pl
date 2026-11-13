/**
 * Moteur des prix maximaux (fonctions pures). Données : src/data/ceny.json (scripts/build-data.py).
 * Règle d'application (art. 34a ust. 6 ustawy o zapasach) : une cena vaut le lendemain de son annonce au
 * Monitor Polski ; annoncée la veille d'un week-end ou d'un jour férié, elle vaut jusqu'au jour ouvré suivant inclus.
 * Le script de données a déjà posé pour chaque annonce `od` (premier jour) et `do` (dernier jour, null = en vigueur
 * jusqu'à l'annonce suivante).
 */
export type Paliwo = 'pb95' | 'pb98' | 'on';
export const PALIWA: Paliwo[] = ['pb95', 'pb98', 'on'];
export type Trio = Record<Paliwo, number>;
export interface Obwieszczenie {
  src: 'mp' | 'govpl';
  /** Position au Monitor Polski 2026 (null : annonce du ministère pas encore indexée par l'API ELI). */
  poz: number | null;
  /** Jour de l'annonce (AAAA-MM-JJ). */
  ogl: string;
  /** Prix sans TVA, par dm³ (null pour une annonce lue sur gov.pl seulement). */
  net: Trio | null;
  /** Prix TTC par litre. */
  brutto: Trio;
  url: string;
  od: string;
  do: string | null;
  okres: number | null;
}
export interface Okres { od: string; do: string; akty: string[] }

export const addDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
export const dzienTygodnia = (iso: string) => new Date(`${iso}T12:00:00Z`).getUTCDay();

/** L'annonce applicable un jour donné, ou null (jour hors des périodes de prix maximal, ou pas encore annoncé). */
export function naDzien(lista: Obwieszczenie[], dzien: string): Obwieszczenie | null {
  for (let i = lista.length - 1; i >= 0; i--) {
    const o = lista[i];
    if (o.od <= dzien && (o.do === null ? true : dzien <= o.do)) {
      if (o.do === null) {
        // Dernière annonce : elle vaut au moins son premier jour ; au-delà, seulement jusqu'au jour ouvré suivant inclus.
        return dzien <= ostatniDzienOtwartej(o) ? o : null;
      }
      return o;
    }
  }
  return null;
}

/** Dernier jour couvert à coup sûr par la dernière annonce : son premier jour, prolongé du week-end qui le suit
 *  (une annonce publiée un vendredi vaut samedi, dimanche et lundi). Les jours fériés ne sont pas connus du moteur :
 *  la page le dit et renvoie au Monitor Polski. */
export function ostatniDzienOtwartej(o: Obwieszczenie): string {
  let d = o.od;
  while (dzienTygodnia(d) === 6 || dzienTygodnia(d) === 0) d = addDays(d, 1);
  return d;
}

export const zmiana = (a: Obwieszczenie, b: Obwieszczenie, p: Paliwo) => Math.round((b.brutto[p] - a.brutto[p]) * 100) / 100;

/** Statistiques d'une série d'annonces (min, max, moyenne des jours couverts). */
export function statystyki(lista: Obwieszczenie[], p: Paliwo, od?: string, doDnia?: string) {
  const l = lista.filter((o) => (!od || o.od >= od) && (!doDnia || o.od <= doDnia));
  if (!l.length) return null;
  const v = l.map((o) => o.brutto[p]);
  const min = Math.min(...v), max = Math.max(...v);
  return { n: l.length, min, max, srednia: v.reduce((s, x) => s + x, 0) / v.length, minO: l[v.indexOf(min)], maxO: l[v.indexOf(max)] };
}

/** Moyennes mensuelles des annonces (une annonce = un poids ; le nombre de jours couverts est donné à part). */
export function miesiecznie(lista: Obwieszczenie[], p: Paliwo) {
  const g: Record<string, number[]> = {};
  for (const o of lista) (g[o.od.slice(0, 7)] ??= []).push(o.brutto[p]);
  return Object.entries(g).map(([m, v]) => ({ m, n: v.length, srednia: v.reduce((s, x) => s + x, 0) / v.length, min: Math.min(...v), max: Math.max(...v) }));
}
