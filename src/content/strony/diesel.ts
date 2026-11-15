import { defineStrona } from '../../lib/strona-typy';
import { O, zm, kiedy, rok, EX, po2027, sk, euZl } from '../wspolne';

export default defineStrona({
  id: 'diesel', group: 'ceny', order: 6, tool: 'koszt', toolProps: { paliwo: 'on' },
  related: ['benzyna95', 'akcyza', 'europa', 'po2027'],
  sources: ['mpObw', 'ustawa415', 'oplata2026', 'akcyza1289'],
  pl: {
    slug: 'cena-diesla', nav: 'Cena diesla', card: 'Cena maksymalna oleju napędowego, różnica do benzyny i koszt jazdy.',
    title: 'Cena diesla dziś: limit ON, różnica do benzyny i koszt',
    description: 'Cena diesla dziś: cena maksymalna oleju napędowego z obwieszczenia, dlaczego jest wyższa niż benzyny, koszt baku i roku jazdy oraz porównanie z sąsiadami.',
    h1: 'Cena diesla dziś: olej napędowy',
    intro: (h) => `Cena diesla dziś to najwyżej ${h.l(O.brutto.on)} oleju napędowego (${h.gr(zm('on'), true)} wobec poprzedniej ceny), ważne ${kiedy(h, O)}.`,
    resume: (h) => {
      const s = h.D.stat('on'), r = rok('on');
      return `Olej napędowy (ON) kosztuje dziś najwyżej ${h.l(O.brutto.on)}, o ${h.gr(O.brutto.on - O.brutto.pb95)} więcej niż benzyna 95. To cena maksymalna z VAT z obwieszczenia ogłoszonego ${h.dateK(O.ogl)} Pełny bak 50 litrów kosztuje ${h.zl(O.brutto.on * 50, 2)}. Samochód z silnikiem diesla spalający ${h.num(EX.spalanie_on, 1)} l/100 km przy ${h.num(EX.km_rok)} km rocznie zużyje paliwa za ${h.zl(r.koszt)}, czyli ${h.zl(r.miesiac)} miesięcznie. Od pierwszego obwieszczenia cena maksymalna diesla wahała się od ${h.l(s.min)} do ${h.l(s.max)}, średnio ${h.l(s.srednia)}. Olej napędowy jest droższy z dwóch powodów: cena hurtowa oleju napędowego wynika z ogłoszenia jako ${h.l(sk('on').hurt)} wobec ${h.l(sk('pb95').hurt)} dla benzyny, a opłata paliwowa od litra ON wynosi ${h.l(sk('on').oplata)} wobec ${h.l(sk('pb95').oplata)} od benzyny. Kalkulator liczy koszt tankowania i roczny budżet. Limit obowiązuje także na stacjach przy autostradach.`;
    },
    faqs: (h) => [
      { q: 'Czy olej napędowy zimowy kosztuje więcej?', a: 'Nie w zakresie limitu. Cena maksymalna dotyczy oleju napędowego bez względu na klasę, więc olej przejściowy i zimowy, sprzedawany od jesieni, mają ten sam limit. Paliwa premium sprzedawane pod własnymi nazwami handlowymi także muszą się w nim zmieścić, jeśli są olejem napędowym.' },
      { q: 'Czy firmy transportowe płacą tę samą cenę?', a: 'Cena maksymalna dotyczy sprzedaży detalicznej na stacjach. Duzi odbiorcy kupujący w hurcie, z bazy albo na kartach flotowych z rabatem płacą według własnych umów. Przedsiębiorca może odliczyć VAT od paliwa na zasadach ogólnych, więc dla niego liczy się cena netto z obwieszczenia.' },
      { q: 'Ile będzie kosztował diesel w 2027 r.?', a: `Jeśli VAT wróci do 23 %, akcyza do stawki ustawowej, a hurt zostanie na dzisiejszym poziomie, około ${h.l(po2027('on'))}, o ${h.gr(po2027('on') - sk('on').brutto)} więcej na litrze. Scenariusz uwzględnia też wyższą opłatę paliwową na 2027 r.; liczy go strona ${h.a('po2027', 'ceny paliw 2027')}.` },
      { q: 'Gdzie w Europie diesel jest tańszy?', a: `Według tygodniowego biuletynu cen paliw Komisji Europejskiej średnia cena diesla w Polsce wynosiła ${h.l(h.D.zlL(h.D.WOB_OST.on))}, w Niemczech ${h.l(euZl('DE', 'on') ?? 0)}, w Czechach ${h.l(euZl('CZ', 'on') ?? 0)}. Pełne porównanie 27 krajów jest na stronie ${h.a('europa', 'ceny paliw w Europie')}. Wszystkie liczby to średnie krajowe z poniedziałku, przeliczone po kursie podanym w biuletynie.` },
    ],
    body: (h) => {
      const d = sk('on'), b = sk('pb95');
      const m = h.D.mies('on');
      return `<h2>Cena diesla a benzyny: skąd różnica</h2>
<p>Tabela rozkłada obie ceny maksymalne z ostatniego ogłoszenia ministra na te same składniki. Akcyza od oleju napędowego jest niższa niż od benzyny, ale opłata paliwowa i cena hurtowa są wyższe.</p>
${h.table(['Składnik na litrze', 'Olej napędowy', 'Benzyna 95'], [['Cena hurtowa paliwa', h.l(d.hurt), h.l(b.hurt)], ['Akcyza', h.l(d.akcyza), h.l(b.akcyza)], ['Opłata paliwowa', h.l(d.oplata), h.l(b.oplata)], ['Koszty i marża stacji', h.l(d.marza), h.l(b.marza)], ['VAT', h.l(d.vat), h.l(b.vat)], ['Cena maksymalna', h.l(d.brutto), h.l(b.brutto)]], `Skład ceny maksymalnej z ogłoszenia z ${h.date(O.ogl)}`, ['l', 'r', 'r'])}
<h2>Średnia cena maksymalna diesla w kolejnych miesiącach</h2>
<p>W miesiącach, których brak w tabeli, ceny maksymalnej nie było: rząd nie obniżył wtedy VAT na paliwa.</p>
${h.table(['Miesiąc', 'Średnia', 'Najniższa', 'Najwyższa', 'Ogłoszenia'], m.map((x) => [h.miesiac(x.m), h.l(x.srednia), h.l(x.min), h.l(x.max), x.n]), 'Olej napędowy: średnia z ogłoszeń, które zaczęły obowiązywać w danym miesiącu', ['l', 'r', 'r', 'r', 'r'])}
<p>Pełny opis podatków jest na stronie ${h.a('akcyza', 'akcyza i podatki w cenie paliwa')}.</p>`;
    },
  },
  en: {
    slug: 'diesel-price', nav: 'Diesel price', card: 'Diesel maximum price, the gap to petrol and the cost of driving.',
    title: 'Diesel price in Poland today: cap, gap to petrol, cost',
    description: 'Diesel price in Poland today: the maximum price from the minister’s notice, why it is above petrol, the cost of a tank and a year of driving, and neighbours.',
    h1: 'Diesel price in Poland today',
    intro: (h) => `The diesel price in Poland today is at most ${h.l(O.brutto.on)} (${h.gr(zm('on'), true)} on the previous price), valid ${kiedy(h, O)}.`,
    resume: (h) => {
      const s = h.D.stat('on'), r = rok('on');
      return `Diesel (ON, from the Polish “olej napędowy”) costs at most ${h.l(O.brutto.on)} in Poland today, ${h.gr(O.brutto.on - O.brutto.pb95)} more than petrol 95. That is the VAT-inclusive maximum price from the notice announced on ${h.dateK(O.ogl)} A full 50-litre tank costs ${h.zl(O.brutto.on * 50, 2)}. A diesel car using ${h.num(EX.spalanie_on, 1)} l/100 km over ${h.num(EX.km_rok)} km a year burns ${h.zl(r.koszt)} of fuel, or ${h.zl(r.miesiac)} a month. Since the first notice the diesel cap has ranged from ${h.l(s.min)} to ${h.l(s.max)}, averaging ${h.l(s.srednia)}. Diesel is dearer for two reasons: the wholesale diesel price implied by the notice is ${h.l(sk('on').hurt)} against ${h.l(sk('pb95').hurt)} for petrol, and the fuel levy on a litre of diesel is ${h.l(sk('on').oplata)} against ${h.l(sk('pb95').oplata)} on petrol. The calculator works out the cost of a fill and a yearly budget.`;
    },
    faqs: (h) => [
      { q: 'Does winter diesel cost more?', a: 'Not within the cap. The maximum price covers diesel whatever its grade, so transitional and winter diesel, sold from autumn, have the same cap. Premium diesels sold under their own brand names must also stay within it if they are diesel fuel.' },
      { q: 'Do haulage firms pay the same price?', a: 'The maximum price covers retail sales at stations. Large buyers purchasing wholesale, from a depot or on discounted fleet cards pay under their own contracts. A business can deduct VAT on fuel under the general rules, so for it the net price in the notice is what counts.' },
      { q: 'What will diesel cost in 2027?', a: `If VAT returns to 23%, excise to the statutory rate and wholesale stays at today’s level, about ${h.l(po2027('on'))}, which is ${h.gr(po2027('on') - sk('on').brutto)} more a litre. The scenario also includes the higher 2027 fuel levy; the ${h.a('po2027', 'fuel prices 2027')} page works it out.` },
      { q: 'Where in Europe is diesel cheaper?', a: `According to the Weekly Oil Bulletin the average diesel price was ${h.l(h.D.zlL(h.D.WOB_OST.on))} in Poland, ${h.l(euZl('DE', 'on') ?? 0)} in Germany and ${h.l(euZl('CZ', 'on') ?? 0)} in Czechia. The full comparison of 27 countries is on the ${h.a('europa', 'fuel prices in Europe')} page. All figures are national Monday averages converted at the bulletin’s own rate.` },
    ],
    body: (h) => {
      const d = sk('on'), b = sk('pb95');
      const m = h.D.mies('on');
      return `<h2>Diesel price in Poland today against petrol: the gap</h2>
<p>The table splits both maximum prices from the minister’s latest notice into the same parts. Excise on diesel is lower than on petrol, but the fuel levy and the wholesale price are higher.</p>
${h.table(['Part of a litre', 'Diesel', 'Petrol 95'], [['Wholesale fuel', h.l(d.hurt), h.l(b.hurt)], ['Excise', h.l(d.akcyza), h.l(b.akcyza)], ['Fuel levy', h.l(d.oplata), h.l(b.oplata)], ['Station costs', h.l(d.marza), h.l(b.marza)], ['VAT', h.l(d.vat), h.l(b.vat)], ['Maximum price', h.l(d.brutto), h.l(b.brutto)]], `Breakdown of the maximum price in the notice of ${h.date(O.ogl)}`, ['l', 'r', 'r'])}
<h2>Average diesel maximum price by month</h2>
<p>Months missing from the table had no maximum price: the government had not cut VAT on fuel then.</p>
${h.table(['Month', 'Average', 'Lowest', 'Highest', 'Notices'], m.map((x) => [h.miesiac(x.m), h.l(x.srednia), h.l(x.min), h.l(x.max), x.n]), 'Diesel: average of notices that took effect in the month', ['l', 'r', 'r', 'r', 'r'])}
<p>The full tax picture is on the ${h.a('akcyza', 'fuel tax breakdown')} page.</p>`;
    },
  },
});
