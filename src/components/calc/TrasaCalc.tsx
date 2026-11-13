/** Coût d'un trajet : distance, consommation, prix, partage entre passagers. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { Frame, ResultPanel, T, zl, litr, opcje, useStan, NAZWY, nr, type L, type Paliwo } from './kit';
import { trasa } from '../../lib/engine/koszty';

type PL = Paliwo | 'lpg';
interface Props { lang: L; ceny: Record<PL, number>; km: number; spalanie: Record<PL, number>; methodHref?: string }

export default function TrasaCalc({ lang, ceny, km: k0, spalanie, methodHref }: Props) {
  const [v, set] = useStan({ p: 'pb95', km: k0, s: spalanie.pb95, c: ceny.pb95, o: 1, w: 'n' });
  const p = (['pb95', 'pb98', 'on', 'lpg'].includes(v.p as string) ? v.p : 'pb95') as PL;
  const km = v.km as number, s = v.s as number, c = v.c as number, o = v.o as number, wz = v.w === 't';
  const r = trasa(km, s, c, o, wz);
  const form = (
    <>
      <SelectField id="tr-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={(x) => { set('p')(x); set('s')(spalanie[x as PL]); set('c')(ceny[x as PL]); }} options={opcje(lang, ['pb95', 'pb98', 'on', 'lpg'])} />
      <div className="grid gap-x-4 sm:grid-cols-2">
        <NumberField id="tr-km" label={T(lang, 'Długość trasy', 'Trip distance')} value={km} onChange={set('km')} unit="km" min={1} max={20000} lang={lang} />
        <NumberField id="tr-s" label={T(lang, 'Spalanie', 'Consumption')} value={s} onChange={set('s')} unit="l/100 km" min={1} max={40} decimals={1} lang={lang} />
        <NumberField id="tr-c" label={T(lang, 'Cena za litr', 'Price per litre')} value={c} onChange={set('c')} unit="zł/l" min={0.5} max={20} decimals={2} lang={lang} />
        <NumberField id="tr-o" label={T(lang, 'Liczba osób do podziału', 'People sharing the cost')} value={o} onChange={set('o')} min={1} max={9} lang={lang} />
      </div>
      <Toggle id="tr-w" label={T(lang, 'Przejazd w obie strony', 'Return journey (there and back)')} value={wz ? 't' : 'n'} onChange={set('w')} options={[{ value: 'n', label: T(lang, 'Nie', 'No') }, { value: 't', label: T(lang, 'Tak', 'Yes') }]} />
    </>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `Paliwo na ${nr(r.dystans, lang)} km`, `Fuel for ${nr(r.dystans, lang)} km`)} value={zl(r.koszt, lang)}
      sub={o > 1 ? T(lang, `${zl(r.naOsobe, lang)} na osobę (${nr(o, lang)} os.)`, `${zl(r.naOsobe, lang)} per person (${nr(o, lang)} people)`) : T(lang, `${nr(r.litry, lang, 1)} l paliwa`, `${nr(r.litry, lang, 1)} l of fuel`)}
      rows={[
        { label: T(lang, 'Litry', 'Litres'), value: `${nr(r.litry, lang, 1)} l` },
        { label: T(lang, 'Koszt 100 km', 'Cost per 100 km'), value: zl(s * c, lang), strong: true },
        { label: T(lang, 'Cena przyjęta', 'Price used'), value: `${litr(c, lang)} (${NAZWY[lang][p]})`, note: true },
      ]}
      hyp={T(lang, 'Koszt = km × spalanie ÷ 100 × cena. Opłaty za autostradę i parkingi nie są wliczone.', 'Cost = km × consumption ÷ 100 × price. Motorway tolls and parking are not included.')}
      methodHref={methodHref} copyText={`${nr(r.dystans, lang)} km: ${zl(r.koszt, lang)}`} />} />;
}
