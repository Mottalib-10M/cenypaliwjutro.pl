/** Accueil (page pilier) : textes pl et en. Tous les chiffres viennent des données (lib/dane.ts) ou du moteur. */
import type { Helpers, FAQ } from '../lib/strona-typy';
import { P } from '../lib/params';
import { EX, O, POP, zm, po2027, rok, ueZl, miejscePL, ranking, nOkres, MP_N, OST_DO, kiedy, zrodlo, ostatnieTab, podatki, sk } from './wspolne';

interface HomeText { title: string; description: string; h1: string; intro: (h: Helpers) => string; resume: (h: Helpers) => string; faqs: (h: Helpers) => FAQ[]; body: (h: Helpers) => string }

const okresyTab = (h: Helpers) => {
  const pl = h.lang === 'pl';
  return h.table([pl ? 'Okres' : 'Period', pl ? 'Ogłoszenia' : 'Notices', pl ? 'Pierwsza Pb95' : 'First Pb95', pl ? 'Ostatnia Pb95' : 'Last Pb95', pl ? 'Pierwsza ON' : 'First ON', pl ? 'Ostatnia ON' : 'Last ON'],
    h.D.OKRESY.map((o, i) => { const l = h.D.LISTA.filter((x) => x.okres === i); const a = l[0], b = l[l.length - 1]; return [`${h.dzien(o.od)} – ${h.dzien(o.do)}`, nOkres(i), h.l(a.brutto.pb95), h.l(b.brutto.pb95), h.l(a.brutto.on), h.l(b.brutto.on)]; }),
    pl ? 'Okresy obniżonego VAT, w których obowiązuje cena maksymalna' : 'Reduced-VAT periods during which a maximum price applies', ['l', 'r', 'r', 'r', 'r', 'r']);
};

