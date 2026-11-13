/** Coûts d'usage (fonctions pures) : plein, budget annuel, trajet, LPG, comparaison de carburants. */
export const tankowanie = (litry: number, cena: number) => litry * cena;

export function rocznie(km: number, spalanie: number, cena: number) {
  const litry = (km * spalanie) / 100;
  const koszt = litry * cena;
  return { litry, koszt, miesiac: koszt / 12, na100: spalanie * cena, naKm: (spalanie * cena) / 100 };
}

export function trasa(km: number, spalanie: number, cena: number, osoby = 1, wTeIZpowrotem = false) {
  const dystans = km * (wTeIZpowrotem ? 2 : 1);
  const litry = (dystans * spalanie) / 100;
  const koszt = litry * cena;
  return { dystans, litry, koszt, naOsobe: koszt / Math.max(1, osoby) };
}

/** Instalacja LPG : économie annuelle et durée de retour sur investissement (mois). */
export function lpg(km: number, spalaniePb: number, cenaPb: number, spalanieLpg: number, cenaLpg: number, koszt: number) {
  const pb = rocznie(km, spalaniePb, cenaPb).koszt;
  const gaz = rocznie(km, spalanieLpg, cenaLpg).koszt;
  const oszczednosc = pb - gaz;
  return { pb, gaz, oszczednosc, miesiace: oszczednosc > 0 ? (koszt / oszczednosc) * 12 : Infinity, kmZwrotu: oszczednosc > 0 ? (koszt / oszczednosc) * km : Infinity };
}

/** Surcoût annuel d'un carburant plus cher (98 au lieu de 95). */
export function doplata(km: number, spalanie: number, cenaA: number, cenaB: number) {
  const litry = (km * spalanie) / 100;
  return { litry, roznica: litry * (cenaB - cenaA), naLitr: cenaB - cenaA };
}

/** Contrôle d'un prix payé contre le prix maximal du jour. */
export function kontrola(cenaZaplacona: number, cenaMax: number, litry: number) {
  const nadwyzka = Math.round((cenaZaplacona - cenaMax) * 100) / 100;
  return { ponad: nadwyzka > 0, nadwyzka, naLitry: Math.max(0, nadwyzka) * litry };
}
