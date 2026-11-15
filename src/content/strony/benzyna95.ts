import { defineStrona } from '../../lib/strona-typy';
import { O, zm, kiedy, rok, EX, po2027, sk } from '../wspolne';
import { rocznie } from '../../lib/engine/koszty';

export default defineStrona({
  id: 'benzyna95', group: 'ceny', order: 4, tool: 'koszt', toolProps: { paliwo: 'pb95' },
  related: ['benzyna98', 'jutro', 'trasa', 'lpg'],
  sources: ['mpObw', 'ustawa415', 'wob'],
  pl: {
    slug: 'cena-benzyny-95', nav: 'Cena benzyny 95', card: 'Cena maksymalna benzyny 95, koszt baku i roczny budżet na benzynę.',
    title: 'Cena benzyny 95 dziś: limit, koszt baku i roku jazdy',
    description: 'Cena benzyny 95 dziś: cena maksymalna z ostatniego obwieszczenia, zmiana wobec poprzedniego, koszt pełnego baku i roczny budżet na paliwo przy Twoim przebiegu.',
    h1: 'Cena benzyny 95 dziś i koszt tankowania',
    intro: (h) => `Cena benzyny 95 dziś to najwyżej ${h.l(O.brutto.pb95)} (${h.gr(zm('pb95'), true)} wobec poprzedniego ogłoszenia), ważne ${kiedy(h, O)}.`,
    resume: (h) => {
      const s = h.D.stat('pb95'), r = rok('pb95'), sr = h.D.zlL(h.D.WOB_OST.pb95);
      return `Benzyna bezołowiowa 95 (Pb95) kosztuje dziś najwyżej ${h.l(O.brutto.pb95)}: tyle wynosi cena maksymalna z VAT z obwieszczenia ogłoszonego ${h.dateK(O.ogl)} Pełny bak 50 litrów to ${h.zl(O.brutto.pb95 * 50, 2)}, a przy ${h.num(EX.km_rok)} km rocznie i spalaniu ${h.num(EX.spalanie_pb, 1)} l/100 km benzyna kosztuje ${h.zl(r.koszt)} na rok, czyli ${h.zl(r.miesiac)} miesięcznie. Od pierwszego obwieszczenia cena maksymalna benzyny 95 wahała się od ${h.l(s.min)} do ${h.l(s.max)}, średnio ${h.l(s.srednia)} w ${h.num(s.n)} ogłoszeniach. Faktyczna średnia na stacjach w tygodniu od ${h.date(h.D.WOB_OST.d)} według tygodniowego biuletynu cen paliw Komisji Europejskiej wynosiła ${h.l(sr)}, czyli ${h.gr(sr - (h.D.maxWTygodniu(h.D.WOB_OST.d, 'pb95') ?? O.brutto.pb95), true)} wobec limitu z tego poniedziałku. Kalkulator liczy koszt tankowania i roczny budżet przy Twoim spalaniu i przebiegu. Limit dotyczy wszystkich stacji w kraju, także przy autostradach, a stacje mogą sprzedawać taniej, ale nigdy drożej.`;
    },
    faqs: (h) => [
      { q: 'Czy benzyna 95 E10 (z bioetanolem) kosztuje tyle samo?', a: 'Tak. Od 2024 r. standardowa benzyna 95 na polskich stacjach to E10, z dodatkiem do 10 % bioetanolu, i właśnie jej dotyczy cena maksymalna. Starsze samochody, które nie tolerują E10, mogą tankować benzynę 98, sprzedawaną jako E5; jej limit jest wyższy.' },
      { q: 'Ile kosztuje 1 km jazdy na benzynie 95?', a: `Przy spalaniu ${h.num(EX.spalanie_pb, 1)} l/100 km i dzisiejszym limicie ${h.l(O.brutto.pb95)} kilometr kosztuje ${h.zl(rok('pb95').naKm, 2)}, a 100 km ${h.zl(rok('pb95').na100, 2)}. Wpisz swoje spalanie w kalkulator, bo różnica między małym autem miejskim a SUV-em to często dwukrotność. Koszt kilometra rośnie proporcjonalnie do spalania i ceny litra.` },
      { q: 'Ile będzie kosztować benzyna 95 w 2027 r.?', a: `Jeśli pakiet „Ceny Paliw Niżej” (CPN) wygaśnie, a hurt się nie zmieni, około ${h.l(po2027('pb95'))}, czyli o ${h.gr(po2027('pb95') - sk('pb95').brutto)} więcej na litrze. To scenariusz z VAT 23 % i pełną akcyzą, a nie prognoza rynku; liczy go strona ${h.a('po2027', 'ceny paliw 2027')}. Wyższy hurt w styczniu zwiększyłby tę różnicę.` },
      { q: 'Czy na stacji benzyna 95 może być tańsza niż limit?', a: `Tak, limit to cena najwyższa. Średnia z biuletynu Komisji Europejskiej pokazuje, że w wielu tygodniach przeciętna cena była nieco niższa niż cena maksymalna. Porównanie tydzień po tygodniu znajdziesz na stronie ${h.a('srednia', 'średnie ceny paliw')}. Taniej często sprzedają stacje przy marketach i duże sieci, które konkurują ceną.` },
    ],
    body: (h) => {
      const tab = [4, 5, 6, 7, 8, 10].map((sp) => { const r = rocznie(EX.km_rok, sp, O.brutto.pb95); return [`${h.num(sp, 1)} l/100 km`, h.zl(r.na100, 2), h.zl(r.miesiac), h.zl(r.koszt)]; });
      const m = h.D.mies('pb95');
      return `<h2>Cena benzyny 95 a spalanie: ile kosztuje miesiąc</h2>
<p>Ten sam przebieg ${h.num(EX.km_rok)} km rocznie przy różnym spalaniu, wyceniony po dzisiejszej cenie maksymalnej ${h.l(O.brutto.pb95)}.</p>
${h.table(['Spalanie', '100 km', 'Miesiąc', 'Rok'], tab, `Benzyna 95 po cenie maksymalnej z ${h.date(O.ogl)}`, ['l', 'r', 'r', 'r'])}
<h2>Średnia cena maksymalna benzyny 95 w kolejnych miesiącach</h2>
<p>W miesiącach, których brak w tabeli (na przykład w lipcu i we wrześniu 2026 r.), ceny maksymalnej nie było: rząd nie obniżył wtedy VAT na paliwa.</p>
${h.table(['Miesiąc', 'Średnia', 'Najniższa', 'Najwyższa', 'Ogłoszenia'], m.map((x) => [h.miesiac(x.m), h.l(x.srednia), h.l(x.min), h.l(x.max), x.n]), 'Średnia z ogłoszeń, które zaczęły obowiązywać w danym miesiącu', ['l', 'r', 'r', 'r', 'r'])}
<p>Dzienną historię pokazuje ${h.a('historia', 'historia cen paliw')}, a koszt konkretnej trasy ${h.a('trasa', 'koszt przejazdu')}.</p>`;
    },
  },
  en: {
    slug: 'petrol-95-price', nav: 'Petrol 95 price', card: 'Pb95 maximum price, cost of a tank and a yearly petrol budget.',
    title: 'Petrol 95 price in Poland today: cap, tank and year cost',
    description: 'Petrol 95 price in Poland today: the maximum price from the latest notice, the change on the previous one, the cost of a full tank and a yearly budget.',
    h1: 'Petrol 95 price in Poland today and fill cost',
    intro: (h) => `The petrol 95 price in Poland today is at most ${h.l(O.brutto.pb95)} (${h.gr(zm('pb95'), true)} on the previous notice), valid ${kiedy(h, O)}.`,
    resume: (h) => {
      const s = h.D.stat('pb95'), r = rok('pb95'), sr = h.D.zlL(h.D.WOB_OST.pb95);
      return `Unleaded petrol 95 (Pb95) costs at most ${h.l(O.brutto.pb95)} in Poland today: that is the VAT-inclusive maximum price from the notice announced on ${h.dateK(O.ogl)} A full 50-litre tank is ${h.zl(O.brutto.pb95 * 50, 2)}, and at ${h.num(EX.km_rok)} km a year and ${h.num(EX.spalanie_pb, 1)} l/100 km, petrol costs ${h.zl(r.koszt)} a year, or ${h.zl(r.miesiac)} a month. Since the first notice the petrol 95 cap has ranged from ${h.l(s.min)} to ${h.l(s.max)}, averaging ${h.l(s.srednia)} over ${h.num(s.n)} notices. The actual average at the pump in the week of ${h.date(h.D.WOB_OST.d)}, according to the Weekly Oil Bulletin, was ${h.l(sr)}, which is ${h.gr(sr - (h.D.maxWTygodniu(h.D.WOB_OST.d, 'pb95') ?? O.brutto.pb95), true)} against that Monday’s cap. The calculator works out the cost of a fill and a yearly budget at your consumption and mileage. The cap applies at every station in the country, motorway stations included.`;
    },
    faqs: (h) => [
      { q: 'Does E10 petrol 95 cost the same?', a: 'Yes. Since 2024 standard petrol 95 at Polish stations is E10, with up to 10% bioethanol, and that is the fuel the maximum price covers. Older cars that cannot take E10 can use petrol 98, sold as E5; its cap is higher.' },
      { q: 'What does 1 km on petrol 95 cost?', a: `At ${h.num(EX.spalanie_pb, 1)} l/100 km and today’s cap of ${h.l(O.brutto.pb95)}, a kilometre costs ${h.zl(rok('pb95').naKm, 2)} and 100 km ${h.zl(rok('pb95').na100, 2)}. Enter your own consumption in the calculator, since a small city car and an SUV often differ by a factor of two.` },
      { q: 'What will petrol 95 cost in 2027?', a: `If the CPN (Lower Fuel Prices) package lapses and wholesale stays put, about ${h.l(po2027('pb95'))}, or ${h.gr(po2027('pb95') - sk('pb95').brutto)} more a litre. That is a scenario with 23% VAT and full excise, not a market forecast; the ${h.a('po2027', 'fuel prices 2027')} page works it out.` },
      { q: 'Can petrol 95 be cheaper than the cap at a station?', a: `Yes, the cap is the highest price. The Weekly Oil Bulletin average shows that in many weeks the typical price was slightly below the maximum. The week-by-week comparison is on the ${h.a('srednia', 'average fuel prices')} page. Supermarket stations and large chains are often the ones that sell below the maximum price.` },
    ],
    body: (h) => {
      const tab = [4, 5, 6, 7, 8, 10].map((sp) => { const r = rocznie(EX.km_rok, sp, O.brutto.pb95); return [`${h.num(sp, 1)} l/100 km`, h.zl(r.na100, 2), h.zl(r.miesiac), h.zl(r.koszt)]; });
      const m = h.D.mies('pb95');
      return `<h2>Petrol 95 price and consumption: what a month costs</h2>
<p>The same ${h.num(EX.km_rok)} km a year at different consumption, priced at today’s cap of ${h.l(O.brutto.pb95)}.</p>
${h.table(['Consumption', '100 km', 'Month', 'Year'], tab, `Petrol 95 at the maximum price of ${h.date(O.ogl)}`, ['l', 'r', 'r', 'r'])}
<h2>Average petrol 95 maximum price by month</h2>
<p>Months missing from the table had no maximum price: the government had not cut VAT on fuel then.</p>
${h.table(['Month', 'Average', 'Lowest', 'Highest', 'Notices'], m.map((x) => [h.miesiac(x.m), h.l(x.srednia), h.l(x.min), h.l(x.max), x.n]), 'Average of notices that took effect in the month', ['l', 'r', 'r', 'r', 'r'])}
<p>The daily history is in the ${h.a('historia', 'fuel price history')}, and the cost of a given journey in ${h.a('trasa', 'trip fuel cost')}.</p>`;
    },
  },
});
