/** Contrôle d'un ticket : prix payé contre le prix maximal du jour ; surplus, et à qui le signaler (KAS). */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { DateField, Frame, ResultPanel, T, zl, litr, gr, opcje, useStan, NAZWY, dzien, nr, type L, type Paliwo } from './kit';
import type { Ost } from './DzisCalc';
import type { Wiersz } from '../../lib/tool-props';
import { znajdz } from './DataCalc';
import { kontrola } from '../../lib/engine/koszty';

interface Props { lang: L; wiersze: Wiersz[]; pierwszy: string; ost: Ost; kara: number; methodHref?: string }
const KOL: Record<Paliwo, 2 | 3 | 4> = { pb95: 2, pb98: 3, on: 4 };

export default function KontrolaCalc({ lang, wiersze, pierwszy, ost, kara, methodHref }: Props) {
  const [v, set] = useStan({ d: ost.od, p: 'pb95', c: ost.ceny.pb95, l: 40 });
  const d = String(v.d);
  const p = (['pb95', 'pb98', 'on'].includes(String(v.p)) ? v.p : 'pb95') as Paliwo;
  const c = v.c as number, l = v.l as number;
  const w = znajdz(wiersze, d, ost.doDnia);
  const form = (
    <>
      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <DateField id="ko-d" label={T(lang, 'Data z paragonu', 'Date on the receipt')} value={d} onChange={set('d')} min={pierwszy} max="2026-12-31" lang={lang} help={T(lang, 'Dzień.miesiąc.rok, np. 14.11.2026', 'Day/month/year, e.g. 14/11/2026')} />
        <SelectField id="ko-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={set('p')} options={opcje(lang, ['pb95', 'pb98', 'on'])} />
        <NumberField id="ko-c" label={T(lang, 'Cena za litr z paragonu', 'Price per litre on the receipt')} value={c} onChange={set('c')} unit="zł/l" min={1} max={20} decimals={2} lang={lang} />
        <NumberField id="ko-l" label={T(lang, 'Litry', 'Litres')} value={l} onChange={set('l')} unit="l" min={0.1} max={2000} decimals={2} lang={lang} />
      </div>
    </>
  );
  if (!w) return <Frame form={form} result={<ResultPanel lang={lang} head={dzien(d, lang, true, true)} value={T(lang, 'brak limitu', 'no cap')}
    sub={T(lang, 'Tego dnia cena maksymalna nie obowiązywała albo nie jest jeszcze ogłoszona.', 'No maximum price applied that day, or it has not been announced yet.')} rows={[]} methodHref={methodHref} copyText={`${d}: -`} />} />;
  const max = w[KOL[p]];
  const k = kontrola(c, max, l);
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `${NAZWY.pl[p]}, ${dzien(d, lang, true, true)}`, `${NAZWY.en[p]}, ${dzien(d, lang, true, true)}`)}
      value={k.ponad ? T(lang, 'powyżej limitu', 'above the cap') : T(lang, 'w limicie', 'within the cap')}
      sub={T(lang, `Cena maksymalna ${litr(max, lang)} · zapłacono ${litr(c, lang)} (${gr(c - max, lang)})`, `Maximum price ${litr(max, lang)} · paid ${litr(c, lang)} (${gr(c - max, lang)})`)}
      alert={k.ponad ? T(lang, 'Stacja nie może sprzedawać drożej niż cena maksymalna. Zachowaj paragon i zgłoś sprawę do Krajowej Administracji Skarbowej (KAS).', 'A station may not sell above the maximum price. Keep the receipt and report it to the National Revenue Administration (KAS).') : undefined}
      rows={[
        { label: T(lang, `Nadpłata na ${nr(l, lang, 2)} l`, `Overpaid on ${nr(l, lang, 2)} l`), value: zl(k.naLitry, lang), strong: true },
        { label: T(lang, 'Maksymalna kara dla stacji', 'Maximum penalty for the station'), value: zl(kara, lang, 0), note: true },
      ]}
      hyp={T(lang, 'Sprzedaż po cenie wyższej niż maksymalna grozi karą pieniężną do 1 000 000 zł (art. 63 ust. 18 ustawy o zapasach); kontrolę prowadzi KAS. Narzędzie porównuje cenę z paragonu z ogłoszeniem obowiązującym tego dnia; nie zastępuje porady prawnej.', 'Selling above the maximum price carries a fine of up to PLN 1,000,000 (Article 63(18) of the Stocks Act); KAS carries out the checks. The tool compares the receipt price with the notice in force that day; it is not legal advice.')}
      methodHref={methodHref} copyText={`${d} ${NAZWY[lang][p]}: ${litr(c, lang)} / max ${litr(max, lang)}`}>
      <p className="mt-3 text-xs text-navy-600">{T(lang, 'Źródło ceny: ', 'Price source: ')}<a className="underline" href={w[7]} target="_blank" rel="nofollow noopener noreferrer">{w[5] ? `Monitor Polski 2026 ${T(lang, 'poz.', 'item')} ${w[5]}` : 'gov.pl'}</a></p>
    </ResultPanel>} />;
}
