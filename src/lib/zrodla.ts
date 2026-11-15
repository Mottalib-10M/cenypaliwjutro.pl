/**
 * Liste « Źródła tej strony » : la source du prix en vigueur est tirée des données (dernière annonce lue), pas d'une
 * position du Monitor Polski écrite à la main dans params-2026.json. Test naïf du 2026-11-14 (3e tour) : les sources
 * citaient l'obwieszczenie du 10 novembre alors que le prix affiché venait de l'annonce du 13.
 */
import { P, type SourceKey } from './params';
import { OSTATNIA, OSTATNIA_MP } from './dane';
import { displayDate } from './format';
import type { Locale } from '../i18n/routes';

const d = (iso: string, lang: Locale) => (lang === 'pl' ? `${displayDate(iso, 'pl')} r.` : displayDate(iso, 'en'));
const mp = (lang: Locale, poz: number, ogl: string, dop: string) => ({
  name: lang === 'pl' ? `Monitor Polski 2026, poz. ${poz}: obwieszczenie Ministra Energii z ${d(ogl, lang)} w sprawie maksymalnej ceny paliw${dop}` : `Monitor Polski 2026, item ${poz}: Minister of Energy notice of ${d(ogl, lang)} on the maximum fuel price${dop}`,
  url: `https://api.sejm.gov.pl/eli/acts/MP/2026/${poz}/text.pdf`,
});

export function zrodla(keys: SourceKey[], lang: Locale): Array<{ name: string; url: string }> {
  return keys.flatMap((k) => {
    if (k !== 'mpObw') return [{ name: P.sources[k].label[lang], url: P.sources[k].url }];
    if (OSTATNIA.src === 'govpl') {
      return [
        { name: lang === 'pl' ? `Komunikat Ministerstwa Energii z ${d(OSTATNIA.ogl, lang)} (gov.pl): aktualna cena maksymalna paliw` : `Ministry of Energy announcement of ${d(OSTATNIA.ogl, lang)} (gov.pl): current maximum fuel price`, url: OSTATNIA.url },
        mp(lang, OSTATNIA_MP.poz!, OSTATNIA_MP.ogl, lang === 'pl' ? ' (ostatnie już opublikowane w dzienniku urzędowym)' : ' (latest already in the official gazette)'),
      ];
    }
    return [mp(lang, OSTATNIA.poz!, OSTATNIA.ogl, lang === 'pl' ? ' (aktualna cena)' : ' (current price)')];
  });
}
