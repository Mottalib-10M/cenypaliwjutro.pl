/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://cenypaliwjutro.pl";
export const SITE_NAMES: Record<string, string> = {"pl": "Ceny Paliw Jutro", "en": "Ceny Paliw Jutro"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "Jutro";
export const LANG_TAGS: Record<string, string> = {"pl": "pl-PL", "en": "en-PL"};
export const OG_LOCALES: Record<string, string> = {"pl": "pl_PL", "en": "en_GB"};
export const LOCALE_TAG = 'pl-PL';
export const CURRENCY = 'PLN';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-11-13';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"pl": "Niezależny wydawca kalkulatorów cen paliw w Polsce, opartych na obwieszczeniach Ministra Energii w Monitorze Polskim i na tygodniowym biuletynie naftowym Komisji Europejskiej", "en": "Independent publisher of Polish fuel price calculators built on the Minister of Energy notices in Monitor Polski and the European Commission Weekly Oil Bulletin"};
export const AUTHOR_DESC: Record<string, string> = {"pl": "Radif Partners przepisuje każde obwieszczenie Ministra Energii o maksymalnej cenie paliw opublikowane w Monitorze Polskim, liczy z niego koszt tankowania i przejazdu, pokazuje udział akcyzy, opłaty paliwowej i VAT w litrze oraz szacuje, ile może kosztować litr po końcu pakietu CPN. Średnie tygodniowe, także LPG, pochodzą z biuletynu naftowego Komisji Europejskiej. Nie sprzedajemy paliwa, nie współpracujemy ze stacjami i nie zbieramy danych osobowych.", "en": "Radif Partners transcribes every Minister of Energy notice on the maximum fuel price published in Monitor Polski, turns it into the cost of a full tank and of a trip, shows the share of excise, fuel levy and VAT in a litre and estimates what a litre may cost once the CPN package ends. Weekly averages, LPG included, come from the European Commission Weekly Oil Bulletin. We sell no fuel, have no deal with any station and collect no personal data."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"pl": ["Maksymalna cena detaliczna paliw w Polsce (art. 34a ustawy o zapasach)", "Akcyza, opłata paliwowa i VAT w cenie litra paliwa", "Pakiet „Ceny Paliwa Niżej” (CPN) i jego koniec", "Koszt tankowania i koszt przejazdu samochodem", "Średnie tygodniowe ceny paliw i LPG w Polsce i w UE"], "en": ["Poland's official maximum retail fuel price (Article 34a of the Stocks Act)", "Excise, fuel levy and VAT in the price of a litre", "The CPN fuel price package and its end", "Cost of a full tank and of a car trip", "Weekly average fuel and LPG prices in Poland and the EU"]};
export const CONTACT_EMAIL = "kontakt@cenypaliwjutro.pl";
export const THEME_COLOR = '#B3122E';
export const LOGO_SYMBOL = 'zł/l';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '11f8a30b2b218458231a03e8376f6310';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',             // vide à dessein, comme sur les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "VAT",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;

/** Locale des nombres par langue de page : virgule décimale en polonais, point en anglais (RECETTE §4.1). */
export const LOCALE_BY_LANG: Record<string, string> = { pl: 'pl-PL', en: 'en-GB' };
