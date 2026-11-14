# Test naïf du 2026-11-14, testeur 2 : cenypaliwjutro.pl
**Persona :** Polonais(e) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Il/elle a cliqué sur le résultat « Ceny paliw dzisiaj i jutro: cena maksymalna w Polsce » parce qu'il/elle veut savoir combien coûte le carburant aujourd'hui et demain. Il/elle découvre le site sur son téléphone, un samedi (14 novembre).

## 1. Concept

**Après 5 s :** « Ceny paliw dzisiaj i jutro » puis, juste en dessous, « benzyna 95 najwyżej 6,06 zł/l, olej napędowy 7,54 zł/l ». Elle a sa réponse pour aujourd'hui en 3 secondes : c'est un site qui donne le prix plafond fixé par le ministre. C'est exactement ce que promettait Google. Bon départ.

**Après 2 min :** elle comprend que c'est un tableau de bord du prix maximum officiel (obwieszczenie Ministra Energii) : le prix plafond du jour pour Pb95, Pb98 et ON, le coût d'un plein, l'écart avec le prix d'avant, l'historique, une fourchette pour la prochaine annonce, la moyenne réelle à la pompe, le LPG, une projection 2027. C'est sérieux, sourcé, indépendant (« Serwis niezależny: nie jesteśmy ministerstwem ani stacją paliw »).

**Mais deux choses la font douter :**
- **Aujourd'hui :** la grande carte rouge affiche « 6,06 zł/l » puis, en gras, « Ta cena obowiązywała do 13 listopada 2026. Nowsze obwieszczenie sprawdź w Monitorze Polskim. ». On est le 14. Juste en dessous, la même carte dit « Obowiązuje piątek, 13 listopada », et l'intro dit « Od piątek, 13 listopada żadna stacja… ». Plus bas, le texte explique qu'une cena « ogłoszona przed weekendem […] obowiązuje także w dni wolne ». Donc 6,06 vaut-il aujourd'hui samedi, oui ou non ? Le site l'envoie vérifier ailleurs : c'est précisément ce qu'elle voulait éviter.
- **Demain :** le mot « jutro » est dans le titre, mais la seule réponse visible en haut est une carte « NASTĘPNE OGŁOSZENIE, PB95 −8 gr / +7 gr — 8 razy na 10 w tych granicach ». Elle doit deviner que ça veut dire « demain le prix sera probablement entre 5,98 et 6,13 ». L'explication claire (« Przed ogłoszeniem nikt nie zna jutrzejszej ceny […] w piątek po południu poznajesz ceny na sobotę, niedzielę i poniedziałek ») n'arrive qu'au 5e écran de défilement.

**Pour qui ?** Tout conducteur en Pologne qui veut savoir si la station est dans les clous et combien coûte un plein. **Bénéfice concret :** le prix plafond du jour en un coup d'œil + le coût d'un plein + une idée de la prochaine variation. Clair sur le « aujourd'hui », flou sur le « demain » et sur la validité du prix affiché.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'essentiel (le prix du jour), non pour le reste.** Le premier écran est lisible par n'importe qui. Ça décroche :
- sur la carte rouge, à cause de la phrase « Ta cena obowiązywała do 13 listopada 2026 » qui contredit le reste ;
- sur « NASTĘPNE OGŁOSZENIE, PB95 −8 gr / +7 gr / 8 razy na 10 w tych granicach » : trop codé pour un lecteur pressé ;
- sur le vocabulaire juridique répété (« obwieszczenie », « M.P. 2026 poz. 1121 », « art. 34a ust. 6 ustawy o zapasach », « komunikat […] opublikowany przed wpisem do Monitora Polskiego ») ;
- sur la page de prévision (vue en anglais) : « Rule error 5.2 gr », « "No change" error 5.4 gr », « Direction yes », « walk-forward test », « back-test » : réservé aux matheux ;
- dans l'historique, sur deux périodes impossibles : « 24 October – 23 October » et « 12 June – 11 June ».

## 3. Parcours écran par écran

