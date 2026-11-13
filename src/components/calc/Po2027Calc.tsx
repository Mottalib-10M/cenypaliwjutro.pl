/** Scénario après la fin du CPN (1er janvier 2027) : même prix de gros, TVA 23 %, accise pleine, opłata 2027. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, zl, litr, gr, opcje, useStan, NAZWY, nr, dzien, pct, type L, type Paliwo } from './kit';
import { cenaZ, type Stawki } from '../../lib/engine/podatki';

export type Skl = { brutto: number; netto: number; hurt: number; akcyza: number; oplata: number; marza: number; vat: number };
interface Props { lang: L; sklad: Record<Paliwo, Skl>; cpn: Record<Paliwo, Stawki>; s2027: Record<Paliwo, Stawki>; poz: number | null; ogl: string; paliwo?: Paliwo; methodHref?: string }

export default function Po2027Calc({ lang, sklad, s2027, poz, ogl, paliwo = 'pb95', methodHref }: Props) {
  const [v, set] = useStan({ p: paliwo as string, h: sklad[paliwo].hurt, m: s2027[paliwo].marza, l: 150 });
  const p = (['pb95', 'pb98', 'on'].includes(v.p as string) ? v.p : 'pb95') as Paliwo;
  const h = v.h as number, m = v.m as number, l = v.l as number;
  const s = s2027[p];
  const cena = cenaZ(h, { ...s, marza: m });
  const teraz = sklad[p].brutto;
  const form = (
    <>
      <SelectField id="po-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={(x) => { set('p')(x); set('h')(sklad[x as Paliwo].hurt); }} options={opcje(lang, ['pb95', 'pb98', 'on'])} />
      <div className="grid gap-x-4 sm:grid-cols-2">
        <NumberField id="po-h" label={T(lang, 'Cena hurtowa bez akcyzy i opłaty', 'Wholesale price before excise and levy')} value={h} onChange={set('h')} unit="zł/l" min={0.5} max={15} decimals={2} lang={lang} help={T(lang, `Wyliczona z obwieszczenia z ${dzien(ogl, lang, false)}`, `Worked out from the notice of ${dzien(ogl, lang, false)}`)} />
        <NumberField id="po-m" label={T(lang, 'Marża stacji', 'Station margin')} value={m} onChange={set('m')} unit="zł/l" min={0} max={3} decimals={2} lang={lang} help={T(lang, 'Ustawa o CPN liczy 0,30 zł/l kosztów', 'The CPN law counts PLN 0.30/l of costs')} />
        <NumberField id="po-l" label={T(lang, 'Litry w miesiącu', 'Litres a month')} value={l} onChange={set('l')} unit="l" min={1} max={100000} lang={lang} />
      </div>
    </>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `${NAZWY.pl[p]} od 1 stycznia 2027 r., jeśli CPN wygaśnie`, `${NAZWY.en[p]} from 1 January 2027 if the CPN lapses`)} value={litr(cena, lang)}
      sub={T(lang, `${gr(cena - teraz, lang)} wobec ostatniej ceny maksymalnej ${litr(teraz, lang)}`, `${gr(cena - teraz, lang)} against the latest maximum price of ${litr(teraz, lang)}`)}
      rows={[
        { label: T(lang, `${nr(l, lang)} l miesięcznie: więcej o`, `${nr(l, lang)} l a month: more by`), value: zl((cena - teraz) * l, lang, 0), strong: true },
        { label: T(lang, 'Akcyza (stawka ustawowa)', 'Excise (statutory rate)'), value: litr(s.akcyza, lang) },
        { label: T(lang, 'Opłata paliwowa 2027', '2027 fuel levy'), value: litr(s.oplata, lang) },
        { label: T(lang, 'VAT', 'VAT'), value: `${pct(s.vat, lang, 0)}: ${litr(cena - cena / (1 + s.vat), lang)}` },
        { label: T(lang, 'Bak 50 l', '50 l tank'), value: `${zl(50 * teraz, lang)} → ${zl(50 * cena, lang)}`, note: true },
      ]}
      hyp={T(lang, `Scenariusz, nie prognoza: ta sama cena hurtowa co w obwieszczeniu ${poz ? `M.P. 2026 poz. ${poz}` : ''}, akcyza z art. 89 ust. 1 ustawy o podatku akcyzowym, opłata paliwowa na 2027 r. i VAT 23 %. Bez ceny maksymalnej marża stacji jest wolna: wpisz inną, jeśli chcesz.`, `A scenario, not a forecast: the same wholesale price as in the notice ${poz ? `M.P. 2026 item ${poz}` : ''}, excise from Article 89(1) of the Excise Act, the 2027 fuel levy and 23% VAT. Without a cap the station margin is free: type another one if you like.`)}
      methodHref={methodHref} copyText={`${NAZWY[lang][p]} 2027: ${litr(cena, lang)}`} />} />;
}
