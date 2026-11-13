import { defineStrona } from '../../lib/strona-typy';
import { O, zm, kiedy, EX } from '../wspolne';
import { doplata } from '../../lib/engine/koszty';

const roznice = (h: any) => h.D.LISTA.map((o: any) => o.brutto.pb98 - o.brutto.pb95);

export default defineStrona({
  id: 'benzyna98', group: 'ceny', order: 5, tool: 'roznica',
  related: ['benzyna95', 'trasa', 'akcyza', 'jutro'],
  sources: ['mpObw', 'ustawa415'],
  pl: {
    slug: 'cena-benzyny-98', nav: 'Cena benzyny 98', card: 'Limit Pb98 i ile rocznie kosztuje tankowanie 98 zamiast 95.',
    title: 'Cena benzyny 98 dziś: limit i dopłata wobec benzyny 95',
    description: 'Cena benzyny 98 dziś: cena maksymalna z obwieszczenia Ministra Energii, różnica do benzyny 95 na litrze i ile kosztuje rok tankowania 98 zamiast 95 dla Ciebie.',
    h1: 'Cena benzyny 98 dziś i dopłata do 95',
    intro: (h) => `Cena benzyny 98 dziś to najwyżej ${h.l(O.brutto.pb98)}, o ${h.gr(O.brutto.pb98 - O.brutto.pb95)} więcej niż benzyna 95; ważne ${kiedy(h, O)}.`,
    resume: (h) => {
      const d = doplata(EX.km_rok, EX.spalanie_pb, O.brutto.pb95, O.brutto.pb98), r = roznice(h);
      return `Benzyna 98 (Pb98) kosztuje dziś najwyżej ${h.l(O.brutto.pb98)} według obwieszczenia ogłoszonego ${h.date(O.ogl)}, ${h.gr(zm('pb98'), true)} wobec poprzedniej ceny. Różnica do benzyny 95 wynosi ${h.gr(O.brutto.pb98 - O.brutto.pb95)} na litrze, czyli ${h.zl((O.brutto.pb98 - O.brutto.pb95) * 50, 2)} na baku 50 litrów. Kierowca, który przejeżdża ${h.num(EX.km_rok)} km rocznie przy spalaniu ${h.num(EX.spalanie_pb, 1)} l/100 km, za tankowanie 98 zamiast 95 dopłaci ${h.zl(d.roznica)} na rok. Od pierwszego obwieszczenia dopłata do 98 w cenach maksymalnych wahała się od ${h.gr(Math.min(...r))} do ${h.gr(Math.max(...r))} na litrze. Benzyna 98 jest w Polsce sprzedawana jako E5, z najwyżej 5 % bioetanolu, dlatego tankują ją właściciele starszych aut, które nie tolerują E10. Kalkulator pozwala wpisać własne ceny, na przykład z promocji na stacji. Limit benzyny 98 obowiązuje na wszystkich stacjach w kraju, także przy autostradach, dokładnie tak samo jak limit benzyny 95.`;
    },
    faqs: (h) => [
      { q: 'Czy benzyna 98 zmniejsza spalanie?', a: 'W silnikach zaprojektowanych pod paliwo 95 zwykle nie w stopniu, który pokryłby różnicę w cenie. Producenci części aut sportowych i z doładowaniem zalecają 98; wtedy instrukcja obsługi to najlepsza wskazówka. Kalkulator pokazuje, ile spalanie musiałoby spaść, aby dopłata się zwróciła. Wpisz w kalkulator własne ceny.' },
      { q: 'Czy cena maksymalna dotyczy paliw premium 98?', a: 'Tak, limit dotyczy benzyny o liczbie oktanowej 98 bez względu na nazwę handlową stacji. Paliwa o wyższej liczbie oktanowej, na przykład 100, nie są wymienione w obwieszczeniach. Sprzedawca ustala ich cenę sam. Jeśli stacja sprzedaje dwa rodzaje benzyny 98, oba muszą mieścić się w tym samym limicie w danym dniu.' },
      { q: 'Dlaczego różnica między 98 a 95 się zmienia?', a: `Bo minister liczy cenę maksymalną każdego paliwa osobno z jego własnej średniej ceny hurtowej. Akcyza i opłata paliwowa są dla obu benzyn takie same, więc różnica pochodzi z hurtu i VAT. Dziś wynosi ${h.gr(O.brutto.pb98 - O.brutto.pb95)}. Benzyny 98 produkuje się mniej, więc jej cena hurtowa porusza się niezależnie od 95.` },
    ],
    body: (h) => {
      const tab = [5000, 10000, 15000, 20000, 30000].map((km) => { const d = doplata(km, EX.spalanie_pb, O.brutto.pb95, O.brutto.pb98); return [`${h.num(km)} km`, `${h.num(d.litry)} l`, h.zl(d.roznica)]; });
      const prog = (O.brutto.pb98 - O.brutto.pb95) / O.brutto.pb98;
      return `<h2>Cena benzyny 98 a przebieg: roczna dopłata</h2>
${h.table(['Przebieg roczny', 'Litry', 'Dopłata do 98'], tab, `Spalanie ${h.num(EX.spalanie_pb, 1)} l/100 km, ceny maksymalne z ${h.date(O.ogl)}`, ['l', 'r', 'r'])}
<h2>Kiedy 98 się opłaca</h2>
<p>Przy dzisiejszych cenach maksymalnych benzyna 98 musiałaby zmniejszyć spalanie o ${h.pct(prog)}, żeby koszt przejechanego kilometra był taki sam jak na 95. Dla auta spalającego ${h.num(EX.spalanie_pb, 1)} l/100 km to spadek do ${h.num(EX.spalanie_pb * (1 - prog), 2)} l/100 km. Jeśli nie widzisz takiej różnicy w komputerze pokładowym, płacisz za samą markę paliwa.</p>
<h2>Podatki w benzynie 98</h2>
<p>Akcyza (${h.l(h.D.STAWKI_CPN.pb98.akcyza)}) i opłata paliwowa (${h.l(h.D.STAWKI_CPN.pb98.oplata)}) są na litrze takie same jak w benzynie 95; VAT rośnie z ceną. Rozbicie pokazuje strona ${h.a('akcyza', 'akcyza i podatki w cenie paliwa')}.</p>`;
    },
  },
  en: {
    slug: 'petrol-98-price', nav: 'Petrol 98 price', card: 'Pb98 cap and what a year of 98 instead of 95 costs.',
    title: 'Petrol 98 price in Poland today: cap and extra over 95',
    description: 'Petrol 98 price in Poland today: the maximum price from the minister’s notice, the gap to petrol 95 per litre and what a year of 98 instead of 95 costs you.',
    h1: 'Petrol 98 price in Poland today and extra over 95',
    intro: (h) => `The petrol 98 price in Poland today is at most ${h.l(O.brutto.pb98)}, ${h.gr(O.brutto.pb98 - O.brutto.pb95)} more than petrol 95; valid ${kiedy(h, O)}.`,
    resume: (h) => {
      const d = doplata(EX.km_rok, EX.spalanie_pb, O.brutto.pb95, O.brutto.pb98), r = roznice(h);
      return `Petrol 98 (Pb98) costs at most ${h.l(O.brutto.pb98)} in Poland today under the notice announced on ${h.date(O.ogl)}, ${h.gr(zm('pb98'), true)} on the previous price. The gap to petrol 95 is ${h.gr(O.brutto.pb98 - O.brutto.pb95)} a litre (1 grosz, gr, is PLN 0.01), or ${h.zl((O.brutto.pb98 - O.brutto.pb95) * 50, 2)} on a 50-litre tank. A driver covering ${h.num(EX.km_rok)} km a year at ${h.num(EX.spalanie_pb, 1)} l/100 km pays ${h.zl(d.roznica)} more a year for 98 instead of 95. Since the first notice the extra for 98 in maximum prices has ranged from ${h.gr(Math.min(...r))} to ${h.gr(Math.max(...r))} a litre. Petrol 98 is sold in Poland as E5, with at most 5% bioethanol, so owners of older cars that cannot take E10 use it. The calculator lets you enter your own prices, for example a station’s offer.`;
    },
    faqs: (h) => [
      { q: 'Does petrol 98 reduce consumption?', a: 'In engines designed for 95, usually not by enough to cover the price gap. Makers of some sports and turbocharged cars recommend 98; then the owner’s manual is the best guide. The calculator shows how far consumption would have to fall for the extra to pay back.' },
      { q: 'Does the maximum price cover premium 98 fuels?', a: 'Yes, the cap covers 98-octane petrol whatever the station’s brand name. Fuels with a higher octane rating, such as 100, are not listed in the notices. The seller sets their price freely. If a station sells two kinds of 98, both must stay within the same cap on the same day.' },
      { q: 'Why does the gap between 98 and 95 change?', a: `Because the minister works out each fuel’s maximum price separately from its own average wholesale price. Excise and fuel levy are the same for both petrols, so the gap comes from wholesale and VAT. Today it is ${h.gr(O.brutto.pb98 - O.brutto.pb95)}. Petrol 98 is produced in smaller volumes, so its wholesale price moves on its own.` },
    ],
    body: (h) => {
      const tab = [5000, 10000, 15000, 20000, 30000].map((km) => { const d = doplata(km, EX.spalanie_pb, O.brutto.pb95, O.brutto.pb98); return [`${h.num(km)} km`, `${h.num(d.litry)} l`, h.zl(d.roznica)]; });
      const prog = (O.brutto.pb98 - O.brutto.pb95) / O.brutto.pb98;
      return `<h2>Petrol 98 price and mileage: the yearly extra</h2>
${h.table(['Yearly mileage', 'Litres', 'Extra for 98'], tab, `Consumption ${h.num(EX.spalanie_pb, 1)} l/100 km, maximum prices of ${h.date(O.ogl)}`, ['l', 'r', 'r'])}
<h2>When 98 pays off</h2>
<p>At today’s maximum prices, petrol 98 would have to cut consumption by ${h.pct(prog)} for a kilometre to cost the same as on 95. For a car using ${h.num(EX.spalanie_pb, 1)} l/100 km that is a drop to ${h.num(EX.spalanie_pb * (1 - prog), 2)} l/100 km. If your trip computer shows no such difference, you are paying for the fuel brand alone.</p>
<h2>Tax in petrol 98</h2>
<p>Excise (${h.l(h.D.STAWKI_CPN.pb98.akcyza)}) and fuel levy (${h.l(h.D.STAWKI_CPN.pb98.oplata)}) per litre are the same as for petrol 95; VAT rises with the price. The breakdown is on the ${h.a('akcyza', 'fuel tax breakdown')} page.</p>`;
    },
  },
});
