/** Demain : la dernière annonce et la fourchette observée de la suivante (8 annonces sur 10), coût du plein. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, zl, litr, dzien, opcje, useStan, useDzisiaj, Zrodlo, NAZWY, nr, type L, type Paliwo } from './kit';
import type { Ost } from './DzisCalc';

type W = { dol: number; gora: number; n: number; bezZmian: number };
interface Props { lang: L; ost: Ost; widelki: Record<Paliwo, W>; bak: number; paliwo?: Paliwo; methodHref?: string }

export default function JutroCalc({ lang, ost, widelki, bak, paliwo = 'pb95', methodHref }: Props) {
  const [v, set] = useStan({ p: paliwo as string, l: bak });
  const dzis = useDzisiaj();
  const p = (['pb95', 'pb98', 'on'].includes(v.p as string) ? v.p : 'pb95') as Paliwo;
  const litry = v.l as number;
  const c = ost.ceny[p], w = widelki[p];
  const lo = Math.round((c + w.dol) * 100) / 100, hi = Math.round((c + w.gora) * 100) / 100;
  const juzZnana = dzis !== null && dzis < ost.od;
  const form = (
    <>
      <SelectField id="ju-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={set('p')} options={opcje(lang, ['pb95', 'pb98', 'on'])} />
      <NumberField id="ju-l" label={T(lang, 'Ile litrów tankujesz', 'Litres you fill up')} value={litry} onChange={set('l')} unit="l" min={1} max={1000} lang={lang} />
    </>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `${NAZWY.pl[p]}: następna cena maksymalna`, `${NAZWY.en[p]}: next maximum price`)} value={`${litr(lo, lang)} – ${litr(hi, lang)}`}
      sub={T(lang, `widełki z ${nr(w.n, lang)} zmian od kwietnia 2026 r. (8 na 10 przypadków)`, `range from ${nr(w.n, lang)} changes since April 2026 (8 cases out of 10)`)}
      alert={juzZnana ? T(lang, `Cena obowiązująca od ${dzien(ost.od, lang, false)} jest już ogłoszona: ${litr(c, lang)}.`, `The price from ${dzien(ost.od, lang, false)} is already announced: ${litr(c, lang)}.`) : undefined}
      rows={[
        { label: T(lang, `Ostatnia ogłoszona (od ${dzien(ost.od, lang, false)})`, `Latest announced (from ${dzien(ost.od, lang, false)})`), value: litr(c, lang), strong: true },
        { label: T(lang, `Tankowanie ${nr(litry, lang)} l po ostatniej cenie`, `${nr(litry, lang)} l at the latest price`), value: zl(litry * c, lang) },
        { label: T(lang, `To samo w widełkach na kolejną cenę`, 'The same within the next-price range'), value: `${zl(litry * lo, lang)} – ${zl(litry * hi, lang)}` },
        { label: T(lang, 'Kolejna cena bez zmian w', 'Next price unchanged in'), value: T(lang, `${nr(w.bezZmian * 100, lang)} na 100 przypadków`, `${nr(w.bezZmian * 100, lang)} cases in 100`), note: true },
      ]}
      hyp={T(lang, 'Widełki to zakres, w którym mieściło się 8 na 10 zmian między kolejnymi obwieszczeniami w tym samym okresie CPN. To nie jest cena urzędowa: kolejną cenę minister ogłasza w Monitorze Polskim w dzień roboczy, zwykle po południu, i obowiązuje ona od następnego dnia.', 'The range covers 8 out of 10 changes between consecutive notices within the same CPN period. It is not an official price: the minister publishes the next price in Monitor Polski on a working day, usually in the afternoon, and it applies from the following day.')}
      methodHref={methodHref} copyText={`${NAZWY[lang][p]}: ${litr(lo, lang)} – ${litr(hi, lang)}`}>
      <Zrodlo lang={lang} poz={ost.poz} url={ost.url} ogl={ost.ogl} />
    </ResultPanel>} />;
}
