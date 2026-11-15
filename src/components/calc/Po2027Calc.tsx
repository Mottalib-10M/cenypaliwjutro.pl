/** Scénario après la fin du CPN (1er janvier 2027) : même prix de gros, TVA 23 %, accise pleine, opłata 2027. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, zl, litr, gr, opcje, useStan, NAZWY, nr, dzien, pct, type L, type Paliwo } from './kit';
import { cenaZ, type Stawki } from '../../lib/engine/podatki';

export type Skl = { brutto: number; netto: number; hurt: number; akcyza: number; oplata: number; marza: number; vat: number };
interface Props { lang: L; sklad: Record<Paliwo, Skl>; cpn: Record<Paliwo, Stawki>; s2027: Record<Paliwo, Stawki>; poz: number | null; ogl: string; litry?: number; paliwo?: Paliwo; methodHref?: string }

export default function Po2027Calc({ lang, sklad, s2027, ogl, litry: l0 = 80, paliwo = 'pb95', methodHref }: Props) {
  const [v, set] = useStan({ p: paliwo as string, h: sklad[paliwo].hurt, m: s2027[paliwo].marza, l: l0 });
  const p = (['pb95', 'pb98', 'on'].includes(v.p as string) ? v.p : 'pb95') as Paliwo;
  const h = v.h as number, m = v.m as number, l = v.l as number;
  const s = s2027[p];
  const cena = Math.round(cenaZ(h, { ...s, marza: m }) * 100) / 100;
  const teraz = sklad[p].brutto;
  const form = (
    <>
      <SelectField id="po-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={(x) => { set('p')(x); set('h')(sklad[x as Paliwo].hurt); }} options={opcje(lang, ['pb95', 'pb98', 'on'])} />
      <NumberField id="po-l" label={T(lang, 'Ile litrów tankujesz w miesiącu', 'Litres you buy a month')} value={l} onChange={set('l')} unit="l" min={1} max={100000} lang={lang} help={T(lang, `Np. ${nr(l0, lang)} l: 15 000 km rocznie przy spalaniu 6,5 litra na 100 km`, `E.g. ${nr(l0, lang)} l: 15,000 km a year at 6.5 litres per 100 km`)} />
      <details className="rounded-lg border border-navy-200 px-3 py-2">
        <summary className="cursor-pointer text-sm font-medium text-navy-800">{T(lang, 'Zaawansowane: cena hurtowa i marża (nie musisz zmieniać)', 'Advanced: wholesale price and margin (no need to change)')}</summary>
        <div className="mt-3 grid gap-x-4 gap-y-5 sm:grid-cols-2">
          <NumberField id="po-h" label={T(lang, 'Cena hurtowa paliwa (przed podatkami)', 'Wholesale fuel price (before taxes)')} value={h} onChange={set('h')} unit="zł/l" min={0.5} max={15} decimals={2} lang={lang} help={T(lang, `Wyliczona z ogłoszenia z ${dzien(ogl, lang, false)}; zostaw, jeśli nie wiesz`, `Worked out from the notice of ${dzien(ogl, lang, false)}; leave it if unsure`)} />
          <NumberField id="po-m" label={T(lang, 'Koszty i marża stacji', 'Station costs and margin')} value={m} onChange={set('m')} unit="zł/l" min={0} max={3} decimals={2} lang={lang} help={T(lang, 'Ustawa przyjmuje 0,30 zł/l; bez limitu stacja ustala ją sama', 'The law uses PLN 0.30/l; without a cap the station sets it')} />
        </div>
      </details>
    </>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `${NAZWY.pl[p]} od 1 stycznia 2027 r., jeśli CPN wygaśnie`, `${NAZWY.en[p]} from 1 January 2027 if the CPN lapses`)} value={litr(cena, lang)}
      sub={T(lang, `${gr(cena - teraz, lang)} wobec dzisiejszej ceny maksymalnej ${litr(teraz, lang)}`, `${gr(cena - teraz, lang)} against the latest maximum price of ${litr(teraz, lang)}`)}
      rows={[
        { label: T(lang, `${nr(l, lang)} l miesięcznie: więcej o`, `${nr(l, lang)} l a month: more by`), value: zl((cena - teraz) * l, lang, 0), strong: true },
        { label: T(lang, 'Akcyza (stawka ustawowa)', 'Excise (statutory rate)'), value: litr(s.akcyza, lang) },
        { label: T(lang, 'Opłata paliwowa 2027', '2027 fuel levy'), value: litr(s.oplata, lang) },
        { label: T(lang, 'VAT', 'VAT'), value: `${pct(s.vat, lang, 0)}: ${litr(cena - cena / (1 + s.vat), lang)}` },
        { label: T(lang, 'Bak 50 l', '50 l tank'), value: `${zl(50 * teraz, lang)} → ${zl(50 * cena, lang)}`, note: true },
      ]}
      hyp={T(lang, `Scenariusz, nie prognoza: ta sama cena hurtowa co w ogłoszeniu z ${dzien(ogl, lang, false, true)}, akcyza z art. 89 ust. 1 ustawy o podatku akcyzowym, opłata paliwowa na 2027 r. i VAT 23 %. Bez ceny maksymalnej marża stacji jest wolna: wpisz inną, jeśli chcesz.`, `A scenario, not a forecast: the same wholesale price as in the notice of ${dzien(ogl, lang, false, true)}, excise from Article 89(1) of the Excise Act, the 2027 fuel levy and 23% VAT. Without a cap the station margin is free: type another one if you like.`)}
      methodHref={methodHref} copyText={`${NAZWY[lang][p]} 2027: ${litr(cena, lang)}`} />} />;
}
