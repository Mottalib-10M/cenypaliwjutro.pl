/** Historique : moyenne, minimum et maximum d'un mois, et les annonces du mois avec leur source. */
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, litr, gr, nr, opcje, useStan, NAZWY, dzien, type L, type Paliwo } from './kit';
import type { Wiersz } from '../../lib/tool-props';

type M = [string, number, number, number, number];
interface Props { lang: L; mies: Record<Paliwo, M[]>; wiersze: Wiersz[]; paliwo?: Paliwo; methodHref?: string }
const nazwaMies = (m: string, l: L) => new Date(`${m}-15T12:00:00Z`).toLocaleDateString(l === 'pl' ? 'pl-PL' : 'en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function HistoriaCalc({ lang, mies, wiersze, paliwo = 'pb95', methodHref }: Props) {
  const ostM = mies[paliwo][mies[paliwo].length - 1][0];
  const [v, set] = useStan({ p: paliwo as string, m: ostM });
  const p = (['pb95', 'pb98', 'on'].includes(String(v.p)) ? v.p : 'pb95') as Paliwo;
  const lista = mies[p];
  const i = Math.max(0, lista.findIndex((x) => x[0] === v.m));
  const m = lista[i] ?? lista[lista.length - 1];
  const prev = i > 0 ? lista[i - 1] : null;
  const ogl = wiersze.filter((w) => w[0].startsWith(m[0]));
  const form = (
    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
      <SelectField id="hi-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={set('p')} options={opcje(lang, ['pb95', 'pb98', 'on'])} />
      <SelectField id="hi-m" label={T(lang, 'Miesiąc', 'Month')} value={m[0]} onChange={set('m')} options={lista.map((x) => ({ value: x[0], label: nazwaMies(x[0], lang) }))} />
    </div>
  );
  const after = (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="mb-2 text-left font-semibold text-navy-800">{T(lang, `Ceny obowiązujące w miesiącu: ${nazwaMies(m[0], lang)}`, `Prices in force in ${nazwaMies(m[0], lang)}`)}</caption>
        <thead><tr className="border-b border-navy-300 text-left"><th scope="col" className="py-1 pr-3">{T(lang, 'Od', 'From')}</th><th scope="col" className="py-1 pr-3 text-right">{T(lang, 'Benzyna 95', 'Petrol 95')}</th><th scope="col" className="py-1 pr-3 text-right">{T(lang, 'Benzyna 98', 'Petrol 98')}</th><th scope="col" className="py-1 pr-3 text-right">{T(lang, 'Olej napędowy', 'Diesel')}</th><th scope="col" className="py-1">{T(lang, 'Źródło', 'Source')}</th></tr></thead>
        <tbody className="divide-y divide-navy-100">
          {ogl.map((w) => <tr key={w[0]}><td className="py-1 pr-3">{dzien(w[0], lang, false)}{w[1] && w[1] !== w[0] ? ` – ${dzien(w[1], lang, false)}` : ''}</td><td className="tabular-nums py-1 pr-3 text-right">{nr(w[2], lang, 2)}</td><td className="tabular-nums py-1 pr-3 text-right">{nr(w[3], lang, 2)}</td><td className="tabular-nums py-1 pr-3 text-right">{nr(w[4], lang, 2)}</td><td className="py-1"><a className="underline" href={w[7]} target="_blank" rel="nofollow noopener noreferrer">{w[5] ? `Monitor Polski, ${T(lang, 'poz.', 'item')} ${w[5]}` : 'gov.pl'}</a></td></tr>)}
        </tbody>
      </table>
    </div>
  );
  return <Frame form={form} after={after} result={
    <ResultPanel lang={lang} head={T(lang, `${NAZWY.pl[p]}: średnia cena maksymalna, ${nazwaMies(m[0], lang)}`, `${NAZWY.en[p]}: average maximum price, ${nazwaMies(m[0], lang)}`)} value={litr(m[1], lang)}
      sub={prev ? T(lang, `${gr(m[1] - prev[1], lang)} wobec miesiąca wcześniej`, `${gr(m[1] - prev[1], lang)} on the month before`) : undefined}
      rows={[
        { label: T(lang, 'Najniższa', 'Lowest'), value: litr(m[2], lang) },
        { label: T(lang, 'Najwyższa', 'Highest'), value: litr(m[3], lang) },
        { label: T(lang, 'Liczba ogłoszeń', 'Notices'), value: String(m[4]), note: true },
      ]}
      hyp={T(lang, 'Średnia arytmetyczna cen z ogłoszeń, które zaczęły obowiązywać w danym miesiącu (każde ogłoszenie liczy się raz, bez ważenia liczbą dni). Dni bez ceny maksymalnej, poza okresami obniżonego VAT, nie są liczone.', 'Plain average of the notices that took effect in the month (each notice counts once, not weighted by days). Days without a cap, outside reduced-VAT periods, are not counted.')}
      methodHref={methodHref} copyText={`${NAZWY[lang][p]} ${m[0]}: ${litr(m[1], lang)}`} />} />;
}
