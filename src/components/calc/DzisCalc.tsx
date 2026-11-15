/** Accueil : prix maximal en vigueur (dernière annonce lue), variation, coût du plein ; LPG = moyenne hebdomadaire UE. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, zl, litr, gr, dzien, opcje, useStan, useDzisiaj, Zrodlo, NAZWY, type L, type Paliwo } from './kit';

export interface Ost { od: string; doDnia: string; ogl: string; poz: number | null; url: string; ceny: Record<Paliwo, number>; poprzednie: Record<Paliwo, number> }
interface Props { lang: L; ost: Ost; lpg: { cena: number; tydzien: string }; bak: number; paliwo?: Paliwo; methodHref?: string }

export default function DzisCalc({ lang, ost, lpg, bak, paliwo = 'pb95', methodHref }: Props) {
  const [v, set] = useStan({ p: paliwo as string, l: bak });
  const dzis = useDzisiaj();
  const p = (['pb95', 'pb98', 'on', 'lpg'].includes(v.p as string) ? v.p : 'pb95') as Paliwo | 'lpg';
  const litry = v.l as number;
  const cena = p === 'lpg' ? lpg.cena : ost.ceny[p];
  // Après le dernier jour couvert, on ne dit plus « obowiązuje » : la cena est donnée au passé, datée, et l'on dit
  // simplement que l'annonce suivante n'est pas encore lue (test naïf du 2026-11-14 : « obowiązuje » et
  // « obowiązywała » côte à côte).
  const nieaktualne = dzis !== null && dzis > ost.doDnia;
  const okres = ost.doDnia === ost.od ? dzien(ost.od, lang, true) : `${dzien(ost.od, lang, true)} – ${dzien(ost.doDnia, lang, true)}`;
  const form = (
    <>
      <SelectField id="dz-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={set('p')} options={opcje(lang, ['pb95', 'pb98', 'on', 'lpg'])} />
      <NumberField id="dz-l" label={T(lang, 'Ile litrów tankujesz', 'Litres you fill up')} value={litry} onChange={set('l')} unit="l" min={1} max={1000} lang={lang} help={T(lang, 'Np. pełny bak osobówki: 40–60 l', 'A car tank is often 40 to 60 l')} />
    </>
  );
  const rows = p === 'lpg'
    ? [{ label: T(lang, `Tankowanie ${litry} l`, `Filling ${litry} l`), value: zl(litry * cena, lang), strong: true },
       { label: T(lang, 'Rodzaj ceny', 'Kind of price'), value: T(lang, 'średnia z tygodnia; brak ceny maksymalnej', 'weekly average; no maximum price'), note: true }]
    : [{ label: T(lang, `Tankowanie ${litry} l, najwyżej`, `Filling ${litry} l, at most`), value: zl(litry * cena, lang), strong: true },
       { label: T(lang, 'Zmiana wobec poprzedniej ceny', 'Change on the previous price'), value: gr(cena - ost.poprzednie[p], lang) },
       { label: T(lang, `Ta sama ilość przy poprzedniej cenie`, 'Same fill at the previous price'), value: zl(litry * ost.poprzednie[p], lang), note: true },
       { label: nieaktualne ? T(lang, 'Obowiązywała', 'Applied') : T(lang, 'Obowiązuje', 'Applies'), value: okres, note: true }];
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={p === 'lpg' ? T(lang, `LPG: średnia cena w tygodniu od ${dzien(lpg.tydzien, lang, false)}`, `LPG: average price in the week of ${dzien(lpg.tydzien, lang, false)}`) : nieaktualne ? T(lang, `${NAZWY.pl[p]}: ostatnia odczytana cena maksymalna`, `${NAZWY.en[p]}: latest maximum price read`) : T(lang, `${NAZWY.pl[p]}: cena maksymalna`, `${NAZWY.en[p]}: maximum price`)}
      value={litr(cena, lang)}
      sub={p === 'lpg' ? T(lang, 'LPG nie ma ceny maksymalnej (średnia z biuletynu Komisji Europejskiej)', 'LPG has no price cap (EU Weekly Oil Bulletin)') : T(lang, 'z VAT, za litr; stacja może sprzedawać taniej', 'VAT included, per litre; a station may sell for less')}
      alert={nieaktualne && p !== 'lpg' ? <>{T(lang, `To ostatnia cena, którą odczytaliśmy (do ${dzien(ost.doDnia, lang, false, true)}). Nowszej jeszcze nie mamy; minister mógł już ogłosić cenę na dziś: `, `This is the latest price we have read (until ${dzien(ost.doDnia, lang, false, true)}). We do not have a newer one yet; the minister may already have announced today’s price: `)}<a className="underline" href="https://www.gov.pl/web/energia/wiadomosci" target="_blank" rel="nofollow noopener noreferrer">{T(lang, 'komunikaty na gov.pl', 'announcements on gov.pl')}</a>.</> : undefined}
      rows={rows}
      hyp={p === 'lpg' ? T(lang, 'Cena LPG to średnia krajowa z tygodniowego biuletynu Komisji Europejskiej, przeliczona po kursie z tego samego biuletynu.', 'The LPG price is the national average from the European Commission weekly bulletin, converted at the rate given in the same bulletin.') : T(lang, 'Cena maksymalna z VAT z obwieszczenia Ministra Energii. Koszt tankowania = litry × cena maksymalna: tyle zapłacisz najwyżej.', 'Maximum price including VAT from the Minister of Energy notice. Cost of the fill = litres × maximum price: the most you can be charged.')}
      methodHref={methodHref} copyText={`${NAZWY[lang][p]}: ${litr(cena, lang)}`}>
      {p !== 'lpg' && <Zrodlo lang={lang} poz={ost.poz} url={ost.url} ogl={ost.ogl} />}
    </ResultPanel>} />;
}
