import { defineStrona } from '../../lib/strona-typy';
import { O, OST_DO, MP_N, kiedy, zrodlo, okresTxt } from '../wspolne';
import { P } from '../../lib/params';

export default defineStrona({
  id: 'cena-maksymalna', group: 'ceny', order: 1, tool: 'data',
  related: ['jutro', 'kontrola', 'historia', 'cpn'],
  sources: ['mpObw', 'eliMp', 'ustawa415', 'govplEnergia'],
  pl: {
    slug: 'cena-maksymalna-paliw', nav: 'Cena maksymalna paliw', card: 'Cena maksymalna na dowolny dzień, z numerem obwieszczenia w Monitorze Polskim.',
    title: 'Cena maksymalna paliw: na dziś i na każdy dzień 2026',
    description: 'Cena maksymalna paliw na wybrany dzień: benzyna 95, 98 i olej napędowy z obwieszczenia Ministra Energii, dni obowiązywania i odnośnik do Monitora Polskiego.',
    h1: 'Cena maksymalna paliw na wybrany dzień',
    intro: (h) => `Cena maksymalna paliw ${okresTxt(h)}: benzyna 95 ${h.l(O.brutto.pb95)}, benzyna 98 ${h.l(O.brutto.pb98)}, olej napędowy ${h.l(O.brutto.on)}. Wybierz dzień, by zobaczyć inną.`,
    resume: (h) => `Cena maksymalna paliw to najwyższa cena, za jaką stacja może sprzedać litr benzyny 95, benzyny 98 lub oleju napędowego. Ogłasza ją Minister Energii w Monitorze Polskim, a obowiązuje od dnia po ogłoszeniu. Ostatnie odczytane ogłoszenie, z ${h.date(O.ogl)}, ustala ${h.l(O.brutto.pb95)} za benzynę 95, ${h.l(O.brutto.pb98)} za benzynę 98 i ${h.l(O.brutto.on)} za olej napędowy, ważne ${kiedy(h, O)}. Od pierwszego obwieszczenia z ${h.date(h.D.PIERWSZA.ogl)} ogłoszono ${h.num(h.D.LISTA.length)} cen; benzyna 95 kosztowała w tym czasie od ${h.l(h.D.stat('pb95').min)} do ${h.l(h.D.stat('pb95').max)}. Kalkulator przyjmuje dowolną datę od ${h.date(h.D.PIERWSZA.od)} i podaje ceny trzech paliw, dzień ogłoszenia oraz numer pozycji w Monitorze Polskim. Dla dni poza okresami obniżonego VAT mówi wprost, że limitu nie było. Każdy wynik ma odnośnik do źródła.`,
    faqs: (h) => [
      { q: 'Czy cena maksymalna dotyczy wszystkich stacji?', a: 'Tak. Obowiązek stosowania ceny maksymalnej dotyczy wszystkich stacji paliw w kraju, także przy autostradach i w hipermarketach. Stacja może sprzedawać taniej, ale nie drożej. Limit obejmuje benzynę 95, benzynę 98 i olej napędowy; nie obejmuje LPG (autogazu), oleju opałowego ani paliw premium o innych oznaczeniach.' },
      { q: 'Od której godziny obowiązuje nowa cena maksymalna?', a: 'Ustawa mówi o dniu, nie o godzinie: cena obowiązuje od dnia następującego po ogłoszeniu w Monitorze Polskim, czyli od północy. Stacje zmieniają ceny na pylonach w nocy albo rano. Jeśli rano widzisz jeszcze wczorajszą, wyższą cenę, możesz zapłacić najwyżej nową cenę maksymalną.' },
      { q: 'Co, jeśli w wybranym dniu nie było ceny maksymalnej?', a: `Cena maksymalna obowiązuje tylko w okresach obniżonego VAT na paliwa. W ${h.num(h.D.OKRESY.length)} takich okresach od ${h.date(h.D.OKRESY[0].od)} ogłaszano ceny; między nimi stacje ustalały ceny swobodnie i kalkulator pokazuje „brak limitu”. Średnie ceny z tych dni znajdziesz na stronie ${h.a('srednia', 'średnie ceny paliw')}.` },
      { q: 'Gdzie znaleźć oficjalne obwieszczenie?', a: `Każdy wynik ma odnośnik do pliku PDF obwieszczenia w Monitorze Polskim albo do komunikatu Ministerstwa Energii na gov.pl. Wykaz pozycji pobieramy z oficjalnej bazy aktów prawnych Kancelarii Sejmu; ${h.num(MP_N)} ogłoszeń odczytaliśmy bezpośrednio z dziennika urzędowego. Wiążący jest tekst opublikowany w pliku PDF dziennika urzędowego.` },
    ],
    body: (h) => {
      const l = [...h.D.LISTA].sort((a, b) => b.brutto.pb95 - a.brutto.pb95);
      const max = l[0], min = l[l.length - 1];
      return `<h2>Jak czytać cenę maksymalną paliw z obwieszczenia</h2>
<p>Obwieszczenie podaje dla każdego paliwa dwie liczby: cenę netto za litr i cenę powiększoną o VAT. Na stacji obowiązuje ta druga. Pierwsze obwieszczenie (${h.mp(342)}) miało inną konstrukcję niż kolejne; przepisujemy je tak, jak zostało ogłoszone. Ostatnie ogłoszenie pochodzi ${O.poz ? `z ${zrodlo(h, O)}` : `z komunikatu na ${zrodlo(h, O)}, opublikowanego przed wpisem do Monitora Polskiego`}.</p>
<h2>Dni obowiązywania</h2>
<p>Ustawa mówi, że cena ogłoszona przed dniem wolnym obowiązuje także w dni wolne i w najbliższy dzień roboczy, łącznie z nim. Dlatego obwieszczenie z piątku obejmuje zwykle trzy dni, a przed długim weekendem nawet więcej. Ostatnią znaną cenę pokazujemy tylko do ${h.dzienD(OST_DO)}; dalej kalkulator mówi, że ceny jeszcze nie znamy.</p>
<h2>Najwyższa i najniższa cena maksymalna</h2>
<p>Najdroższa benzyna 95 obowiązywała ${kiedy(h, max)}: ${h.l(max.brutto.pb95)}. Najtańsza ${kiedy(h, min)}: ${h.l(min.brutto.pb95)}. Różnica na pełnym baku 50 litrów to ${h.zl((max.brutto.pb95 - min.brutto.pb95) * 50, 2)}. Pełną listę zmian pokazuje ${h.a('historia', 'historia cen paliw')}.</p>
<h2>Kara za przekroczenie</h2>
<p>Stacja, która sprzedaje drożej niż cena maksymalna, płaci karę do ${h.zl(P.cena_maksymalna.kara_max)}. Kontroluje Krajowa Administracja Skarbowa (KAS). Swój paragon sprawdzisz na stronie ${h.a('kontrola', 'stacja drożej niż cena maksymalna')}.</p>`;
    },
  },
  en: {
    slug: 'maximum-fuel-price', nav: 'Maximum fuel price', card: 'The maximum price for any day, with its Monitor Polski notice number.',
    title: 'Maximum fuel price in Poland: today and any day of 2026',
    description: 'Maximum fuel price in Poland for any day: petrol 95, 98 and diesel from the Minister of Energy notice, the days it applied and a link to the Monitor Polski item',
    h1: 'Maximum fuel price in Poland for any day',
    intro: (h) => `The maximum fuel price in Poland ${okresTxt(h)}: petrol 95 ${h.l(O.brutto.pb95)}, petrol 98 ${h.l(O.brutto.pb98)}, diesel ${h.l(O.brutto.on)}. Pick a day to see another.`,
    resume: (h) => `The maximum fuel price is the highest price at which a station may sell a litre of petrol 95, petrol 98 or diesel in Poland. The Minister of Energy announces it in Monitor Polski, the official gazette, under Article 34a of the Stocks Act, and it applies from the day after the announcement. The latest notice read, of ${h.date(O.ogl)}, sets ${h.l(O.brutto.pb95)} for petrol 95, ${h.l(O.brutto.pb98)} for petrol 98 and ${h.l(O.brutto.on)} for diesel, valid ${kiedy(h, O)}. Since the first notice of ${h.date(h.D.PIERWSZA.ogl)}, ${h.num(h.D.LISTA.length)} prices have been announced; petrol 95 ranged from ${h.l(h.D.stat('pb95').min)} to ${h.l(h.D.stat('pb95').max)}. The calculator takes any date from ${h.date(h.D.PIERWSZA.od)} and gives the three prices, the announcement day and the Monitor Polski item number. For days outside the reduced-VAT periods it says plainly that there was no cap.`,
    faqs: (h) => [
      { q: 'Does the maximum price apply to every station?', a: 'Yes. Every filling station in Poland must apply it, including motorway and hypermarket stations. A station may sell for less but not for more. The cap covers petrol 95, petrol 98 and diesel; it does not cover LPG, heating oil or premium fuels sold under other names.' },
      { q: 'From what time does a new maximum price apply?', a: 'The law speaks of a day, not an hour: the price applies from the day after it is published in Monitor Polski, so from midnight. Stations change their price boards overnight or in the morning. If you still see yesterday’s higher price in the morning, you need pay no more than the new maximum.' },
      { q: 'What if there was no maximum price on the chosen day?', a: `A maximum price applies only during reduced-VAT periods on fuel. Prices were announced in ${h.num(h.D.OKRESY.length)} such periods since ${h.date(h.D.OKRESY[0].od)}; between them stations set prices freely and the calculator shows “no cap”. Average prices for those days are on the ${h.a('srednia', 'average fuel prices')} page.` },
      { q: 'Where can I find the official notice?', a: `Every result links to the notice PDF in Monitor Polski or to the Ministry of Energy announcement on gov.pl. We fetch the list of items through the Sejm Chancellery ELI API; ${h.num(MP_N)} notices were read directly from the official gazette. The PDF is the binding text.` },
    ],
    body: (h) => {
      const l = [...h.D.LISTA].sort((a, b) => b.brutto.pb95 - a.brutto.pb95);
      const max = l[0], min = l[l.length - 1];
      return `<h2>How to read the maximum fuel price in a notice</h2>
<p>For each fuel the notice gives two figures: the net price per litre and the price with VAT. The second is what applies at the pump. The first notice (${h.mp(342)}) was built differently from the later ones; we copy it as announced. The latest notice comes ${O.poz ? `from ${zrodlo(h, O)}` : `from an announcement on ${zrodlo(h, O)}, published before the Monitor Polski entry`}.</p>
<h2>Days of validity</h2>
<p>Article 34a(6) says a price announced before a day off also applies on the days off and on the next working day, inclusive. So a Friday notice usually covers three days, and more before a long weekend. We show the latest known price only up to ${h.dzienD(OST_DO)}; after that the calculator says the price is not known yet.</p>
<h2>Highest and lowest maximum price</h2>
<p>The dearest petrol 95 applied ${kiedy(h, max)}: ${h.l(max.brutto.pb95)}. The cheapest ${kiedy(h, min)}: ${h.l(min.brutto.pb95)}. The gap on a full 50-litre tank is ${h.zl((max.brutto.pb95 - min.brutto.pb95) * 50, 2)}. The full list of changes is in the ${h.a('historia', 'fuel price history')}.</p>
<h2>Penalty for charging more</h2>
<p>A station selling above the maximum price faces a fine of up to ${h.zl(P.cena_maksymalna.kara_max)} (Article 63(18)). The National Revenue Administration (KAS) checks stations. Check your receipt on the ${h.a('kontrola', 'station above maximum price')} page.</p>`;
    },
  },
});
