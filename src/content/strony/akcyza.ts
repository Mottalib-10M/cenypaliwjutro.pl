import { defineStrona } from '../../lib/strona-typy';
import { sk, podatki, rok, EX } from '../wspolne';
import { P } from '../../lib/params';

const PAL = ['pb95', 'pb98', 'on'] as const;

export default defineStrona({
  id: 'akcyza', group: 'podatki', order: 3, tool: 'sklad',
  related: ['cpn', 'po2027', 'diesel', 'benzyna98'],
  sources: ['ustawa415', 'akcyza1289', 'akcyzaUstawa', 'oplata2026', 'vat1288', 'mpObw'],
  pl: {
    slug: 'akcyza-i-podatki-w-cenie-paliwa', nav: 'Podatki w cenie paliwa', card: 'Ile w litrze to akcyza, opłata paliwowa i VAT, a ile samo paliwo.',
    title: 'Akcyza i podatki w cenie paliwa: skład litra w 2026 r.',
    description: 'Akcyza i podatki w cenie paliwa: ile w litrze benzyny 95, 98 i oleju napędowego to akcyza, opłata paliwowa i VAT, a ile cena hurtowa, wg ostatniej ceny.',
    h1: 'Akcyza i podatki w cenie paliwa',
    intro: (h) => `Akcyza i podatki w cenie paliwa to dziś ${h.l(podatki('pb95'))} w litrze benzyny 95 (${h.pct(podatki('pb95') / sk('pb95').brutto)} ceny) i ${h.l(podatki('on'))} w oleju napędowym.`,
    resume: (h) => {
      const b = sk('pb95'), d = sk('on');
      return `Cena maksymalna litra benzyny 95 z ogłoszenia z ${h.date(h.D.OSTATNIA.ogl)}, czyli ${h.l(b.brutto)}, składa się z ceny hurtowej paliwa ${h.l(b.hurt)}, akcyzy ${h.l(b.akcyza)}, opłaty paliwowej ${h.l(b.oplata)}, kosztów stacji ${h.l(b.marza)} i VAT ${h.l(b.vat)}. Podatki i opłaty to razem ${h.l(podatki('pb95'))}, czyli ${h.pct(podatki('pb95') / b.brutto)} ceny. W oleju napędowym za ${h.l(d.brutto)} akcyza wynosi ${h.l(d.akcyza)}, opłata paliwowa ${h.l(d.oplata)}, a VAT ${h.l(d.vat)}; podatki to ${h.pct(podatki('on') / d.brutto)} ceny. Akcyza i opłata paliwowa to stałe kwoty od litra, VAT to procent i rośnie razem z ceną. Przy ${h.num(EX.km_rok)} km rocznie na benzynie 95 płacisz w paliwie ${h.zl(rok('pb95').litry * podatki('pb95'))} podatków na rok. Kalkulator rozkłada litr na części i liczy podatki od Twoich litrów. Liczymy z tej samej ceny maksymalnej, którą pokazuje strona główna.`;
    },
    faqs: (h) => [
      { q: 'Czym jest opłata paliwowa?', a: `To opłata od paliw silnikowych, która zasila Krajowy Fundusz Drogowy i fundusz kolejowy. Jej stawki ogłasza co roku Minister Infrastruktury w Monitorze Polskim: w 2026 r. ${h.zl(P.oplata_paliwowa.pb_2026, 2)} za 1000 litrów benzyny i ${h.zl(P.oplata_paliwowa.on_2026, 2)} oleju napędowego. Płaci ją producent lub importer, a trafia do ceny.` },
      { q: 'Czy VAT nalicza się od akcyzy?', a: 'Tak. Podstawą VAT jest cena netto, a ta obejmuje akcyzę i opłatę paliwową. Dlatego podwyżka akcyzy o 29 groszy podnosi cenę z VAT o więcej niż 29 groszy. Przy stawce 8 % ten efekt jest mały, przy 23 % wyraźnie większy.' },
      { q: 'Co to jest opłata emisyjna i dlaczego jej nie widać?', a: 'Opłata emisyjna to kolejna danina od paliw, płacona przez producentów i importerów. Nie jest wyodrębniona w obwieszczeniu, więc w kalkulatorze siedzi w cenie hurtowej, razem z kosztem zapasów obowiązkowych i marżą rafinerii. Nie podajemy jej osobno, bo nie mamy jej wartości z obwieszczenia.' },
      { q: 'Skąd wiadomo, ile wynosi cena hurtowa?', a: 'Z obwieszczenia: cena netto to średni hurt pięciu największych dostawców z akcyzą i opłatą paliwową plus 0,30 zł. Odejmujemy od niej te trzy znane kwoty. Gdy ogłoszenie jest dopiero na gov.pl, gdzie podana jest tylko cena z VAT, cenę netto liczymy jako cenę z VAT podzieloną przez 1,08 (VAT 8 %).' },
    ],
    body: (h) => `<h2>Akcyza i podatki w cenie paliwa: trzy paliwa obok siebie</h2>
${h.table(['Składnik na litrze', h.fn('pb95'), h.fn('pb98'), h.fn('on')], [
      ['Cena hurtowa paliwa', ...PAL.map((p) => h.l(sk(p).hurt))],
      ['Akcyza', ...PAL.map((p) => h.l(sk(p).akcyza))],
      ['Opłata paliwowa', ...PAL.map((p) => h.l(sk(p).oplata))],
      ['Koszty stacji', ...PAL.map((p) => h.l(sk(p).marza))],
      ['VAT 8 %', ...PAL.map((p) => h.l(sk(p).vat))],
      ['Cena maksymalna', ...PAL.map((p) => h.l(sk(p).brutto))],
      ['Udział podatków', ...PAL.map((p) => h.pct(podatki(p) / sk(p).brutto))],
    ], `Ogłoszenie z ${h.date(h.D.OSTATNIA.ogl)}`, ['l', 'r', 'r', 'r'])}
<h2>Stawki akcyzy</h2>
<p>Ustawa o podatku akcyzowym (art. 89 ust. 1) przewiduje ${h.zl(P.akcyza.pb_ustawowa)} za 1000 litrów benzyny i ${h.zl(P.akcyza.on_ustawowa)} za 1000 litrów oleju napędowego. Rozporządzenie Ministra Finansów (Dz.U. 2026 poz. 1289) obniża je do ${h.zl(P.akcyza.pb_obnizona)} i ${h.zl(P.akcyza.on_obnizona)} do ${h.dateK(P.akcyza.obnizona_do)} Po tym dniu, bez przedłużenia, wraca stawka ustawowa: strona ${h.a('po2027', 'ceny paliw 2027')} liczy skutki.</p>`,
  },
  en: {
    slug: 'fuel-tax-breakdown', nav: 'Fuel tax breakdown', card: 'How much of a litre is excise, fuel levy and VAT, and how much is fuel.',
    title: 'Fuel tax breakdown in Poland: excise, levy and VAT in 2026',
    description: 'Fuel tax breakdown in Poland: how much of a litre of petrol 95, 98 and diesel is excise, fuel levy and VAT, and how much is wholesale, from the latest notice.',
    h1: 'Fuel tax breakdown in Poland',
    intro: (h) => `The fuel tax breakdown today: ${h.l(podatki('pb95'))} of a litre of petrol 95 is tax (${h.pct(podatki('pb95') / sk('pb95').brutto)} of the price), and ${h.l(podatki('on'))} of a litre of diesel.`,
    resume: (h) => {
      const b = sk('pb95'), d = sk('on');
      return `The maximum price of a litre of petrol 95 in the notice of ${h.date(h.D.OSTATNIA.ogl)}, ${h.l(b.brutto)}, is made up of a wholesale fuel price of ${h.l(b.hurt)}, excise of ${h.l(b.akcyza)}, a fuel levy of ${h.l(b.oplata)}, station costs of ${h.l(b.marza)} and VAT of ${h.l(b.vat)}. Taxes and levies come to ${h.l(podatki('pb95'))}, or ${h.pct(podatki('pb95') / b.brutto)} of the price. In diesel at ${h.l(d.brutto)}, excise is ${h.l(d.akcyza)}, the fuel levy ${h.l(d.oplata)} and VAT ${h.l(d.vat)}; taxes are ${h.pct(podatki('on') / d.brutto)} of the price. Excise and fuel levy are fixed amounts per litre; VAT (value added tax) is a percentage and rises with the price. At ${h.num(EX.km_rok)} km a year on petrol 95 you pay ${h.zl(rok('pb95').litry * podatki('pb95'))} of tax in fuel a year. The calculator splits a litre into its parts and works out the tax on your litres.`;
    },
    faqs: (h) => [
      { q: 'What is the fuel levy?', a: `A charge on motor fuel that funds the National Road Fund and the rail fund. Its rates are announced every year by the Minister of Infrastructure in Monitor Polski: in 2026 ${h.zl(P.oplata_paliwowa.pb_2026, 2)} per 1,000 litres of petrol and ${h.zl(P.oplata_paliwowa.on_2026, 2)} of diesel. The producer or importer pays it and it passes into the price.` },
      { q: 'Is VAT charged on excise?', a: 'Yes. VAT is charged on the net price, which includes excise and fuel levy. So an excise rise of 29 grosze lifts the VAT-inclusive price by more than 29 grosze. At 8% the effect is small; at 23% it is clearly larger.' },
      { q: 'What is the emission fee and why is it not shown?', a: 'The emission fee is another charge on fuel paid by producers and importers. The notice does not show it separately, so in the calculator it sits inside the wholesale price, with the cost of compulsory stocks and the refinery margin. We do not show it on its own because the notice gives no figure for it.' },
      { q: 'How is the wholesale price known?', a: 'From the notice: the net price is the average wholesale price of the five largest suppliers with excise and fuel levy, plus PLN 0.30. We subtract those three known amounts. While a notice is only on gov.pl, which gives the VAT-inclusive price alone, the net price is the VAT-inclusive price divided by 1.08 (8% VAT).' },
    ],
    body: (h) => `<h2>Fuel tax breakdown: three fuels side by side</h2>
${h.table(['Part of a litre', h.fn('pb95'), h.fn('pb98'), h.fn('on')], [
      ['Wholesale fuel', ...PAL.map((p) => h.l(sk(p).hurt))],
      ['Excise', ...PAL.map((p) => h.l(sk(p).akcyza))],
      ['Fuel levy', ...PAL.map((p) => h.l(sk(p).oplata))],
      ['Station costs', ...PAL.map((p) => h.l(sk(p).marza))],
      ['VAT 8%', ...PAL.map((p) => h.l(sk(p).vat))],
      ['Maximum price', ...PAL.map((p) => h.l(sk(p).brutto))],
      ['Tax share', ...PAL.map((p) => h.pct(podatki(p) / sk(p).brutto))],
    ], `Notice of ${h.date(h.D.OSTATNIA.ogl)}`, ['l', 'r', 'r', 'r'])}
<h2>Excise rates</h2>
<p>The Excise Act (Article 89(1)) sets PLN ${h.num(P.akcyza.pb_ustawowa)} per 1,000 litres of petrol and PLN ${h.num(P.akcyza.on_ustawowa)} per 1,000 litres of diesel. A Finance Minister regulation (Journal of Laws 2026 item 1289) cuts them to PLN ${h.num(P.akcyza.pb_obnizona)} and PLN ${h.num(P.akcyza.on_obnizona)} until ${h.dateK(P.akcyza.obnizona_do)} After that, without an extension, the statutory rate returns: the ${h.a('po2027', 'fuel prices 2027')} page works out the effect.</p>`,
  },
});
