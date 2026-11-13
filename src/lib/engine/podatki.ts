/**
 * Composition d'un litre et scénario « après le CPN » (fonctions pures).
 * Art. 34a ust. 2 ustawy o zapasach : cena maksymalna netto = moyenne des prix de gros des cinq premiers fournisseurs
 * (accise et opłata paliwowa comprises) + 0,30 zł/l ; le prix au litre affiché = cette somme + TVA.
 * Donc : prix de gros hors accise et opłata = netto − 0,30 − accise − opłata.
 */
export interface Stawki {
  vat: number;
  /** accise, zł par litre */
  akcyza: number;
  /** opłata paliwowa, zł par litre */
  oplata: number;
  /** coût de vente retenu, zł par litre (0,30 dans la loi) */
  marza: number;
}

export interface Sklad { brutto: number; netto: number; vat: number; akcyza: number; oplata: number; marza: number; hurt: number }

/** Composition d'un prix maximal TTC. `netto` connu (Monitor Polski) ou déduit du TTC et du taux de TVA. */
export function sklad(brutto: number, s: Stawki, netto?: number | null): Sklad {
  const n = netto ?? brutto / (1 + s.vat);
  return { brutto, netto: n, vat: brutto - n, akcyza: s.akcyza, oplata: s.oplata, marza: s.marza, hurt: n - s.marza - s.akcyza - s.oplata };
}

/** Prix TTC d'un litre avec un prix de gros hors taxes donné et d'autres taux (scénario, jamais un prix officiel). */
export function cenaZ(hurt: number, s: Stawki): number {
  return (hurt + s.akcyza + s.oplata + s.marza) * (1 + s.vat);
}

/** Ce que le même prix de gros donnerait avec d'autres taux : écart par litre et pour un volume. */
export function scenariusz(teraz: Sklad, nowe: Stawki, litry = 0) {
  const cena = cenaZ(teraz.hurt, nowe);
  return { cena, roznica: cena - teraz.brutto, naLitry: (cena - teraz.brutto) * litry };
}
