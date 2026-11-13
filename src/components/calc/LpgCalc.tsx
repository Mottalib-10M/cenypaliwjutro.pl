/** Instalacja LPG : économie annuelle et retour sur investissement. */
import NumberField from '../ui/NumberField';
import { Frame, ResultPanel, T, zl, useStan, nr, dzien, type L } from './kit';
import { lpg as liczLpg } from '../../lib/engine/koszty';

interface Props { lang: L; pb95: number; lpg: number; tydzien: string; km: number; spalaniePb: number; spalanieLpg: number; methodHref?: string }

export default function LpgCalc({ lang, pb95, lpg, tydzien, km: k0, spalaniePb, spalanieLpg, methodHref }: Props) {
  const [v, set] = useStan({ km: k0, sp: spalaniePb, sl: spalanieLpg, cp: pb95, cl: lpg, k: 3500 });
  const km = v.km as number, sp = v.sp as number, sl = v.sl as number, cp = v.cp as number, cl = v.cl as number, k = v.k as number;
  const r = liczLpg(km, sp, cp, sl, cl, k);
  const opl = r.oszczednosc > 0;
  const form = (
    <div className="grid gap-x-4 sm:grid-cols-2">
      <NumberField id="lp-km" label={T(lang, 'Kilometry rocznie', 'Kilometres a year')} value={km} onChange={set('km')} unit="km" min={0} max={300000} lang={lang} />
      <NumberField id="lp-k" label={T(lang, 'Koszt instalacji', 'Installation cost')} value={k} onChange={set('k')} unit="zł" min={0} max={50000} lang={lang} help={T(lang, 'Wpisz cenę z oferty warsztatu', 'Use the workshop’s quote')} />
      <NumberField id="lp-sp" label={T(lang, 'Spalanie benzyny', 'Petrol consumption')} value={sp} onChange={set('sp')} unit="l/100 km" min={1} max={40} decimals={1} lang={lang} />
      <NumberField id="lp-sl" label={T(lang, 'Spalanie LPG', 'LPG consumption')} value={sl} onChange={set('sl')} unit="l/100 km" min={1} max={50} decimals={1} lang={lang} help={T(lang, 'Zwykle o 15–25 % więcej niż benzyny', 'Usually 15 to 25% more than petrol')} />
      <NumberField id="lp-cp" label={T(lang, 'Cena benzyny 95', 'Petrol 95 price')} value={cp} onChange={set('cp')} unit="zł/l" min={0.5} max={20} decimals={2} lang={lang} />
      <NumberField id="lp-cl" label={T(lang, 'Cena LPG', 'LPG price')} value={cl} onChange={set('cl')} unit="zł/l" min={0.5} max={20} decimals={2} lang={lang} help={T(lang, `Średnia z tygodnia od ${dzien(tydzien, lang, false)}`, `Average for the week of ${dzien(tydzien, lang, false)}`)} />
    </div>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, 'Oszczędność na LPG rocznie', 'Yearly saving with LPG')} value={zl(r.oszczednosc, lang, 0)}
      sub={opl ? T(lang, `instalacja zwraca się po ok. ${nr(Math.ceil(r.miesiace), lang)} mies. (${nr(Math.round(r.kmZwrotu / 1000) * 1000, lang)} km)`, `the installation pays for itself after about ${nr(Math.ceil(r.miesiace), lang)} months (${nr(Math.round(r.kmZwrotu / 1000) * 1000, lang)} km)`) : T(lang, 'przy tych cenach LPG się nie opłaca', 'at these prices LPG does not pay off')}
      rows={[
        { label: T(lang, 'Benzyna rocznie', 'Petrol per year'), value: zl(r.pb, lang, 0) },
        { label: T(lang, 'LPG rocznie', 'LPG per year'), value: zl(r.gaz, lang, 0), strong: true },
        { label: T(lang, 'Koszt 100 km: benzyna / LPG', 'Cost per 100 km: petrol / LPG'), value: `${zl(sp * cp, lang)} / ${zl(sl * cl, lang)}` },
      ]}
      hyp={T(lang, 'Liczymy tylko paliwo i cenę instalacji. Przegląd instalacji gazowej, rozruch na benzynie i serwis zwiększają koszt LPG; dopisz je do kosztu instalacji, jeśli je znasz.', 'Only fuel and the installation price are counted. The LPG system inspection, starting on petrol and servicing add to the LPG cost; add them to the installation cost if you know them.')}
      methodHref={methodHref} copyText={`LPG: ${zl(r.oszczednosc, lang, 0)}`} />} />;
}
