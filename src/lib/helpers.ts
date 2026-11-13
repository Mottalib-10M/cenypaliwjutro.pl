/** Fabrique les outils d'écriture (`Helpers`) passés au texte de chaque page. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { P, type SourceKey } from './params';
import * as D from './dane';
import type { Helpers } from './strona-typy';
import { formatNumber, formatPercent, displayDate } from './format';
import { attributsTableau, celluleHtml } from './tableaux';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');

export const zlTxt = (n: number, lang: Locale, d = 0) => (lang === 'pl' ? `${formatNumber(n, d, lang)} zł` : `PLN ${formatNumber(n, d, lang)}`);

export function helpers(lang: Locale): Helpers {
  const num = (n: number, d = 0) => formatNumber(n, d, lang);
  return {
    lang, D,
    a: (id, text) => (ROUTES.some((r) => r.id === id) ? `<a href="${route(id, lang)}">${text}</a>` : (() => { throw new Error(`lien vers une page inconnue : ${id}`); })()),
    zl: (n, d = 0) => zlTxt(n, lang, d),
    l: (n) => (lang === 'pl' ? `${num(n, 2)} zł/l` : `PLN ${num(n, 2)}/l`),
    gr: (x, signed = false) => { const v = Math.round(x * 100); const s = signed && v > 0 ? '+' : v < 0 ? '−' : ''; return `${s}${num(Math.abs(v))} gr`; },
    num,
    pct: (x, d = 1) => formatPercent(x, d, lang),
    date: (iso) => (lang === 'pl' ? `${displayDate(iso, 'pl')} r.` : displayDate(iso, 'en')),
    dzien: (iso, wd = false) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-GB', { ...(wd ? { weekday: 'long' } : {}), day: 'numeric', month: 'long', timeZone: 'UTC' }),
    src: (key: SourceKey, text?: string) => { const s = P.sources[key]; return `<a href="${s.url}" target="_blank" rel="nofollow noopener noreferrer">${text ?? s.label[lang]}</a>`; },
    mp: (poz) => `<a href="https://api.sejm.gov.pl/eli/acts/MP/2026/${poz}/text.pdf" target="_blank" rel="nofollow noopener noreferrer">M.P. 2026 ${lang === 'pl' ? 'poz.' : 'item'} ${poz}</a>`,
    fn: (p) => D.NAZWA[lang][p],
    table: (headers, rows, caption, align = []) => {
      const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
      const { classe } = attributsTableau('auto', headers.length);
      const dl = (i: number) => ` data-label="${String(headers[i] ?? '').replace(/<[^>]+>/g, '').replace(/"/g, '&quot;')}"`;
      return `<div class="not-prose my-6 overflow-x-auto"><table class="w-full text-sm${classe ? ` ${classe}` : ''}">${caption ? `<caption class="mb-2 text-left text-sm text-navy-700">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="border-b border-navy-300 bg-navy-50 px-3 py-2 font-semibold text-navy-900 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r, ri) => `<tr class="${ri % 2 ? 'bg-navy-50/40' : ''}">${r.map((c, i) => `<td${dl(i)} class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumber(c, 0, lang)) : celluleHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    },
  };
}
