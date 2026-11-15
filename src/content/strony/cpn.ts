import { defineStrona } from '../../lib/strona-typy';
import { bezCpn, po2027, sk, EX, rok } from '../wspolne';
import { P } from '../../lib/params';

const PAL = ['pb95', 'pb98', 'on'] as const;

export default defineStrona({
  id: 'cpn', group: 'podatki', order: 2, tool: 'cpn',
  related: ['po2027', 'akcyza', 'cena-maksymalna', 'kontrola'],
  sources: ['govplEnergia', 'vat1288', 'akcyza1289', 'ustawa415'],
  pl: {
    slug: 'pakiet-cpn', nav: 'Pakiet „Ceny Paliw Niżej” (CPN)', card: 'Co obejmuje pakiet „Ceny Paliw Niżej” i ile oszczędzasz na nim rocznie.',
    title: 'Pakiet CPN: co daje „Ceny Paliw Niżej” i ile oszczędzasz',
    description: 'Pakiet CPN („Ceny Paliw Niżej”): cena maksymalna, VAT 8 % i obniżona akcyza. Ile dziś zyskujesz na litrze i w roku przy swoim przebiegu oraz podstawy prawne.',
    h1: 'Pakiet „Ceny Paliw Niżej” (CPN): ile oszczędzasz na paliwie',
    intro: (h) => `Pakiet CPN obniża dziś cenę benzyny 95 o ${h.gr(bezCpn('pb95') - sk('pb95').brutto)}, a oleju napędowego o ${h.gr(bezCpn('on') - sk('on').brutto)} na litrze wobec tej samej ceny hurtowej bez obniżek.`,
    resume: (h) => `„Ceny Paliw Niżej” (CPN) to rządowy pakiet trzech środków: cena maksymalna ogłaszana przez Ministra Energii, VAT na paliwa obniżony z 23 % do 8 % i akcyza zmniejszona do minimalnego poziomu dopuszczalnego w Unii, o 29 groszy na litrze benzyny i 28 groszy na litrze oleju napędowego. Przy cenie hurtowej z ostatniego ogłoszenia benzyna 95 kosztuje ${h.l(sk('pb95').brutto)}; bez obniżek VAT i akcyzy kosztowałaby ${h.l(bezCpn('pb95'))}. Olej napędowy: ${h.l(sk('on').brutto)} zamiast ${h.l(bezCpn('on'))}. Kierowca przejeżdżający ${h.num(EX.km_rok)} km rocznie przy spalaniu ${h.num(EX.spalanie_pb, 1)} l/100 km benzyny oszczędza w ten sposób ${h.zl(rok('pb95').litry * (bezCpn('pb95') - sk('pb95').brutto))} na rok. Obniżki obowiązują do ${h.dateK(h.D.BIEZACY_OKRES.do)} Kalkulator liczy oszczędność dla Twojego paliwa, przebiegu i spalania. Wynik pokazuje cenę z VAT, czyli to, co płaci kierowca prywatny.`,
    faqs: (h) => [
      { q: 'Od kiedy działa pakiet CPN?', a: `Pierwsza cena maksymalna obowiązywała od ${h.dateK(h.D.OKRESY[0].od)} Pakiet działał w ${h.num(h.D.OKRESY.length)} okresach: ${h.D.OKRESY.map((o) => `${h.date(o.od)} – ${h.date(o.do)}`).join('; ').replace(/ r\.$/, ' r')}. Między nimi VAT wracał do 23 %, a cena maksymalna nie obowiązywała.` },
      { q: 'Czy oszczędność z CPN trafia do kierowcy?', a: 'Cena maksymalna jest liczona z ceną hurtową, akcyzą, opłatą paliwową i stałą kwotą 0,30 zł kosztów i marży stacji, a VAT nalicza się według stawki 8 %. Dlatego obniżka podatków musi pojawić się w limicie. Stacja może sprzedawać taniej, ale nie może zatrzymać obniżki, sprzedając drożej niż limit.' },
      { q: 'Czy przedsiębiorcy też zyskują na CPN?', a: 'Firma, która odlicza VAT, zyskuje głównie na obniżonej akcyzie, bo VAT i tak sobie odlicza. Oszczędność na samym VAT dotyczy przede wszystkim konsumentów i firm bez prawa do odliczenia. Kalkulator pokazuje cenę z VAT, czyli perspektywę kierowcy prywatnego. Jednoosobowa firma używająca prywatnego auta częściowo do pracy jest gdzieś pośrodku.' },
      { q: 'Co stanie się po końcu CPN?', a: `Jeśli rozporządzenia nie zostaną przedłużone, wrócą VAT 23 % i akcyza ustawowa, a ceny maksymalne przestaną obowiązywać. Przy obecnym hurcie i opłacie paliwowej na 2027 r. benzyna 95 kosztowałaby około ${h.l(po2027('pb95'))}. Szczegóły na stronie ${h.a('po2027', 'ceny paliw 2027')}. To scenariusz, a nie prognoza.` },
    ],
    body: (h) => `<h2>Pakiet CPN w liczbach: litr z obniżkami i bez</h2>
${h.table(['Paliwo', 'Z CPN', 'Bez CPN', 'Oszczędność na litrze', 'Bak 50 l'], PAL.map((p) => [h.fn(p), h.l(sk(p).brutto), h.l(bezCpn(p)), h.gr(bezCpn(p) - sk(p).brutto), h.zl((bezCpn(p) - sk(p).brutto) * 50, 2)]), `Ta sama cena hurtowa, ogłoszenie z ${h.date(h.D.OSTATNIA.ogl)}`, ['l', 'r', 'r', 'r', 'r'])}
<h2>Trzy elementy pakietu</h2>
<p>Cenę maksymalną wprowadziła ustawa z 27 marca 2026 r., zmieniając ustawę o zapasach paliw. VAT 8 % na paliwa wynika z rozporządzeń Ministra Finansów. Obniżoną akcyzę, ${h.zl(P.akcyza.pb_obnizona)} za 1000 litrów benzyny i ${h.zl(P.akcyza.on_obnizona)} oleju napędowego wobec ustawowych ${h.zl(P.akcyza.pb_ustawowa)} i ${h.zl(P.akcyza.on_ustawowa)}, ustala osobne rozporządzenie. Wszystkie trzy akty są w źródłach na dole strony.</p>
<h2>Kto pilnuje limitu</h2>
<p>Kontrole prowadzi Krajowa Administracja Skarbowa (KAS), a kara za sprzedaż powyżej ceny maksymalnej sięga ${h.zl(P.cena_maksymalna.kara_max)}. Paragon sprawdzisz na stronie ${h.a('kontrola', 'stacja drożej niż cena maksymalna')}.</p>`,
  },
  en: {
    slug: 'cpn-package', nav: 'CPN package', card: 'What the “Ceny Paliw Niżej” package covers and what it saves you a year.',
    title: 'CPN package in Poland: what Lower Fuel Prices saves you',
    description: 'The CPN package (Ceny Paliw Niżej, Lower Fuel Prices): a maximum price, 8% VAT and lower excise. What it saves per litre and per year at your mileage.',
    h1: 'CPN package: what it saves you on fuel',
    intro: (h) => `The CPN package cuts petrol 95 by ${h.gr(bezCpn('pb95') - sk('pb95').brutto)} and diesel by ${h.gr(bezCpn('on') - sk('on').brutto)} a litre today, against the same wholesale price without the cuts.`,
    resume: (h) => `“Ceny Paliw Niżej” (CPN, Lower Fuel Prices) is a government package of three measures: a maximum price announced by the Minister of Energy, VAT on fuel cut from 23% to 8%, and excise reduced to the lowest level the EU allows, by 29 grosze a litre of petrol and 28 grosze a litre of diesel (1 grosz is PLN 0.01). At the wholesale price in the latest notice, petrol 95 costs ${h.l(sk('pb95').brutto)}; without the VAT and excise cuts it would cost ${h.l(bezCpn('pb95'))}. Diesel: ${h.l(sk('on').brutto)} instead of ${h.l(bezCpn('on'))}. A driver covering ${h.num(EX.km_rok)} km a year at ${h.num(EX.spalanie_pb, 1)} l/100 km of petrol saves ${h.zl(rok('pb95').litry * (bezCpn('pb95') - sk('pb95').brutto))} a year this way. The cuts apply until ${h.dateK(h.D.BIEZACY_OKRES.do)} The calculator works out the saving for your fuel, mileage and consumption.`,
    faqs: (h) => [
      { q: 'Since when has the CPN package applied?', a: `The first maximum price applied from ${h.dateK(h.D.OKRESY[0].od)} The package has run in ${h.num(h.D.OKRESY.length)} periods: ${h.D.OKRESY.map((o) => `${h.date(o.od)} – ${h.date(o.do)}`).join('; ').replace(/ r\.$/, ' r')}. Between them VAT returned to 23% and no maximum price applied.` },
      { q: 'Does the CPN saving reach drivers?', a: 'The maximum price is computed from the wholesale price, excise, fuel levy and a fixed PLN 0.30 for station costs and margin, with VAT at 8%. So the tax cut has to show up in the cap. A station may sell for less but cannot pocket the cut by selling above the cap.' },
      { q: 'Do businesses gain from the CPN too?', a: 'A business that deducts VAT gains mainly from the lower excise, since it reclaims VAT anyway. The VAT saving itself mostly benefits consumers and firms with no right to deduct. The calculator shows VAT-inclusive prices, the private driver’s view. A sole trader using a private car partly for work sits somewhere in between.' },
      { q: 'What happens when the CPN ends?', a: `If the regulations are not extended, 23% VAT and statutory excise return and maximum prices stop applying. At the current wholesale price and the 2027 fuel levy, petrol 95 would cost about ${h.l(po2027('pb95'))}. Details on the ${h.a('po2027', 'fuel prices 2027')} page.` },
    ],
    body: (h) => `<h2>The CPN package in figures: a litre with and without the cuts</h2>
${h.table(['Fuel', 'With CPN', 'Without CPN', 'Saving per litre', '50 l tank'], PAL.map((p) => [h.fn(p), h.l(sk(p).brutto), h.l(bezCpn(p)), h.gr(bezCpn(p) - sk(p).brutto), h.zl((bezCpn(p) - sk(p).brutto) * 50, 2)]), `Same wholesale price, notice of ${h.date(h.D.OSTATNIA.ogl)}`, ['l', 'r', 'r', 'r', 'r'])}
<h2>The three parts of the package</h2>
<p>The maximum price was introduced by the Act of 27 March 2026 (Journal of Laws 2026 item 415), which added Article 34a to the Stocks Act. 8% VAT on fuel comes from Finance Minister regulations, most recently Journal of Laws 2026 item 1288. Reduced excise, ${h.zl(P.akcyza.pb_obnizona)} per 1,000 litres of petrol and ${h.zl(P.akcyza.on_obnizona)} of diesel against the statutory ${h.zl(P.akcyza.pb_ustawowa)} and ${h.zl(P.akcyza.on_ustawowa)}, is regulation Journal of Laws 2026 item 1289.</p>
<h2>Who enforces the cap</h2>
<p>The National Revenue Administration (KAS) carries out checks, and the fine for selling above the maximum price reaches ${h.zl(P.cena_maksymalna.kara_max)}. Check a receipt on the ${h.a('kontrola', 'station above maximum price')} page.</p>`,
  },
});
