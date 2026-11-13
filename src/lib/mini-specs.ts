/** Mini-simulateurs (RECETTE §9.3) : ce site n'en a pas, chaque page porte déjà son calculateur complet.
 *  Le module existe pour que MiniSim et MiniSimAutonome de la trame compilent. */
import type { MiniSpec } from './mini-types';
const SPECS: Record<string, (lang: string) => MiniSpec> = {};
export function getSpec(kind: string, lang: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`mini-simulateur inconnu : ${kind}`);
  return f(lang);
}
