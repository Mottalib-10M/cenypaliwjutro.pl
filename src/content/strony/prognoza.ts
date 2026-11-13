import { defineStrona } from '../../lib/strona-typy';
import { O } from '../wspolne';

const gr1 = (h: any, x: number) => `${h.num(x * 100, 1)} gr`;

export default defineStrona({
  id: 'prognoza', group: 'ceny', order: 3, tool: 'prognoza',
  related: ['jutro', 'po2027', 'historia', 'srednia'],
  sources: ['mpObw', 'eliMp', 'ustawa415'],
  pl: {
    slug: 'prognoza-cen-paliw', nav: 'Prognoza cen paliw', card: 'Kierunek następnej zmiany i jego błąd w teście wstecznym, z widełkami.',
    title: 'Prognoza cen paliw: kierunek zmiany i błąd w teście',
    description: 'Prognoza cen paliw na następne ogłoszenie i pięć ogłoszeń naprzód: widełki z rzeczywistych zmian i kierunek tylko tam, gdzie wygrał z założeniem „bez zmian”.',
    h1: 'Prognoza cen paliw na kolejne ogłoszenia',
    intro: (h) => `Prognoza cen paliw liczona z ${h.num(h.D.LISTA.length)} ogłoszeń: widełki dla każdego paliwa i kierunek tylko tam, gdzie reguła wygrała test wsteczny.`,
    resume: (h) => {
      const f = h.D.prog('pb95'), fo = h.D.prog('on'), w5 = h.D.widelki('pb95', 5);
      return `Prognozę cen paliw publikujemy tylko wtedy, gdy w teście wstecznym była lepsza od najprostszego założenia, że cena się nie zmieni. Dla benzyny 95 prosta reguła oparta na ostatnich zmianach myliła się średnio o ${gr1(h, f.ocena.mae)}, a założenie „bez zmian” o ${gr1(h, f.ocena.maeStale)} na litrze, więc ${f.publikowana ? `kierunek pokazujemy: następna cena około ${h.l(f.cena)}` : 'kierunku nie pokazujemy'}. Dla oleju napędowego reguła myliła się o ${gr1(h, fo.ocena.mae)} wobec ${gr1(h, fo.ocena.maeStale)}, więc ${fo.publikowana ? 'kierunek pokazujemy' : 'prognozy kierunku nie ma'}. Zawsze pokazujemy za to widełki: po pięciu kolejnych ogłoszeniach benzyna 95 była w 8 przypadkach na 10 o ${h.gr(w5.dol, true)} do ${h.gr(w5.gora, true)} od ceny wyjściowej, dziś ${h.l(O.brutto.pb95)}. Test liczyliśmy krokowo: każdą zmianę przewidywaliśmy wyłącznie z wcześniejszych ogłoszeń. Wnioski: przewaga reguły to ułamek grosza, a niepewność jest większa niż sama prognoza. Liczby przeliczamy po każdym nowym ogłoszeniu.`;
    },
    faqs: (h) => [
      { q: 'Dlaczego prognoza myli się tak często?', a: 'Bo cena maksymalna idzie za hurtem z poprzedniego dnia, a hurt za notowaniami ropy i kursem dolara, których nikt nie zna z wyprzedzeniem. Ruch z ostatnich dni trochę się powtarza, ale niewiele. Dlatego wynik testu publikujemy obok prognozy i nie pokazujemy jej, gdy przegrywa z założeniem „bez zmian”.' },
      { q: 'Czy uwzględniacie cenę ropy Brent i kurs dolara?', a: 'Nie. Hurtowe ceny ORLEN, które najlepiej opisują jutrzejszą cenę, mają warunki zabraniające ponownego wykorzystania, a notowań Brent nie mamy z otwartego, urzędowego źródła. Prognoza korzysta wyłącznie z serii cen maksymalnych ogłoszonych przez ministra, żeby każdy mógł ją sprawdzić. Każdy punkt testu da się odtworzyć.' },
      { q: 'Co znaczy „8 przypadków na 10”?', a: `Dolna granica widełek to zmiana, poniżej której było 10 % przypadków, górna to zmiana, powyżej której było kolejne 10 %. Pomiędzy mieści się 8 zmian na 10. Dla benzyny 95 widełki na następne ogłoszenie policzyliśmy z ${h.num(h.D.widelki('pb95', 1).n)} zmian. Widełki przeliczamy po każdym nowym ogłoszeniu.` },
      { q: 'Jak daleko w przód sięga prognoza?', a: 'Na jedno ogłoszenie i na pięć ogłoszeń naprzód, czyli mniej więcej tydzień w dniach roboczych. Dalej widełki robią się tak szerokie, że nic nie mówią. Na scenariusz po końcu pakietu CPN, czyli od 1 stycznia 2027 r., jest osobna strona. Liczby przeliczamy po każdym ogłoszeniu.' },
    ],
    body: (h) => {
      const rows = (['pb95', 'pb98', 'on'] as const).map((p) => { const f = h.D.prog(p), w1 = h.D.widelki(p, 1), w5 = h.D.widelki(p, 5); return [h.fn(p), h.l(O.brutto[p]), gr1(h, f.ocena.mae), gr1(h, f.ocena.maeStale), f.publikowana ? 'tak' : 'nie', `${h.gr(w1.dol, true)} / ${h.gr(w1.gora, true)}`, `${h.gr(w5.dol, true)} / ${h.gr(w5.gora, true)}`]; });
      return `<h2>Prognoza cen paliw: wynik testu wstecznego</h2>
<p>Tabela zestawia dla każdego paliwa średni błąd reguły i średni błąd założenia „bez zmian” na tych samych punktach testu, a obok widełki na jedno i pięć ogłoszeń naprzód.</p>
${h.table(['Paliwo', 'Cena dziś', 'Błąd reguły', 'Błąd „bez zmian”', 'Kierunek', 'Widełki: 1', 'Widełki: 5'], rows, 'Średni błąd absolutny na litrze, test krokowy', ['l', 'r', 'r', 'r', 'l', 'r', 'r'])}
<h2>Jak działa reguła</h2>
<p>Przewidywana zmiana to średnia z kilku ostatnich zmian pomnożona przez współczynnik 0,5 albo 1. Liczbę zmian (1, 3 albo 5) i współczynnik wybieramy na danych sprzed prognozowanego dnia. Nie ma tu żadnej wiedzy o ropie, kursie ani polityce: tylko bezwładność samej ceny. Szczegóły i pełna tabela są w ${h.a('method', 'metodologii')}.</p>
<h2>Jak z tego korzystać</h2>
<p>Widełki mówią, ile ryzykujesz, odkładając tankowanie. Jeśli zmiana o górną granicę na Twoim baku to kilka złotych, czekanie nie ma sensu. Duży, jednokierunkowy ruch kilku ostatnich ogłoszeń widać na stronie ${h.a('historia', 'historia cen paliw')}.</p>`;
    },
  },
  en: {
    slug: 'fuel-price-forecast', nav: 'Fuel price forecast', card: 'Direction of the next change and its back-test error, with the range.',
    title: 'Fuel price forecast for Poland: direction and test error',
    description: 'Fuel price forecast for Poland’s next notice and five notices ahead: a range from real changes and a direction only where it beat the “no change” assumption.',
    h1: 'Fuel price forecast for the next notices',
    intro: (h) => `A fuel price forecast built from ${h.num(h.D.LISTA.length)} notices: a range for each fuel, and a direction only where the rule passed a back-test.`,
    resume: (h) => {
      const f = h.D.prog('pb95'), fo = h.D.prog('on'), w5 = h.D.widelki('pb95', 5);
      return `We publish a fuel price forecast only when, in a back-test, it beat the simplest assumption that the price will not change. For petrol 95 a simple rule based on recent changes missed by ${gr1(h, f.ocena.mae)} on average, against ${gr1(h, f.ocena.maeStale)} for “no change” (1 grosz, gr, is PLN 0.01), so ${f.publikowana ? `we show the direction: next price about ${h.l(f.cena)}` : 'we show no direction'}. For diesel the rule missed by ${gr1(h, fo.ocena.mae)} against ${gr1(h, fo.ocena.maeStale)}, so ${fo.publikowana ? 'we show the direction' : 'there is no directional forecast'}. We always show the range: five notices later, petrol 95 was 8 times out of 10 between ${h.gr(w5.dol, true)} and ${h.gr(w5.gora, true)} from its starting price, ${h.l(O.brutto.pb95)} today. The test was walk-forward: each change was predicted from earlier notices only. The upshot: the rule’s edge is a fraction of a grosz, and the uncertainty is larger than the forecast itself.`;
    },
    faqs: (h) => [
      { q: 'Why does the forecast miss so often?', a: 'Because the maximum price follows the previous day’s wholesale price, which follows oil quotes and the dollar rate, and nobody knows those in advance. Recent moves repeat a little, but not much. That is why the test result sits next to the forecast and the forecast is hidden when it loses to “no change”.' },
      { q: 'Do you use the Brent oil price and the dollar rate?', a: 'No. ORLEN wholesale prices, which best describe tomorrow’s price, come with terms that forbid reuse, and we have no open official source for Brent quotes. The forecast uses only the series of maximum prices announced by the minister, so anyone can check it.' },
      { q: 'What does “8 cases out of 10” mean?', a: `The low end of the range is the change below which 10% of cases fell, the high end the change above which another 10% fell. Between them lie 8 changes in 10. For petrol 95 the range for the next notice was computed from ${h.num(h.D.widelki('pb95', 1).n)} changes.` },
      { q: 'How far ahead does the forecast go?', a: 'One notice and five notices ahead, roughly a week of working days. Beyond that the range becomes so wide it says nothing. The scenario after the CPN (Lower Fuel Prices) package ends, from 1 January 2027, has its own page. Each figure is recomputed whenever a new notice is read.' },
    ],
    body: (h) => {
      const rows = (['pb95', 'pb98', 'on'] as const).map((p) => { const f = h.D.prog(p), w1 = h.D.widelki(p, 1), w5 = h.D.widelki(p, 5); return [h.fn(p), h.l(O.brutto[p]), gr1(h, f.ocena.mae), gr1(h, f.ocena.maeStale), f.publikowana ? 'yes' : 'no', `${h.gr(w1.dol, true)} / ${h.gr(w1.gora, true)}`, `${h.gr(w5.dol, true)} / ${h.gr(w5.gora, true)}`]; });
      return `<h2>Fuel price forecast: back-test result</h2>
<p>For each fuel the table sets the rule’s average error against the “no change” error on the same test points, with the range one and five notices ahead.</p>
${h.table(['Fuel', 'Price today', 'Rule error', '“No change” error', 'Direction', 'Range: 1', 'Range: 5'], rows, 'Mean absolute error per litre, walk-forward test', ['l', 'r', 'r', 'r', 'l', 'r', 'r'])}
<h2>How the rule works</h2>
<p>The expected change is the average of the last few changes times a factor of 0.5 or 1. The number of changes (1, 3 or 5) and the factor are chosen on data before the day being forecast. There is no knowledge of oil, exchange rates or politics here: only the inertia of the price itself. Details and the full table are in the ${h.a('method', 'method')}.</p>
<h2>How to use it</h2>
<p>The range tells you what you risk by putting off a fill. If a move to the top of the range is a few zloty on your tank, waiting is pointless. A large one-way move over recent notices shows on the ${h.a('historia', 'fuel price history')} page.</p>`;
    },
  },
});