export const HOME: Record<'pl' | 'en', HomeText> = {
  pl: {
    title: 'Ceny paliw dzisiaj i jutro: cena maksymalna w Polsce',
    description: 'Ceny paliw dzisiaj i jutro: cena maksymalna benzyny 95, 98 i oleju napędowego z obwieszczenia ministra, widełki następnej zmiany i koszt tankowania do pełna.',
    h1: 'Ceny paliw dzisiaj i jutro',
    intro: (h) => `Ceny paliw dzisiaj to cena maksymalna z obwieszczenia ogłoszonego ${h.date(O.ogl)}: benzyna 95 najwyżej ${h.l(O.brutto.pb95)}, olej napędowy ${h.l(O.brutto.on)}.`,
    resume: (h) => {
      const w = h.D.widelki('pb95', 1), wo = h.D.widelki('on', 1);
      return `Od ${h.dzien(O.od, true)} żadna stacja w Polsce nie może sprzedać litra benzyny 95 drożej niż za ${h.l(O.brutto.pb95)}, benzyny 98 drożej niż za ${h.l(O.brutto.pb98)}, a oleju napędowego drożej niż za ${h.l(O.brutto.on)}. To ceny z VAT z obwieszczenia Ministra Energii ogłoszonego ${h.date(O.ogl)}; wobec poprzedniego benzyna 95 zmieniła się o ${h.gr(zm('pb95'), true)}, a olej napędowy o ${h.gr(zm('on'), true)} na litrze. Pełny bak 50 litrów benzyny 95 kosztuje dziś najwyżej ${h.zl(O.brutto.pb95 * 50, 2)}. Ceny paliw jutro zna dopiero minister: nowa cena obowiązuje od dnia po ogłoszeniu. Z ${h.num(h.D.LISTA.length)} dotychczasowych ogłoszeń wynika, że w 8 przypadkach na 10 następna cena benzyny 95 różniła się od poprzedniej o ${h.gr(w.dol, true)} do ${h.gr(w.gora, true)}, a oleju napędowego o ${h.gr(wo.dol, true)} do ${h.gr(wo.gora, true)}. Kalkulator poniżej liczy koszt tankowania dla wybranego paliwa.`;
    },
    faqs: (h) => [
      { q: 'Ile kosztuje dziś litr benzyny 95 i oleju napędowego?', a: `Najwyżej ${h.l(O.brutto.pb95)} za benzynę 95, ${h.l(O.brutto.pb98)} za benzynę 98 i ${h.l(O.brutto.on)} za olej napędowy. To ceny maksymalne z VAT obowiązujące od ${h.dzien(O.od, true)}, ogłoszone ${h.date(O.ogl)}. Stacja może sprzedawać taniej, ale nie drożej. Ceny LPG (autogazu) nie są objęte limitem.` },
      { q: 'Kiedy poznam ceny paliw na jutro?', a: 'Minister Energii ogłasza cenę maksymalną w Monitorze Polskim w dni robocze, zwykle po południu, a cena obowiązuje od następnego dnia. Cena ogłoszona w piątek obowiązuje w sobotę, niedzielę i poniedziałek. Do ogłoszenia nikt nie zna jutrzejszej ceny; serwis pokazuje widełki, w jakich zwykle mieściła się zmiana.' },
      { q: 'Czy stacja może sprzedawać paliwo drożej niż cena maksymalna?', a: `Nie. Sprzedaż powyżej ceny maksymalnej grozi karą pieniężną do ${h.zl(P.cena_maksymalna.kara_max)} (art. 63 ust. 18 ustawy o zapasach), a kontrole prowadzi Krajowa Administracja Skarbowa (KAS). Jeśli zapłaciłeś więcej, sprawdź paragon w ${h.a('kontrola', 'kalkulatorze kontroli ceny')} i zgłoś stację do urzędu skarbowego.` },
      { q: 'Dlaczego olej napędowy jest droższy od benzyny?', a: `Dziś olej napędowy kosztuje o ${h.gr(O.brutto.on - O.brutto.pb95)} więcej niż benzyna 95. Cena maksymalna idzie za ceną hurtową, a hurtowa cena oleju napędowego, z której minister liczy limit, jest wyraźnie wyższa niż benzyny. Do tego opłata paliwowa od litra oleju napędowego jest ponad dwa razy wyższa niż od benzyny.` },
      { q: 'Do kiedy obowiązują ceny maksymalne paliw?', a: `Ceny maksymalne obowiązują tylko razem z obniżonym VAT na paliwa, obecnie do ${h.date(h.D.BIEZACY_OKRES.do)}. Jeśli rząd nie przedłuży pakietu „Ceny Paliw Niżej” (CPN), od 1 stycznia 2027 r. wróci VAT 23 % i pełna akcyza, a stacje znów same ustalą ceny. ${h.a('po2027', 'Scenariusz na 2027 r.')} liczy, o ile może to podnieść cenę.` },
      { q: 'Skąd serwis bierze ceny i czy są aktualne?', a: `Każda cena pochodzi z obwieszczenia w Monitorze Polskim albo z komunikatu Ministerstwa Energii na gov.pl i ma odnośnik do źródła. Ostatnie odczytane ogłoszenie jest z ${h.date(O.ogl)}. Dane odświeżamy skryptem, ale nie co minutę: przed tankowaniem porównaj datę na stronie z dzisiejszą.` },
      { q: 'Ile kosztuje LPG, skoro nie ma dla niego ceny maksymalnej?', a: `Autogaz nie jest objęty limitem, więc podajemy średnią krajową z Weekly Oil Bulletin Komisji Europejskiej: ${h.l(h.D.LPG_ZL)} w tygodniu od ${h.date(h.D.WOB_OST.d)}. To średnia z całego kraju, ceny na konkretnych stacjach mogą być wyższe albo niższe. ${h.a('lpg', 'Kalkulator LPG')} liczy, kiedy zwraca się instalacja gazowa.` },
    ],
    body: (h) => {
      const w5 = h.D.widelki('pb95', 5);
      const r95 = rok('pb95'), ron = rok('on');
      const rk = ranking('pb95');
      return `<h2>Ceny paliw dzisiaj: trzy paliwa z ceną maksymalną</h2>
<p>Cena maksymalna dotyczy trzech paliw: benzyny bezołowiowej 95 (Pb95), benzyny 98 (Pb98) i oleju napędowego (ON, popularnie diesel). Tabela pokazuje cenę z ostatniego ogłoszenia i różnicę wobec poprzedniego. Ostatnie ogłoszenie pochodzi ${O.poz ? `z ${h.mp(O.poz)}` : `z komunikatu Ministerstwa Energii na gov.pl, opublikowanego przed wpisem do Monitora Polskiego`}; obowiązuje od ${h.dzien(O.od, true)}${OST_DO !== O.od ? ` do ${h.dzien(OST_DO, true)}` : ''}, chyba że minister wcześniej ogłosi nowe ceny.</p>
${h.table(['Paliwo', 'Cena maksymalna', 'Poprzednia', 'Zmiana', 'Bak 50 l'], (['pb95', 'pb98', 'on'] as const).map((p) => [h.fn(p), h.l(O.brutto[p]), h.l(POP.brutto[p]), h.gr(zm(p), true), h.zl(O.brutto[p] * 50, 2)]), `Ceny z VAT, ogłoszenie z ${h.date(O.ogl)}`, ['l', 'r', 'r', 'r', 'r'])}
<p>Z tej ceny ${h.pct(podatki('pb95') / sk('pb95').brutto)} w benzynie 95 i ${h.pct(podatki('on') / sk('on').brutto)} w oleju napędowym to podatki i opłaty: VAT, akcyza i opłata paliwowa. Rozbicie litra na części pokazuje strona ${h.a('akcyza', 'akcyza i podatki w cenie paliwa')}.</p>
<h2>Ceny paliw jutro: kiedy minister ogłasza nową cenę</h2>
<p>Cenę maksymalną ogłasza Minister Energii w Dzienniku Urzędowym „Monitor Polski”, w praktyce w każdy dzień roboczy. Nowa cena obowiązuje od następnego dnia. Cena ogłoszona przed weekendem albo świętem obowiązuje także w dni wolne i w najbliższy dzień roboczy (art. 34a ust. 6 ustawy o zapasach). Dlatego w piątek po południu poznajesz ceny na sobotę, niedzielę i poniedziałek.</p>
<p>Przed ogłoszeniem nikt nie zna jutrzejszej ceny, także stacje. Możemy za to powiedzieć, jak duże bywały zmiany. W ${h.num(h.D.LISTA.length)} ogłoszeniach od ${h.date(h.D.PIERWSZA.ogl)} cena benzyny 95 po pięciu kolejnych ogłoszeniach zmieniała się w 8 przypadkach na 10 o ${h.gr(w5.dol, true)} do ${h.gr(w5.gora, true)} na litrze. Strona ${h.a('jutro', 'ceny paliw jutro')} pokazuje widełki na najbliższe ogłoszenie, a ${h.a('prognoza', 'prognoza cen paliw')} uczciwie mówi, kiedy prosta reguła trafia lepiej niż założenie „bez zmian”, a kiedy nie.</p>
<h2>Jak liczona jest cena maksymalna</h2>
<p>Wzór jest w art. 34a ust. 2 ustawy o zapasach ropy naftowej, dodanym ustawą z 27 marca 2026 r. Minister bierze średnią cenę hurtową pięciu największych dostawców paliw z poprzedniego dnia roboczego, razem z akcyzą i opłatą paliwową, dodaje ${h.l(h.D.STAWKI_CPN.pb95.marza)} na koszty stacji i nalicza VAT według obniżonej stawki ${h.pct(h.D.STAWKI_CPN.pb95.vat, 0)}. Cena maksymalna idzie więc za hurtem z jednodniowym opóźnieniem: gdy ropa i złoty się nie ruszają, cena stoi; gdy hurt rośnie, rośnie następnego dnia.</p>
<p>Limit nie jest ceną, którą trzeba płacić. Stacje mogą sprzedawać taniej i część z nich to robi. Średnią faktyczną cenę na stacjach w danym tygodniu pokazuje strona ${h.a('srednia', 'średnie ceny paliw')}, oparta na danych, które Polska przekazuje Komisji Europejskiej.</p>
<h2>Ostatnie ceny maksymalne paliw</h2>
<p>Każda pozycja ma odnośnik do pliku obwieszczenia w Monitorze Polskim albo do komunikatu na gov.pl. Daty pokazują, w jakie dni dana cena obowiązywała. Pełna historia od pierwszego obwieszczenia jest na stronie ${h.a('historia', 'historia cen paliw')}, a cenę z dowolnego dnia sprawdzisz w kalkulatorze ${h.a('cena-maksymalna', 'cena maksymalna paliw')}.</p>
${ostatnieTab(h, 10)}
<h2>Kiedy cena maksymalna obowiązywała</h2>
<p>Cena maksymalna działa tylko w okresach, w których rozporządzenie Ministra Finansów obniża VAT na paliwa do ${h.pct(h.D.STAWKI_CPN.pb95.vat, 0)}. Między nimi stacje ustalały ceny swobodnie, a serwis nie pokazuje dla tych dni żadnego limitu. Z ${h.num(h.D.LISTA.length)} ogłoszeń ${h.num(MP_N)} odczytaliśmy z Monitora Polskiego, pozostałe z komunikatów na gov.pl, które ukazują się, zanim pozycja trafi do dziennika.</p>
${okresyTab(h)}
<h2>Co się stanie z cenami paliw 1 stycznia 2027 r.</h2>
<p>Obniżony VAT i obniżona akcyza obowiązują do ${h.date(h.D.BIEZACY_OKRES.do)}. Jeśli nie zostaną przedłużone, przy dzisiejszej cenie hurtowej benzyna 95 kosztowałaby około ${h.l(po2027('pb95'))}, a olej napędowy około ${h.l(po2027('on'))}, czyli o ${h.gr(po2027('pb95') - sk('pb95').brutto)} i ${h.gr(po2027('on') - sk('on').brutto)} więcej na litrze. To scenariusz z VAT 23 %, akcyzą ustawową i opłatą paliwową na 2027 r., liczony przy marży 0,30 zł; bez limitu marże stacji mogą być inne. Szczegóły na stronie ${h.a('po2027', 'ceny paliw 2027')}.</p>
<h2>Polska na tle Unii Europejskiej</h2>
<p>Według Weekly Oil Bulletin z tygodnia od ${h.date(h.D.WOB.tydzien)} średnia cena benzyny 95 w Polsce, ${h.l(h.D.zlL(h.D.WOB_OST.pb95))}, była ${miejscePL('pb95')}. najniższa w ${h.num(rk.length)} krajach Unii; średnia unijna wynosiła ${h.l(ueZl('pb95'))}. Olej napędowy był ${miejscePL('on')}. najtańszy. Tankowanie w Niemczech czy Czechach opłaca się więc rzadko; porównanie dla każdego kraju liczy strona ${h.a('europa', 'ceny paliw w Europie')}.</p>
<h2>Ile kosztuje rok jazdy</h2>
<p>Przy ${h.num(EX.km_rok)} km rocznie i spalaniu ${h.num(EX.spalanie_pb, 1)} l/100 km benzyny 95 wydasz w roku najwyżej ${h.zl(r95.koszt)}, czyli ${h.zl(r95.miesiac)} miesięcznie. Ten sam przebieg dieslem przy ${h.num(EX.spalanie_on, 1)} l/100 km kosztuje ${h.zl(ron.koszt)}. Własne liczby wpiszesz w kalkulatorach ${h.a('benzyna95', 'cena benzyny 95')}, ${h.a('diesel', 'cena diesla')} i ${h.a('trasa', 'koszt przejazdu')}, a różnicę między benzyną 95 i 98 policzy strona ${h.a('benzyna98', 'cena benzyny 98')}.</p>
<h2>Skróty używane w serwisie</h2>
<p>Pb95 i Pb98 to benzyna bezołowiowa o liczbie oktanowej 95 i 98. ON to olej napędowy. LPG (liquefied petroleum gas) to autogaz. CPN to rządowy pakiet „Ceny Paliw Niżej”: cena maksymalna, VAT 8 % i obniżona akcyza. M.P. to Monitor Polski, dziennik urzędowy, w którym minister ogłasza ceny; Dz.U. to Dziennik Ustaw. KAS to Krajowa Administracja Skarbowa, która kontroluje stacje. VAT to podatek od towarów i usług.</p>
<h2>Jak korzystać z serwisu</h2>
<p>Strona główna i strony paliw pokazują cenę maksymalną z ostatniego odczytanego ogłoszenia. Jeśli dzisiejsza data jest późniejsza niż dni podane przy cenie, kalkulator ostrzeże, że mogła pojawić się nowa. Każdy kalkulator działa w Twojej przeglądarce i nic nie wysyła; linkiem możesz udostępnić wynik z własnymi liczbami. Sposób liczenia, źródła i błędy prognoz opisuje ${h.a('method', 'metodologia')}.</p>`;
    },
  },
  en: {
    title: 'Fuel prices in Poland today: maximum price and tomorrow',
    description: 'Fuel prices in Poland today and tomorrow: the maximum price of petrol 95, 98 and diesel from the minister’s notice, the likely next change and a fill’s cost.',
    h1: 'Fuel prices in Poland today',
    intro: (h) => `Fuel prices in Poland today: petrol 95 at most ${h.l(O.brutto.pb95)}, diesel ${h.l(O.brutto.on)}.`,
    resume: (h) => {
      const w = h.D.widelki('pb95', 1), wo = h.D.widelki('on', 1);
      return `No station may charge more than the cap. Petrol 98 is capped at ${h.l(O.brutto.pb98)}. These maximum prices apply from ${h.dzien(O.od, true)}. These are VAT-inclusive prices from the Minister of Energy notice announced on ${h.date(O.ogl)}; on the previous notice petrol 95 moved by ${h.gr(zm('pb95'), true)} and diesel by ${h.gr(zm('on'), true)} a litre. A full 50-litre tank of petrol 95 costs at most ${h.zl(O.brutto.pb95 * 50, 2)} today. Tomorrow’s fuel prices are known only once the minister announces them: a new price applies from the day after. Across ${h.num(h.D.LISTA.length)} notices so far, 8 times out of 10 the next petrol 95 price differed from the previous one by ${h.gr(w.dol, true)} to ${h.gr(w.gora, true)} a litre, and diesel by ${h.gr(wo.dol, true)} to ${h.gr(wo.gora, true)}. The calculator below works out the cost of a fill for the fuel you choose. Prices are in Polish zloty (PLN); 1 grosz (gr) is PLN 0.01.`;
    },
    faqs: (h) => [
      { q: 'What does a litre of petrol 95 and diesel cost in Poland today?', a: `At most ${h.l(O.brutto.pb95)} for petrol 95, ${h.l(O.brutto.pb98)} for petrol 98 and ${h.l(O.brutto.on)} for diesel. These are VAT-inclusive maximum prices in force from ${h.dzien(O.od, true)}, announced on ${h.date(O.ogl)}. A station may sell for less but not for more. LPG (autogas) has no cap.` },
      { q: 'When will tomorrow’s fuel prices be known?', a: 'The Minister of Energy announces the maximum price in Monitor Polski, the official gazette, on working days, usually in the afternoon, and it applies from the next day. A price announced on Friday applies on Saturday, Sunday and Monday. Nobody knows tomorrow’s price before the announcement; the site shows the range within which changes usually fell.' },
      { q: 'Can a station sell fuel above the maximum price?', a: `No. Selling above the maximum price carries a fine of up to PLN 1,000,000 (Article 63(18) of the Stocks Act), and the National Revenue Administration (KAS) carries out checks. If you paid more, check your receipt with the ${h.a('kontrola', 'price check calculator')} and report the station to the tax office.` },
      { q: 'Why is diesel dearer than petrol in Poland?', a: `Diesel costs ${h.gr(O.brutto.on - O.brutto.pb95)} more a litre than petrol 95 today. The maximum price follows the wholesale price, and the wholesale diesel price from which the minister works out the cap is clearly above petrol. On top of that, the fuel levy on a litre of diesel is more than twice the levy on petrol.` },
      { q: 'How long will maximum fuel prices last?', a: `Maximum prices apply only together with the reduced VAT on fuel, currently until ${h.date(h.D.BIEZACY_OKRES.do)}. If the government does not extend the “Ceny Paliw Niżej” (CPN, “Lower Fuel Prices”) package, 23% VAT and full excise return on 1 January 2027 and stations set prices freely again. The ${h.a('po2027', '2027 scenario')} works out how much prices could rise.` },
      { q: 'Where do the prices come from and are they current?', a: `Every price comes from a notice in Monitor Polski or a Ministry of Energy announcement on gov.pl and links to its source. The latest notice read is from ${h.date(O.ogl)}. Data are refreshed by a script, not every minute: before filling up, compare the date on the page with today’s date.` },
      { q: 'What does LPG cost if it has no maximum price?', a: `Autogas is not capped, so we give the national average from the European Commission Weekly Oil Bulletin: ${h.l(h.D.LPG_ZL)} in the week of ${h.date(h.D.WOB_OST.d)}. It is a country-wide average; prices at a given station may be higher or lower. The ${h.a('lpg', 'LPG calculator')} works out when a gas conversion pays for itself.` },
    ],
    body: (h) => {
      const w5 = h.D.widelki('pb95', 5);
      const r95 = rok('pb95'), ron = rok('on');
      const rk = ranking('pb95');
      return `<h2>Fuel prices in Poland today: three capped fuels</h2>
<p>The maximum price covers three fuels: unleaded petrol 95 (Pb95), petrol 98 (Pb98) and diesel (ON, from the Polish “olej napędowy”). The table shows the price from the latest notice and the change on the previous one. The latest notice comes ${O.poz ? `from ${h.mp(O.poz)}` : `from a Ministry of Energy announcement on gov.pl, published before the Monitor Polski entry`}; it applies from ${h.dzien(O.od, true)}${OST_DO !== O.od ? ` to ${h.dzien(OST_DO, true)}` : ''}, unless the minister announces new prices sooner.</p>
${h.table(['Fuel', 'Maximum price', 'Previous', 'Change', '50 l tank'], (['pb95', 'pb98', 'on'] as const).map((p) => [h.fn(p), h.l(O.brutto[p]), h.l(POP.brutto[p]), h.gr(zm(p), true), h.zl(O.brutto[p] * 50, 2)]), `Prices including VAT, notice of ${h.date(O.ogl)}`, ['l', 'r', 'r', 'r', 'r'])}
<p>Of that price, ${h.pct(podatki('pb95') / sk('pb95').brutto)} for petrol 95 and ${h.pct(podatki('on') / sk('on').brutto)} for diesel is tax and levies: VAT, excise and the fuel levy. The ${h.a('akcyza', 'fuel tax breakdown')} page splits a litre into its parts.</p>
<h2>Fuel prices tomorrow: when the minister announces a new price</h2>
<p>The Minister of Energy announces the maximum price in the official gazette, Monitor Polski, in practice on every working day. The new price applies from the next day. A price announced before a weekend or holiday also applies on the days off and the next working day (Article 34a(6) of the Stocks Act). So on Friday afternoon you learn the prices for Saturday, Sunday and Monday.</p>
<p>Before the announcement nobody knows tomorrow’s price, stations included. What we can say is how large changes have been. Across ${h.num(h.D.LISTA.length)} notices since ${h.date(h.D.PIERWSZA.ogl)}, the petrol 95 price five notices later had moved, 8 times out of 10, by ${h.gr(w5.dol, true)} to ${h.gr(w5.gora, true)} a litre. The ${h.a('jutro', 'fuel prices tomorrow')} page shows the range for the next notice, and the ${h.a('prognoza', 'fuel price forecast')} says plainly when a simple rule beats the “no change” assumption and when it does not.</p>
<h2>How the maximum price is worked out</h2>
<p>The formula is in Article 34a(2) of the Stocks Act, added by the Act of 27 March 2026. The minister takes the average wholesale price of the five largest fuel suppliers on the previous working day, with excise and fuel levy included, adds ${h.l(h.D.STAWKI_CPN.pb95.marza)} for station costs and charges VAT at the reduced ${h.pct(h.D.STAWKI_CPN.pb95.vat, 0)} rate. So the cap follows wholesale with a one-day lag: when oil and the zloty stand still, so does the price; when wholesale rises, the cap rises the next day.</p>
<p>The cap is not a price you must pay. Stations may sell for less and some do. The actual average at the pump in a given week is on the ${h.a('srednia', 'average fuel prices')} page, based on the figures Poland reports to the European Commission.</p>
<h2>Latest maximum fuel prices</h2>
<p>Each row links to the notice file in Monitor Polski or to the gov.pl announcement. The dates show the days each price applied. The full history since the first notice is on the ${h.a('historia', 'fuel price history')} page, and the ${h.a('cena-maksymalna', 'maximum fuel price')} calculator finds the price for any day.</p>
${ostatnieTab(h, 10)}
<h2>When a maximum price applied</h2>
<p>A maximum price applies only while a Finance Minister regulation cuts VAT on fuel to ${h.pct(h.D.STAWKI_CPN.pb95.vat, 0)}. Between those periods stations set prices freely, and the site shows no cap for those days. Of ${h.num(h.D.LISTA.length)} notices, ${h.num(MP_N)} were read from Monitor Polski and the rest from gov.pl announcements, which appear before the item reaches the gazette.</p>
${okresyTab(h)}
<h2>What happens to fuel prices on 1 January 2027</h2>
<p>The reduced VAT and excise apply until ${h.date(h.D.BIEZACY_OKRES.do)}. If they are not extended, at today’s wholesale price petrol 95 would cost about ${h.l(po2027('pb95'))} and diesel about ${h.l(po2027('on'))}, that is ${h.gr(po2027('pb95') - sk('pb95').brutto)} and ${h.gr(po2027('on') - sk('on').brutto)} more a litre. This scenario uses 23% VAT, statutory excise and the 2027 fuel levy, with a PLN 0.30 margin; without a cap, station margins may differ. Details on the ${h.a('po2027', 'fuel prices 2027')} page.</p>
<h2>Poland against the rest of the EU</h2>
<p>According to the Weekly Oil Bulletin for the week of ${h.date(h.D.WOB.tydzien)}, Poland’s average petrol 95 price, ${h.l(h.D.zlL(h.D.WOB_OST.pb95))}, ranked ${miejscePL('pb95')} cheapest of ${h.num(rk.length)} EU countries; the EU average was ${h.l(ueZl('pb95'))}. Diesel ranked ${miejscePL('on')} cheapest. Filling up in Germany or Czechia rarely pays; the ${h.a('europa', 'fuel prices in Europe')} page compares every country.</p>
<h2>What a year of driving costs</h2>
<p>At ${h.num(EX.km_rok)} km a year and ${h.num(EX.spalanie_pb, 1)} l/100 km of petrol 95, you spend at most ${h.zl(r95.koszt)} a year, or ${h.zl(r95.miesiac)} a month. The same mileage in a diesel at ${h.num(EX.spalanie_on, 1)} l/100 km costs ${h.zl(ron.koszt)}. Enter your own figures in the ${h.a('benzyna95', 'petrol 95 price')}, ${h.a('diesel', 'diesel price')} and ${h.a('trasa', 'trip fuel cost')} calculators; the ${h.a('benzyna98', 'petrol 98 price')} page works out the gap between 95 and 98.</p>
<h2>Abbreviations used on the site</h2>
<p>Pb95 and Pb98 are unleaded petrol with octane ratings 95 and 98. ON is diesel. LPG (liquefied petroleum gas) is autogas. CPN is the government “Ceny Paliw Niżej” (Lower Fuel Prices) package: the maximum price, 8% VAT and reduced excise. M.P. is Monitor Polski, the official gazette where the minister announces prices; Dz.U. is the Journal of Laws. KAS is the National Revenue Administration, which checks stations. VAT is value added tax.</p>
<h2>How to use the site</h2>
<p>The home page and the fuel pages show the maximum price from the latest notice read. If today’s date is later than the days shown with the price, the calculator warns that a newer one may exist. Every calculator runs in your browser and sends nothing; a link lets you share a result with your own figures. The ${h.a('method', 'method')} page describes the sums, the sources and the forecast errors.</p>`;
    },
  },
};
