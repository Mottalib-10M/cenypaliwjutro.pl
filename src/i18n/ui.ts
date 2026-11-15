import type { Locale } from './routes';
import type { LibellesTrame } from '../lib/libelles-trame';
const pl = {
  updatedOn: 'Aktualizacja', editorialPolicy: 'Polityka redakcyjna', contactLabel: 'Kontakt', reviewedBy: 'Opracowanie',
  skipToContent: 'Przejdź do treści', mainNav: 'Menu główne', breadcrumbLabel: 'Ścieżka', breadcrumbHome: 'Start', menuOpen: 'Otwórz menu',
  faqTitle: 'Najczęstsze pytania', relatedCalculators: 'Powiązane strony i kalkulatory', sourcesTitle: 'Źródła tej strony', writtenBy: 'Opracowanie',
  asOf: 'Stan na', lastUpdated: 'aktualizacja', footerValidated: 'Źródła: obwieszczenia Ministra Energii w Monitorze Polskim, Dziennik Ustaw, tygodniowy biuletyn cen paliw Komisji Europejskiej',
  footerBrowser: 'Obliczenia w Twojej przeglądarce · nic nie wysyłamy · bez konta, bez telefonu, bez formularza',
  footerDisclaimer: 'Ceny Paliw Jutro to niezależny serwis Radif Partners, niezwiązany z Ministerstwem Energii, Krajową Administracją Skarbową, Komisją Europejską ani z żadną stacją czy koncernem paliwowym. Ceny maksymalne przepisujemy z obwieszczeń w Monitorze Polskim i podajemy z numerem pozycji; średnie tygodniowe pochodzą z biuletynu Komisji Europejskiej; widełki na kolejne dni i scenariusz na 2027 r. to nasze obliczenia, nigdy cena urzędowa. Wyniki mają charakter szacunkowy i nie stanowią doradztwa prawnego ani podatkowego: wiąże cena z obwieszczenia i cena na dystrybutorze.',
  footerPopular: 'Najczęściej odwiedzane', notFound: 'Pod tym adresem nie ma strony. Na stronie głównej znajdziesz maksymalną cenę paliw na dziś i koszt tankowania.', readMore: 'Czytaj dalej',
  independent: 'Serwis niezależny: nie jesteśmy ministerstwem ani stacją paliw',
  trama: {} as Partial<LibellesTrame>,
};
const en: typeof pl = {
  updatedOn: 'Updated', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main menu', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Frequently asked questions', relatedCalculators: 'Related pages and calculators', sourcesTitle: 'Sources for this page', writtenBy: 'Prepared by',
  asOf: 'As of', lastUpdated: 'updated', footerValidated: 'Sources: Minister of Energy notices in Monitor Polski, Journal of Laws, European Commission Weekly Oil Bulletin',
  footerBrowser: 'Calculated in your browser · nothing is sent · no account, no phone number, no form',
  footerDisclaimer: 'Ceny Paliw Jutro is an independent website by Radif Partners, with no link to the Polish Ministry of Energy, the National Revenue Administration, the European Commission or any filling station or fuel company. Maximum prices are transcribed from the notices in Monitor Polski and quoted with their item number; weekly averages come from the European Commission bulletin; ranges for the coming days and the 2027 scenario are our own sums, never an official price. Results are estimates only and are not legal or tax advice: the notice and the price on the pump are what count.',
  footerPopular: 'Most visited', notFound: 'There is no page at this address. The home page shows today’s maximum fuel price in Poland and the cost of a full tank.', readMore: 'Read more',
  independent: 'Independent website: not the ministry and not a filling station',
  trama: {} as Partial<LibellesTrame>,
};
export function t(lang: Locale) { return lang === 'en' ? en : pl; }