- **01-accueil-1.png** — Compris : titre, prix 95 et ON dans la première phrase, liste déroulante « Paliwo », champ « Ile litrów tankujesz » à 50 avec l'aide « Np. pełny bak osobówki: 40–60 l ». Coince : le 2e paragraphe est long. Faute de grammaire : « Od piątek » (il faut « Od piątku »). « Pokaż cały akapit » : utile, mais le paragraphe affiché est déjà long.
- **01-accueil-suite1.png** — Compris : « 6,06 zł/l », « z VAT, za litr; stacja może sprzedawać taniej », « Tankowanie 50 l, najwyżej 303 zł », « Zmiana od poprzedniego obwieszczenia −4 gr/l », « Ta sama ilość przy poprzedniej cenie 305 zł ». **Coince fort** : « Ta cena obowiązywała do 13 listopada 2026. Nowsze obwieszczenie sprawdź w Monitorze Polskim. » (au passé, en gras) contre « Obowiązuje piątek, 13 listopada ». Elle ne sait plus si le prix vaut aujourd'hui. « Założenia obliczenia » : bon réflexe de transparence. « Drukuj » sur un téléphone ne sert à rien.
- **01-accueil-suite2.png** — Compris : cartes « OLEJ NAPĘDOWY, CENA MAKSYMALNA 7,54 zł/l », « BENZYNA 98 […] 6,68 zł/l, 62 gr drożej niż 95 », « LPG, ŚREDNIA Z TYGODNIA 3,94 zł/l, bez limitu ». Coince : « NASTĘPNE OGŁOSZENIE, PB95 −8 gr / +7 gr ». Elle comprend « ça peut bouger de quelques groszy » mais pas « quand », ni « à partir de quel prix ». C'est pourtant la seule réponse à « jutro » dans le haut de page.
- **01-accueil-suite3.png / suite4.png** — Compris : le tableau des trois carburants (Cena maksymalna / Poprzednia / Zmiana / Bak 50 l) est net. La part de taxes (31,1 % / 24,9 %) est une info intéressante. Coince : « opublikowanego przed wpisem do Monitora Polskiego » : trop technique.
- **01-accueil-suite5.png** — Compris enfin : « Nowa cena obowiązuje od następnego dnia », « w piątek po południu poznajesz ceny na sobotę, niedzielę i poniedziałek », « Przed ogłoszeniem nikt nie zna jutrzejszej ceny ». **C'est LA réponse à sa question « jutro »**, et elle est enterrée au 5e écran. La phrase « cena benzyny 95 po pięciu kolejnych ogłoszeniach zmieniała się w 8 przypadkach na 10 o −36 gr do +23 gr » est trop dense.
- **01-accueil-suite6.png** — Compris : comment on calcule le plafond (moyenne de gros + 0,30 zł + VAT 8 %) ; « Limit nie jest ceną, którą trzeba płacić ». Rassurant et pédagogique.
- **01-accueil-suite7.png → suite9.png** — Compris : la liste « Ostatnie 10 cen maksymalnych » avec les dates d'application. Lisible, mais longue sur mobile (5 lignes par entrée). « Źródło: M.P. 2026 poz. 1121 » : elle ne sait pas ce qu'est « poz. ».
- **01-accueil-suite10.png / suite11.png** — « Kiedy cena maksymalna obowiązywała » : elle découvre qu'il y a eu des périodes sans plafond. Intéressant, mais « Pierwsza Pb95 / Ostatnia Pb95 / Pierwsza ON / Ostatnia ON » ne lui sert à rien. « Co się stanie z cenami paliw 1 stycznia 2027 r. » : info forte (+121 gr / +142 gr), qui donne envie de lire. Coquille : « 31 grudnia 2026 r.. » (deux points).
- **01-accueil-suite12.png / suite13.png** — Comparaison UE (« 2. najniższa w 27 krajach Unii ») : flatteur et clair. « Ile kosztuje rok jazdy » : 5 909 zł / 492 zł par mois, concret. « Skróty używane w serwisie » : utile mais placé très bas, alors que Pb95/ON/M.P. apparaissent dès le haut.
- **01-accueil-suite14.png / suite15.png** — « Jak korzystać z serwisu » : arrive trop tard pour servir. « Wszystkie strony » : bon plan du site. FAQ : les questions sont exactement les siennes (« Kiedy poznam ceny paliw na jutro? », « Czy stacja może sprzedawać paliwo drożej niż cena maksymalna? »). Elles devraient être plus haut.
- **01-accueil-suite16.png → suite18.png** — Sources très complètes, encadré « Opracowanie Radif Partners », « Aktualizacja 13 listopada 2026 ». Rassurant. Pied de page replié : correct.
- **02-menu-1.png** — Compris : trois rubriques (« Ceny i prognoza », « Koszty jazdy », « Podatki i CPN ») + « Metodologia i źródła ». Coince : « Koszty jazdy » est replié alors que les deux autres sont ouverts. Elle se demande pourquoi, et risque de rater « Koszt przejazdu » et « Cena LPG ». « Stacja drożej niż limit » : libellé très parlant, bonne idée.
- **03-en-1.png → suite17.png** — Elle a touché « EN » : même contenu en anglais, cohérent avec la version polonaise (6.06 / 7.54 / 6.68). Coince : ici l'intro n'est **pas** repliée, et c'est un mur de 20 lignes avant le calculateur. Même contradiction « This price applied until 13 November 2026. Check Monitor Polski for a newer notice. » / « Applies Friday 13 November ». Le bouton « PL » pour revenir est bien visible.
- **04-en-about-1.png → suite3.png** — Compris : éditeur indépendant, pas de commission, pub limitée, données recalculées par script. Rassurant. Petite surprise : une société de Clermont-Ferrand (France) pour un site polonais. Ça ne bloque pas, mais elle le remarque.
- **05-en-average-fuel-prices-1.png → suite7.png** — Compris : la différence entre plafond et moyenne réelle (« The maximum price says the most a station may charge; the average says what stations actually charge. »). Le calculateur semaine + carburant est simple. « Average gap under the cap (22 wks) −6 gr/l » : « wks » est une abréviation inutile. Le tableau semaine par semaine est clair. Le tiret pour les semaines sans plafond est expliqué. Bonne page.
- **06-en-cpn-package-1.png → suite6.png** — Compris : ce que le paquet CPN fait économiser (« PLN 98 a month »). Coince : le champ « Consumption » affiche « 6.5 » **par-dessus** l'unité « l/100 km » (chevauchement). « +121 gr/l per litre » : doublon (« /l per litre »), et le « + » pour une économie trouble. Surtout, « Maximum price with the CPN PLN 6.10/l » alors que l'accueil dit 6,06 aujourd'hui : quel est le bon prix ? Le tableau « 50 l tank PLN 60.31 » ne fait pas 121 gr × 50 (60,50). Petit, mais elle le voit.
- **07-en-diesel-price-1.png → suite8.png** — Compris : prix du diesel, budget annuel « PLN 6,221 », « PLN 518 a month », « Every 10 gr/l less saves a year PLN 83 » (bonne trouvaille). Coince : même chevauchement « 5.5 » sur « l/100 km ». « Litres per fill » collé à la ligne d'aide au-dessus. Le tableau de décomposition affiche « Maximum price: Diesel PLN 7.66/l, Petrol 95 PLN 6.10/l », pas les 7,54 / 6,06 du haut de la même page. Le tableau mensuel saute juillet et septembre sans rien dire.
- **08-en-fuel-price-forecast-1.png → suite7.png** — Compris : le site est honnête (« There is no knowledge of oil, exchange rates or politics here »). Coince : le gros chiffre « PLN 5.70/l – PLN 6.29/l » pour « about a week » est une fourchette de 59 gr : inutile pour décider de faire le plein. La bonne info (« Trend direction (next notice) −2 gr/l ») est en petit. « Average trend error / Average error of "no change" », « Rule error », « Direction yes/no », « walk-forward test », « Range: 1 / Range: 5 » : du jargon de statisticien. La section « How to use it » est très bonne (« If a move to the top of the range is a few zloty on your tank, waiting is pointless ») et devrait être en haut.
- **09-en-fuel-price-history-1.png → suite31.png** — Compris : la moyenne du mois + le tableau compact « Prices in force in November 2026 » (From / Pb95 / Pb98 / ON / Source). Excellent format. Coince : ensuite viennent 103 entrées en fiches de 5 lignes, soit 28 écrans de défilement. Le saut du 30 juin au 17 août n'est signalé par rien. **Deux dates impossibles** : « In force: 24 October – 23 October » (juste sous « 24 October – 27 October », qui chevauche) et « In force: 12 June – 11 June ». Elle se dit « les données sont buggées », ce qui entame la confiance dans tout le reste.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Prix plafond du jour (intro + carte rouge) | Oui, immédiatement | Oui, sauf la mention « obowiązywała do 13 listopada » | Très | 3/5 (la contradiction coûte 2 points) |
| Calculateur « Ile litrów tankujesz » → coût du plein | Oui | Oui | Moyen (simple multiplication) | 4/5 |
| Cartes ON / Pb98 / LPG | Oui | Oui | Oui | 5/5 |
| Carte « NASTĘPNE OGŁOSZENIE −8 gr / +7 gr » | Oui | À moitié | Oui si comprise | 2/5 |
| Tableau des 3 carburants (actuel / précédent / variation / plein) | Oui | Oui | Oui | 5/5 |
| 10 derniers prix | Oui | Oui | Moyen | 4/5 |
| Périodes de VAT réduite | Oui | Moyen | Faible | 2/5 |
| Scénario 1er janvier 2027 | Oui | Oui | Oui, fort | 4/5 |
| Comparaison UE | Oui | Oui | Moyen | 4/5 |
| FAQ accordéon | Oui (bas de page) | Oui | Oui | 4/5 |
| Kopiuj wynik / Link do udostępnienia / Drukuj | Oui | Oui | Faible (Drukuj sur mobile) | 3/5 |
| Bascule PL/EN | Oui | Oui | Oui | 5/5 |
| Moyennes hebdomadaires (05) | Via menu | Oui | Oui | 4/5 |
| Calculateur CPN (06) | Via menu | Moyen (prix 6.10 ≠ 6.06, chevauchement du champ) | Moyen | 3/5 |
| Budget diesel annuel (07) | Via menu | Oui | Oui | 4/5 |
| Prévision (08) | Via menu | Non (jargon) | Faible en l'état | 2/5 |
| Historique (09) | Via menu | Oui pour le mois, non pour les dates inversées | Moyen | 3/5 |

