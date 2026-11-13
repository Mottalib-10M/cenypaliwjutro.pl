/** Registre des pages de contenu : chaque fichier de `src/content/strony/` est chargé ici (un fichier = une page, deux langues). */
import type { PageDef, Group } from './strona-typy';
const mods = import.meta.glob<{ default: PageDef }>('../content/strony/*.ts', { eager: true });
export const PAGES: PageDef[] = Object.entries(mods)
  .map(([file, m]) => {
    const g = m.default;
    const base = file.split('/').pop()!.replace(/\.ts$/, '');
    if (g.id !== base) throw new Error(`${file} : id « ${g.id} » différent du nom du fichier`);
    return g;
  })
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const GROUPS: Group[] = ['ceny', 'koszty', 'podatki'];
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
