# Test naïf du 2026-11-14 (tour2), testeur 2 : cenypaliwjutro.pl
**Persona :** Polonais(e) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Il/elle a cliqué sur le résultat Google « Ceny paliw dzisiaj i jutro: cena maksymalna w Polsce » parce qu'il/elle veut savoir combien coûte l'essence aujourd'hui et demain. Découverte sur téléphone.

## 1. Concept

**Après 5 s :** « OK, c'est le prix maximum du carburant aujourd'hui. » Le titre « Ceny paliw dzisiaj i jutro » et la première phrase donnent tout de suite la réponse : « benzyna 95 najwyżej 6,02 zł/l, olej napędowy najwyżej 7,52 zł/l », avec les dates « od soboty 14 listopada do poniedziałku 16 listopada ». C'est exactement ce que promettait le résultat Google. Je ne ferme pas.

**Après 2 min :** je comprends que c'est un site indépendant (« Serwis niezależny: nie jesteśmy ministerstwem ani stacją paliw ») qui reprend le prix maximum fixé par le ministre de l'Énergie, calcule le coût d'un plein (« Tankowanie 50 l, najwyżej 301 zł »), donne une fourchette pour la prochaine annonce (« 5,94–6,09 zł/l … 8 razy na 10 »), explique les taxes, l'historique, et ce qui va se passer au 1er janvier 2027 si le paquet CPN s'arrête. Il y a une page par carburant (95, 98, diesel, LPG), chacune avec son calculateur.

**Clair ?** Oui, pour la question « combien aujourd'hui » : immédiat. Pour « combien demain », c'est moins direct (voir difficulté n° 1).
**Pour qui ?** Tout automobiliste en Pologne pendant la période de prix plafonné ; aussi ceux qui hésitent 95/98, diesel ou installation GPL.
**Bénéfice concret :** savoir en 3 secondes le prix maximum légal du litre, le coût d'un plein, si une station m'arnaque (page « Stacja drożej niż limit »), et combien ça va augmenter en janvier.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'essentiel, avec des décrochages ponctuels.** Le chiffre clé est en haut, en gros (« 6,02 zł/l ») dans un encadré rose. Les mots sont du polonais courant.

Où ça décroche :
- Le vocabulaire administratif dans les textes longs : « obwieszczenie », « Monitor Polski », « art. 34a ustawy o zapasach », « Dz.U. 2026 poz. 1289 », « opłata paliwowa », « akcyza ustawowa ». Le site donne un lexique (« Skróty używane w serwisie ») mais bien bas sur l'accueil (suite4–5), personne ne le lira.
- Les 0,30 zł/l qui portent trois noms différents selon l'écran : « Koszty stacji (0,30 zł) », « Koszty operacyjne z ustawy », « Marża stacji » (page 2027). Je me demande si ce sont trois choses différentes.
- La page taxes : « 1,90 zł/l » et « 31,5 % ceny » en titre, mais la barre ne montre que « 64 % » et « 21 % ». Je cherche le 31,5 % dans la barre et je ne le trouve pas.

## 3. Parcours écran par écran

