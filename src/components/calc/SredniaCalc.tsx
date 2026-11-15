/** Moyenne nationale réelle (Weekly Oil Bulletin) contre le prix maximal en vigueur la même semaine. */
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, litr, gr, useStan, NAZWY, dzien, type L } from './kit';

type W = { d: string; pb95: number; on: number; lpg: number; max95: number | null; maxOn: number | null };
interface Props { lang: L; tyg: W[]; methodHref?: string }

export default function SredniaCalc({ lang, tyg, methodHref }: Props) {
  const ost = tyg[tyg.length - 1];
  const [v, set] = useStan({ t: ost.d, p: 'pb95' });
  const p = v.p === 'on' ? 'on' : 'pb95';
  const w = tyg.find((x) => x.d === v.t) ?? ost;
  const sr = w[p], mx = p === 'on' ? w.maxOn : w.max95;
  const zMax = tyg.filter((x) => (p === 'on' ? x.maxOn : x.max95) != null);
  const ponizej = zMax.length ? zMax.reduce((s, x) => s + ((p === 'on' ? x.maxOn! : x.max95!) - x[p]), 0) / zMax.length : 0;
  const form = (
    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
      <SelectField id="sr-t" label={T(lang, 'Tydzień (poniedziałek)', 'Week (Monday)')} value={w.d} onChange={set('t')} options={[...tyg].reverse().map((x) => ({ value: x.d, label: dzien(x.d, lang, false, true) }))} />
      <SelectField id="sr-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={set('p')} options={[{ value: 'pb95', label: NAZWY[lang].pb95 }, { value: 'on', label: NAZWY[lang].on }]} />
    </div>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `${NAZWY.pl[p]}: średnia na stacjach, tydzień od ${dzien(w.d, lang, false, true)}`, `${NAZWY.en[p]}: average at stations, week of ${dzien(w.d, lang, false, true)}`)} value={litr(sr, lang)}
      sub={mx != null ? T(lang, `Cena maksymalna w poniedziałek: ${litr(mx, lang)} (${gr(sr - mx, lang)})`, `Maximum price on the Monday: ${litr(mx, lang)} (${gr(sr - mx, lang)})`) : T(lang, 'Tego dnia nie było ceny maksymalnej', 'No maximum price applied that day')}
      rows={[
        { label: T(lang, 'LPG, średnia tygodnia', 'LPG, weekly average'), value: litr(w.lpg, lang) },
        { label: T(lang, `Średnio poniżej limitu (z ${zMax.length} tygodni)`, `Average gap under the cap (over ${zMax.length} weeks)`), value: gr(-ponizej, lang), strong: true },
      ]}
      hyp={T(lang, 'Średnia krajowa z tygodniowego biuletynu cen paliw Komisji Europejskiej (dane przekazane przez Polskę), przeliczona z euro po kursie podanym w biuletynie. Porównanie z ceną maksymalną obowiązującą w poniedziałek danego tygodnia.', 'National average from the European Commission Weekly Oil Bulletin (data reported by Poland, CC BY 4.0), converted from euros at the rate given in the bulletin. Compared with the maximum price in force on that week\'s Monday.')}
      methodHref={methodHref} copyText={`${w.d} ${NAZWY[lang][p]}: ${litr(sr, lang)}`} />} />;
}
