/** Composition d'un litre au prix maximal : prix de gros, accise, opłata paliwowa, 0,30 zł, TVA. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, zl, litr, opcje, useStan, NAZWY, nr, pct, dzien, type L, type Paliwo } from './kit';
import type { Skl } from './Po2027Calc';

interface Props { lang: L; sklad: Record<Paliwo, Skl>; poz: number | null; ogl: string; paliwo?: Paliwo; methodHref?: string }

export default function SkladCalc({ lang, sklad, poz, ogl, paliwo = 'pb95', methodHref }: Props) {
  const [v, set] = useStan({ p: paliwo as string, l: 1000 });
  const p = (['pb95', 'pb98', 'on'].includes(v.p as string) ? v.p : 'pb95') as Paliwo;
  const l = v.l as number;
  const k = sklad[p];
  const podatki = k.akcyza + k.oplata + k.vat;
  const form = (
    <>
      <SelectField id="sk-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={set('p')} options={opcje(lang, ['pb95', 'pb98', 'on'])} />
      <NumberField id="sk-l" label={T(lang, 'Litry w roku', 'Litres a year')} value={l} onChange={set('l')} unit="l" min={1} max={1000000} lang={lang} help={T(lang, 'Ile podatków płacisz w roku', 'How much tax you pay in a year')} />
    </>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `${NAZWY.pl[p]}: podatki w litrze`, `${NAZWY.en[p]}: tax in a litre`)} value={litr(podatki, lang)}
      sub={T(lang, `${pct(podatki / k.brutto, lang)} ceny ${litr(k.brutto, lang)} · ${zl(podatki * l, lang, 0)} na ${nr(l, lang)} l`, `${pct(podatki / k.brutto, lang)} of ${litr(k.brutto, lang)} · ${zl(podatki * l, lang, 0)} on ${nr(l, lang)} l`)}
      bar={{ total: k.brutto, aria: T(lang, 'Skład ceny litra', 'Breakdown of a litre'), segments: [
        { label: T(lang, 'Paliwo w hurcie', 'Wholesale fuel'), value: k.hurt, color: '#64748b' },
        { label: T(lang, 'Koszty stacji (0,30 zł)', 'Station costs (PLN 0.30)'), value: k.marza, color: '#94a3b8' },
        { label: T(lang, 'Akcyza', 'Excise'), value: k.akcyza, color: '#B3122E' },
        { label: T(lang, 'Opłata paliwowa', 'Fuel levy'), value: k.oplata, color: '#e11d48' },
        { label: 'VAT', value: k.vat, color: '#7f1d1d' },
      ] }}
      rows={[
        { label: T(lang, 'Paliwo w hurcie (bez akcyzy i opłaty)', 'Wholesale fuel (before excise and levy)'), value: litr(k.hurt, lang) },
        { label: T(lang, 'Koszty operacyjne z ustawy', 'Operating costs set by law'), value: litr(k.marza, lang) },
        { label: T(lang, 'Akcyza (obniżona)', 'Excise (reduced)'), value: litr(k.akcyza, lang) },
        { label: T(lang, 'Opłata paliwowa 2026', '2026 fuel levy'), value: litr(k.oplata, lang) },
        { label: T(lang, 'VAT 8 %', 'VAT 8%'), value: litr(k.vat, lang), strong: true },
      ]}
      hyp={T(lang, `${poz ? `Cena netto ${litr(k.netto, lang)} i cena z VAT z obwieszczenia w Monitorze Polskim 2026, poz. ${poz}, z ${dzien(ogl, lang, false, true)}.` : `Cena z VAT z komunikatu Ministerstwa Energii z ${dzien(ogl, lang, false, true)}; cena netto ${litr(k.netto, lang)} = cena z VAT ÷ 1,08.`} Cena hurtowa = netto − 0,30 zł − akcyza − opłata paliwowa (art. 34a ust. 2 ustawy o zapasach). Opłata emisyjna i zapasy obowiązkowe siedzą w cenie hurtowej.`, `${poz ? `Net price ${litr(k.netto, lang)} and VAT-inclusive price from Monitor Polski 2026, item ${poz}, of ${dzien(ogl, lang, false, true)}.` : `VAT-inclusive price from the Ministry of Energy announcement of ${dzien(ogl, lang, false, true)}; net price ${litr(k.netto, lang)} = VAT-inclusive price ÷ 1.08.`} Wholesale = net − PLN 0.30 − excise − fuel levy (Article 34a(2) of the Stocks Act). The emission fee and compulsory stocks sit inside the wholesale price.`)}
      methodHref={methodHref} copyText={`${NAZWY[lang][p]}: ${litr(podatki, lang)}`} />} />;
}
