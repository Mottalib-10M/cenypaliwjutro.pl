import { route, type Locale } from './routes';
import { PAGES, pageById, GROUPS } from '../lib/strony';
import type { Group } from '../lib/strona-typy';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  pl: { home: 'Ceny paliw dziś (strona główna)', method: 'Metodologia i źródła', about: 'O nas', widget: 'Kalkulator na Twoją stronę', contact: 'Kontakt', editorial: 'Polityka redakcyjna', privacy: 'Polityka prywatności', terms: 'Nota prawna', cookies: 'Cookies' },
  en: { home: 'Fuel prices today and tomorrow', method: 'Method and sources', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
};
export const GROUP_LABEL: Record<Locale, Record<Group, string>> = {
  pl: { ceny: 'Ceny i prognoza', koszty: 'Koszty jazdy', podatki: 'Podatki i obniżki cen' },
  en: { ceny: 'Prices and outlook', koszty: 'Driving costs', podatki: 'Taxes and the CPN' },
};
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? pageById(id)?.[lang].nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: GROUP_LABEL[lang][g], links: g === 'ceny' ? [link('home', lang), ...inGroup(g, lang)] : inGroup(g, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [...navCategories(lang), { label: lang === 'pl' ? 'Serwis' : 'This site', links: ['method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) }];
/** Les pages les plus demandées, à un clic de partout (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => ['cena-maksymalna', 'jutro', 'benzyna95', 'diesel', 'po2027'].filter((id) => pageById(id)).map((id) => link(id, lang));
