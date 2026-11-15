import { defineStrona } from '../../lib/strona-typy';
import { O, EX, euZl, rok } from '../wspolne';
import { P } from '../../lib/params';
import { lpg as lpgCalc } from '../../lib/engine/koszty';

const tyg = (h: any, n: number) => h.D.WOB.pl.slice(-n).reverse().map((w: any) => { const z = h.D.wobZl(w); return { d: w.d, lpg: z.lpg, pb95: z.pb95, max95: h.D.maxWTygodniu(w.d, 'pb95') }; });

export default defineStrona({
  id: 'lpg', group: 'koszty', order: 3, tool: 'lpg',
  related: ['benzyna95', 'srednia', 'europa', 'trasa'],
  sources: ['wob', 'ecLicencja', 'oplata2026'],
  pl: {
    slug: 'cena-lpg', nav: 'Cena LPG', card: 'Średnia cena autogazu z biuletynu UE i zwrot z instalacji gazowej.',
    title: 'Cena LPG: średnia z tygodnia i zwrot z instalacji gazu',
    description: 'Cena LPG w Polsce: średnia krajowa autogazu z Weekly Oil Bulletin Komisji Europejskiej, porównanie z benzyną 95 i po ilu kilometrach zwraca się instalacja.',
    h1: 'Cena LPG i opłacalność instalacji gazowej',
    intro: (h) => `Cena LPG nie ma limitu: średnia krajowa autogazu w tygodniu od ${h.date(h.D.WOB_OST.d)} to ${h.l(h.D.LPG_ZL)}, wobec ${h.l(O.brutto.pb95)} limitu benzyny 95.`,
    resume: (h) => {
      const r = lpgCalc(EX.km_rok, EX.spalanie_pb, O.brutto.pb95, EX.spalanie_lpg, h.D.LPG_ZL, 0);
      return `LPG, czyli autogaz (gaz płynny do samochodów), nie jest objęty ceną maksymalną, więc jego cenę ustalają stacje. Średnią krajową podaje co tydzień tygodniowy biuletyn cen paliw Komisji Europejskiej, na podstawie danych przekazanych przez Polskę: w tygodniu od ${h.date(h.D.WOB_OST.d)} wynosiła ${h.l(h.D.LPG_ZL)}, czyli ${h.pct(h.D.LPG_ZL / O.brutto.pb95, 0)} ceny maksymalnej benzyny 95. Silnik na gazie spala więcej litrów: przy ${h.num(EX.spalanie_lpg, 1)} l/100 km LPG zamiast ${h.num(EX.spalanie_pb, 1)} l/100 km benzyny 100 km kosztuje ${h.zl(EX.spalanie_lpg * h.D.LPG_ZL, 2)} wobec ${h.zl(EX.spalanie_pb * O.brutto.pb95, 2)}. Przy ${h.num(EX.km_rok)} km rocznie oszczędność na paliwie to ${h.zl(r.oszczednosc)} na rok. Kalkulator dzieli koszt instalacji z oferty warsztatu przez tę oszczędność i podaje, po ilu miesiącach i kilometrach instalacja się zwraca. Ceny autogazu na stacjach mogą różnić się od średniej o kilkadziesiąt groszy, więc warto wpisać cenę ze swojej stacji.`;
    },
    faqs: (h) => [
      { q: 'Dlaczego LPG nie ma ceny maksymalnej?', a: 'Art. 34a ustawy o zapasach obejmuje benzyny silnikowe i olej napędowy. Gaz płynny LPG nie jest w nim wymieniony, więc obwieszczenia ministra go nie dotyczą. Obniżony VAT 8 % w pakiecie „Ceny Paliw Niżej” (CPN) również dotyczy wymienionych w rozporządzeniu paliw silnikowych; sprawdź aktualny zakres w Dzienniku Ustaw.' },
      { q: 'Skąd średnia cena LPG, skoro stacje ustalają ją same?', a: 'Z tygodniowego biuletynu cen paliw Komisji Europejskiej, w którym państwa Unii co tydzień podają przeciętne ceny detaliczne paliw z podatkami. To średnia z poniedziałku dla całego kraju. Na konkretnej stacji, szczególnie przy autostradzie, autogaz bywa droższy, a na stacjach przy marketach tańszy. Datę tygodnia podajemy przy każdej liczbie.' },
      { q: 'Ile wynosi opłata paliwowa od LPG?', a: `W 2026 r. ${h.zl(P.oplata_paliwowa.lpg_2026_za_1000kg, 2)} za 1000 kg gazu, w 2027 r. ${h.zl(P.oplata_paliwowa.lpg_2027_za_1000kg, 2)}. Stawki ogłasza Minister Infrastruktury w Monitorze Polskim. W przeliczeniu na litr to kilkanaście groszy, bo litr autogazu waży znacznie mniej niż kilogram. Opłata jest już zawarta w średniej cenie autogazu z biuletynu, więc nie dodajemy jej osobno.` },
      { q: 'Czy LPG opłaca się przy małym przebiegu?', a: 'Rzadko. Oszczędność rośnie z każdym kilometrem, a koszt instalacji jest stały, więc przy kilku tysiącach kilometrów rocznie zwrot trwa latami. Wpisz w kalkulator swój przebieg i cenę instalacji z oferty; uwzględnij też przeglądy instalacji gazowej. Wynik zmienia się od razu po wpisaniu nowych liczb.' },
    ],
    body: (h) => {
      const t = tyg(h, 8);
      return `<h2>Cena LPG w ostatnich tygodniach</h2>
<p>Średnie to ceny faktycznie płacone na stacjach w całym kraju. W tygodniach bez ceny maksymalnej („brak” w ostatniej kolumnie) benzyna 95 była wyraźnie droższa. Gdy limit obowiązuje, średnia z tygodnia może być o kilka groszy wyższa od dzisiejszego limitu, bo limit zmieniał się w ciągu tygodnia.</p>
${h.table(['Tydzień od', 'LPG', 'Benzyna 95, średnia', 'LPG w % ceny benzyny 95', 'Benzyna 95, cena maksymalna w poniedziałek'], t.map((x: any) => [h.date(x.d), h.l(x.lpg), h.l(x.pb95), h.pct(x.lpg / x.pb95, 0), x.max95 ? h.l(x.max95) : 'brak']), 'Średnie krajowe z podatkami z tygodniowego biuletynu cen paliw Komisji Europejskiej', ['l', 'r', 'r', 'r', 'r'])}
<h2>LPG w Polsce i u sąsiadów</h2>
<p>W tym samym tygodniu średnia cena autogazu w Niemczech wynosiła ${h.l(euZl('DE', 'lpg') ?? 0)}, w Czechach ${h.l(euZl('CZ', 'lpg') ?? 0)}, na Litwie ${h.l(euZl('LT', 'lpg') ?? 0)}. Pełne zestawienie jest na stronie ${h.a('europa', 'ceny paliw w Europie')}.</p>
<h2>Benzyna czy gaz przy Twoim przebiegu</h2>
<p>Rok jazdy na benzynie 95 przy ${h.num(EX.km_rok)} km to dziś ${h.zl(rok('pb95').koszt)}, na LPG ${h.zl(rok('lpg').koszt)}. Instalację opłaca się więc rozważyć głównie przy dużych przebiegach. Koszt konkretnej trasy na gazie policzysz w kalkulatorze ${h.a('trasa', 'koszt przejazdu')}.</p>`;
    },
  },
  en: {
    slug: 'lpg-price', nav: 'LPG price', card: 'Average autogas price from the EU bulletin and gas conversion payback.',
    title: 'LPG price in Poland: weekly average and conversion payback',
    description: 'LPG price in Poland: the national autogas average from the EU Weekly Oil Bulletin, the comparison with petrol 95 and when a gas conversion pays for itself.',
    h1: 'LPG price in Poland and gas conversion payback',
    intro: (h) => `The LPG price in Poland has no cap: the national autogas average in the week of ${h.date(h.D.WOB_OST.d)} is ${h.l(h.D.LPG_ZL)}, against a petrol 95 cap of ${h.l(O.brutto.pb95)}.`,
    resume: (h) => {
      const r = lpgCalc(EX.km_rok, EX.spalanie_pb, O.brutto.pb95, EX.spalanie_lpg, h.D.LPG_ZL, 0);
      return `LPG, or autogas, is not covered by the maximum price, so stations set its price. The European Commission Weekly Oil Bulletin gives the national average every week from data reported by Poland: in the week of ${h.date(h.D.WOB_OST.d)} it was ${h.l(h.D.LPG_ZL)}, ${h.pct(h.D.LPG_ZL / O.brutto.pb95, 0)} of the petrol 95 maximum price. An engine on gas burns more litres: at ${h.num(EX.spalanie_lpg, 1)} l/100 km of LPG instead of ${h.num(EX.spalanie_pb, 1)} l/100 km of petrol, 100 km costs ${h.zl(EX.spalanie_lpg * h.D.LPG_ZL, 2)} against ${h.zl(EX.spalanie_pb * O.brutto.pb95, 2)}. At ${h.num(EX.km_rok)} km a year the fuel saving is ${h.zl(r.oszczednosc)} a year. The calculator divides the installation cost from a workshop quote by that saving and gives the months and kilometres to pay it back. Autogas prices at stations can differ from the average by several dozen grosze, so it is worth entering your own station’s price.`;
    },
    faqs: (h) => [
      { q: 'Why does LPG have no maximum price?', a: 'Article 34a of the Stocks Act covers motor petrol and diesel. Liquefied petroleum gas is not listed, so the minister’s notices do not apply to it. The reduced 8% VAT in the CPN (Lower Fuel Prices) package also covers the motor fuels listed in the regulation; check the current scope in the Journal of Laws.' },
      { q: 'Where does an average LPG price come from if stations set it?', a: 'From the Weekly Oil Bulletin, in which EU countries report average retail fuel prices with taxes every week. It is a Monday average for the whole country. At a given station, especially on a motorway, autogas may cost more, and at supermarket stations less.' },
      { q: 'What is the fuel levy on LPG?', a: `In 2026 it is ${h.zl(P.oplata_paliwowa.lpg_2026_za_1000kg, 2)} per 1,000 kg of gas, in 2027 ${h.zl(P.oplata_paliwowa.lpg_2027_za_1000kg, 2)}. The Minister of Infrastructure announces the rates in Monitor Polski. Per litre it comes to a little over ten grosze, because a litre of autogas weighs much less than a kilogram.` },
      { q: 'Does LPG pay off at low mileage?', a: 'Rarely. The saving grows with every kilometre while the installation cost is fixed, so at a few thousand kilometres a year payback takes years. Enter your mileage and the installation price from a quote in the calculator, and allow for gas system inspections too.' },
    ],
    body: (h) => {
      const t = tyg(h, 8);
      return `<h2>LPG price over recent weeks</h2>
<p>The averages are prices actually paid at stations across the country. In weeks without a maximum price (“none” in the last column) petrol 95 was clearly dearer. While the cap applies, the weekly average can sit a few grosze above today’s cap, because the cap changed during the week.</p>
${h.table(['Week of', 'LPG', 'Petrol 95, average', 'LPG as % of petrol 95', 'Petrol 95, Monday maximum price'], t.map((x: any) => [h.date(x.d), h.l(x.lpg), h.l(x.pb95), h.pct(x.lpg / x.pb95, 0), x.max95 ? h.l(x.max95) : 'none']), 'National averages with taxes from the European Commission Weekly Oil Bulletin', ['l', 'r', 'r', 'r', 'r'])}
<h2>LPG in Poland and its neighbours</h2>
<p>In the same week the average autogas price was ${h.l(euZl('DE', 'lpg') ?? 0)} in Germany, ${h.l(euZl('CZ', 'lpg') ?? 0)} in Czechia and ${h.l(euZl('LT', 'lpg') ?? 0)} in Lithuania. The full table is on the ${h.a('europa', 'fuel prices in Europe')} page.</p>
<h2>Petrol or gas at your mileage</h2>
<p>A year on petrol 95 at ${h.num(EX.km_rok)} km costs ${h.zl(rok('pb95').koszt)} today, on LPG ${h.zl(rok('lpg').koszt)}. A conversion is mainly worth considering at high mileage. Work out a given journey on gas with the ${h.a('trasa', 'trip fuel cost')} calculator.</p>`;
    },
  },
});
