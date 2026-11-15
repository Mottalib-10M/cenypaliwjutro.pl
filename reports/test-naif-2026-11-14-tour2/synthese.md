# Synthèse du test naïf du 2026-11-14 (2e tour) : cenypaliwjutro.pl

Notes du 2e tour : 8/7/8, 8/8/8, 7/7/8 (1er tour : 6/6/7, 6/7/7, 5/5/7). Version testée : `c7b83c8`.
Une ligne par difficulté relevée ; corrections faites pour le 3e tour.

| # | Difficulté (testeurs) | Décision | Raison / ce qui a été fait |
|---|---|---|---|
| 1 | Le « jutro » du domaine et du titre Google n'arrive qu'après le calculateur, et seulement pour la benzyna 95 (T1, T2, T3) | **corrigé** | Ligne « Jutro (date) » au premier écran, sous la phrase d'intro, pour chaque carburant qui a une donnée sourcée : si demain est encore couvert par la dernière annonce, ses prix (benzyna 95, olej napędowy, benzyna 98) ; si demain est le jour de la prochaine annonce, « cena jeszcze nieogłoszona » + jour de l'annonce + fourchette 8 fois sur 10 pour les trois carburants (variations entre annonces officielles) ; au-delà, « nie mamy jeszcze ceny » + lien gov.pl, sans fourchette. LPG : dit pourquoi il n'y a pas de prix de demain (pas de prix maximal ni d'annonce quotidienne) et donne la moyenne hebdomadaire datée. Calculée avec la date du navigateur (`JutroLinia.tsx`). L'ancienne ligne sous le calculateur est retirée. |
| 2 | Carte « Benzyna 95 od wtorku 5,94–6,09 zł/l » en gros : on croit à un prix connu ; rien pour le diesel (T2, T3) | **corrigé** | Carte « Ceny od wtorku 17 listopada : jeszcze nieznane », fourchettes benzyna 95 et olej napędowy en petit dessous. |
| 3 | Sigles Pb95, Pb98, ON, CPN, LPG, Weekly Oil Bulletin, E10, MFiG, M.P., Dz.U., API ELI avant toute explication ; lexique au 5e écran (T1, T2, T3) | **corrigé** | Chaque sigle est traduit à sa première apparition sur chaque page (« benzyna 95 (Pb95) », « olej napędowy (ON) », « pakiet „Ceny Paliw Niżej” (CPN) », « LPG (autogaz) », « benzyna E10 (z dodatkiem do 10 % bioetanolu) ») ou remplacé par le nom en toutes lettres (en-têtes des tableaux historia, kontrola, średnie ; intros cena maksymalna et jutro ; cartes « Powiązane strony »). « Weekly Oil Bulletin » devient « tygodniowy biuletyn cen paliw Komisji Europejskiej » ; « liquefied petroleum gas » retiré ; sources en toutes lettres (« Rozporządzenie Ministra Finansów i Gospodarki », « Dziennik Ustaw 2026, poz. … », « Monitor Polski 2025, poz. … »). Vérifié par un balayage du HTML de chaque page polonaise. |
| 4 | Champ « Dzień tankowania » affiché « 11/14/2026 » (format américain) (T1, T2, T3) | **corrigé** | Champ texte « dd.mm.rrrr » (accepte aussi « 14,11,2026 », « 14/11/2026 »), aide « Dzień.miesiąc.rok, np. 14.11.2026 (data z paragonu) », message si la date n'existe pas ou sort de la plage. Même champ pour la date du paragon (page « Stacja drożej niż limit »). |
| 5 | « Obowiązywała 14 listopada » : au passé et pour un seul jour alors que l'accueil dit 14–16 (T1, T2, T3) | **corrigé** | Cause : pour la dernière annonce (sans date de fin), le calculateur n'affichait que le premier jour. Il prend maintenant le dernier jour couvert (14–16 listopada) et écrit « Obowiązuje » tant que ce jour n'est pas passé (date du navigateur), « Obowiązywała » ensuite. |
| 6 | Premier écran : les mêmes prix 6,02 / 7,52 répétés dans deux paragraphes de suite (T1, T2, T3) | **corrigé** | Le 2e paragraphe commence par le complément : « To limit… może sprzedawać taniej ; benzyna 98 kosztuje najwyżej 6,66 zł/l », puis la variation, sans redire les prix. |
| 7 | Les mêmes 0,30 zł/l appelés « Koszty stacji », « Koszty operacyjne z ustawy », « Marża stacji » (T1, T2, T3) | **corrigé** | Un seul nom partout : « Koszty i marża stacji (0,30 zł/l z ustawy) » (calculateurs, tableaux, accueil, FAQ). |
| 8 | « 1,90 zł/l » mais « 1 895 zł na 1 000 l » (T1, T2, T3) | **corrigé** | Cause : la somme annuelle partait de la taxe non arrondie (1,8946 zł). Elle part maintenant de la taxe au grosz affichée : litres × 1,90 zł (calculateur et texte). |
| 9 | La barre ne montre que 64 % et 21 %, pas le 31,5 % annoncé (T2, T3) | **corrigé** | Barre en trois parts (paliwo w hurcie, koszty i marża stacji, podatki i opłaty razem) avec le pourcentage dans la légende et dans la barre, à une décimale (« 31,5 % »). Le détail akcyza / opłata / VAT reste dans le tableau. |
| 10 | Page LPG : « 33,50 zł » dans le texte contre « 33,49 zł » dans le résultat ; calculateur à 20 000 km contre texte à 15 000 km (T1, T2, T3) | **corrigé** | Causes : le texte utilisait la moyenne LPG non arrondie, le calculateur la moyenne au grosz ; le calculateur LPG avait un kilométrage à part. Moyenne LPG arrondie au grosz à la source (`dane.ts`), kilométrage par défaut = 15 000 km comme sur toutes les pages. |
| 11 | Sources : « obwieszczenie z 10 listopada » alors que le prix vient de l'annonce du 13 ; page diesel « z ostatniego obwieszczenia w Monitorze Polskim » alors que l'accueil dit gov.pl (T1, T2, T3) | **corrigé** | La source du prix en vigueur est tirée des données (`lib/zrodla.ts`) : « Komunikat Ministerstwa Energii z 13 listopada 2026 r. (gov.pl): aktualna cena maksymalna paliw », puis la dernière position déjà parue au Monitor Polski. Page diesel : « z ostatniego ogłoszenia ministra ». |
| 12 | Calculateur 2027 : « Cena hurtowa bez akcyzy i opłaty » et « Marża stacji » en premier, impossibles à remplir (T1, T2, T3) | **corrigé** | Ordre : carburant, litres par mois (avec exemple) ; les deux champs techniques sont repliés sous « Zaawansowane: cena hurtowa i marża (nie musisz zmieniać) », avec « zostaw, jeśli nie wiesz ». |
| 13 | Textes d'aide collés au libellé du champ suivant (pages 95, 98, LPG, 2027) (T2, T3) | **corrigé** | Espace vertical entre les champs des grilles de formulaire (`gap-y-5`) dans tous les calculateurs. |
| 14 | Menu : « Ceny paliw dziś i jutro », « Ceny paliw jutro », « Prognoza cen paliw » trop proches (T1, T2) | **corrigé** | « Ceny paliw dziś (strona główna) », « Ceny paliw jutro: kiedy nowa cena », « Prognoza: kierunek następnej zmiany ». |
| 15 | Accueil trop long et trop juridique (T2, T3) | **corrigé** | « Jak liczona jest cena maksymalna » replié (« Pokaż, jak minister liczy cenę », toujours dans le HTML) ; « Jak korzystać z serwisu » (« nic nie wysyła ») remonté après le lexique ; « Limit nie jest ceną, którą trzeba płacić » remonté dans le premier paragraphe ; phrase « Z 104 ogłoszeń 103 odczytaliśmy z Monitora Polskiego » retirée. |
| 16 | Mots d'administration : « obwieszczenie », « akcyza », « opłata paliwowa » (T1, T2, T3) | **corrigé** | Lexique : « Obwieszczenie to oficjalne ogłoszenie ministra. Akcyza i opłata paliwowa to stałe kwoty od każdego litra, doliczane przed VAT. » |
| 17 | Références de loi dans les phrases (« art. 34a ust. 6 », « Dz.U. 2026 poz. 1289 », « art. 63 ust. 18 »…) (T1, T3) | **corrigé** | Retirées des phrases (accueil, akcyza, pakiet CPN, cena maksymalna, jutro, kontrola, 2027) ; elles restent dans les sources et sur la page Metodologia. |
| 18 | Tableau 2027 : la colonne « Bez CPN, opłata 2026 » embrouille (1 grosz d'écart) (T1, T3) | **corrigé** | Colonne retirée : « Dziś / Od 1 stycznia 2027 / Różnica ». |
| 19 | « Litry w roku 1 000 » : je ne sais pas combien je prends par an (T1, T3) | **corrigé** | Libellé « Ile litrów tankujesz w roku », valeur par défaut 975 l tirée de l'exemple du site (15 000 km à 6,5 l/100 km), écrit sous le champ. |
| 20 | Page LPG : moyenne benzyna 95 6,07 au-dessus du plafond, et 8,10 zł/l fin septembre, sans explication sur place (T1, T3) | **corrigé** | Phrase avant le tableau, et colonne « Benzyna 95, cena maksymalna w poniedziałek » (« brak » les semaines sans prix maximal). |
| 21 | Mois manquants expliqués seulement après le tableau (T3 ; T1 l'a remarqué) | **corrigé** | Explication déplacée avant les tableaux mensuels (pages 95 et diesel). |
| 22 | Diesel 1,50 zł plus cher que la 95 sans explication sur l'accueil (T1) | **corrigé** | Carte diesel : « drożej niż benzyna 95, bo wyższe są cena hurtowa i opłata paliwowa » (déjà expliqué sur la page diesel, avec les chiffres). |
| 23 | « Spalanie » sans aide (T3) | **corrigé** | « Spalanie (litry na 100 km) », aide « Nie wiesz? Zostaw przykład 6,5 » (5,5 pour le diesel). |
| 24 | « Składnik na litrze : Udział podatków » en pourcentage (T1) | **corrigé** | Défaut objectif de libellé : « Podatki i opłaty razem, % ceny ». |
| 25 | « Ustawa o CPN liczy 0,30 zł/l » alors qu'ailleurs on dit « pakiet » (T3) | **corrigé** | Aide reformulée : « Ustawa przyjmuje 0,30 zł/l; bez limitu stacja ustala ją sama ». |
| 26 | « mies. » abrégé dans le résultat LPG (T3) | **corrigé** | « po ok. 38 miesiącach ». |
| 27 | « Zmiana od poprzedniego obwieszczenia » (T3) | **corrigé** | « Zmiana wobec poprzedniej ceny ». |
| 28 | Pied de page doublé « Aktualizacja … » / « Stan na 2026, aktualizacja … » (T2) | non retenu | Un seul testeur ; deux mentions du composant de trame (BaseLayout), sans contradiction de chiffre. |
| 29 | Bout d'encadré rose visible sous le menu ouvert (T2) | non retenu | Un seul testeur ; menu mobile commun à la trame, contenu de la page derrière le voile. |
| 30 | Sélecteur « Paliwo » sur la page benzyna 95 (T2) | non retenu | Un seul testeur, « pas gênant » ; il sert à comparer avec un autre carburant. |
| 31 | « Kopiuj wynik / Link / Drukuj » peu utiles (T1, T2, T3) | non retenu | Les trois disent que ça ne gêne pas ; boutons communs à la trame. |
| 32 | « komputer pokładowy » inconnu (T3) | non retenu | Un seul testeur ; mot courant en Pologne, à côté de « albo z rachunków ». |
| 33 | Liens soulignés nombreux dans le texte (T3) | non retenu | Un seul testeur ; liens internes utiles, les cartes « Powiązane strony » restent le chemin principal. |
| 34 | Même lien nommé « Podatki w cenie paliwa » et « akcyza i podatki w cenie paliwa » (T1) | non retenu | Un seul testeur ; même page, libellés compatibles. |
| 35 | Champ « Litry w miesiącu 81 » : je ne sais pas (T3) | **corrigé** | Libellé « Ile litrów tankujesz w miesiącu », exemple expliqué sous le champ (15 000 km par an à 6,5 l/100 km). |

## Mise à jour programmée des prix

Le site a déjà un script qui relit ses sources officielles citées (`scripts/build-data.py --fetch` : API ELI du Sejm pour
le Monitor Polski, communiqués gov.pl/web/energia, Weekly Oil Bulletin de la Commission européenne). `.github/workflows/deploy.yml`
est remplacé par le gabarit `update-data.yml.modele` rempli : relecture en semaine à 14 h 30 et 17 h 30 UTC (après les
annonces du ministère, l'après-midi des jours ouvrés), `npm run update-data` = `build-data.py --fetch --garder`, commit de
`src/data/ceny.json` et `src/data/wob.json` si la donnée change, cache de `data-raw/` (hors git) entre deux passes.
Règles du gabarit : aucune lecture pendant `npm run build` ; avec `--garder`, une source en échec (réseau, 403 ou défi
anti-robot, format changé, contrôle de cohérence, moins d'annonces qu'avant) laisse le fichier précédent et sa date ;
`curl --fail` n'enregistre jamais une page d'erreur, sans nouvel essai ni contournement. Essai local de `npm run update-data` :
104 annonces lues (dont 1 gov.pl), WOB 150 semaines, données inchangées. Le test qui figeait la « dernière annonce » au
13 novembre retrouve maintenant cette annonce par sa date (mêmes assertions), sinon il casserait à la première relecture.

## Contrôles

(complété après `npm run check`)
