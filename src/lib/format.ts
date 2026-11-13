/** Formatage monétaire/numérique localisé, par langue de page (pl-PL ou en-GB, site-config LOCALE_BY_LANG). */
import { LOCALE_TAG, LOCALE_BY_LANG, CURRENCY } from '../data/site-config';

export type Lang = 'pl' | 'en';
const tagOf = (lang?: string) => (lang && LOCALE_BY_LANG[lang]) || LOCALE_TAG;
const cache = new Map<string, Intl.NumberFormat>();
function nf(opts: Intl.NumberFormatOptions, lang?: string): Intl.NumberFormat {
  const tag = tagOf(lang);
  const k = tag + JSON.stringify(opts);
  if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(tag, opts));
  return cache.get(k)!;
}
export function formatMoney(value: number, decimals = 0, lang?: string): string {
  return nf({ style: 'currency', currency: CURRENCY, minimumFractionDigits: decimals, maximumFractionDigits: decimals }, lang).format(value);
}
export function formatNumber(value: number, decimals = 0, lang?: string): string {
  return nf({ minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: true }, lang).format(value);
}
/** Nombre tiré des paramètres et inséré dans un texte : décimales utiles seulement, au format de la langue (RECETTE §4). */
export function formatDecimal(value: number, max = 2, lang?: string): string {
  return nf({ maximumFractionDigits: max }, lang).format(value);
}
export function formatPercent(value: number, decimals = 1, lang?: string): string {
  return nf({ style: 'percent', minimumFractionDigits: decimals, maximumFractionDigits: decimals }, lang).format(value).replace(/(\d)\s?%/, lang === 'en' ? '$1%' : '$1 %');
}
export function parseLocaleNumber(input: string): number {
  const cleaned = input.replace(/[^\d.,-]/g, '');
  const lastComma = cleaned.lastIndexOf(','), lastDot = cleaned.lastIndexOf('.');
  let s = cleaned;
  if (lastComma > lastDot) s = cleaned.replace(/\./g, '').replace(',', '.');
  else if (/^-?[1-9]\d{0,2}(\.\d{3})+$/.test(cleaned)) s = cleaned.replace(/\./g, '');
  else s = cleaned.replace(/,/g, '');
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

/** Date en toutes lettres dans la langue de la page (« 13 listopada 2026 », « 13 November 2026 »). Fuseau UTC forcé. */
export function displayDate(iso: string, langTag: string): string {
  const tag = LOCALE_BY_LANG[langTag] ?? langTag;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(tag, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
