/** Ce que le pakiet CPN fait gagner : prix maximal actuel contre le même prix de gros sans TVA réduite ni accise réduite. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, zl, litr, gr, opcje, useStan, NAZWY, nr, type L, type Paliwo } from './kit';
import { cenaZ, type Stawki } from '../../lib/engine/podatki';
import type { Skl } from './Po2027Calc';

interface Props { lang: L; sklad: Record<Paliwo, Skl>; s2026bez: Record<Paliwo, Stawki>; km: number; spalanie: Record<Paliwo, number>; paliwo?: Paliwo; methodHref?: string }

export default function CpnCalc({ lang, sklad, s2026bez, km: k0, spalanie, paliwo = 'pb95', methodHref }: Props) {
  const [v, set] = useStan({ p: paliwo as string, km: k0, s: spalanie[paliwo] });
  const p = (['pb95', 'pb98', 'on'].includes(v.p as string) ? v.p : 'pb95') as Paliwo;
  const km = v.km as number, s = v.s as number;
  const k = sklad[p];
  const bez = Math.round(cenaZ(k.hurt, s2026bez[p]) * 100) / 100;
  const litry = (km * s) / 100;
  const roznica = bez - k.brutto;
  const form = (
    <>
      <SelectField id="cp-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={(x) => { set('p')(x); set('s')(spalanie[x as Paliwo]); }} options={opcje(lang, ['pb95', 'pb98', 'on'])} />
      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <NumberField id="cp-km" label={T(lang, 'Kilometry rocznie', 'Kilometres a year')} value={km} onChange={set('km')} unit="km" min={0} max={300000} lang={lang} />
        <NumberField id="cp-s" label={T(lang, 'Spalanie (litry na 100 km)', 'Consumption (litres per 100 km)')} value={s} onChange={set('s')} unit="l/100 km" min={1} max={40} decimals={1} lang={lang} />
      </div>
    </>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `${NAZWY.pl[p]}: ile daje CPN przy Twoim przebiegu`, `${NAZWY.en[p]}: what the CPN saves at your mileage`)} value={T(lang, `${zl(roznica * litry / 12, lang, 0)} / mies.`, `${zl(roznica * litry / 12, lang, 0)} a month`)}
      sub={T(lang, `oszczędność ${nr(Math.round(roznica * 100), lang)} gr na każdym litrze · ${zl(roznica * litry, lang, 0)} na rok`, `a saving of ${nr(Math.round(roznica * 100), lang)} gr on every litre · ${zl(roznica * litry, lang, 0)} a year`)}
      rows={[
        { label: T(lang, 'Cena maksymalna z CPN', 'Maximum price with the CPN'), value: litr(k.brutto, lang), strong: true },
        { label: T(lang, 'Ta sama hurtowa bez CPN (VAT 23 %, pełna akcyza)', 'Same wholesale without the CPN (23% VAT, full excise)'), value: litr(bez, lang) },
        { label: T(lang, 'Litry rocznie', 'Litres a year'), value: `${nr(litry, lang)} l`, note: true },
      ]}
      hyp={T(lang, 'Porównanie przy tej samej cenie hurtowej i tej samej marży 0,30 zł/l: zmieniają się tylko VAT (8 % zamiast 23 %) i akcyza (obniżona zamiast ustawowej). Opłata paliwowa 2026 bez zmian.', 'Comparison at the same wholesale price and the same PLN 0.30/l margin: only VAT (8% instead of 23%) and excise (reduced instead of statutory) change. The 2026 fuel levy is unchanged.')}
      methodHref={methodHref} copyText={`CPN: ${zl(roznica * litry, lang, 0)}`} />} />;
}
