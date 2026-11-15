/**
 * Ligne « Jutro » du premier écran (test naïf du 2026-11-14, 3e tour : le « jutro » du domaine arrivait après tout le
 * calculateur, et seulement pour la benzyna 95). Une ligne pour chaque carburant qui a une donnée sourcée :
 * - demain encore couvert par la dernière annonce : les prix de cette annonce (connus, officiels) ;
 * - demain = jour de la prochaine annonce : « pas encore annoncé » + fourchette 8 cas sur 10 (variations observées
 *   entre annonces officielles) pour benzyna 95, olej napędowy, benzyna 98 ;
 * - au-delà (donnée pas encore relue) : on le dit et on renvoie aux communiqués gov.pl, sans fourchette.
 * LPG : pas de prix maximal ni d'annonce quotidienne, donc ni prix de demain ni fourchette ; on le dit et on donne
 * la moyenne hebdomadaire datée.
 * Premier rendu = date du build (identique au HTML statique), puis date du navigateur après le montage (§17.5).
 */
import { useEffect, useState, type ReactNode } from 'react';
import { T, nr, litr, dzien, type L, type Paliwo } from './kit';

interface Props {
  lang: L; build: string; od: string; doDnia: string; ogl: string;
  ceny: Record<Paliwo, number>; widelki: Record<Paliwo, { lo: number; hi: number }>;
  lpg: { cena: number; tydzien: string }; jutroHref: string;
}

const add1 = (iso: string) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10); };
const PAL: Paliwo[] = ['pb95', 'on', 'pb98'];
const NAZ: Record<L, Record<Paliwo, string>> = {
  pl: { pb95: 'benzyna 95 (Pb95)', on: 'olej napędowy (ON)', pb98: 'benzyna 98 (Pb98)' },
  en: { pb95: 'petrol 95', on: 'diesel', pb98: 'petrol 98' },
};
const DOP = ['niedzieli', 'poniedziałku', 'wtorku', 'środy', 'czwartku', 'piątku', 'soboty'];
const dop = (iso: string) => `${DOP[new Date(`${iso}T12:00:00Z`).getUTCDay()]} ${dzien(iso, 'pl', false)}`;
const BIER = ['niedzielę', 'poniedziałek', 'wtorek', 'środę', 'czwartek', 'piątek', 'sobotę'];

export default function JutroLinia({ lang, build, od, doDnia, ogl, ceny, widelki, lpg, jutroHref }: Props) {
  const [dzis, setDzis] = useState(build);
  useEffect(() => { const n = new Date(); setDzis(`${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`); }, []);
  const jutro = add1(dzis);
  const nastOd = add1(doDnia);
  const znane = jutro <= doDnia; void od;
  const widelkiDzien = jutro === nastOd;
  const kiedyOgl = lang === 'pl' ? `${new Date(`${doDnia}T12:00:00Z`).getUTCDay() === 2 ? 'we' : 'w'} ${BIER[new Date(`${doDnia}T12:00:00Z`).getUTCDay()]} ${dzien(doDnia, lang, false)}` : dzien(doDnia, lang, true);
  const sep = <span aria-hidden="true" className="text-navy-400"> · </span>;
  const lpgTxt = T(lang,
    <>LPG (autogaz): bez prognozy, bo nie ma ceny maksymalnej; średnia z tygodnia {litr(lpg.cena, lang)}</>,
    <>LPG: no forecast (no cap); weekly average {litr(lpg.cena, lang)}</>);
  let glowa: string; let tresc: ReactNode;
  if (znane) {
    glowa = T(lang, `Jutro (${dzien(jutro, lang, true)}): ceny maksymalne już znane`, `Tomorrow (${dzien(jutro, lang, true)}): maximum prices already known`);
    tresc = <>{PAL.map((p, i) => <span key={p}>{i > 0 && sep}{NAZ[lang][p]} <strong className="tabular-nums">{litr(ceny[p], lang)}</strong></span>)}{sep}{lpgTxt}.{' '}
      {T(lang, `Ta sama cena co dziś (ogłoszenie z ${dzien(ogl, lang, false)}); zmiana od ${dop(nastOd)}.`, `Next change: ${dzien(nastOd, lang, true)}.`)}</>;
  } else if (widelkiDzien) {
    glowa = T(lang, `Jutro (${dzien(jutro, lang, true)}): cena jeszcze nieogłoszona`, `Tomorrow (${dzien(jutro, lang, true)}): price not announced yet`);
    tresc = <>{T(lang, `Minister poda ją zwykle ${kiedyOgl} po południu. W 8 przypadkach na 10 nowa cena mieściła się w granicach: `, `The minister usually announces it on the afternoon of ${kiedyOgl}. 8 times in 10 the new price fell within: `)}
      {PAL.map((p, i) => <span key={p}>{i > 0 && sep}{NAZ[lang][p]} <strong className="tabular-nums">{nr(widelki[p].lo, lang, 2)}–{litr(widelki[p].hi, lang)}</strong></span>)}{sep}{lpgTxt}.</>;
  } else {
    glowa = T(lang, `Jutro (${dzien(jutro, lang, true)}): nie mamy jeszcze ceny`, `Tomorrow (${dzien(jutro, lang, true)}): we do not have the price yet`);
    tresc = <>{T(lang, `Ostatnia odczytana cena obowiązywała do ${dop(doDnia)}. Nowszą minister ogłasza w `, `The latest price read applied until ${dzien(doDnia, lang, true)}. The minister publishes newer ones in `)}<a className="underline" href="https://www.gov.pl/web/energia/wiadomosci" target="_blank" rel="nofollow noopener noreferrer">{T(lang, 'komunikatach na gov.pl', 'announcements on gov.pl')}</a>.{sep}{lpgTxt}.</>;
  }
  return (
    <div className="mt-2 rounded-lg border-l-4 border-accent-500 bg-accent-50/60 px-3 py-2 text-sm text-navy-800" data-jutro>
      <p><strong className="text-navy-900">{glowa}.</strong> {tresc} <a className="underline" href={jutroHref}>{T(lang, 'Więcej', 'More')}</a></p>
    </div>
  );
}
