/** Benzyna 98 zamiast 95 : surcoût par litre, par plein et par an aux prix maximaux. */
import NumberField from '../ui/NumberField';
import { Frame, ResultPanel, T, zl, litr, gr, useStan, nr, dzien, type L, type Paliwo } from './kit';
import { doplata } from '../../lib/engine/koszty';

interface Props { lang: L; ceny: Record<Paliwo, number>; km: number; spalanie: number; od: string; methodHref?: string }

export default function RoznicaCalc({ lang, ceny, km: k0, spalanie, od, methodHref }: Props) {
  const [v, set] = useStan({ km: k0, s: spalanie, a: ceny.pb95, b: ceny.pb98 });
  const km = v.km as number, s = v.s as number, a = v.a as number, b = v.b as number;
  const r = doplata(km, s, a, b);
  const form = (
    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
      <NumberField id="ro-km" label={T(lang, 'Kilometry rocznie', 'Kilometres a year')} value={km} onChange={set('km')} unit="km" min={0} max={300000} lang={lang} />
      <NumberField id="ro-s" label={T(lang, 'Spalanie', 'Consumption')} value={s} onChange={set('s')} unit="l/100 km" min={1} max={40} decimals={1} lang={lang} />
      <NumberField id="ro-a" label={T(lang, 'Cena benzyny 95', 'Petrol 95 price')} value={a} onChange={set('a')} unit="zł/l" min={0.5} max={20} decimals={2} lang={lang} help={T(lang, `Cena maksymalna od ${dzien(od, lang, false)}`, `Maximum price from ${dzien(od, lang, false)}`)} />
      <NumberField id="ro-b" label={T(lang, 'Cena benzyny 98', 'Petrol 98 price')} value={b} onChange={set('b')} unit="zł/l" min={0.5} max={20} decimals={2} lang={lang} help={T(lang, `Cena maksymalna od ${dzien(od, lang, false)}`, `Maximum price from ${dzien(od, lang, false)}`)} />
    </div>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, 'Dopłata za 98 zamiast 95, rocznie', 'Extra cost of 98 instead of 95, per year')} value={zl(r.roznica, lang, 0)}
      sub={T(lang, `${gr(r.naLitr, lang)} na każdym z ${nr(r.litry, lang)} litrów`, `${gr(r.naLitr, lang)} on each of ${nr(r.litry, lang)} litres`)}
      rows={[
        { label: T(lang, 'Bak 50 l benzyny 98', '50 l of petrol 98'), value: zl(50 * b, lang), strong: true },
        { label: T(lang, 'Bak 50 l benzyny 95', '50 l of petrol 95'), value: zl(50 * a, lang) },
        { label: T(lang, 'Różnica na jednym baku', 'Difference on one tank'), value: zl(50 * (b - a), lang) },
        { label: T(lang, 'Ceny przyjęte', 'Prices used'), value: `${litr(a, lang)} / ${litr(b, lang)}`, note: true },
      ]}
      hyp={T(lang, 'Ta sama ilość litrów obu paliw: nie zakładamy, że 98 zmniejsza spalanie. Jeśli producent auta wymaga 98, liczy się jego instrukcja, nie ten wynik.', 'The same number of litres of both fuels: we do not assume 98 lowers consumption. If the car maker requires 98, follow the handbook, not this result.')}
      methodHref={methodHref} copyText={`98 vs 95: ${zl(r.roznica, lang, 0)}`} />} />;
}
