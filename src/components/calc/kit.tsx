/**
 * Pièces communes des calculateurs.
 * - Premier rendu = valeurs du build (RECETTE §17.5) ; le lien partagé ne s'applique qu'après le montage et l'URL ne
 *   change qu'après une interaction (url-state.ts).
 * - `ResultPanel` : chiffre principal, lignes, barre, hypothèses, copier / partager / imprimer.
 * - `Frame` : formulaire à gauche, résultat à droite (empilés sur téléphone).
 */
import { useEffect, useState, type ReactNode } from 'react';
import StackedBar from '../ui/StackedBar';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { formatNumber, formatPercent } from '../../lib/format';

export type L = 'pl' | 'en';
export const T = <A,>(l: L, pl: A, en: A) => (l === 'en' ? en : pl);
export const nr = (x: number, l: L, d = 0) => formatNumber(x, d, l);
export const pct = (x: number, l: L, d = 1) => formatPercent(x, d, l);
/** Montant en złotys : deux décimales sous 100 zł (un plein se lit au grosz), aucune au-delà. */
export const zl = (x: number, l: L, d?: number) => { const dd = d ?? (Math.abs(x) < 100 ? 2 : 0); return l === 'pl' ? `${formatNumber(x, dd, l)} zł` : `PLN ${formatNumber(x, dd, l)}`; };
/** Prix au litre, deux décimales comme les obwieszczenia. */
export const litr = (x: number, l: L) => (l === 'pl' ? `${formatNumber(x, 2, l)} zł/l` : `PLN ${formatNumber(x, 2, l)}/l`);
/** Écart en grosze par litre, signé. */
export const gr = (x: number, l: L) => { const v = Math.round(x * 100); return `${v > 0 ? '+' : v < 0 ? '−' : '±'}${formatNumber(Math.abs(v), 0, l)} gr/l`; };
export const dzien = (iso: string, l: L, wd = true, rok = false) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(l === 'pl' ? 'pl-PL' : 'en-GB', { ...(wd ? { weekday: 'long' } : {}), day: 'numeric', month: 'long', ...(rok ? { year: 'numeric' } : {}), timeZone: 'UTC' });

export type Paliwo = 'pb95' | 'pb98' | 'on';
export const NAZWY: Record<L, Record<Paliwo | 'lpg', string>> = {
  pl: { pb95: 'Benzyna 95', pb98: 'Benzyna 98', on: 'Olej napędowy (ON)', lpg: 'LPG (autogaz)' },
  en: { pb95: 'Petrol 95', pb98: 'Petrol 98', on: 'Diesel', lpg: 'LPG (autogas)' },
};
export const opcje = (l: L, lista: Array<Paliwo | 'lpg'>) => lista.map((v) => ({ value: v, label: NAZWY[l][v] }));

/** État des champs numériques et texte, avec lecture du lien partagé après le montage. */
export function useStan<K extends string>(defs: Record<K, number | string>): [Record<K, number | string>, (k: K) => (x: number | string) => void] {
  const [v, setV] = useState<Record<K, number | string>>(defs);
  useEffect(() => {
    const u = readParams(window.location.search);
    if (![...u.keys()].length) return;
    setV((o) => Object.fromEntries(Object.entries(o).map(([k, d]) => [k, typeof d === 'number' ? num(u, k, d) : str(u, k, d as string)])) as Record<K, number | string>);
  }, []);
  useEffect(() => { updateURL(v as Record<string, number | string>); }, [v]);
  const set = (k: K) => (x: number | string) => setV((o) => ({ ...o, [k]: x }));
  return [v, set];
}

/** Date du jour côté navigateur, connue seulement après le montage (jamais au premier rendu, §17.5). */
export function useDzisiaj(): string | null {
  const [d, setD] = useState<string | null>(null);
  useEffect(() => { const n = new Date(); setD(`${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`); }, []);
  return d;
}

