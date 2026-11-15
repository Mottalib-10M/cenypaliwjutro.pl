import { defineStrona } from '../../lib/strona-typy';
import { ranking, miejscePL, ueZl, euZl } from '../wspolne';

const SASIEDZI = ['DE', 'CZ', 'SK', 'LT'];

export default defineStrona({
  id: 'europa', group: 'koszty', order: 4, tool: 'europa',
  related: ['srednia', 'trasa', 'diesel', 'lpg'],
  sources: ['wob', 'ecLicencja'],
  pl: {
    slug: 'ceny-paliw-w-europie', nav: 'Ceny paliw w Europie', card: 'Średnie ceny benzyny, diesla i LPG w 27 krajach UE w złotych.',
    title: 'Ceny paliw w Europie: 27 krajów UE w złotych za litr',
    description: 'Ceny paliw w Europie: średnia cena benzyny 95, oleju napędowego i LPG w 27 krajach Unii z Weekly Oil Bulletin, w złotych za litr, i koszt baku u sąsiadów.',
    h1: 'Ceny paliw w Europie w złotych',
    intro: (h) => `Ceny paliw w Europie w tygodniu od ${h.date(h.D.WOB.tydzien)}: Polska ma ${miejscePL('pb95')}. najtańszą benzynę 95 z ${h.num(ranking('pb95').length)} krajów Unii, średnio ${h.l(h.D.zlL(h.D.WOB_OST.pb95))}.`,
    resume: (h) => {
      const r = ranking('pb95'), t = r[0], d = r[r.length - 1];
      return `Komisja Europejska publikuje co tydzień biuletyn cen paliw (Weekly Oil Bulletin): średnie ceny detaliczne paliw z podatkami we wszystkich krajach Unii, podane przez państwa członkowskie. W tygodniu od ${h.date(h.D.WOB.tydzien)} średnia cena benzyny 95 w Polsce wynosiła ${h.l(h.D.zlL(h.D.WOB_OST.pb95))}, a średnia unijna ${h.l(ueZl('pb95'))}. Najtańsza: ${h.D.KRAJE_PL[t.k]} (${h.l(h.D.zlL(t.pb95 as number))}), najdroższa: ${h.D.KRAJE_PL[d.k]} (${h.l(h.D.zlL(d.pb95 as number))}). Olej napędowy w Polsce, ${h.l(h.D.zlL(h.D.WOB_OST.on))}, zajmował ${miejscePL('on')}. miejsce od najtańszego. Ceny przeliczamy po kursie z biuletynu, 1 € = ${h.num(h.D.PLN_ZA_EUR, 3)} zł. Pełny bak 50 litrów benzyny 95 kosztuje w Niemczech średnio ${h.zl((euZl('DE', 'pb95') ?? 0) * 50, 2)}, w Polsce ${h.zl(h.D.zlL(h.D.WOB_OST.pb95) * 50, 2)}. Kalkulator porównuje wybrany kraj z Polską dla benzyny, oleju napędowego i LPG (autogazu). Polska ma dziś obniżony VAT i obniżoną akcyzę, dlatego różnica wobec zachodnich sąsiadów jest większa niż zwykle; po końcu pakietu „Ceny Paliw Niżej” (CPN) może się zmniejszyć.`;
    },
    faqs: (h) => [
      { q: 'Czy opłaca się tankować za granicą?', a: `Rzadko, bo Polska ma jedne z najniższych cen w Unii. W tygodniu od ${h.date(h.D.WOB.tydzien)} tańsza benzyna 95 była tylko w ${h.num(miejscePL('pb95') - 1)} kraju. Jadąc za granicę, opłaca się zatankować do pełna przed przekroczeniem granicy. Sprawdź kraj, do którego jedziesz, w kalkulatorze powyżej.` },
      { q: 'Dlaczego w Polsce paliwo jest tańsze niż w Niemczech?', a: 'Głównie przez podatki: w Polsce obowiązuje obniżony VAT 8 % i akcyza na minimalnym poziomie, a do tego cena maksymalna. Niemcy mają wyższą akcyzę, podatek od CO₂ i VAT 19 %. Ceny hurtowe w obu krajach są zbliżone. Biuletyn podaje też ceny bez podatków i one pokazują to samo: różnica siedzi głównie w podatkach.' },
      { q: 'Jak aktualne są ceny w innych krajach?', a: 'Biuletyn ukazuje się raz w tygodniu z cenami z poniedziałku i czasem z opóźnieniem. To średnie krajowe, a nie ceny konkretnej stacji: przy autostradach bywa drożej. Datę tygodnia pokazujemy przy każdej liczbie. Jeśli kraj nie przekazał danych w danym tygodniu, zamiast starej liczby pokazujemy kreskę, żeby nie mieszać tygodni.' },
    ],
    body: (h) => {
      const r = ranking('pb95');
      return `<h2>Ceny paliw w Europie: wszystkie kraje Unii</h2>
${h.table(['Kraj', 'Benzyna 95', 'Olej napędowy', 'LPG'], r.map((k) => [k.k === 'PL' ? '<strong>Polska</strong>' : h.D.KRAJE_PL[k.k], h.l(h.D.zlL(k.pb95 as number)), k.on ? h.l(h.D.zlL(k.on)) : '–', k.lpg ? h.l(h.D.zlL(k.lpg)) : '–']), `Średnie ceny z podatkami, tydzień od ${h.date(h.D.WOB.tydzien)}, od najtańszej benzyny 95; tygodniowy biuletyn Komisji Europejskiej`, ['l', 'r', 'r', 'r'])}
<h2>Sąsiedzi Polski</h2>
<p>${SASIEDZI.map((k) => `${h.D.KRAJE_PL[k]}: benzyna 95 ${h.l(euZl(k, 'pb95') ?? 0)}, olej napędowy ${h.l(euZl(k, 'on') ?? 0)}`).join('; ')}. Średnią cenę w Polsce tydzień po tygodniu pokazuje strona ${h.a('srednia', 'średnie ceny paliw')}.</p>`;
    },
  },
  en: {
    slug: 'fuel-prices-europe', nav: 'Fuel prices in Europe', card: 'Average petrol, diesel and LPG prices in 27 EU countries in zloty.',
    title: 'Fuel prices in Europe: 27 EU countries in zloty per litre',
    description: 'Fuel prices in Europe: average petrol 95, diesel and LPG prices in all 27 EU countries from the Weekly Oil Bulletin, in zloty per litre, and a tank in each.',
    h1: 'Fuel prices in Europe in zloty',
    intro: (h) => `Fuel prices in Europe in the week of ${h.date(h.D.WOB.tydzien)}: Poland had the ${miejscePL('pb95')}${miejscePL('pb95') === 2 ? 'nd' : miejscePL('pb95') === 1 ? 'st' : miejscePL('pb95') === 3 ? 'rd' : 'th'} cheapest petrol 95 of ${h.num(ranking('pb95').length)} EU countries, ${h.l(h.D.zlL(h.D.WOB_OST.pb95))} on average.`,
    resume: (h) => {
      const r = ranking('pb95'), t = r[0], d = r[r.length - 1];
      return `Every week the European Commission publishes the Weekly Oil Bulletin: average retail fuel prices with taxes in every EU country, as reported by member states. In the week of ${h.date(h.D.WOB.tydzien)} the average petrol 95 price in Poland was ${h.l(h.D.zlL(h.D.WOB_OST.pb95))}, against an EU average of ${h.l(ueZl('pb95'))}. The cheapest was ${t.en} (${h.l(h.D.zlL(t.pb95 as number))}), the dearest ${d.en} (${h.l(h.D.zlL(d.pb95 as number))}). Diesel in Poland, at ${h.l(h.D.zlL(h.D.WOB_OST.on))}, ranked ${miejscePL('on')} from the cheapest. We convert at the bulletin’s rate, €1 = PLN ${h.num(h.D.PLN_ZA_EUR, 3)}. A full 50-litre tank of petrol 95 costs ${h.zl((euZl('DE', 'pb95') ?? 0) * 50, 2)} on average in Germany and ${h.zl(h.D.zlL(h.D.WOB_OST.pb95) * 50, 2)} in Poland. The calculator compares a chosen country with Poland for petrol, diesel and LPG (autogas). Poland currently has reduced VAT and excise, so the gap to its western neighbours is wider than usual; it may narrow once the CPN package ends.`;
    },
    faqs: (h) => [
      { q: 'Is it worth filling up abroad?', a: `Rarely, because Poland has some of the lowest prices in the EU. In the week of ${h.date(h.D.WOB.tydzien)} only ${h.num(miejscePL('pb95') - 1)} country had cheaper petrol 95. When driving abroad, it pays to fill up before crossing the border. Check the country you are heading to in the calculator above.` },
      { q: 'Why is fuel cheaper in Poland than in Germany?', a: 'Mainly taxes: Poland applies reduced 8% VAT and minimum excise, plus a maximum price. Germany has higher excise, a CO₂ charge and 19% VAT. Wholesale prices in the two countries are similar. The bulletin’s split of prices with and without taxes shows the same picture: the gap sits mostly in the tax part, not in the fuel itself.' },
      { q: 'How current are the prices in other countries?', a: 'The bulletin comes out once a week with Monday prices, sometimes late. These are national averages, not the price at a given station: motorway stations can be dearer. We show the week’s date with every figure. If a country reports nothing in a given week, its row shows a dash rather than an old figure.' },
    ],
    body: (h) => {
      const r = ranking('pb95');
      return `<h2>Fuel prices in Europe: every EU country</h2>
${h.table(['Country', 'Petrol 95', 'Diesel', 'LPG'], r.map((k) => [k.k === 'PL' ? '<strong>Poland</strong>' : k.en, h.l(h.D.zlL(k.pb95 as number)), k.on ? h.l(h.D.zlL(k.on)) : '–', k.lpg ? h.l(h.D.zlL(k.lpg)) : '–']), `Average prices with taxes, week of ${h.date(h.D.WOB.tydzien)}, cheapest petrol 95 first; Weekly Oil Bulletin, CC BY 4.0`, ['l', 'r', 'r', 'r'])}
<h2>Poland’s neighbours</h2>
<p>${SASIEDZI.map((k) => `${h.D.WOB.kraje.find((x) => x.k === k)?.en}: petrol 95 ${h.l(euZl(k, 'pb95') ?? 0)}, diesel ${h.l(euZl(k, 'on') ?? 0)}`).join('; ')}. The average price in Poland week by week is on the ${h.a('srednia', 'average fuel prices')} page.</p>`;
    },
  },
});
