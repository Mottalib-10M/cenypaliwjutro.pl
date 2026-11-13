/** Prévision : fourchettes à 1 et 5 annonces, tendance rétro-testée (publiée seulement si elle bat « pas de changement »). */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Frame, ResultPanel, T, zl, litr, gr, dzien, opcje, useStan, NAZWY, nr, type L, type Paliwo } from './kit';
import type { Ost } from './DzisCalc';

type W = { dol: number; gora: number; n: number; bezZmian: number };
type Pr = { zmiana: number; cena: number; pub: boolean; mae: number; mae0: number; n: number; k: number; alfa: number };
interface Props { lang: L; ost: Ost; w1: Record<Paliwo, W>; w5: Record<Paliwo, W>; prog: Record<Paliwo, Pr>; litry: number; paliwo?: Paliwo; methodHref?: string }

export default function PrognozaCalc({ lang, ost, w1, w5, prog, litry: l0, paliwo = 'pb95', methodHref }: Props) {
  const [v, set] = useStan({ p: paliwo as string, h: 5, l: l0 });
  const p = (['pb95', 'pb98', 'on'].includes(v.p as string) ? v.p : 'pb95') as Paliwo;
  const h = Number(v.h) === 1 ? 1 : 5;
  const litry = v.l as number;
  const c = ost.ceny[p], w = h === 1 ? w1[p] : w5[p], f = prog[p];
  const lo = c + w.dol, hi = c + w.gora;
  const form = (
    <>
      <SelectField id="pr-p" label={T(lang, 'Paliwo', 'Fuel')} value={p} onChange={set('p')} options={opcje(lang, ['pb95', 'pb98', 'on'])} />
      <SelectField id="pr-h" label={T(lang, 'Horyzont', 'Horizon')} value={String(h)} onChange={(x) => set('h')(Number(x))} options={[{ value: '1', label: T(lang, 'Następne obwieszczenie', 'Next notice') }, { value: '5', label: T(lang, 'Za 5 obwieszczeń (ok. tydzień)', 'Five notices ahead (about a week)') }]} />
      <NumberField id="pr-l" label={T(lang, 'Litry w miesiącu', 'Litres a month')} value={litry} onChange={set('l')} unit="l" min={1} max={100000} lang={lang} help={T(lang, 'Do policzenia, ile znaczy zmiana dla budżetu', 'To see what a change means for your budget')} />
    </>
  );
  return <Frame form={form} result={
    <ResultPanel lang={lang} head={T(lang, `${NAZWY.pl[p]}: ${h === 1 ? 'następna cena' : 'cena za ok. tydzień'}`, `${NAZWY.en[p]}: ${h === 1 ? 'next price' : 'price in about a week'}`)} value={`${litr(lo, lang)} – ${litr(hi, lang)}`}
      sub={T(lang, `8 na 10 przypadków od kwietnia 2026 r., punkt wyjścia ${litr(c, lang)} (${dzien(ost.od, lang, false)})`, `8 cases out of 10 since April 2026, starting from ${litr(c, lang)} (${dzien(ost.od, lang, false)})`)}
      rows={[
        { label: T(lang, `${nr(litry, lang)} l w miesiącu: koszt w widełkach`, `${nr(litry, lang)} l a month: cost within the range`), value: `${zl(litry * lo, lang, 0)} – ${zl(litry * hi, lang, 0)}`, strong: true },
        f.pub
          ? { label: T(lang, 'Kierunek z trendu (następne obwieszczenie)', 'Trend direction (next notice)'), value: gr(f.zmiana, lang) }
          : { label: T(lang, 'Trend', 'Trend'), value: T(lang, 'niepublikowany: nie bije „bez zmian”', 'not published: does not beat “no change”') },
        { label: T(lang, 'Średni błąd trendu', 'Average trend error'), value: `${nr(f.mae * 100, lang, 1)} gr/l`, note: true },
        { label: T(lang, 'Średni błąd założenia „bez zmian”', 'Average error of “no change”'), value: `${nr(f.mae0 * 100, lang, 1)} gr/l`, note: true },
      ]}
      hyp={T(lang, `Widełki: kwantyle 10 % i 90 % zmian między obwieszczeniami w tym samym okresie CPN. Trend: średnia z ${f.k} ostatnich zmian × ${nr(f.alfa, lang, 1)}, sprawdzony na ${nr(f.n, lang)} wcześniejszych obwieszczeniach bez znajomości wyniku. Nie używamy cen hurtowych koncernów.`, `Range: the 10% and 90% quantiles of changes between notices within the same CPN period. Trend: average of the last ${f.k} changes × ${nr(f.alfa, lang, 1)}, tested on ${nr(f.n, lang)} past notices without knowing the outcome. We do not use refiners’ wholesale prices.`)}
      methodHref={methodHref} copyText={`${NAZWY[lang][p]}: ${litr(lo, lang)} – ${litr(hi, lang)}`} />} />;
}
