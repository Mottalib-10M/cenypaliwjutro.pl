import { defineStrona } from '../../lib/strona-typy';
import { O, OST_DO, zmianyN, kiedy } from '../wspolne';

const dniTygodnia = (h: any) => {
  const c = [0, 0, 0, 0, 0, 0, 0];
  for (const o of h.D.LISTA) c[new Date(`${o.ogl}T12:00:00Z`).getUTCDay()]++;
  return c;
};

export default defineStrona({
  id: 'jutro', group: 'ceny', order: 2, tool: 'jutro',
  related: ['prognoza', 'cena-maksymalna', 'benzyna95', 'diesel'],
  sources: ['mpObw', 'ustawa415', 'govplEnergia'],
  pl: {
    slug: 'ceny-paliw-jutro', nav: 'Ceny paliw jutro: kiedy nowa cena', card: 'Kiedy minister ogłasza jutrzejszą cenę i o ile zwykle się zmienia.',
    title: 'Ceny paliw jutro: kiedy ogłoszenie i o ile zmiana ceny',
    description: 'Ceny paliw jutro: kiedy Minister Energii ogłasza cenę maksymalną na następny dzień, w jakie dni obowiązuje i w jakich widełkach zmieniała się dotąd cena.',
    h1: 'Ceny paliw jutro: ogłoszenie i widełki',
    intro: (h) => `Ceny paliw jutro poznasz po ogłoszeniu ministra; dziś obowiązuje benzyna 95 ${h.l(O.brutto.pb95)} i olej napędowy ${h.l(O.brutto.on)}, ważne ${kiedy(h, O)}.`,
    resume: (h) => {
      const w = h.D.widelki('pb95', 1), wo = h.D.widelki('on', 1), z = zmianyN('pb95');
      return `Jutrzejszą cenę maksymalną paliw ogłasza Minister Energii w Monitorze Polskim w dzień roboczy poprzedzający jej obowiązywanie. Ostatnie ogłoszenie, z ${h.date(O.ogl)}, ustala ${h.l(O.brutto.pb95)} za benzynę 95 i ${h.l(O.brutto.on)} za olej napędowy i obowiązuje ${kiedy(h, O)}. Na kolejny dzień ceny jeszcze nie ma, więc pokazujemy, jak duże były dotąd zmiany. Spośród ${h.num(z.n)} zmian benzyny 95 między kolejnymi ogłoszeniami ${h.num(z.w)} to podwyżki, ${h.num(z.s)} obniżki, a ${h.num(z.b)} razy cena się nie zmieniła. W 8 przypadkach na 10 nowa cena benzyny 95 różniła się od poprzedniej o ${h.gr(w.dol, true)} do ${h.gr(w.gora, true)}, a oleju napędowego o ${h.gr(wo.dol, true)} do ${h.gr(wo.gora, true)} na litrze. Kalkulator przelicza te widełki na koszt Twojego tankowania. Ogłoszenie z piątku obejmuje zwykle sobotę, niedzielę i poniedziałek, więc w weekend nowej ceny nie będzie.`;
    },
    faqs: (h) => [
      { q: 'O której godzinie minister ogłasza cenę na jutro?', a: 'Ustawa nie podaje godziny. Obwieszczenie musi ukazać się w Monitorze Polskim dzień przed obowiązywaniem ceny; w praktyce komunikat na gov.pl pojawia się po południu, a pozycja w dzienniku urzędowym tego samego dnia. Serwis odczytuje oba źródła i podaje, z którego pochodzi cena.' },
      { q: 'Czy w weekend obowiązuje ta sama cena?', a: `Tak. Cena ogłoszona w piątek obowiązuje w sobotę, niedzielę i poniedziałek, a ogłoszona przed świętem także w dni świąteczne i w pierwszy dzień roboczy po nich. Dlatego ostatnią cenę pokazujemy do ${h.dzienD(OST_DO)}. Święta nie są wpisane w kalkulator.` },
      { q: 'Czy warto czekać z tankowaniem do jutra?', a: `Zwykle różnica jest niewielka: na baku 50 litrów zmiana o ${h.gr(h.D.widelki('pb95', 1).gora)} to ${h.zl(h.D.widelki('pb95', 1).gora * 50, 2)}. Czekanie ma sens, gdy hurt wyraźnie spada kilka dni z rzędu, co widać po kolejnych obniżkach. Kierunek i to, jak często trafiał, pokazuje ${h.a('prognoza', 'prognoza cen paliw')}. Zwykle nie warto.` },
      { q: 'Skąd stacje wiedzą o nowej cenie?', a: 'Z tego samego obwieszczenia. Cena maksymalna jest publiczna i jednakowa dla całego kraju, więc stacje nie dostają osobnej informacji. Zmieniają ceny na pylonach nocą albo rano; od północy nie mogą już sprzedawać drożej niż nowy limit. Kierowcy mogą przeczytać to samo obwieszczenie na gov.pl albo tutaj.' },
    ],
    body: (h) => {
      const c = dniTygodnia(h);
      const nazwy = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
      return `<h2>Ceny paliw jutro: w które dni ukazują się ogłoszenia</h2>
<p>Obwieszczenia ukazują się w dni robocze. Rozkład ${h.num(h.D.LISTA.length)} ogłoszeń według dnia tygodnia pokazuje, że piątkowe ogłoszenie zawsze obejmuje weekend.</p>
${h.table(['Dzień ogłoszenia', 'Liczba ogłoszeń'], [1, 2, 3, 4, 5, 6, 0].map((i) => [nazwy[i], c[i]]), 'Ogłoszenia cen maksymalnych według dnia tygodnia', ['l', 'r'])}
<h2>Skąd biorą się widełki</h2>
<p>Widełki to nie prognoza ceny, tylko zakres, w którym mieściło się 8 na 10 dotychczasowych zmian. Liczymy je wyłącznie ze zmian wewnątrz okresów obowiązywania limitu; wznowienie po przerwie nie jest zmianą rynkową. Jeśli rynek gwałtownie się ruszy, zmiana może wyjść poza widełki, tak jak w 2 przypadkach na 10 w przeszłości.</p>
<h2>Co przesuwa jutrzejszą cenę</h2>
<p>Cena maksymalna to średnia cena hurtowa pięciu największych dostawców z poprzedniego dnia roboczego, plus 0,30 zł i VAT. Hurt zależy od notowań ropy i paliw na rynkach światowych oraz od kursu złotego do dolara. Gdy oba czynniki stoją, jutrzejsza cena zwykle jest taka sama albo różni się o kilka groszy. Rozbicie ceny pokazuje strona ${h.a('akcyza', 'akcyza i podatki w cenie paliwa')}.</p>`;
    },
  },
  en: {
    slug: 'fuel-prices-tomorrow', nav: 'Fuel prices tomorrow', card: 'When the minister announces tomorrow’s price and how much it usually moves.',
    title: 'Fuel prices tomorrow in Poland: notice time and range',
    description: 'Fuel prices tomorrow in Poland: when the Minister of Energy announces the next day’s maximum price, which days it covers and how far prices have moved.',
    h1: 'Fuel prices tomorrow in Poland: notice and range',
    intro: (h) => `Fuel prices tomorrow in Poland are known once the minister announces them; today petrol 95 is capped at ${h.l(O.brutto.pb95)} and diesel at ${h.l(O.brutto.on)}, valid ${kiedy(h, O)}.`,
    resume: (h) => {
      const w = h.D.widelki('pb95', 1), wo = h.D.widelki('on', 1), z = zmianyN('pb95');
      return `Tomorrow’s maximum fuel price is announced by the Minister of Energy in Monitor Polski, the official gazette, on the working day before it applies. The latest notice, of ${h.date(O.ogl)}, sets ${h.l(O.brutto.pb95)} for petrol 95 and ${h.l(O.brutto.on)} for diesel and applies ${kiedy(h, O)}. There is no price yet for the following day, so we show how large changes have been. Of ${h.num(z.n)} petrol 95 changes between consecutive notices, ${h.num(z.w)} were rises, ${h.num(z.s)} were cuts and ${h.num(z.b)} times the price stayed put. 8 times out of 10 the new petrol 95 price differed from the previous one by ${h.gr(w.dol, true)} to ${h.gr(w.gora, true)} a litre, and diesel by ${h.gr(wo.dol, true)} to ${h.gr(wo.gora, true)} (1 grosz, gr, is PLN 0.01). The calculator turns that range into the cost of your fill.`;
    },
    faqs: (h) => [
      { q: 'At what time does the minister announce tomorrow’s price?', a: 'The law sets no hour. The notice must appear in Monitor Polski the day before the price applies; in practice the gov.pl announcement appears in the afternoon and the gazette item the same day. The site reads both sources and says which one a price comes from.' },
      { q: 'Does the same price apply at the weekend?', a: `Yes. A price announced on Friday applies on Saturday, Sunday and Monday, and one announced before a holiday also covers the holiday and the first working day after it (Article 34a(6)). That is why the latest price is shown up to ${h.dzienD(OST_DO)}.` },
      { q: 'Is it worth waiting until tomorrow to fill up?', a: `Usually the difference is small: on a 50-litre tank a change of ${h.gr(h.D.widelki('pb95', 1).gora)} is ${h.zl(h.D.widelki('pb95', 1).gora * 50, 2)}. Waiting makes sense when wholesale has clearly fallen for several days, which shows as a run of cuts. The ${h.a('prognoza', 'fuel price forecast')} shows the direction and how often it was right.` },
      { q: 'How do stations learn about the new price?', a: 'From the same notice. The maximum price is public and the same nationwide, so stations get no separate message. They change their boards overnight or in the morning; from midnight they may no longer sell above the new cap. Drivers can read the same notice on gov.pl or here.' },
    ],
    body: (h) => {
      const c = dniTygodnia(h);
      const nazwy = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `<h2>Fuel prices tomorrow: which days notices appear</h2>
<p>Notices appear on working days. Counting ${h.num(h.D.LISTA.length)} notices by weekday shows that the Friday notice always covers the weekend.</p>
${h.table(['Day announced', 'Notices'], [1, 2, 3, 4, 5, 6, 0].map((i) => [nazwy[i], c[i]]), 'Maximum price notices by day of the week', ['l', 'r'])}
<h2>Where the range comes from</h2>
<p>The range is not a price forecast but the band that held 8 of 10 past changes. We compute it only from changes within the periods when a cap applied; a restart after a break is not a market move. If the market moves sharply, a change can fall outside the range, as 2 in 10 did in the past.</p>
<h2>What moves tomorrow’s price</h2>
<p>The maximum price is the average wholesale price of the five largest suppliers on the previous working day, plus PLN 0.30 and VAT. Wholesale depends on world oil and fuel quotes and on the zloty’s rate against the dollar. When both stand still, tomorrow’s price is usually the same or a few grosze off. The ${h.a('akcyza', 'fuel tax breakdown')} page splits the price into its parts.</p>`;
    },
  },
});
