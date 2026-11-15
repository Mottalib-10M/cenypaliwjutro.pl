import { defineStrona } from '../../lib/strona-typy';
import { O, kiedy } from '../wspolne';
import { P } from '../../lib/params';

export default defineStrona({
  id: 'kontrola', group: 'ceny', order: 8, tool: 'kontrola',
  related: ['cena-maksymalna', 'cpn', 'historia', 'srednia'],
  sources: ['ustawa415', 'mpObw', 'govplEnergia'],
  pl: {
    slug: 'stacja-drozej-niz-cena-maksymalna', nav: 'Stacja drożej niż limit', card: 'Sprawdź paragon: czy stacja sprzedała drożej niż cena maksymalna.',
    title: 'Stacja drożej niż cena maksymalna: sprawdź paragon',
    description: 'Stacja drożej niż cena maksymalna? Wpisz datę, paliwo, cenę z paragonu i litry: porównamy je z obwieszczeniem z tego dnia i podpowiemy, gdzie to zgłosić.',
    h1: 'Stacja drożej niż cena maksymalna?',
    intro: (h) => `Stacja drożej niż cena maksymalna łamie prawo: od ${h.dzienD(O.od)} limit to ${h.l(O.brutto.pb95)} za benzynę 95 i ${h.l(O.brutto.on)} za olej napędowy.`,
    resume: (h) => `Każda stacja w Polsce musi stosować cenę maksymalną ogłoszoną przez Ministra Energii na dany dzień. Sprzedaż drożej grozi karą pieniężną do ${h.zl(P.cena_maksymalna.kara_max)} , a kontrole prowadzi Krajowa Administracja Skarbowa (KAS). Aby sprawdzić tankowanie, potrzebujesz paragonu: daty, rodzaju paliwa, ceny za litr i liczby litrów. Kalkulator znajduje obwieszczenie obowiązujące tego dnia, z uwzględnieniem weekendów i świąt, porównuje cenę i liczy nadpłatę. Na przykład przy obecnym limicie ${h.l(O.brutto.pb95)} cena 10 groszy wyższa przy 40 litrach to ${h.zl(0.1 * 40, 2)} nadpłaty. Ostatnie ogłoszenie, z ${h.date(O.ogl)}, obowiązuje ${kiedy(h, O)}. Pamiętaj, że cena na pylonie rano po zmianie może być jeszcze wczorajsza: liczy się cena maksymalna z dnia tankowania, a nie z dnia ogłoszenia. Wynik możesz wydrukować i dołączyć do zgłoszenia.`,
    faqs: (h) => [
      { q: 'Gdzie zgłosić stację, która sprzedaje drożej?', a: 'Do Krajowej Administracji Skarbowej, czyli do urzędu skarbowego albo izby administracji skarbowej właściwej dla miejsca stacji, która kontroluje przestrzeganie ceny maksymalnej. Zachowaj paragon lub fakturę i zrób zdjęcie pylonu i dystrybutora z ceną. Opisz datę, godzinę, adres stacji i rodzaj paliwa.' },
      { q: 'Czy odzyskam nadpłatę?', a: 'Kara nakładana na stację trafia do budżetu, nie do klienta. Zwrotu nadpłaty możesz dochodzić od stacji jako reklamacji albo z pomocą rzecznika konsumentów w swoim powiecie. Kwoty są zwykle małe, dlatego najprościej zgłosić sprawę na miejscu kierownikowi stacji z paragonem w ręku.' },
      { q: 'Czy cena maksymalna dotyczy myjni, AdBlue i paliw premium?', a: 'Dotyczy tylko benzyny 95, benzyny 98 i oleju napędowego sprzedawanych na stacji. Usługi, AdBlue, LPG (autogaz) i inne produkty nie są objęte limitem. Paliwa premium o tych samych parametrach co benzyna 95, 98 albo olej napędowy muszą mieścić się w limicie. Sprawdź nazwę paliwa na paragonie.' },
      { q: 'Co, jeśli tankowałem w nocy, gdy zmieniała się cena?', a: 'Cena obowiązuje przez cały dzień kalendarzowy. Tankowanie przed północą rozlicza się według ceny z tego dnia, po północy według ceny z następnego. Wpisz datę z paragonu; godzina nie ma znaczenia dla limitu. Kalkulator stosuje tę samą zasadę i bierze cenę z dnia zapisanego na paragonie, z uwzględnieniem weekendów.' },
    ],
    body: (h) => `<h2>Stacja drożej niż cena maksymalna: jak to sprawdzić krok po kroku</h2>
<p>Najpierw znajdź na paragonie datę, paliwo i cenę jednostkową. Potem wpisz je w kalkulator: on sam ustali, które obwieszczenie obowiązywało, także w weekend lub święto, kiedy obowiązuje cena z ostatniego dnia roboczego. Jeśli cena z paragonu jest wyższa, wynik podaje nadpłatę i źródło limitu z numerem pozycji w Monitorze Polskim, który możesz dołączyć do zgłoszenia.</p>
<h2>Ostatnie limity do porównania</h2>
${h.table(['Obowiązuje', 'Benzyna 95', 'Benzyna 98', 'Olej napędowy'], h.D.LISTA.slice(-5).reverse().map((o) => [kiedy(h, o), h.l(o.brutto.pb95), h.l(o.brutto.pb98), h.l(o.brutto.on)]), 'Ceny maksymalne z VAT z pięciu ostatnich ogłoszeń', ['l', 'r', 'r', 'r'])}
<p>Starsze ceny znajdziesz w ${h.a('historia', 'historii cen paliw')}. Tankowanie poniżej limitu jest zgodne z prawem: limit to cena najwyższa, nie obowiązkowa.</p>`,
  },
  en: {
    slug: 'station-above-maximum-price', nav: 'Station above the cap', card: 'Check a receipt: did a station sell above the maximum price?',
    title: 'Station above the maximum price in Poland: check a receipt',
    description: 'Station above the maximum price in Poland? Enter the date, fuel, receipt price and litres: we compare them with that day’s notice and say where to report it.',
    h1: 'Station above the maximum price in Poland?',
    intro: (h) => `A station above the maximum price in Poland breaks the law: from ${h.dzienD(O.od)} the cap is ${h.l(O.brutto.pb95)} for petrol 95 and ${h.l(O.brutto.on)} for diesel.`,
    resume: (h) => `Every station in Poland must apply the maximum price announced by the Minister of Energy for the day. Selling above it carries a fine of up to ${h.zl(P.cena_maksymalna.kara_max)} under Article 63(18) of the Stocks Act, and the National Revenue Administration (KAS) carries out checks. To check a fill you need the receipt: the date, the fuel, the price per litre and the number of litres. The calculator finds the notice in force that day, taking weekends and holidays into account, compares the price and works out any overcharge. For example, with today’s cap of ${h.l(O.brutto.pb95)}, a price 10 grosze higher on 40 litres is ${h.zl(0.1 * 40, 2)} overpaid (1 grosz is PLN 0.01). The latest notice, of ${h.date(O.ogl)}, applies ${kiedy(h, O)}. Remember that the price board early in the morning after a change may still show yesterday’s price: what counts is the maximum price on the day you filled up, not the day it was announced.`,
    faqs: (h) => [
      { q: 'Where do I report a station charging more?', a: 'To the National Revenue Administration (KAS), meaning the tax office or revenue administration chamber for the station’s area, which checks compliance with the maximum price. Keep the receipt or invoice and photograph the price board and the pump. Note the date, time, station address and fuel.' },
      { q: 'Will I get the overcharge back?', a: 'The fine on the station goes to the state budget, not to the customer. You can claim the overcharge from the station as a complaint, or with help from the consumer ombudsman in your district. Sums are usually small, so the easiest step is to raise it with the station manager on the spot, receipt in hand.' },
      { q: 'Does the cap cover car washes, AdBlue and premium fuels?', a: 'It covers only petrol 95, petrol 98 and diesel sold at the station. Services, AdBlue, LPG and other products are not capped. Premium fuels with the same specification as petrol 95, 98 or diesel must stay within the cap. Check the fuel name on the receipt.' },
      { q: 'What if I filled up at night as the price changed?', a: 'A price applies for the whole calendar day. A fill before midnight is settled at that day’s price, one after midnight at the next day’s. Enter the date on the receipt; the time does not matter for the cap. The calculator applies the same rule.' },
    ],
    body: (h) => `<h2>Station above the maximum price: how to check, step by step</h2>
<p>First find the date, fuel and unit price on the receipt. Then enter them in the calculator: it works out which notice applied, including at weekends or holidays, when the price from the last working day applies. If the receipt price is higher, the result gives the overcharge and the source of the cap with its Monitor Polski item number, which you can attach to a report.</p>
<h2>Latest caps for comparison</h2>
${h.table(['In force', 'Petrol 95', 'Petrol 98', 'Diesel'], h.D.LISTA.slice(-5).reverse().map((o) => [kiedy(h, o), h.l(o.brutto.pb95), h.l(o.brutto.pb98), h.l(o.brutto.on)]), 'Maximum prices including VAT from the five latest notices', ['l', 'r', 'r', 'r'])}
<p>Older prices are in the ${h.a('historia', 'fuel price history')}. Buying below the cap is lawful: the cap is the highest price, not a required one.</p>`,
  },
});