- **01-accueil-1** : compris. Le prix est là dès la première ligne. Petit agacement : le chapeau et le paragraphe suivant répètent les mêmes chiffres (6,02 et 7,52 deux fois en 10 lignes). Le formulaire « Paliwo / Ile litrów tankujesz » est clair, l'exemple « Np. pełny bak osobówki: 40–60 l » aide.
- **01-accueil-suite1** : compris. Encadré résultat très lisible : « 6,02 zł/l … stacja może sprzedawać taniej », « Tankowanie 50 l, najwyżej 301 zł », « −4 gr/l », « Obowiązuje sobota, 14 listopada – poniedziałek, 16 listopada », source gov.pl. Rassurant.
- **01-accueil-suite2** : compris, mais c'est seulement ici, après avoir dépassé tout le calculateur, que j'ai le « Jutro: » (« ceny na wtorek 17 listopada minister poda zwykle w poniedziałek 16 listopada po południu »). Les 4 cartes (diesel 7,52 / 98 6,66 / 95 od wtorku 5,94–6,09 / LPG 3,94) sont excellentes, mais la fourchette « jutro » n'existe que pour la 95 ; si je roule au diesel, je n'ai pas mon « jutro ».
- **01-accueil-suite3–4** : compris. Tableau des trois carburants (« Cena maksymalna / Poprzednia / Zmiana / Bak 50 l »), clair. La phrase sur les 31,5 % de taxes est intéressante.
- **01-accueil-suite5** : lexique d'abréviations : utile mais placé trop bas. Explication du calendrier des annonces (« w piątek po południu poznajesz ceny na sobotę, niedzielę i poniedziałek ») : très bien, c'est ce qui manque en haut.
- **01-accueil-suite6–7** : compris, mais c'est du texte long. « Limit nie jest ceną, którą trzeba płacić » : bonne phrase, elle devrait être plus haut.
- **01-accueil-suite8** : « Pokaż 10 ostatnich cen » et « Pokaż okresy z ceną maksymalną » repliés, bien.
- **01-accueil-suite9–10** : 2027 (« około 7,22 zł/l »), comparaison UE (« 2. najniższa w 27 krajach Unii »), coût annuel. Intéressant mais à ce stade je scrolle vite.
- **01-accueil-suite11–12** : « Jak korzystać z serwisu », plan « Wszystkie strony », FAQ en accordéon. Propre.
- **02-menu-1 / suite1** : compris. Trois rubriques claires (« Ceny i prognoza », « Koszty jazdy », « Podatki i obniżki cen ») + « Metodologia i źródła ». Hésitation : « Ceny paliw dziś i jutro », « Ceny paliw jutro » et « Prognoza cen paliw » : trois entrées qui se ressemblent, je ne sais pas laquelle choisir pour « demain ». En bas de suite1, un bout d'encadré rose dépasse sous le menu (on voit le contenu de la page à travers), un peu brouillon.
- **03-pl-akcyza-i-podatki-w-cenie-paliwa-1** : compris. Décomposition en une phrase (« 3,82 + 1,24 + 0,21 + 0,30 + 0,45 »). Le champ « Litry w roku : 1 000 » avec sous-titre « Ile podatków płacisz w roku » : OK.
- **03-…-suite1** : coince un peu. Barre colorée avec seulement « 64 % » et « 21 % » ; le 31,5 % annoncé n'y apparaît pas. « 1 895 zł na 1 000 l » alors que 1,90 × 1 000 = 1 900 : léger doute (arrondi ?). Légende « Koszty stacji (0,30 zł) » mais ligne « Koszty operacyjne z ustawy » : deux noms.
- **03-…-suite2–3** : tableau trois carburants côte à côte, clair. Surprise utile : le diesel a moins d'accise (0,88) mais un prix de gros bien plus haut (5,33).
- **03-…-suite4–6** : « Stawki akcyzy » très juridique ; FAQ, liens connexes, sources. Pied de page : « Aktualizacja 13 listopada 2026 » puis encore « Stan na 2026, aktualizacja 13 listopada 2026 » : doublon.
- **04-pl-cena-benzyny-95-1** : compris. « najwyżej 6,02 zł/l (−4 gr …), ważne 14–16 listopada ». Le calculateur annuel démarre, avec un sélecteur « Paliwo: Benzyna 95 » alors que je suis sur la page 95 (un peu étrange mais pas gênant).
- **04-…-suite1–2** : compris. « 5 870 zł … 489 zł miesięcznie · 975 litrów », « Koszt 1 km 0,39 zł », « Każde 10 gr/l mniej to rocznie 98 zł » : parlant. Mise en page serrée : « Domyślnie: cena maksymalna od 14 listopada » est collé au libellé suivant « Litry na jedno tankowanie », on ne sait pas à quel champ il se rapporte.
- **04-…-suite3–6** : tableaux par consommation et par mois, clairs ; « Miesiące bez ogłoszeń to okresy bez obniżonego VAT » explique l'absence de juillet et septembre (je ne l'aurais pas remarquée sinon). FAQ pertinentes (« Czy benzyna 95 z E10 kosztuje tyle samo? »).
- **05-pl-cena-benzyny-98-1 / suite1** : compris et vraiment utile : « Dopłata za 98 zamiast 95, rocznie 624 zł », « Różnica na jednym baku 32,00 zł ». Même défaut de mise en page : « Cena maksymalna od 14 listopada » coincé juste au-dessus de « Cena benzyny 98 ».
- **05-…-suite2–3** : tableau par kilométrage, et « Kiedy 98 się opłaca » (« musiałaby zmniejszyć spalanie o 9,6 % ») : argument concret et honnête, j'aime.
- **05-…-suite4–6** : FAQ, liens, sources, pied de page repliable « O serwisie, informacje prawne i wszystkie strony ».
- **06-pl-cena-diesla-1 / suite1–2** : compris. « 7,52 zł/l, o 150 gr więcej niż benzyna 95 » : ça m'étonne mais c'est expliqué ensuite. « 6 204 zł … 517 zł miesięcznie ».
- **06-…-suite2–3** : « Cena diesla a benzyny: skąd różnica » avec tableau ; clair. Petite contradiction : ici « z ostatniego obwieszczenia w Monitorze Polskim », alors que l'accueil disait que la dernière annonce vient d'un communiqué gov.pl et n'est « pas encore » au Monitor Polski.
- **06-…-suite4–6** : moyennes mensuelles diesel, FAQ (« Czy olej napędowy zimowy kosztuje więcej? »), bien.
- **07-pl-cena-lpg-1** : compris : « Cena LPG nie ma limitu », moyenne 3,94 zł/l. Le texte annonce « 100 km kosztuje 33,50 zł ».
- **07-…-suite1–2** : calculateur de rentabilité de l'installation : « Oszczędność na LPG rocznie 1 128 zł, instalacja zwraca się po ok. 38 mies. (62 000 km) » : très parlant. Mais l'encadré affiche « 33,49 zł » alors que le texte au-dessus disait « 33,50 zł » ; et le texte plus bas (suite4–5) calcule à « 15 000 km » (« na LPG 5 026 zł ») alors que le calculateur est pré-rempli à « 20 000 km ». Deux hypothèses différentes sur la même page : je ne sais plus quel chiffre retenir.
- **07-…-suite3–6** : historique hebdo LPG / Pb95, comparaison voisins (Allemagne 4,97, Tchéquie 4,71), FAQ. Bien.
- **08-pl-cena-maksymalna-paliw-1** : compris : « Wybierz dzień, by zobaczyć inną ». Mais le champ date affiche « 11/14/2026 », format américain, sur un site polonais j'attends « 14.11.2026 ». Je dois réfléchir une seconde.
- **08-…-suite1** : résultat clair, mais « Obowiązywała 14 listopada » au passé alors que c'est aujourd'hui.
- **08-…-suite2–4** : « Kara za przekroczenie … do 1 000 000 zł », lien vers « stacja drożej niż cena maksymalna » : utile. « Najdroższa benzyna 95 obowiązywała 14 października: 7,11 zł/l » : intéressant.
- **08-…-suite5–6** : liens, sources, pied de page.
- **09-pl-ceny-paliw-2027-1 / suite1–2** : compris, très concret : « 7,22 zł/l, +120 gr/l », « Bak 50 l 301 zł → 361 zł », « 81 l miesięcznie: więcej o 97 zł ». Le champ « Cena hurtowa bez akcyzy i opłaty » est trop technique pour moi, mais il est pré-rempli et expliqué (« Wyliczona z obwieszczenia z 13 listopada »). Encore les libellés collés : « Ustawa o CPN liczy 0,30 zł/l kosztów » juste au-dessus de « Litry w miesiącu ».
- **09-…-suite3–6** : tableau des 3 carburants (« Dziś (CPN) / Bez CPN, opłata 2026 / Od 1.01.2027 / Różnica »), conseil « Co warto zrobić przed 1 stycznia » (faire le plein fin décembre) : utile et pratique.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Prix maximum du jour (accueil) | oui, 1re ligne | oui | oui, c'est ma question | 5 |
| Calculateur plein (accueil, « Ile litrów tankujesz ») | oui | oui | oui | 5 |
| Fourchette « jutro » (carte 5,94–6,09) | oui mais après le calculateur | oui | oui, mais 95 seulement | 3 |
| Cartes diesel / 98 / LPG (accueil) | oui | oui | oui | 4 |
| Taxes dans le prix (page akcyza) | oui via menu | à moitié (barre 64 % / 21 % vs 31,5 %) | moyen pour moi | 3 |
| Budget annuel 95 / diesel | oui | oui | oui | 4 |
| Surcoût 98 vs 95 | oui | oui | oui, argument clair | 5 |
| Rentabilité installation GPL | oui | oui | oui | 4 |
| Prix max pour un jour choisi | oui | oui, sauf format date « 11/14/2026 » | oui (vérifier un ticket) | 4 |
| Scénario 2027 | oui | oui | oui | 4 |
| Kopiuj wynik / Link do udostępnienia / Drukuj | oui, partout | oui | moyen | 4 |
| FAQ en accordéon | oui | oui (« Dotknij pytania, aby zobaczyć odpowiedź ») | oui | 5 |
| Bouton EN | oui | oui | pas pour moi | 5 |

