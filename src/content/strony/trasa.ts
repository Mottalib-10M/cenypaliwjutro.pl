import { defineStrona } from '../../lib/strona-typy';
import { O, EX } from '../wspolne';
import { trasa } from '../../lib/engine/koszty';

/** Distances rondes pour le tableau (aucune distance réelle saisie à la main). */
const KM = [50, 100, 300, 500, 800];

export default defineStrona({
  id: 'trasa', group: 'koszty', order: 1, tool: 'trasa',
  related: ['benzyna95', 'diesel', 'lpg', 'europa'],
  sources: ['mpObw', 'wob'],
  pl: {
    slug: 'koszt-przejazdu', nav: 'Koszt przejazdu', card: 'Ile kosztuje paliwo na trasę, w obie strony i na osobę.',
    title: 'Koszt przejazdu samochodem: paliwo na trasę i na osobę',
    description: 'Koszt przejazdu samochodem po cenie maksymalnej paliw: ile paliwa i złotych na trasę w jedną stronę lub w obie, z podziałem na osoby, dla benzyny, ON i LPG.',
    h1: 'Koszt przejazdu samochodem: kalkulator paliwa',
    intro: (h) => `Koszt przejazdu samochodem ${h.num(EX.trasa_km)} km na benzynie 95 to dziś najwyżej ${h.zl(trasa(EX.trasa_km, EX.spalanie_pb, O.brutto.pb95).koszt, 2)} przy ${h.num(EX.spalanie_pb, 1)} l/100 km.`,
    resume: (h) => {
      const b = trasa(EX.trasa_km, EX.spalanie_pb, O.brutto.pb95), d = trasa(EX.trasa_km, EX.spalanie_on, O.brutto.on), g = trasa(EX.trasa_km, EX.spalanie_lpg, h.D.LPG_ZL);
      return `Koszt paliwa na trasę to liczba kilometrów razy spalanie na 100 km razy cena litra. Na ${h.num(EX.trasa_km)} km samochód spalający ${h.num(EX.spalanie_pb, 1)} l/100 km zużyje ${h.num(b.litry, 1)} litra benzyny 95, co przy cenie maksymalnej ${h.l(O.brutto.pb95)} z obwieszczenia ogłoszonego ${h.date(O.ogl)} daje najwyżej ${h.zl(b.koszt, 2)}, a w obie strony ${h.zl(b.koszt * 2, 2)}. Diesel spalający ${h.num(EX.spalanie_on, 1)} l/100 km na tej samej trasie kosztuje ${h.zl(d.koszt, 2)}, a auto na LPG przy ${h.num(EX.spalanie_lpg, 1)} l/100 km i średniej cenie autogazu ${h.l(h.D.LPG_ZL)} około ${h.zl(g.koszt, 2)}. Przy czterech osobach w samochodzie benzyna na trasę ${h.num(EX.trasa_km)} km to ${h.zl(b.koszt / 4, 2)} na osobę. Kalkulator przyjmuje Twój dystans, spalanie, paliwo, liczbę pasażerów i przejazd w obie strony. Opłat za autostrady nie liczymy. Opłat za autostrady i parkingi nie liczymy, bo zależą od trasy.`;
    },
    faqs: (h) => [
      { q: 'Jakie spalanie wpisać?', a: 'Najlepiej średnie z komputera pokładowego albo z kilku tankowań do pełna: litry zatankowane podzielone przez przejechane kilometry, razy 100. Spalanie katalogowe bywa niższe od rzeczywistego, szczególnie przy szybkiej jeździe autostradą, zimą i z obciążonym bagażnikiem. Koszt rośnie proporcjonalnie do spalania.' },
      { q: 'Jak podzielić koszt paliwa między pasażerów?', a: 'Kalkulator dzieli koszt paliwa równo przez liczbę osób, łącznie z kierowcą. Wspólne przejazdy często rozliczają też zużycie auta i opłaty drogowe; to już sprawa umowy między wami. Link do wyniku możesz wysłać pasażerom. Przejazd w obie strony podwaja zużycie paliwa.' },
      { q: 'Czy w trasie zatankuję drożej?', a: `Nie drożej niż cena maksymalna, także na stacjach przy autostradach: limit dotyczy wszystkich stacji w kraju. Dziś to ${h.l(O.brutto.pb95)} za benzynę 95 i ${h.l(O.brutto.on)} za olej napędowy. Za granicą limitu nie ma, a ceny porównasz na stronie ${h.a('europa', 'ceny paliw w Europie')}.` },
    ],
    body: (h) => `<h2>Koszt przejazdu na typowych dystansach</h2>
${h.table(['Dystans', h.fn('pb95'), h.fn('on'), h.fn('lpg')], KM.map((k) => [`${h.num(k)} km`, h.zl(trasa(k, EX.spalanie_pb, O.brutto.pb95).koszt, 2), h.zl(trasa(k, EX.spalanie_on, O.brutto.on).koszt, 2), h.zl(trasa(k, EX.spalanie_lpg, h.D.LPG_ZL).koszt, 2)]), `Spalanie ${h.num(EX.spalanie_pb, 1)} / ${h.num(EX.spalanie_on, 1)} / ${h.num(EX.spalanie_lpg, 1)} l/100 km; ceny maksymalne z ${h.date(O.ogl)}, LPG średnia tygodniowa`, ['l', 'r', 'r', 'r'])}
<h2>Paliwo to nie cały koszt</h2>
<p>Kalkulator liczy tylko paliwo. Do kosztu jazdy dochodzą opony, serwis, ubezpieczenie, utrata wartości i opłaty za płatne odcinki autostrad. Na krótkich trasach paliwo jest zwykle największą zmienną pozycją, dlatego właśnie je liczymy z oficjalnej ceny. Roczny budżet na paliwo pokazują strony ${h.a('benzyna95', 'cena benzyny 95')} i ${h.a('diesel', 'cena diesla')}.</p>`,
  },
  en: {
    slug: 'trip-fuel-cost', nav: 'Trip fuel cost', card: 'What the fuel for a journey costs, return and per person.',
    title: 'Trip fuel cost in Poland: fuel for a route and per person',
    description: 'Trip fuel cost in Poland at the maximum fuel price: litres and zloty for a one-way or return journey, split between passengers, for petrol, diesel and LPG.',
    h1: 'Trip fuel cost in Poland: calculator',
    intro: (h) => `The trip fuel cost for ${h.num(EX.trasa_km)} km in Poland on petrol 95 is at most ${h.zl(trasa(EX.trasa_km, EX.spalanie_pb, O.brutto.pb95).koszt, 2)} today at ${h.num(EX.spalanie_pb, 1)} l/100 km.`,
    resume: (h) => {
      const b = trasa(EX.trasa_km, EX.spalanie_pb, O.brutto.pb95), d = trasa(EX.trasa_km, EX.spalanie_on, O.brutto.on), g = trasa(EX.trasa_km, EX.spalanie_lpg, h.D.LPG_ZL);
      return `The fuel cost of a journey is the kilometres times consumption per 100 km times the price of a litre. Over ${h.num(EX.trasa_km)} km, a car using ${h.num(EX.spalanie_pb, 1)} l/100 km burns ${h.num(b.litry, 1)} litres of petrol 95, which at the maximum price of ${h.l(O.brutto.pb95)} from the notice announced on ${h.date(O.ogl)} comes to at most ${h.zl(b.koszt, 2)}, or ${h.zl(b.koszt * 2, 2)} return. A diesel using ${h.num(EX.spalanie_on, 1)} l/100 km on the same route costs ${h.zl(d.koszt, 2)}, and a car on LPG (autogas) at ${h.num(EX.spalanie_lpg, 1)} l/100 km and the average autogas price of ${h.l(h.D.LPG_ZL)} about ${h.zl(g.koszt, 2)}. With four people in the car, petrol for ${h.num(EX.trasa_km)} km is ${h.zl(b.koszt / 4, 2)} each. The calculator takes your distance, consumption, fuel, number of passengers and return trip. Motorway tolls are not included. Tolls and parking are extra.`;
    },
    faqs: (h) => [
      { q: 'What consumption should I enter?', a: 'Ideally the average from your trip computer or from several fill-ups to full: litres filled divided by kilometres driven, times 100. Official consumption figures are often below real life, especially at motorway speed, in winter and with a loaded boot. The cost scales in proportion.' },
      { q: 'How should fuel be split between passengers?', a: 'The calculator divides the fuel cost equally by the number of people, driver included. Shared rides often also cover wear and road tolls; that is for you to agree. You can send the link to the result to your passengers. A return trip doubles the fuel.' },
      { q: 'Will fuel cost more on the motorway?', a: `Not above the maximum price, motorway stations included: the cap applies to every station in Poland. Today that is ${h.l(O.brutto.pb95)} for petrol 95 and ${h.l(O.brutto.on)} for diesel. Abroad there is no cap; compare prices on the ${h.a('europa', 'fuel prices in Europe')} page.` },
    ],
    body: (h) => `<h2>Trip fuel cost over typical distances</h2>
${h.table(['Distance', h.fn('pb95'), h.fn('on'), h.fn('lpg')], KM.map((k) => [`${h.num(k)} km`, h.zl(trasa(k, EX.spalanie_pb, O.brutto.pb95).koszt, 2), h.zl(trasa(k, EX.spalanie_on, O.brutto.on).koszt, 2), h.zl(trasa(k, EX.spalanie_lpg, h.D.LPG_ZL).koszt, 2)]), `Consumption ${h.num(EX.spalanie_pb, 1)} / ${h.num(EX.spalanie_on, 1)} / ${h.num(EX.spalanie_lpg, 1)} l/100 km; maximum prices of ${h.date(O.ogl)}, LPG weekly average`, ['l', 'r', 'r', 'r'])}
<h2>Fuel is not the whole cost</h2>
<p>The calculator counts fuel only. Tyres, servicing, insurance, depreciation and tolls on paid motorway sections add to the cost of driving. On short journeys fuel is usually the largest variable item, which is why we price it from the official cap. Yearly fuel budgets are on the ${h.a('benzyna95', 'petrol 95 price')} and ${h.a('diesel', 'diesel price')} pages.</p>`,
  },
});