## 5. Enchaînement et navigation

- Le menu ☰ est clair et bien groupé, mais une rubrique repliée sur trois (« Koszty jazdy ») crée une asymétrie inutile.
- La page d'accueil est **très** longue (19 écrans) : réponse en haut, puis un article complet. Pour un impatient, tout ce qui suit le 2e écran est du bonus. Les FAQ, qui répondent à ses vraies questions, sont au 15e écran.
- Le fil d'Ariane (« Home / Diesel price ») et les blocs « Related pages and calculators » enchaînent bien les pages entre elles.
- **Incohérences d'un écran à l'autre** : 6,06 (accueil, diesel, prévision) contre 6,10 (CPN, décomposition sur la page diesel) ; économie CPN diesel 142 gr (accueil) contre 141 gr (CPN) ; fourchette « −8 / +7 » en haut de l'accueil contre « 5.70 – 6.29 » en gros sur la prévision ; intro EN non repliée alors que la version PL l'est.
- Chaque page se termine par le même bloc éditeur et le même pied de page : cohérent, rassurant, mais répétitif.

## 6. Difficultés classées

1. **01-accueil-suite1.png (et 03-en-suite1.png) : validité du prix contradictoire.** Vécu : « Ta cena obowiązywała do 13 listopada 2026. Nowsze obwieszczenie sprawdź w Monitorze Polskim. » à côté de « Obowiązuje piątek, 13 listopada ». Le 14 (samedi), elle ne sait pas si 6,06 vaut encore, et le site la renvoie vers le Monitor Polski. Recommandation : appliquer la règle du week-end que le site explique lui-même. Texte de remplacement : « Obowiązuje od piątku 13 listopada do kolejnego obwieszczenia (w weekend bez zmian). Następne ogłoszenie: najwcześniej w poniedziałek. » Ne garder le message « sprawdź w Monitorze Polskim » que si un jour ouvré est passé sans nouvelle donnée.
2. **01-accueil-1 / suite2 : « jutro » sans réponse directe en haut.** Vécu : le titre promet demain, la carte « NASTĘPNE OGŁOSZENIE, PB95 −8 gr / +7 gr — 8 razy na 10 w tych granicach » est cryptique, et l'explication est au 5e écran. Recommandation : une ligne « jutro » juste sous le prix du jour. Texte : « Jutro: cena jeszcze nieogłoszona. Minister ogłasza ją w dzień roboczy po południu. Zwykle zmiana od −8 do +7 gr, czyli benzyna 95 od 5,98 do 6,13 zł/l. » Renommer la carte en « JUTRO, BENZYNA 95 (prognoza) : 5,98–6,13 zł/l ».
3. **09-en-fuel-price-history-suite6 / suite16 : dates impossibles.** Vécu : « 24 October – 23 October » et « 12 June – 11 June ». Elle doute de toutes les données. Recommandation : corriger le calcul des périodes (une annonce remplacée le jour même doit afficher « not applied » ou une seule date) et ajouter un contrôle qui rejette toute fin antérieure au début.
4. **06-en-cpn-package, 07-en-diesel-price-suite3 : deux « prix d'aujourd'hui ».** Vécu : 6.10 / 7.66 ici, 6.06 / 7.54 partout ailleurs. Recommandation : utiliser le dernier prix partout, ou étiqueter clairement. Texte : « Decomposition based on the last Monitor Polski notice (M.P. 2026 item 1121, in force 11–12 November): PLN 6.10/l ». Aligner aussi 141 / 142 gr et le total 50 l (60.31 contre 121 gr × 50).
5. **06-en-cpn-package-suite1, 07-en-diesel-price-1 : champ « Consumption » illisible.** Vécu : « 6.5 » et « 5.5 » s'affichent par-dessus « l/100 km ». Recommandation : réserver la largeur de l'unité (padding-right) ou raccourcir l'unité en « l/100km » sous le champ. Coller aussi un espace avant « Litres per fill ».
6. **08-en-fuel-price-forecast : jargon statistique.** Vécu : « Rule error », « "No change" error », « Direction yes », « walk-forward test », « Range: 1 / Range: 5 », et une fourchette géante (5.70–6.29) en vedette. Recommandation : mettre en vedette la prochaine annonce (horizon 1), pas l'horizon 5. Libellés : « Our rule's average miss: 5.2 gr » / « Average miss if you assume no change: 5.4 gr » / « Trend shown? Yes, the rule did slightly better » / « Next notice: −8 to +7 gr » / « In about a week: −36 to +23 gr ». Remonter « How to use it » juste sous le calculateur.
7. **01-accueil-1 / 03-en-1 : murs de texte et petites fautes.** Vécu : la 2e phrase d'intro fait 9 lignes ; en EN, l'intro n'est pas repliée (20 lignes avant le calculateur). Fautes : « Od piątek » → « Od piątku » ; « 31 grudnia 2026 r.. » → « 31 grudnia 2026 r. ». Recommandation : replier l'intro EN comme la PL et raccourcir la phrase PL. Texte : « Od piątku 13 listopada stacja nie może sprzedać litra drożej niż: Pb95 6,06 zł, Pb98 6,68 zł, ON 7,54 zł (z VAT). »
8. **02-menu-1, 09-en-fuel-price-history : navigation dans les longues listes.** Vécu : « Koszty jazdy » replié seul ; historique de 28 écrans en fiches, sans séparation entre périodes avec et sans plafond. Recommandation : ouvrir les trois rubriques du menu de la même façon ; afficher l'historique complet dans le même tableau compact que « Prices in force in November 2026 », groupé par mois, avec une ligne « 1 July – 16 August: no maximum price (VAT 23 %) » entre les blocs.

