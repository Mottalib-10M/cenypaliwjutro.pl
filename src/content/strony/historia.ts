import { defineStrona } from '../../lib/strona-typy';
import { O, zmianyN, kiedy, MP_N } from '../wspolne';

const skrajne = (h: any, p: 'pb95' | 'on') => { const l = [...h.D.LISTA].sort((a: any, b: any) => a.brutto[p] - b.brutto[p]); return { min: l[0], max: l[l.length - 1] }; };

export default defineStrona({
  id: 'historia', group: 'ceny', order: 7, tool: 'historia',
  related: ['cena-maksymalna', 'srednia', 'prognoza', 'benzyna95'],
  sources: ['eliMp', 'mpObw', 'govplEnergia'],
  pl: {
    slug: 'historia-cen-paliw', nav: 'Historia cen paliw', card: 'Wszystkie ceny maksymalne od pierwszego obwieszczenia, miesiąc po miesiącu.',
    title: 'Historia cen paliw 2026: wszystkie ceny maksymalne',
    description: 'Historia cen paliw w 2026 r.: każda cena maksymalna benzyny 95, 98 i oleju napędowego od pierwszego obwieszczenia, średnie miesięczne, minimum i maksimum.',
    h1: 'Historia cen paliw w 2026 r.',
    intro: (h) => `Historia cen paliw: ${h.num(h.D.LISTA.length)} cen maksymalnych od ${h.date(h.D.PIERWSZA.ogl)} do ${h.date(O.ogl)}, każda z odnośnikiem do obwieszczenia.`,
    resume: (h) => {
      const a = skrajne(h, 'pb95'), b = skrajne(h, 'on'), z = zmianyN('on');
      return `Od pierwszego obwieszczenia z ${h.date(h.D.PIERWSZA.ogl)} Minister Energii ogłosił ${h.num(h.D.LISTA.length)} cen maksymalnych paliw, z czego ${h.num(MP_N)} odczytaliśmy bezpośrednio z Monitora Polskiego. Benzyna 95 była najtańsza ${kiedy(h, a.min)}, po ${h.l(a.min.brutto.pb95)}, a najdroższa ${kiedy(h, a.max)}, po ${h.l(a.max.brutto.pb95)}. Olej napędowy wahał się od ${h.l(b.min.brutto.on)} (${kiedy(h, b.min)}) do ${h.l(b.max.brutto.on)} (${kiedy(h, b.max)}). W oleju napędowym na ${h.num(z.n)} zmian między kolejnymi ogłoszeniami ${h.num(z.w)} to podwyżki, ${h.num(z.s)} obniżki, a ${h.num(z.b)} razy cena stała. Ceny maksymalne obowiązywały w ${h.num(h.D.OKRESY.length)} okresach obniżonego VAT; między nimi limitu nie było. Kalkulator pokazuje średnią, minimum i maksimum wybranego miesiąca oraz wszystkie ogłoszenia z tego miesiąca ze źródłami. Najnowsze ogłoszenia są na górze tabeli poniżej, a każde ma odnośnik do pliku w Monitorze Polskim albo do komunikatu na gov.pl, więc każdą liczbę możesz sprawdzić u źródła.`;
    },
    faqs: (h) => [
      { q: 'Dlaczego w historii są przerwy?', a: `Bo cena maksymalna obowiązuje tylko wtedy, gdy obowiązuje obniżony VAT na paliwa. Okresy: ${h.D.OKRESY.map((o) => `${h.date(o.od)} – ${h.date(o.do)}`).join('; ')}. W przerwach stacje ustalały ceny same; średnie z tych tygodni pokazuje strona ${h.a('srednia', 'średnie ceny paliw')}.` },
      { q: 'Czy mogę pobrać historię cen?', a: 'Tabela poniżej zawiera wszystkie ogłoszenia z datami, cenami trzech paliw i odnośnikami do źródeł; możesz ją skopiować do arkusza. Źródłem jest Monitor Polski, a wykaz pozycji udostępnia publicznie API ELI Kancelarii Sejmu. Każdy wiersz ma też numer pozycji, więc łatwo go sprawdzić w źródle.' },
      { q: 'Jak liczona jest średnia miesięczna?', a: 'To średnia arytmetyczna cen z ogłoszeń, które zaczęły obowiązywać w danym miesiącu. Każde ogłoszenie liczy się raz, także piątkowe, które obowiązuje trzy dni. Dlatego średnia z kalkulatora może nieco różnić się od średniej ważonej dniami. Obok podajemy najniższą i najwyższą cenę z danego miesiąca.' },
    ],
    body: (h) => {
      const l = [...h.D.LISTA].reverse();
      return `<h2>Historia cen paliw: wszystkie ogłoszenia</h2>
<p>Od najnowszego. Kolumna „Obowiązuje” podaje dni, w których cena obowiązywała zgodnie z art. 34a ust. 6.</p>
${h.table(['Obowiązuje', 'Pb95', 'Pb98', 'ON', 'Źródło'], l.map((o) => [kiedy(h, o), h.l(o.brutto.pb95), h.l(o.brutto.pb98), h.l(o.brutto.on), o.poz ? h.mp(o.poz) : `<a href="${o.url}" target="_blank" rel="nofollow noopener noreferrer">gov.pl</a>`]), 'Ceny maksymalne z VAT, zł za litr', ['l', 'r', 'r', 'r', 'l'])}`;
    },
  },
  en: {
    slug: 'fuel-price-history', nav: 'Fuel price history', card: 'Every maximum price since the first notice, month by month.',
    title: 'Fuel price history in Poland 2026: every maximum price',
    description: 'Fuel price history in Poland in 2026: every maximum price of petrol 95, 98 and diesel since the first notice, monthly averages, lows, highs and sources.',
    h1: 'Fuel price history in Poland, 2026',
    intro: (h) => `Fuel price history in Poland: ${h.num(h.D.LISTA.length)} maximum prices from ${h.date(h.D.PIERWSZA.ogl)} to ${h.date(O.ogl)}, each linked to its notice.`,
    resume: (h) => {
      const a = skrajne(h, 'pb95'), b = skrajne(h, 'on'), z = zmianyN('on');
      return `Since the first notice of ${h.date(h.D.PIERWSZA.ogl)}, the Minister of Energy has announced ${h.num(h.D.LISTA.length)} maximum fuel prices, ${h.num(MP_N)} of which we read directly from Monitor Polski, the official gazette. Petrol 95 was cheapest ${kiedy(h, a.min)}, at ${h.l(a.min.brutto.pb95)}, and dearest ${kiedy(h, a.max)}, at ${h.l(a.max.brutto.pb95)}. Diesel ranged from ${h.l(b.min.brutto.on)} (${kiedy(h, b.min)}) to ${h.l(b.max.brutto.on)} (${kiedy(h, b.max)}). For diesel, of ${h.num(z.n)} changes between consecutive notices, ${h.num(z.w)} were rises, ${h.num(z.s)} cuts and ${h.num(z.b)} times the price held. Maximum prices applied in ${h.num(h.D.OKRESY.length)} reduced-VAT periods; between them there was no cap. The calculator shows the average, low and high of a chosen month and every notice in that month with its source. The newest notices sit at the top of the table below, and each links to its Monitor Polski file or gov.pl announcement, so every figure can be checked at source.`;
    },
    faqs: (h) => [
      { q: 'Why are there gaps in the history?', a: `Because a maximum price applies only while reduced VAT on fuel is in force. Periods: ${h.D.OKRESY.map((o) => `${h.date(o.od)} – ${h.date(o.do)}`).join('; ')}. In the gaps stations set prices themselves; averages for those weeks are on the ${h.a('srednia', 'average fuel prices')} page.` },
      { q: 'Can I download the price history?', a: 'The table below holds every notice with dates, the three prices and links to sources; you can copy it into a spreadsheet. The source is Monitor Polski, and the Sejm Chancellery ELI API publishes the list of items openly for anyone to use.' },
      { q: 'How is the monthly average worked out?', a: 'It is the plain average of the notices that took effect in the month. Each notice counts once, including a Friday notice that covers three days. So the calculator’s average may differ slightly from an average weighted by days. The lowest and highest notice of the month are shown next to it.' },
    ],
    body: (h) => {
      const l = [...h.D.LISTA].reverse();
      return `<h2>Fuel price history: every notice</h2>
<p>Newest first. The “In force” column gives the days each price applied under Article 34a(6).</p>
${h.table(['In force', 'Pb95', 'Pb98', 'Diesel', 'Source'], l.map((o) => [kiedy(h, o), h.l(o.brutto.pb95), h.l(o.brutto.pb98), h.l(o.brutto.on), o.poz ? h.mp(o.poz) : `<a href="${o.url}" target="_blank" rel="nofollow noopener noreferrer">gov.pl</a>`]), 'Maximum prices including VAT, PLN per litre', ['l', 'r', 'r', 'r', 'l'])}`;
    },
  },
});
