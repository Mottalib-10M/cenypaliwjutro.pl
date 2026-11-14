/**
 * Une page de contenu = UN fichier dans `src/content/strony/` : les deux langues, le texte, la FAQ, les sources,
 * l'outil et ses réglages, les liens. Routes, menus, sitemap, hreflang et schémas le lisent seuls.
 */
import type { SourceKey } from './params';
import type * as Dane from './dane';
import type { Paliwo } from './engine/ceny';

export type Lang = 'pl' | 'en';
export type Group = 'ceny' | 'koszty' | 'podatki';
export interface FAQ { q: string; a: string; open?: boolean }
export type Tool = 'dzis' | 'data' | 'jutro' | 'prognoza' | 'koszt' | 'roznica' | 'lpg' | 'po2027' | 'cpn' | 'sklad' | 'trasa' | 'europa' | 'historia' | 'kontrola' | 'srednia';

export interface Helpers {
  lang: Lang;
  /** Lien interne par identifiant de page. */
  a: (id: string, text: string) => string;
  /** Montant en złotys (« 303 zł » / « PLN 303 »), sans décimales par défaut. */
  zl: (n: number, decimals?: number) => string;
  /** Prix au litre, deux décimales (« 6,06 zł/l » / « PLN 6.06/l »). */
  l: (n: number) => string;
  /** Écart en grosze par litre, signé si demandé (« −4 gr » / « −4 gr »). */
  gr: (zlPerL: number, signed?: boolean) => string;
  num: (n: number, decimals?: number) => string;
  pct: (x: number, decimals?: number) => string;
  /** Date ISO en toutes lettres (« 13 listopada 2026 r. » / « 13 November 2026 »). */
  date: (iso: string) => string;
  /** Date en fin de phrase, point compris (« 31 grudnia 2026 r. », jamais « r.. »). */
  dateK: (iso: string) => string;
  /** Date sans l'année, jour de la semaine si wd. */
  dzien: (iso: string, wd?: boolean) => string;
  /** « piątku 13 listopada » (dopełniacz, après od / do) ; en : « Friday 13 November ». */
  dzienD: (iso: string) => string;
  /** « marzec 2026 » / « March 2026 » à partir de « 2026-03 ». */
  miesiac: (ym: string) => string;
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  src: (key: SourceKey, text?: string) => string;
  /** Lien vers le PDF d'une position du Monitor Polski 2026. */
  mp: (poz: number) => string;
  fn: (p: Paliwo | 'lpg') => string;
  D: typeof Dane;
}

export interface PageText {
  slug: string;
  nav: string;
  card: string;
  /** 50 à 60 caractères, terme-clé en tête (RECETTE §11). */
  title: string | ((h: Helpers) => string);
  /** 150 à 160 caractères. */
  description: string | ((h: Helpers) => string);
  h1: string;
  intro: (h: Helpers) => string;
  /** UN paragraphe de 120 mots ou plus, la réponse chiffrée d'abord (§21). */
  resume: (h: Helpers) => string;
  /** 3 à 5 questions propres à la page, réponses de 40 à 90 mots (§7). */
  faqs: (h: Helpers) => FAQ[];
  body: (h: Helpers) => string;
}

export interface PageDef {
  id: string;
  group: Group;
  order: number;
  tool: Tool;
  toolProps?: { paliwo?: Paliwo; [k: string]: string | number | undefined };
  related: string[];
  sources: SourceKey[];
  pl: PageText;
  en: PageText;
}
export const defineStrona = (g: PageDef): PageDef => g;
