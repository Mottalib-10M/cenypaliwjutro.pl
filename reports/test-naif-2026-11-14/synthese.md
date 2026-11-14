# Synthèse du test naïf du 2026-11-14 : cenypaliwjutro.pl

Notes du 1er tour : 6/6/7, 6/7/7, 5/5/7. Une ligne par difficulté relevée.

| # | Difficulté (testeurs) | Décision | Raison / ce qui a été fait |
|---|---|---|---|
| 1 | Le samedi 14, 6,06 zł/l « dzisiaj » + « Ta cena obowiązywała do 13 listopada » à côté de « Obowiązuje: piątek, 13 listopada » (T1, T2, T3) | **corrigé** | Données relues une fois avec `scripts/build-data.py --fetch` (API ELI du Sejm + gov.pl, même source) : l'annonce du 13 novembre pour les 14-16 novembre est lue (Pb95 6,02, Pb98 6,66, ON 7,52 zł/l). Affichage : prix daté partout (« od soboty 14 listopada do poniedziałku 16 listopada ») ; quand le dernier jour couvert est passé, le calculateur passe au passé (« ostatnia odczytana cena maksymalna », ligne « Obowiązywała ») et dit simplement que l'annonce suivante n'est pas encore lue, avec un lien vers les communiqués gov.pl ; plus jamais « obowiązuje » et « obowiązywała » côte à côte. Aucun workflow `.github/` créé ni modifié. |
| 2 | Pages du plan en anglais (T1, T2, T3) | non retenu | Outil de captures (il prenait les pages /en/ après l'accueil), corrigé depuis. |
| 3 | « Jutro » sans réponse lisible ; carte « NASTĘPNE OGŁOSZENIE −8 gr / +7 gr — 8 razy na 10 » (T1, T2, T3) | **corrigé** | Ligne « Jutro: » visible juste sous le calculateur (jour de la prochaine annonce, jour où elle s'applique, fourchette en zł/l) ; la carte devient « Benzyna 95 od wtorku 17 listopada : 5,94–6,09 zł/l, jeszcze nieogłoszona ». Tous les chiffres viennent des annonces lues. |
| 4 | 6,10 / 7,66 (CPN, décomposition diesel) contre 6,06 / 7,54 ailleurs ; « o 121 gr » ≠ 7,31 − 6,06 (T1, T2, T3) | **corrigé** | Cause : la décomposition partait de la dernière position du Monitor Polski, pas du prix en vigueur. Elle part maintenant du prix en vigueur partout (netto officiel s'il est au Monitor Polski, sinon prix TTC ÷ 1,08). Prix de scénario arrondis au grosz : 7,22 − 6,02 = 1,20 zł, écrit « 120 gr ». |
| 5 | Dates impossibles « 24 October – 23 October », « 12 June – 11 June » (T1, T2, T3) | **corrigé** | Cause : la date d'annonce de l'API ELI est fausse pour 4 positions (552, 557, 601, 1036). Le script lit maintenant la date dans le texte officiel (« z dnia … ») et s'arrête si une période finit avant de commencer. Les périodes concordent avec les titres gov.pl (4-5 juin, 13-15 juin, 24-26 octobre). |
| 6 | Jargon de la prévision : back-test, walk-forward, Rule error, Range: 1 / 5 ; fourchette à 5 annonces en vedette (T1, T2, T3) | **corrigé** | Libellés en mots simples (« Reguła myliła się średnio o », « Pokazujemy kierunek? », « Następne ogłoszenie », « Za ok. tydzień ») ; horizon par défaut = prochaine annonce ; « Jak z tego korzystać » remonté sous le calculateur. |
| 7 | 150 l par mois par défaut (T1, T3) | **corrigé** | Valeur par défaut = 81 l, tirée de l'exemple du site (15 000 km/an à 6,5 l/100 km), indiquée sous le champ (prévision et 2027). |
| 8 | « 6.5 » / « 5.5 » chevauchent « l/100 km » (T1, T2, T3) | **corrigé** | Marge droite du champ élargie quand l'unité est longue (`NumberField`, composant de trame, signalé). Libellé du champ CPN : « Spalanie (litry na 100 km) ». |
| 9 | « Od piątek, 13 listopada » (T1, T2, T3) | **corrigé** | Jour au génitif après od/do (« od soboty 14 listopada »), à l'accusatif après w/na (« we wtorek », « na wtorek »). |
| 10 | « 2026 r.. » (T1, T2) | **corrigé** | Date de fin de phrase sans second point, sur toutes les pages (aucun « r.. » dans `dist`). |
| 11 | Sigles trop tard (Pb95, ON, M.P., CPN) ; « bez limitu » pour le LPG (T1, T2, T3) | **corrigé** | Section « Skróty » remontée juste après le premier tableau ; cartes et tableaux en toutes lettres (« Benzyna 95 », « Olej napędowy ») ; « Monitor Polski 2026, poz. … » au lieu de « M.P. » ; menu « Pakiet „Ceny Paliw Niżej” (CPN) » ; LPG : « brak ceny maksymalnej ». |
| 12 | Références de loi dans les phrases (art. 34a ust. 6…) (T1, T2, T3) | **corrigé** | Retirées des phrases de l'accueil et de l'historique ; elles restent dans les sources de la page. |
| 13 | Accueil trop long : 10 derniers prix et périodes en 4 écrans (T1, T2, T3) | **corrigé** | Les deux tableaux sont repliés (« Pokaż 10 ostatnich cen », « Pokaż okresy z ceną maksymalną »), toujours dans le HTML. |
| 14 | Menu : « Koszty jazdy » fermé, les deux autres ouverts (T1, T2, T3) | **corrigé** | Les trois rubriques du menu mobile s'ouvrent pareil (composant de trame, signalé). |
| 15 | Historique : 103 fiches sur 30 écrans, trous non signalés (T1, T2, T3) | **corrigé** | Un tableau compact par mois (le plus récent ouvert, les autres repliés), date liée à la source, et une ligne pour chaque période sans cena maksymalna. |
| 16 | « +121 gr/l per litre » (signe + et litre en double) ; plein 50 l = 60,31 ≠ 121 × 50 (T1, T2, T3) | **corrigé** | « oszczędność 120 gr na każdym litrze » ; prix sans CPN arrondi au grosz, donc plein = 50 × écart affiché. |
| 17 | Tableau mensuel « 2026-03 », juillet et septembre absents (T1, T2) | **corrigé** | Mois en toutes lettres (« marzec 2026 ») et phrase sur les mois sans cena maksymalna. |
| 18 | « 22 wks » (T1, T2) | **corrigé** | « z 22 tygodni » / « over 22 weeks ». |
| 19 | Moyenne 6,07 zł/l supérieure au plafond 6,06 (T3) | **corrigé** | Défaut objectif apparent : phrase ajoutée quand c'est le cas (moyenne de toute une semaine, plafond qui change chaque jour). |
| 20 | « Weekly Oil Bulletin » en anglais (T3) | **corrigé** | Traduit à la première mention (« tygodniowy biuletyn cen paliw Komisji Europejskiej »). |
| 21 | Économie CPN diesel 141 gr contre 142 gr pour 2027 (T2) | non retenu | Deux scénarios différents (redevance 2026 contre redevance 2027), chacun nommé dans son tableau ; les deux partent maintenant du même prix. |
| 22 | Intro anglaise non repliée (T2) | non retenu | Version anglaise vue par erreur (outil de captures). |
| 23 | Bouton « EN » ambigu, collé au ☰ (T1, T3) | non retenu | Remarque liée au passage en anglais causé par l'outil ; bouton de langue commun à la trame. |
| 24 | Adresse de l'éditeur en France (T1, T2, T3) | non retenu | Identité de l'éditeur imposée (Radif Partners), non modifiable. |
| 25 | « Drukuj » inutile sur téléphone (T2) | non retenu | Un seul testeur, pas un défaut objectif ; bouton commun à la trame. |
| 26 | « nic nie wysyła » et « Limit nie jest ceną… » trop bas (T3) | non retenu | Un seul testeur ; « stacja może sprzedawać taniej » est déjà sous le prix. |
| 27 | « Litres per fill » collé à l'aide (T2) | non retenu | Page anglaise vue par erreur ; un seul testeur. |

## Contrôles

- `npm run check` : sortie 0 (47 tests dont un nouveau sur les périodes et les dates lues dans le texte officiel ; le test qui figeait la dernière annonce au 12 novembre a été mis à jour sur les données relues, rien n'a été affaibli).
- Captures relues après correction : accueil, menu, pakiet CPN, cena diesla, prognoza, historia (tableau mensuel tenu dans la largeur du téléphone), accueil anglais (premier champ revenu dans le premier écran).
- Composants de trame corrigés dans ce site seulement : `NumberField` (marge de l'unité longue), menu mobile de `BaseLayout` (rubriques toutes ouvertes).
