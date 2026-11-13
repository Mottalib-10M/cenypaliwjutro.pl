/** Coût du plein et budget annuel : km × consommation × prix (prix maximal par défaut). */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, zl, litr, opcje, useStan, NAZWY, nr, dzien, type L, type Paliwo } from './kit';
import { rocznie } from '../../lib/engine/koszty';

type PL = Paliwo | 'lpg';
interface Props { lang: L; ceny: Record<PL, number>; spalanie: Record<PL, number>; km: number; bak: number; od: string; paliwo?: PL; methodHref?: string }

export default function KosztCalc({ lang, ceny, spalanie, km: k0, bak, od, paliwo = 'pb95', methodHref }: Props) {
  const [v, set] = useStan({ p: paliwo as string, km: k0, s: spalanie[paliwo], c: ceny[paliwo], l: bak });
  const p = (['pb95', 'pb98', 'on', 'lpg'].includes(v.p as string) ? v.p : 'pb95') as PL;
  const km = v.km as number, s = v.s as number, c = v.c as number, l = v.l as number;
  const r = rocznie(km, s, c);
  const form = (
    <>
      <SelectField id="ko-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={(x) => { set('p')(x); set('s')(spalanie[x as PL]); set('c')(ceny[x as PL]); }} options={opcje(lang, ['pb95', 'pb98', 'on', 'lpg'])} />
      <div className="grid gap-x-4 sm:grid-cols-2">
        <NumberField id="ko-km" label={T(lang, 'Kilometry rocznie', 'Kilometres a year')} value={km} onChange={set('km')} unit="km" min={0} max={300000} lang={lang} />
        <NumberField id="ko-s" label={T(lang, 'Spalanie', 'Consumption')} value={s} onChange={set('s')} unit="l/100 km" min={1} max={40} decimals={1} lang={lang} />
        <NumberField id="ko-c" label={T(lang, 'Cena za litr', 'Price per litre')} value={c} onChange={set('c')} unit="zł/l" min={0.5} max={20} decimals={2} lang={lang} help={p === 'lpg' ? T(lang, 'Domyślnie: średnia tygodniowa (UE)', 'Default: weekly average (EU)') : T(lang, `Domyślnie: cena maksymalna od ${dzien(od, lang, false)}`, `Default: maximum price from ${dzien(od, lang, false)}`)} />
        <NumberField id="ko-l" label={T(lang, 'Litry na jedno tankowanie', 'Litres per fill')} value={l} onChange={set('l')} unit="l" min={1} max={1000} lang={lang} />
      </div>
    </>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `${NAZWY.pl[p]}: paliwo na rok`, `${NAZWY.en[p]}: fuel for a year`)} value={zl(r.koszt, lang, 0)}
      sub={T(lang, `${zl(r.miesiac, lang, 0)} miesięcznie · ${nr(r.litry, lang)} litrów`, `${zl(r.miesiac, lang, 0)} a month · ${nr(r.litry, lang)} litres`)}
      rows={[
        { label: T(lang, `Jedno tankowanie ${nr(l, lang)} l`, `One ${nr(l, lang)}-litre fill`), value: zl(l * c, lang), strong: true },
        { label: T(lang, 'Koszt 100 km', 'Cost per 100 km'), value: zl(r.na100, lang) },
        { label: T(lang, 'Koszt 1 km', 'Cost per km'), value: zl(r.naKm, lang) },
        { label: T(lang, 'Każde 10 gr/l mniej to rocznie', 'Every 10 gr/l less saves a year'), value: zl(r.litry * 0.1, lang, 0) },
        { label: T(lang, 'Cena przyjęta', 'Price used'), value: litr(c, lang), note: true },
      ]}
      hyp={T(lang, 'Koszt roczny = km × spalanie ÷ 100 × cena. Spalanie domyślne to przykład: wpisz to z komputera pokładowego albo z rachunków.', 'Annual cost = km × consumption ÷ 100 × price. The default consumption is only an example: use your trip computer or your receipts.')}
      methodHref={methodHref} copyText={`${NAZWY[lang][p]}: ${zl(r.koszt, lang, 0)}`} />} />;
}
