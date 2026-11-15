/** Prix moyen d'un pays de l'UE (Weekly Oil Bulletin, CC BY 4.0) contre la Pologne, en zł au taux du bulletin. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, zl, litr, gr, useStan, NAZWY, dzien, nr, type L } from './kit';

type Kraj = { k: string; pl: string; en: string; pb95: number | null; on: number | null; lpg: number | null; pb95e: number | null; one: number | null };
interface Props { lang: L; tydzien: string; kurs: number; kraje: Kraj[]; bak: number; methodHref?: string }
type P = 'pb95' | 'on' | 'lpg';

export default function EuropaCalc({ lang, tydzien, kurs, kraje, bak, methodHref }: Props) {
  const [v, set] = useStan({ k: 'DE', p: 'pb95', l: bak });
  const p = (['pb95', 'on', 'lpg'].includes(String(v.p)) ? v.p : 'pb95') as P;
  const l = v.l as number;
  const pl = kraje.find((x) => x.k === 'PL')!;
  const lista = kraje.filter((x) => x.k !== 'PL' && x[p] != null).sort((a, b) => (lang === 'pl' ? a.pl : a.en).localeCompare(lang === 'pl' ? b.pl : b.en, lang));
  const kraj = lista.find((x) => x.k === v.k) ?? lista[0];
  const cK = kraj[p] as number, cP = pl[p] as number;
  const ranking = [...kraje].filter((x) => x[p] != null).sort((a, b) => (a[p] as number) - (b[p] as number));
  const miejsce = ranking.findIndex((x) => x.k === 'PL') + 1;
  const form = (
    <>
      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <SelectField id="eu-k" label={T(lang, 'Kraj', 'Country')} value={kraj.k} onChange={set('k')} options={lista.map((x) => ({ value: x.k, label: lang === 'pl' ? x.pl : x.en }))} />
        <SelectField id="eu-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={set('p')} options={(['pb95', 'on', 'lpg'] as P[]).map((x) => ({ value: x, label: NAZWY[lang][x] }))} />
      </div>
      <NumberField id="eu-l" label={T(lang, 'Ile litrów tankujesz', 'Litres you fill')} value={l} onChange={set('l')} unit="l" min={1} max={2000} lang={lang} />
    </>
  );
  const nazwa = lang === 'pl' ? kraj.pl : kraj.en;
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `${nazwa}: ${NAZWY.pl[p]}, średnia z ${dzien(tydzien, lang, false, true)}`, `${nazwa}: ${NAZWY.en[p]}, average of ${dzien(tydzien, lang, false, true)}`)} value={litr(cK, lang)}
      sub={T(lang, `${gr(cK - cP, lang)} wobec Polski (${litr(cP, lang)})`, `${gr(cK - cP, lang)} against Poland (${litr(cP, lang)})`)}
      rows={[
        { label: T(lang, `${nr(l, lang)} l w kraju: ${nazwa}`, `${nr(l, lang)} l in ${nazwa}`), value: zl(cK * l, lang) },
        { label: T(lang, `${nr(l, lang)} l w Polsce`, `${nr(l, lang)} l in Poland`), value: zl(cP * l, lang) },
        { label: T(lang, 'Różnica na tankowaniu', 'Difference on the fill'), value: zl((cK - cP) * l, lang), strong: true },
        { label: T(lang, `Polska w UE (od najtańszego)`, `Poland in the EU (cheapest first)`), value: `${miejsce} / ${ranking.length}`, note: true },
      ]}
      hyp={T(lang, `Średnie ceny detaliczne z podatkami z tygodniowego biuletynu cen paliw Komisji Europejskiej, przeliczone po kursie z biuletynu: 1 € = ${nr(kurs, lang, 3)} zł. To średnie krajowe z poniedziałku, nie ceny konkretnej stacji.`, `Average pump prices with taxes from the European Commission Weekly Oil Bulletin (CC BY 4.0 licence), converted at the bulletin's rate: €1 = PLN ${nr(kurs, lang, 3)}. These are Monday national averages, not the price at a given station.`)}
      methodHref={methodHref} copyText={`${nazwa} ${NAZWY[lang][p]}: ${litr(cK, lang)}`} />} />;
}