## 5. Enchaînement et navigation

- Le fil d'Ariane « Start / … » et le menu ☰ sont clairs ; les rubriques ont du sens.
- Chaque page a la même structure (chapeau, calculateur, sources, tableaux, FAQ, « Powiązane strony i kalkulatory ») : une fois une page comprise, les autres se lisent vite.
- Liens internes nombreux et bien choisis (98 → 95, diesel → taxes, LPG → Europe).
- Trois entrées de menu se recouvrent pour « demain » : « Ceny paliw dziś i jutro », « Ceny paliw jutro », « Prognoza cen paliw ».
- Pages très longues : après le calculateur, beaucoup de texte et de tableaux. Les accordéons « Pokaż cały akapit » et « Pokaż 10 ostatnich cen » aident, mais l'accueil fait 13 écrans.
- Pied de page doublé (« Aktualizacja 13 listopada 2026 » puis « Stan na 2026, aktualizacja 13 listopada 2026 »).

## 6. Difficultés classées

1. **01-accueil-suite2 : le « jutro » arrive trop tard et seulement pour la 95.** Le domaine et le titre Google promettent « jutro », mais je dois dépasser tout le calculateur pour lire « Jutro: ceny na wtorek 17 listopada minister poda zwykle w poniedziałek… », et la fourchette n'existe que pour la benzyna 95. *Recommandation :* mettre une ligne « jutro » dans le premier écran, juste sous le chapeau, avec les trois carburants. Texte : « Jutro (wtorek 17.11): cena jeszcze nieznana, minister ogłosi ją w poniedziałek po południu. Zwykle: Pb95 5,94–6,09 zł/l, ON …–… zł/l. »
2. **01-accueil-1 : chiffres répétés deux fois en haut.** Le chapeau et le paragraphe suivant redisent « 6,02 » et « 7,52 ». Je perds un écran pour rien. *Recommandation :* garder le chapeau et faire du 2e paragraphe le complément (98 + « limit, stacja może sprzedawać taniej »). Texte : « Benzyna 98: najwyżej 6,66 zł/l. To limit: stacja może sprzedawać taniej, ale nie drożej. Ogłoszenie Ministra Energii z 13 listopada 2026 r. »
3. **Formulaires 04, 05, 06, 09 : textes d'aide collés au libellé du champ suivant.** « Domyślnie: cena maksymalna od 14 listopada » / « Litry na jedno tankowanie » ; « Cena maksymalna od 14 listopada » / « Cena benzyny 98 » ; « Ustawa o CPN liczy 0,30 zł/l kosztów » / « Litry w miesiącu ». Je ne sais pas à quel champ appartient l'aide. *Recommandation :* ajouter de l'espace sous chaque aide (marge avant le libellé suivant) ou mettre l'aide en gris plus petit, collée sous son propre champ.
4. **03-…-suite1 : la barre ne montre pas le 31,5 % annoncé.** Titre « 1,90 zł/l … 31,5 % ceny », barre « 64 % » et « 21 % » seulement. *Recommandation :* ajouter au-dessus de la barre « Podatki i opłaty razem: 31,5 % » ou afficher le pourcentage de chaque segment dans la légende.
5. **Trois noms pour les mêmes 0,30 zł/l** (03 « Koszty stacji » / « Koszty operacyjne z ustawy », 09 « Marża stacji »). *Recommandation :* un seul nom partout. Texte : « Koszty i marża stacji (0,30 zł/l z ustawy) ».
6. **07-pl-cena-lpg : hypothèses incohérentes sur la même page.** Texte « 33,50 zł » vs encadré « 33,49 zł » ; texte bas à « 15 000 km » vs calculateur à « 20 000 km ». *Recommandation :* aligner le texte sur les valeurs par défaut du calculateur (20 000 km) et sur le même arrondi.
7. **08-pl-cena-maksymalna-paliw-1 : date « 11/14/2026 » et « Obowiązywała 14 listopada ».** Format américain et passé pour aujourd'hui. *Recommandation :* afficher la date choisie au format polonais à côté du champ (« sobota, 14.11.2026 ») et écrire « Obowiązuje » quand le jour est aujourd'hui ou à venir.
8. **Menu (02-menu-1) : trois entrées proches pour « demain ».** *Recommandation :* fusionner ou renommer pour qu'on voie la différence. Texte : « Ceny paliw jutro: kiedy ogłoszenie » et « Prognoza: w jakich granicach nowa cena ».

## 7. À garder

- La réponse dans la première phrase : « benzyna 95 najwyżej 6,02 zł/l, olej napędowy najwyżej 7,52 zł/l », avec les jours de validité.
- L'encadré résultat avec « stacja może sprzedawać taniej », le coût du plein et la source gov.pl cliquable.
- Les 4 cartes de l'accueil (diesel, 98, 95 od wtorku, LPG) : lisibles en un coup d'œil.
- La phrase d'honnêteté « Przed ogłoszeniem nikt nie zna jutrzejszej ceny, także stacje » et la fourchette « 8 razy na 10 ».
- « Serwis niezależny: nie jesteśmy ministerstwem ani stacją paliw ».
- La page 98 (« Dopłata … 624 zł », « Kiedy 98 się opłaca ») et la page 2027 (« Bak 50 l 301 zł → 361 zł », conseil de faire le plein fin décembre).
- Le calculateur GPL avec le retour sur investissement en mois et en km.
- Les FAQ en accordéon et les liens « Powiązane strony i kalkulatory ».

## 8. Notes

Clarté : 8/10
Facilité : 8/10
Utilité : 8/10
