/** Prix maximal d'un jour donné : quelle annonce s'appliquait (art. 34a ust. 6), sa position au Monitor Polski. */
import { DateField, Frame, ResultPanel, T, litr, dzien, useStan, useDzisiaj, NAZWY, type L } from './kit';
import type { Ost } from './DzisCalc';
import type { Wiersz } from '../../lib/tool-props';

interface Props { lang: L; wiersze: Wiersz[]; okresy: Array<[string, string]>; pierwszy: string; ost: Ost; methodHref?: string }

export function znajdz(w: Wiersz[], d: string, ostDo: string): Wiersz | null {
  for (let i = w.length - 1; i >= 0; i--) { const x = w[i]; if (x[0] <= d && (x[1] ? d <= x[1] : d <= ostDo)) return x; }
  return null;
}

export default function DataCalc({ lang, wiersze, okresy, pierwszy, ost, methodHref }: Props) {
  const [v, set] = useStan({ d: ost.od });
  const d = String(v.d);
  const w = znajdz(wiersze, d, ost.doDnia);
  const wOkresie = okresy.some(([a, b]) => a <= d && d <= b);
  const form = <DateField id="da-d" label={T(lang, 'Dzień tankowania', 'Day of the fill')} value={d} onChange={set('d')} min={pierwszy} max="2026-12-31" lang={lang} help={T(lang, 'Dzień.miesiąc.rok, np. 14.11.2026 (data z paragonu)', 'Day/month/year, e.g. 14/11/2026 (date on the receipt)')} />;
  const dzis = useDzisiaj();
  if (!w) {
    const powod = d < pierwszy ? T(lang, 'przed wprowadzeniem cen maksymalnych', 'before maximum prices were introduced')
      : wOkresie ? T(lang, 'cena na ten dzień nie jest jeszcze ogłoszona', 'the price for this day has not been announced yet')
      : T(lang, 'poza okresem obniżonego VAT: cena maksymalna nie obowiązywała', 'outside the reduced-VAT period: no maximum price applied');
    return <Frame form={form} result={<ResultPanel lang={lang} head={dzien(d, lang, true, true)} value={T(lang, 'brak limitu', 'no cap')} sub={powod} rows={[]} methodHref={methodHref} copyText={`${d}: ${powod}`} hyp={T(lang, 'Cena maksymalna obowiązuje tylko w okresach obniżonej stawki VAT na paliwa (art. 34a ust. 1 ustawy o zapasach).', 'A maximum price applies only while the reduced VAT rate on fuel is in force (Article 34a(1) of the Stocks Act).')} />} />;
  }
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `Ceny maksymalne, ${dzien(d, lang, true, true)}`, `Maximum prices, ${dzien(d, lang, true, true)}`)} value={litr(w[2], lang)} sub={NAZWY[lang].pb95}
      rows={[{ label: NAZWY[lang].pb98, value: litr(w[3], lang) }, { label: NAZWY[lang].on, value: litr(w[4], lang), strong: true },
        { label: T(lang, 'Ogłoszenie', 'Announced on'), value: dzien(w[6], lang, false, true), note: true },
        { label: dzis === null ? T(lang, 'Dni obowiązywania', 'Days in force') : (w[1] || ost.doDnia) >= dzis ? T(lang, 'Obowiązuje', 'In force') : T(lang, 'Obowiązywała', 'Applied'), value: (w[1] || ost.doDnia) !== w[0] ? `${dzien(w[0], lang, false)} – ${dzien(w[1] || ost.doDnia, lang, false)}` : dzien(w[0], lang, false), note: true }]}
      hyp={T(lang, 'Cena obowiązuje dzień po ogłoszeniu w Monitorze Polskim; ogłoszona przed weekendem lub świętem obowiązuje do najbliższego dnia roboczego włącznie (art. 34a ust. 6).', 'A price applies the day after it is published in Monitor Polski; one published before a weekend or holiday applies up to and including the next working day (Article 34a(6)).')}
      methodHref={methodHref} copyText={`${d}: Pb95 ${litr(w[2], lang)}, ON ${litr(w[4], lang)}`}>
      <p className="mt-3 text-xs text-navy-600">{T(lang, 'Źródło: ', 'Source: ')}<a className="underline" href={w[7]} target="_blank" rel="nofollow noopener noreferrer">{w[5] ? `Monitor Polski 2026 ${T(lang, 'poz.', 'item')} ${w[5]}` : T(lang, 'komunikat Ministerstwa Energii (gov.pl)', 'Ministry of Energy announcement (gov.pl)')}</a></p>
    </ResultPanel>} />;
}
