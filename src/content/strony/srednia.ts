import { defineStrona } from '../../lib/strona-typy';
import { ueZl } from '../wspolne';

const tygodnie = (h: any) => h.D.WOB.pl.filter((w: any) => w.d >= '2026-03-30').map((w: any) => { const z = h.D.wobZl(w); return { d: w.d, pb95: z.pb95, on: z.on, lpg: z.lpg, m95: h.D.maxWTygodniu(w.d, 'pb95'), mOn: h.D.maxWTygodniu(w.d, 'on') }; });
const luka = (t: any[], p: 'pb95' | 'on') => { const z = t.filter((x) => (p === 'on' ? x.mOn : x.m95) != null); return { n: z.length, sr: z.reduce((s, x) => s + ((p === 'on' ? x.mOn : x.m95) - x[p]), 0) / Math.max(1, z.length) }; };

export default defineStrona({
  id: 'srednia', group: 'ceny', order: 9, tool: 'srednia',
  related: ['historia', 'europa', 'lpg', 'cena-maksymalna'],
  sources: ['wob', 'ecLicencja', 'mpObw'],
  pl: {
    slug: 'srednie-ceny-paliw', nav: 'Średnie ceny paliw', card: 'Faktyczna średnia cena na stacjach tydzień po tygodniu, obok limitu.',
    title: 'Średnie ceny paliw w Polsce: tydzień po tygodniu i limit',
    description: 'Średnie ceny paliw w Polsce z Weekly Oil Bulletin: benzyna 95, olej napędowy i LPG tydzień po tygodniu, w złotych, obok ceny maksymalnej z tego samego czasu.',
    h1: 'Średnie ceny paliw w Polsce tydzień po tygodniu',
    intro: (h) => `Średnie ceny paliw w Polsce w tygodniu od ${h.date(h.D.WOB_OST.d)}: benzyna 95 ${h.l(h.D.zlL(h.D.WOB_OST.pb95))}, olej napędowy ${h.l(h.D.zlL(h.D.WOB_OST.on))}, LPG (autogaz) ${h.l(h.D.LPG_ZL)}.`,
    resume: (h) => {
      const t = tygodnie(h), a = luka(t, 'pb95'), b = luka(t, 'on');
      return `Cena maksymalna mówi, ile stacja może najwyżej wziąć; średnia mówi, ile stacje faktycznie biorą. Polska co tydzień przekazuje Komisji Europejskiej średnie ceny detaliczne z poniedziałku, które ukazują się w tygodniowym biuletynie cen paliw Komisji Europejskiej (Weekly Oil Bulletin). W tygodniu od ${h.date(h.D.WOB_OST.d)} średnia cena benzyny 95 wynosiła ${h.l(h.D.zlL(h.D.WOB_OST.pb95))}, oleju napędowego ${h.l(h.D.zlL(h.D.WOB_OST.on))}, a autogazu LPG ${h.l(h.D.LPG_ZL)}. W ${h.num(a.n)} tygodniach, w których obowiązywała cena maksymalna, średnia benzyny 95 była przeciętnie o ${h.gr(a.sr)} niższa od limitu z poniedziałku, a oleju napędowego o ${h.gr(b.sr)}. To znaczy, że limit zwykle działa jak cena odniesienia, a część stacji sprzedaje taniej. Dla porównania średnia unijna benzyny 95 to ${h.l(ueZl('pb95'))}. Kalkulator pokazuje średnią i limit dla wybranego tygodnia od początku cen maksymalnych. Dane z biuletynu ukazują się raz w tygodniu, z cenami z poniedziałku.`;
    },
    faqs: (h) => [
      { q: 'Czy średnia może być wyższa od ceny maksymalnej?', a: 'Pojedyncza stacja nie może przekroczyć limitu, ale porównujemy średnią z poniedziałku z limitem z tego samego dnia. Jeśli limit zmienia się w trakcie tygodnia albo dane zostały zebrane w innej chwili niż obwieszczenie, średnia może wyjść minimalnie powyżej. Takie przypadki pokazujemy bez poprawiania.' },
      { q: 'Skąd Polska bierze średnie ceny dla Komisji?', a: 'Państwa członkowskie zbierają ceny od dostawców i stacji i co tydzień przekazują je Komisji Europejskiej zgodnie z unijnymi przepisami o raportowaniu cen ropy. Komisja publikuje je na otwartej licencji, która pozwala nam je wykorzystać z podaniem źródła. Datę tygodnia, z którego pochodzi średnia, podajemy przy każdej liczbie na tej stronie.' },
      { q: 'Dlaczego nie podajecie średnich dla województw?', a: 'Bo nie ma otwartego, urzędowego źródła takich średnich. Serwisy z cenami regionalnymi opierają się na zgłoszeniach kierowców albo na danych, których warunki nie pozwalają na ponowne wykorzystanie. Wolimy jedną wiarygodną średnią krajową niż szesnaście szacunków. Jeśli pojawi się urzędowa seria regionalna, dodamy ją.' },
    ],
    body: (h) => {
      const t = tygodnie(h).slice(-12).reverse();
      return `<h2>Średnie ceny paliw a cena maksymalna: ostatnie tygodnie</h2>
${h.table(['Tydzień od', 'Benzyna 95, średnia', 'Benzyna 95, limit', 'Olej napędowy, średnia', 'Olej napędowy, limit', 'LPG (autogaz)'], t.map((x: any) => [h.date(x.d), h.l(x.pb95), x.m95 != null ? h.l(x.m95) : '–', h.l(x.on), x.mOn != null ? h.l(x.mOn) : '–', h.l(x.lpg)]), 'Średnie z podatkami z biuletynu Komisji Europejskiej i cena maksymalna z poniedziałku', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Kreska oznacza tydzień, w którym w poniedziałek nie obowiązywała cena maksymalna. Ceny w innych krajach porównuje strona ${h.a('europa', 'ceny paliw w Europie')}.</p>`;
    },
  },
  en: {
    slug: 'average-fuel-prices', nav: 'Average fuel prices', card: 'Actual average price at the pump week by week, beside the cap.',
    title: 'Average fuel prices in Poland: week by week against the cap',
    description: 'Average fuel prices in Poland from the Weekly Oil Bulletin: petrol 95, diesel and LPG week by week in zloty, next to the maximum price in force the same week.',
    h1: 'Average fuel prices in Poland week by week',
    intro: (h) => `Average fuel prices in Poland in the week of ${h.date(h.D.WOB_OST.d)}: petrol 95 ${h.l(h.D.zlL(h.D.WOB_OST.pb95))}, diesel ${h.l(h.D.zlL(h.D.WOB_OST.on))}, LPG ${h.l(h.D.LPG_ZL)}.`,
    resume: (h) => {
      const t = tygodnie(h), a = luka(t, 'pb95'), b = luka(t, 'on');
      return `The maximum price says the most a station may charge; the average says what stations actually charge. Every week Poland reports Monday average retail prices to the European Commission, published in the Weekly Oil Bulletin. In the week of ${h.date(h.D.WOB_OST.d)} the average price of petrol 95 was ${h.l(h.D.zlL(h.D.WOB_OST.pb95))}, diesel ${h.l(h.D.zlL(h.D.WOB_OST.on))} and LPG autogas ${h.l(h.D.LPG_ZL)}. Over the ${h.num(a.n)} weeks when a maximum price applied, the petrol 95 average was on average ${h.gr(a.sr)} below Monday’s cap, and diesel ${h.gr(b.sr)} below (1 grosz is PLN 0.01). So the cap usually works as a reference price, with some stations selling for less. For comparison, the EU average for petrol 95 is ${h.l(ueZl('pb95'))}. The calculator shows the average and the cap for any week since maximum prices began.`;
    },
    faqs: (h) => [
      { q: 'Can the average be above the maximum price?', a: 'A single station may not exceed the cap, but we compare the Monday average with that same day’s cap. If the cap changes during the week, or the data were collected at a different moment from the notice, the average can come out slightly above. We show such cases without correcting them.' },
      { q: 'Where does Poland get the averages it reports?', a: 'Member states collect prices from suppliers and stations and report them weekly to the European Commission under EU oil price reporting rules. The Commission publishes them in the bulletin under a CC BY 4.0 licence, which lets us reuse them with credit to the source.' },
      { q: 'Why are there no averages by voivodeship?', a: 'Because there is no open official source for such averages. Sites with regional prices rely on reports from drivers or on data whose terms forbid reuse. We prefer one reliable national average to sixteen estimates for the regions (voivodeships). If an official regional series appears, we will add it.' },
    ],
    body: (h) => {
      const t = tygodnie(h).slice(-12).reverse();
      return `<h2>Average fuel prices against the maximum price: recent weeks</h2>
${h.table(['Week of', 'Pb95 average', 'Pb95 cap', 'Diesel average', 'Diesel cap', 'LPG'], t.map((x: any) => [h.date(x.d), h.l(x.pb95), x.m95 != null ? h.l(x.m95) : '–', h.l(x.on), x.mOn != null ? h.l(x.mOn) : '–', h.l(x.lpg)]), 'Averages with taxes from the Weekly Oil Bulletin (CC BY 4.0) and Monday’s maximum price', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>A dash marks a week when no maximum price applied on the Monday. Prices in other countries are compared on the ${h.a('europa', 'fuel prices in Europe')} page.</p>`;
    },
  },
});
