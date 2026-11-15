import { defineStrona } from '../../lib/strona-typy';
import { O, po2027, sk, EX, rok } from '../wspolne';
import { P } from '../../lib/params';

const PAL = ['pb95', 'pb98', 'on'] as const;

export default defineStrona({
  id: 'po2027', group: 'podatki', order: 1, tool: 'po2027',
  related: ['cpn', 'akcyza', 'prognoza', 'benzyna95'],
  sources: ['vat1288', 'akcyza1289', 'akcyzaUstawa', 'oplata2027', 'ustawa415'],
  pl: {
    slug: 'ceny-paliw-2027', nav: 'Ceny paliw 2027', card: 'Ile może kosztować litr od 1 stycznia 2027 r., jeśli pakiet „Ceny Paliw Niżej” (CPN) wygaśnie.',
    title: 'Ceny paliw 2027: litr po końcu CPN, VAT 23 % i akcyza',
    description: 'Ceny paliw 2027: ile może kosztować benzyna 95, 98 i olej napędowy od 1 stycznia 2027 r., jeśli wrócą VAT 23 % i pełna akcyza, przy dzisiejszej cenie hurtowej.',
    h1: 'Ceny paliw 2027 po końcu pakietu „Ceny Paliw Niżej” (CPN)',
    intro: (h) => `Ceny paliw 2027, jeśli CPN wygaśnie ${h.date(h.D.BIEZACY_OKRES.do)}: benzyna 95 około ${h.l(po2027('pb95'))}, olej napędowy około ${h.l(po2027('on'))} przy dzisiejszym hurcie.`,
    resume: (h) => `Pakiet „Ceny Paliw Niżej” (CPN) obniża VAT na paliwa z 23 % do 8 % i akcyzę do minimum dopuszczalnego w Unii, a w zamian minister ogłasza cenę maksymalną. Rozporządzenia obowiązują do ${h.dateK(h.D.BIEZACY_OKRES.do)} Jeśli nie zostaną przedłużone, 1 stycznia 2027 r. wrócą VAT 23 % i akcyza ustawowa (${h.zl(P.akcyza.pb_ustawowa)} za 1000 litrów benzyny i ${h.zl(P.akcyza.on_ustawowa)} oleju napędowego), wzrośnie też opłata paliwowa. Przy cenie hurtowej z ostatniego obwieszczenia benzyna 95 kosztowałaby wtedy około ${h.l(po2027('pb95'))} zamiast ${h.l(sk('pb95').brutto)}, czyli o ${h.gr(po2027('pb95') - sk('pb95').brutto)} więcej, a olej napędowy około ${h.l(po2027('on'))} zamiast ${h.l(sk('on').brutto)}. Na pełnym baku 50 litrów benzyny to ${h.zl((po2027('pb95') - sk('pb95').brutto) * 50, 2)} więcej. To scenariusz, nie prognoza: zakłada niezmienioną cenę hurtową i 0,30 zł/l kosztów i marży stacji; obie kwoty zmienisz w kalkulatorze. Liczby przeliczamy przy każdym nowym obwieszczeniu.`,
    faqs: (h) => [
      { q: 'Czy pakiet CPN zostanie przedłużony?', a: `Nie wiemy i nie zgadujemy. Obniżony VAT i akcyza wynikają z rozporządzeń Ministra Finansów obowiązujących do ${h.dateK(h.D.BIEZACY_OKRES.do)} Wcześniej pakiet był przedłużany i przerywany: ceny maksymalne obowiązywały w ${h.num(h.D.OKRESY.length)} okresach. Gdy pojawi się nowe rozporządzenie, zaktualizujemy dane i tę stronę.` },
      { q: 'Dlaczego koszty i marża stacji po 2027 r. mogą być inne niż 0,30 zł?', a: 'Kwota 0,30 zł na litrze to koszty i marża stacji przyjęte w ustawie do liczenia ceny maksymalnej. Bez limitu stacje ustalają marże same, a te zależą od konkurencji i lokalizacji. Dlatego kalkulator pozwala wpisać inną marżę i od razu pokazuje cenę. Każde 10 groszy marży to około 12 groszy w cenie z VAT 23 %.' },
      { q: 'O ile wzrośnie opłata paliwowa w 2027 r.?', a: `Dla benzyny z ${h.zl(P.oplata_paliwowa.pb_2026, 2)} do ${h.zl(P.oplata_paliwowa.pb_2027, 2)} za 1000 litrów, dla oleju napędowego z ${h.zl(P.oplata_paliwowa.on_2026, 2)} do ${h.zl(P.oplata_paliwowa.on_2027, 2)}. Na litrze to niecały grosz i ponad grosz, wielokrotnie mniej niż efekt VAT i akcyzy. Opłata trafia do ceny niezależnie od tego, czy pakiet „Ceny Paliw Niżej” zostanie przedłużony.` },
      { q: 'Ile więcej zapłacę w roku?', a: `Przy ${h.num(EX.km_rok)} km rocznie i spalaniu ${h.num(EX.spalanie_pb, 1)} l/100 km benzyny 95 wzrost ceny do ${h.l(po2027('pb95'))} oznacza ${h.zl(rok('pb95').litry * (po2027('pb95') - sk('pb95').brutto))} więcej na rok. Wpisz w kalkulator swoje litry miesięcznie, aby zobaczyć własną kwotę. Wyższy hurt w styczniu zwiększyłby tę kwotę, niższy by ją zmniejszył.` },
    ],
    body: (h) => `<h2>Ceny paliw 2027: scenariusz dla trzech paliw</h2>
<p>Tabela pokazuje dzisiejszą cenę maksymalną i cenę od 1 stycznia 2027 r. przy tej samej cenie hurtowej: z VAT 23 %, pełną akcyzą i nową opłatą paliwową.</p>
${h.table(['Paliwo', 'Dziś', 'Od 1 stycznia 2027', 'Różnica'], PAL.map((p) => [h.fn(p), h.l(sk(p).brutto), h.l(po2027(p)), h.gr(po2027(p) - sk(p).brutto, true)]), `Cena hurtowa z ogłoszenia z ${h.date(h.D.OSTATNIA.ogl)}`, ['l', 'r', 'r', 'r'])}
<h2>Skąd bierze się wzrost</h2>
<p>Największą część daje VAT: 23 % zamiast 8 % od całej ceny netto. Akcyza rośnie o ${h.gr(h.D.STAWKI_2027.pb95.akcyza - h.D.STAWKI_CPN.pb95.akcyza)} na litrze benzyny i o ${h.gr(h.D.STAWKI_2027.on.akcyza - h.D.STAWKI_CPN.on.akcyza)} na litrze oleju napędowego, a VAT nalicza się także od niej. Cena hurtowa benzyny 95 bez akcyzy i opłaty wynosi dziś ${h.l(sk('pb95').hurt)}; jeśli spadnie, wzrost będzie mniejszy, jeśli wzrośnie, większy. Kalkulator pozwala wpisać inną cenę hurtową.</p>
<h2>Co warto zrobić przed 1 stycznia</h2>
<p>Przy różnicy rzędu złotówki na litrze zatankowanie do pełna w ostatnich dniach grudnia daje kilkadziesiąt złotych. Dla firm z flotą rachunek wygląda inaczej, bo odliczają VAT: dla nich liczy się głównie wzrost akcyzy i opłaty paliwowej. Bieżące ceny śledzi strona ${h.a('cena-maksymalna', 'cena maksymalna paliw')}.</p>`,
  },
  en: {
    slug: 'fuel-prices-2027', nav: 'Fuel prices 2027', card: 'What a litre may cost from 1 January 2027 if the CPN package lapses.',
    title: 'Fuel prices 2027 in Poland: after CPN, 23% VAT and excise',
    description: 'Fuel prices 2027 in Poland: what petrol 95, 98 and diesel may cost from 1 January 2027 if 23% VAT and full excise return, at today’s wholesale fuel price.',
    h1: 'Fuel prices 2027 in Poland after the CPN package',
    intro: (h) => `Fuel prices 2027 in Poland if the CPN package lapses on ${h.date(h.D.BIEZACY_OKRES.do)}: petrol 95 about ${h.l(po2027('pb95'))}, diesel about ${h.l(po2027('on'))} at today’s wholesale.`,
    resume: (h) => `The “Ceny Paliw Niżej” (CPN, Lower Fuel Prices) package cuts VAT on fuel from 23% to 8% and excise to the EU minimum, and in return the minister announces a maximum price. The regulations run until ${h.dateK(h.D.BIEZACY_OKRES.do)} If they are not extended, 23% VAT and statutory excise (${h.zl(P.akcyza.pb_ustawowa)} per 1,000 litres of petrol and ${h.zl(P.akcyza.on_ustawowa)} of diesel) return on 1 January 2027, and the fuel levy rises too. At the wholesale price in the latest notice, petrol 95 would then cost about ${h.l(po2027('pb95'))} instead of ${h.l(sk('pb95').brutto)}, or ${h.gr(po2027('pb95') - sk('pb95').brutto)} more (1 grosz, gr, is PLN 0.01), and diesel about ${h.l(po2027('on'))} instead of ${h.l(sk('on').brutto)}. On a full 50-litre tank of petrol that is ${h.zl((po2027('pb95') - sk('pb95').brutto) * 50, 2)} more. This is a scenario, not a forecast: it assumes an unchanged wholesale price and the PLN 0.30 margin, which you can change in the calculator.`,
    faqs: (h) => [
      { q: 'Will the CPN package be extended?', a: `We do not know and do not guess. The reduced VAT and excise come from Finance Minister regulations in force until ${h.dateK(h.D.BIEZACY_OKRES.do)} The package has been extended and interrupted before: maximum prices applied in ${h.num(h.D.OKRESY.length)} periods. When a new regulation appears, we will update the data and this page.` },
      { q: 'Why might station costs and margin after 2027 differ from PLN 0.30?', a: 'PLN 0.30 a litre is the station costs and margin the law uses to compute the maximum price. Without a cap stations set their own margins, which depend on competition and location. That is why the calculator lets you enter a different margin and shows the price at once.' },
      { q: 'How much will the fuel levy rise in 2027?', a: `For petrol from ${h.zl(P.oplata_paliwowa.pb_2026, 2)} to ${h.zl(P.oplata_paliwowa.pb_2027, 2)} per 1,000 litres, for diesel from ${h.zl(P.oplata_paliwowa.on_2026, 2)} to ${h.zl(P.oplata_paliwowa.on_2027, 2)}. Per litre that is under one grosz and just over one grosz, many times less than the effect of VAT and excise.` },
      { q: 'How much more will I pay in a year?', a: `At ${h.num(EX.km_rok)} km a year and ${h.num(EX.spalanie_pb, 1)} l/100 km of petrol 95, a rise to ${h.l(po2027('pb95'))} means ${h.zl(rok('pb95').litry * (po2027('pb95') - sk('pb95').brutto))} more a year. Enter your own litres a month in the calculator to see your figure. A higher wholesale price in January would widen the gap; a lower one would narrow it.` },
    ],
    body: (h) => `<h2>Fuel prices 2027: scenario for three fuels</h2>
<p>The table shows today’s maximum price and the price from 1 January 2027 at the same wholesale level: with 23% VAT, full excise and the new fuel levy.</p>
${h.table(['Fuel', 'Today', 'From 1 January 2027', 'Change'], PAL.map((p) => [h.fn(p), h.l(sk(p).brutto), h.l(po2027(p)), h.gr(po2027(p) - sk(p).brutto, true)]), `Wholesale price from the notice of ${h.date(h.D.OSTATNIA.ogl)}`, ['l', 'r', 'r', 'r'])}
<h2>Where the rise comes from</h2>
<p>VAT does most of it: 23% instead of 8% on the whole net price. Excise rises by ${h.gr(h.D.STAWKI_2027.pb95.akcyza - h.D.STAWKI_CPN.pb95.akcyza)} a litre of petrol and ${h.gr(h.D.STAWKI_2027.on.akcyza - h.D.STAWKI_CPN.on.akcyza)} a litre of diesel, and VAT is charged on it too. The wholesale petrol 95 price before excise and levy is ${h.l(sk('pb95').hurt)} today; if it falls, the rise will be smaller, if it climbs, larger. The calculator lets you enter another wholesale price.</p>
<h2>What to do before 1 January</h2>
<p>With a gap of about a zloty a litre, filling up in the last days of December saves a few dozen zloty. For businesses with a fleet the sum differs, since they deduct VAT: for them mainly the rise in excise and fuel levy counts. Current prices are on the ${h.a('cena-maksymalna', 'maximum fuel price')} page.</p>`,
  },
});