## 7. À garder

- La première phrase qui donne le prix 95 et ON immédiatement : « Ceny paliw dzisiaj to cena maksymalna […]: benzyna 95 najwyżej 6,06 zł/l, olej napędowy 7,54 zł/l ».
- « z VAT, za litr; stacja może sprzedawać taniej » et « Limit nie jest ceną, którą trzeba płacić » : pédagogie exacte en une ligne.
- Le coût du plein avec comparaison « Ta sama ilość przy poprzedniej cenie ».
- Les cartes ON / Pb98 / LPG, sobres et lisibles.
- « Serwis niezależny: nie jesteśmy ministerstwem ani stacją paliw » et les sources détaillées : très rassurant.
- Le scénario 2027 (« o 121 gr i 142 gr więcej na litrze ») : l'info qui donne envie de revenir.
- Le tableau compact « Prices in force in November 2026 » (une ligne par annonce) : le meilleur format du site.
- « Every 10 gr/l less saves a year PLN 83 » et « If a move to the top of the range is a few zloty on your tank, waiting is pointless » : du concret qui parle au conducteur.
- La FAQ, dont les questions sont les vraies questions des gens.
- La bascule PL/EN bien visible.

## 8. Notes

Clarté : 6/10
Facilité : 7/10
Utilité : 7/10