export interface Row { label: string; value: string; strong?: boolean; note?: boolean }
interface PanelProps {
  lang: L; head: string; value: string; sub?: string; rows: Row[]; notes?: ReactNode[];
  bar?: { segments: Array<{ label: string; value: number; color: string }>; total: number; aria: string };
  hyp?: string; methodHref?: string; copyText: string; children?: ReactNode; alert?: ReactNode;
}
export function ResultPanel({ lang, head, value, sub, rows, notes = [], bar, hyp, methodHref, copyText, children, alert }: PanelProps) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(`${copyText} · ${window.location.href}`).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };
  const btn = 'rounded-lg border border-navy-300 bg-white px-3 py-2 font-medium text-navy-800 hover:bg-navy-50';
  return (
    <div aria-live="polite" data-resultat className="mt-6 rounded-xl border border-accent-200 bg-accent-50/60 p-4 sm:p-5 lg:sticky lg:top-20 lg:mt-0">
      <p className="text-sm font-medium text-navy-700">{head}</p>
      <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{value}</p>
      {sub && <p className="tabular-nums mt-1 text-navy-700">{sub}</p>}
      {alert && <p className="mt-2 text-sm font-semibold text-navy-900">{alert}</p>}
      {bar && <div className="mt-4"><StackedBar segments={bar.segments} total={bar.total} ariaPrefix={bar.aria} lang={lang} /></div>}
      <table className="mt-4 w-full text-sm"><tbody className="divide-y divide-navy-200">
        {rows.map((r, i) => <tr key={i} className={r.strong ? 'font-semibold' : ''}><td className={`py-1.5 pr-3 ${r.note ? 'text-navy-600' : 'text-navy-700'}`}>{r.label}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{r.value}</td></tr>)}
      </tbody></table>
      {notes.length > 0 && <ul className="mt-3 space-y-1 text-sm text-navy-700">{notes.map((n, i) => <li key={i}>{n}</li>)}</ul>}
      {children}
      {hyp && <details className="mt-3 text-sm text-navy-700"><summary className="cursor-pointer font-medium">{T(lang, 'Założenia obliczenia', 'Assumptions')}</summary><p className="mt-2">{hyp} {methodHref && <a href={methodHref} className="underline">{T(lang, 'Metodologia i źródła', 'Method and sources')}</a>}</p></details>}
      <div className="no-print mt-4 flex flex-wrap gap-2 text-sm">
        <button type="button" onClick={copy} className={btn}>{copied ? T(lang, 'Skopiowano', 'Copied') : T(lang, 'Kopiuj wynik', 'Copy result')}</button>
        <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className={btn}>{T(lang, 'Link do udostępnienia', 'Share link')}</button>
        <button type="button" onClick={() => window.print()} className={btn}>{T(lang, 'Drukuj', 'Print')}</button>
      </div>
    </div>
  );
}

export function Frame({ form, result, after }: { form: ReactNode; result: ReactNode; after?: ReactNode }) {
  return (
    <div className="rechner not-prose rounded-xl border border-navy-200 bg-white p-4 sm:p-6" data-chrome>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-6">
        <form onSubmit={(e) => e.preventDefault()} className="content-start space-y-5">{form}</form>
        {result}
      </div>
      {after}
    </div>
  );
}

/** Champ date (AAAA-MM-JJ), même hauteur que les autres champs (48 px). */
export function DateField({ id, label, value, onChange, min, max, help }: { id: string; label: string; value: string; onChange: (v: string) => void; min?: string; max?: string; help?: string }) {
  return (
    <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-navy-700">{label}</label>
      <input id={id} type="date" value={value} min={min} max={max} onChange={(e) => e.target.value && onChange(e.target.value)} aria-describedby={help ? `${id}-help` : undefined}
        className="tabular-nums h-12 w-full rounded-lg border border-navy-300 bg-white px-4 text-lg text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
      {help ? <p id={`${id}-help`} className="mt-1 text-xs text-navy-500">{help}</p> : <span />}
    </div>
  );
}

/** Mention sous un résultat : d'où vient le chiffre (position du Monitor Polski ou communiqué gov.pl). */
export function Zrodlo({ lang, poz, url, ogl }: { lang: L; poz: number | null; url: string; ogl: string }) {
  return <p className="mt-3 text-xs text-navy-600">{T(lang, 'Źródło: ', 'Source: ')}<a className="underline" href={url} target="_blank" rel="nofollow noopener noreferrer">{poz ? `Monitor Polski 2026 ${T(lang, 'poz.', 'item')} ${poz}` : T(lang, 'komunikat Ministerstwa Energii na gov.pl', 'Ministry of Energy announcement on gov.pl')}</a>{T(lang, `, ogłoszenie z ${dzien(ogl, lang, false, true)}`, `, announced on ${dzien(ogl, lang, false, true)}`)}</p>;
}
