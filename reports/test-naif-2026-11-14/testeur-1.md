# Test naïf du 2026-11-14, testeur 1 : cenypaliwjutro.pl
**Persona :** Polonais(e) de 45 ans, salarié(e), à l'aise avec son téléphone, aucune connaissance particulière du sujet, ne lit pas les longs paragraphes. Il/elle a tapé sa question dans Google et a cliqué sur le résultat « Ceny paliw dzisiaj i jutro: cena maksymalna w Polsce » parce qu'il/elle a vraiment cette question (combien coûte le litre aujourd'hui, et demain ?).

## 1. Concept

**Après 5 secondes (01-accueil-1, 01-accueil-suite1) :** « C'est le prix maximum du carburant fixé par le ministre. Aujourd'hui l'essence 95, c'est 6,06 zł au plus, le diesel 7,54 zł. » Le titre « Ceny paliw dzisiaj i jutro » reprend mot pour mot ce que j'ai vu sur Google, ça rassure. Le gros chiffre « 6,06 zł/l » et la phrase « z VAT, za litr; stacja może sprzedawać taniej » disent l'essentiel. Le calcul du plein (« Tankowanie 50 l, najwyżej 303 zł ») est immédiatement parlant.

**Juste après, première douche froide :** dans le même encadré rose, en gras : « Ta cena obowiązywała do 13 listopada 2026. Nowsze obwieszczenie sprawdź w Monitorze Polskim. » Nous sommes le 14. Donc le chiffre qu'on vient de me donner comme « dzisiaj » n'est peut-être plus valable, et on me renvoie vers un journal officiel que je ne sais pas consulter. Juste en dessous : « Obowiązuje: piątek, 13 listopada ». Deux phrases contradictoires dans la même boîte.

**Après 2 minutes :** je comprends que le site recense tous les prix maximums depuis mars 2026, calcule le coût d'un plein ou d'une année de conduite, compare au prix moyen réel et à l'Europe, et estime ce qui se passerait en 2027. C'est sérieux et sourcé. Mais ma question « jutro » (demain) n'a pas de réponse simple : la seule chose visible est une carte « NASTĘPNE OGŁOSZENIE, PB95 : −8 gr / +7 gr — 8 razy na 10 w tych granicach », que je ne sais pas lire sans effort.

**Pour qui :** tout conducteur en Pologne pendant la période de prix plafonné. **Bénéfice concret :** savoir le prix maximal légal et le coût d'un plein, vérifier qu'une station ne triche pas. Bénéfice réel, mais brouillé par l'avertissement de péremption et par la promesse « jutro » non tenue.

**Clair ?** Oui pour « aujourd'hui » (si on ignore l'avertissement), non pour « demain ».

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : le haut de l'accueil, oui ; le reste, non.** Une personne pressée comprend le prix du jour et le coût du plein en 10 secondes. Ça décroche :
- dès l'avertissement « Ta cena obowiązywała do 13 listopada 2026 » (je ne sais plus si le prix est valable) ;
- sur la carte « −8 gr / +7 gr — 8 razy na 10 w tych granicach » (ce n'est pas un prix, c'est une statistique) ;
- dans les paragraphes juridiques : « art. 34a ust. 6 ustawy o zapasach », « M.P. 2026 poz. 1121 », « obwieszczenie », « widełki », « rozporządzenie MFiG » ;
- sur les pages suivantes du plan, qui s'affichent **en anglais** (« Fuel price history », « CPN package », « back-test », « walk-forward test », « Mean absolute error ») : pour un Polonais moyen de 45 ans, c'est un mur ;
- sur la page de prévision : « Rule error », « "No change" error », « Direction: yes/no », « Range: 1 / Range: 5 » : incompréhensible pour le grand public.

## 3. Parcours écran par écran

| Fichier | Ce qu'elle voit / pense | Compris / coince |
|---|---|---|
| 01-accueil-1 | Titre, chapeau « benzyna 95 najwyżej 6,06 zł/l, olej napędowy 7,54 zł/l », calculateur Paliwo / « Ile litrów tankujesz » 50. | Compris. Petite gêne : « Od piątek, 13 listopada » (faute : « Od piątku »), ça fait traduit. |
| 01-accueil-suite1 | Résultat : 6,06 zł/l, 303 zł le plein, −4 gr/l, 305 zł avant, source gov.pl, boutons Kopiuj / Link / Drukuj. | Compris, rassurant… sauf la phrase en gras « Ta cena obowiązywała do 13 listopada 2026 » qui contredit « Obowiązuje piątek, 13 listopada ». **Coince.** |
| 01-accueil-suite2 | « Serwis niezależny: nie jesteśmy ministerstwem ani stacją paliw » ; cartes ON 7,54, Pb98 6,68, « NASTĘPNE OGŁOSZENIE, PB95 −8 gr / +7 gr », LPG 3,94 « bez limitu ». | Cartes prix compris. « −8 gr / +7 gr » : je crois d'abord que le prix va baisser de 8 gr ET monter de 7 gr ? **Coince.** « bez limitu » peut se lire « illimité ». |
| 01-accueil-suite3/4 | « Ceny paliw dzisiaj: trzy paliwa z ceną maksymalną », tableau Pb95/Pb98/ON avec précédente, variation, « Bak 50 l ». | Compris, mais redite du haut. Le paragraphe sur le Monitor Polski est trop long. |
| 01-accueil-suite5 | « Ceny paliw jutro: kiedy minister ogłasza nową cenę » : chaque jour ouvrable, valable le lendemain ; vendredi après-midi → prix du week-end. | **Utile**, c'est la vraie réponse à « jutro ». Mais enfouie au 6e écran, et noyée dans « art. 34a ust. 6 ustawy o zapasach ». |
| 01-accueil-suite6 | « Przed ogłoszeniem nikt nie zna jutrzejszej ceny » (honnête) ; « po pięciu kolejnych ogłoszeniach … w 8 przypadkach na 10 o −36 gr do +23 gr ». Formule de calcul (hurt + akcyza + 0,30 zł + VAT 8 %). | La première phrase est excellente. La statistique sur 5 annonces, non. Formule : trop technique, je saute. |
| 01-accueil-suite7 à suite10 | « Ostatnie ceny maksymalne paliw » : 10 blocs « Obowiązuje … Pb95 / Pb98 / ON / Źródło M.P. 2026 poz. … ». | Compris mais très long (4 écrans de chiffres). « M.P. 2026 poz. 1121 » ne me dit rien. |
| 01-accueil-suite10/11 | « Kiedy cena maksymalna obowiązywała » : 3 périodes (31 marca – 30 czerwca, 17–31 sierpnia, 3 października – 31 grudnia). | J'apprends que le plafond n'existe pas toujours : important, mais bien caché. « Ostatnia ON 6,19 zł/l » vs « Pierwsza ON 7,60 » : je ne comprends pas l'intérêt. |
| 01-accueil-suite11/12 | « Co się stanie z cenami paliw 1 stycznia 2027 r. » : 7,31 zł/l Pb95, 9,08 zł/l ON, « o 121 gr i 142 gr więcej ». | Intéressant et inquiétant (bon sujet). Mais 7,31 − 6,06 = 1,25 et 9,08 − 7,54 = 1,54, pas 121 et 142 gr : **les chiffres ne collent pas** si je fais la soustraction. Coquille « 2026 r.. ». |
| 01-accueil-suite12/13 | Polska na tle UE (2e moins chère sur 27), coût d'une année (5 909 zł, 492 zł/mois), liens vers calculateurs. | Compris, concret. |
| 01-accueil-suite13 | « Skróty używane w serwisie » : Pb95, ON, LPG, CPN, M.P., Dz.U., KAS. | **Très utile**, mais arrive après que j'aie buté sur ces sigles. |
| 01-accueil-suite14/15 | « Jak korzystać z serwisu », « Wszystkie strony » (liste de liens), FAQ. | Compris. La FAQ pose exactement mes questions (« Kiedy poznam ceny paliw na jutro? », « Czy stacja może sprzedawać paliwo drożej… »). |
| 01-accueil-suite16 à 18 | Sources, « Opracowanie Radif Partners », « Aktualizacja 13 listopada 2026 », pied replié. | Rassurant (sources officielles). « Aktualizacja 13 listopada » confirme que la page a un jour de retard. |
| 02-menu-1 | Menu : « Ceny i prognoza » (10 liens), « Koszty jazdy » (fermé), « Podatki i CPN », « Metodologia i źródła ». | Clair et bien rangé. Bizarre : deux groupes ouverts, un fermé. Le bouton « EN » est collé au ☰ : facile à toucher par erreur. |
| 03-en-1 à 03-en-suite17 | La même page d'accueil, mais **en anglais**, bouton « PL » en haut. | Pour elle, c'est une régression : elle relit en anglais ce qu'elle avait en polonais. Le calculateur est identique. Même avertissement « This price applied until 13 November 2026 ». |
| 04-en-about-1 à suite3 | « About Ceny Paliw Jutro » : éditeur Radif Partners, financement (pas de commission des stations, pub max 3 emplacements), adresse à Clermont-Ferrand (France), kontakt@. | Compris, rassurant sur l'indépendance. Une adresse française pour un site polonais surprend un peu. En anglais. |
| 05-en-average-fuel-prices-1 à suite7 | Prix moyen réel à la pompe semaine par semaine vs plafond : 6,07 vs 6,12 ; « Average gap under the cap (22 wks) −6 gr/l » ; tableau des semaines (tirets = pas de plafond). | **Très utile** : je vois que les stations vendent à peine sous le plafond. « 22 wks » abrégé. Semaine du 28 septembre à 8,10 zł sans plafond : ça m'explique concrètement ce que le plafond m'épargne. En anglais. |
| 06-en-cpn-package-1 à suite6 | « CPN package: what it saves you on fuel » : « PLN 98 a month », « +121 gr/l per litre ». | Le résultat parle. Mais : « +121 gr/l per litre » (signe + pour une économie, et « /l per litre » en double) ; le champ « Consumption » affiche « 6.5 » **chevauché** par « l/100 km » ; surtout « Maximum price with the CPN PLN 6.10/l » alors que l'accueil dit 6,06. **Incohérence.** |
| 07-en-diesel-price-1 à suite8 | Diesel : 7,54, « PLN 6,221 » par an, « PLN 518 a month », coût aux 100 km, « Every 10 gr/l less saves a year PLN 83 ». Puis décomposition du prix. | Calculateur clair et utile. Même chevauchement « 5.5 » / « l/100 km ». La décomposition donne « Maximum price Diesel PLN 7.66/l, Petrol 95 PLN 6.10/l » alors que la page titre « 7.54 » : **incohérence**. Tableau mensuel « Month: 2026-03 » (format informatique), juillet et septembre absents sans explication. |
| 08-en-fuel-price-forecast-1 à suite7 | Prévision : « PLN 5.70/l – PLN 6.29/l » dans une semaine, « Trend direction −2 gr/l », « Average trend error 5.2 gr/l », « Average error of "no change" 5.4 gr/l ». | Je comprends « entre 5,70 et 6,29 », c'est tout. Le reste (« back-test », « walk-forward test », « Rule error », « Direction yes/no », « Range: 1 / Range: 5 ») est du jargon de statisticien. Valeur par défaut « Litres a month 150 » : 3 pleins par mois, c'est beaucoup. |
| 09-en-fuel-price-history-1 à suite31 | Historique : moyenne de novembre 6,20, tableau du mois, puis **103 blocs** « In force: … » sur 30 écrans. | Le haut est clair. Ensuite défilement interminable. **Deux dates aberrantes** : « In force: 24 October – 23 October » et « In force: 12 June – 11 June » (fin avant début). Ça me fait douter de toutes les données. |

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Calculateur du plein (accueil : Paliwo + Ile litrów) | Oui, tout de suite | Oui | Oui | 4/5 (perd 1 point pour l'avertissement contradictoire) |
| Cartes ON / Pb98 / LPG | Oui | Oui (sauf « bez limitu ») | Oui | 4/5 |
| Carte « NASTĘPNE OGŁOSZENIE −8 gr / +7 gr » | Oui | Non | Elle répondrait à « jutro » si elle était lisible | 2/5 |
| Explication « Ceny paliw jutro: kiedy minister ogłasza » | Seulement en défilant longtemps | Oui | Oui, c'est LA réponse | 2/5 (trop bas) |
| Tableau des 10 derniers prix | Oui | Oui | Moyennement | 3/5 |
| Scénario 2027 | Oui | Oui | Oui | 3/5 (chiffres d'écart qui ne collent pas) |
| Lexique « Skróty » | Tard | Oui | Oui | 3/5 |
| FAQ en accordéon | Oui | Oui | Oui | 4/5 |
| « Pokaż cały akapit » | Oui | Oui | Oui | 4/5 |
| Kopiuj wynik / Link do udostępnienia / Drukuj | Oui | Oui | Moyennement | 4/5 |
| Menu ☰ | Oui | Oui | Oui | 4/5 |
| Bouton EN / PL | Oui | « EN » sans mot « English » | Pour elle, piège | 2/5 |
| Prix moyens réels vs plafond (05) | Via menu | Oui | Très | 4/5 |
| Calculateur CPN (06) | Via menu | À moitié | Oui | 3/5 (6,10 au lieu de 6,06, champ chevauché) |
| Calculateur diesel annuel (07) | Via menu | Oui | Oui | 4/5 (champ chevauché) |
| Prévision (08) | Via menu | Non au-delà de la fourchette | Peu | 2/5 |
| Historique (09) | Via menu | Oui | Moyennement | 3/5 (dates inversées, trop long) |
| « Stacja drożej niż limit » | Vue dans le menu | Titre clair | Probablement très | non testée ici |

## 5. Enchaînement et navigation

- L'accueil fait **19 écrans**. Tout est là, mais l'ordre n'est pas celui de mes questions : prix du jour (bien), puis tableaux et juridique, et la réponse à « jutro » n'arrive qu'au 6e écran.
- Le menu est clair, bien groupé. En revanche, après le menu, les pages du plan s'ouvrent **en anglais** : un visiteur polonais perd sa langue sans l'avoir voulu (bouton « EN » collé au ☰). Il faut repérer le petit « PL » pour revenir.
- Les pages intérieures ont un fil d'Ariane (« Home / Diesel price »), des blocs « Related pages and calculators » bien faits, et le même pied de page : on ne se perd pas.
- **Incohérences d'un écran à l'autre :** l'accueil et le titre diesel disent 6,06 / 7,54 ; la page CPN et la décomposition diesel calculent sur 6,10 / 7,66 (l'avis précédent) sans le dire clairement.
- Toutes les pages finissent par le même bloc « Prepared by Radif Partners… Updated 13 November 2026 » : rassurant mais répétitif.

## 6. Difficultés classées

1. **01-accueil-suite1 (et 03-en-suite1) : prix du jour déclaré périmé.** Vécu : on me dit « Ceny paliw dzisiaj… 6,06 zł/l », puis en gras « Ta cena obowiązywała do 13 listopada 2026. Nowsze obwieszczenie sprawdź w Monitorze Polskim. », alors que la ligne d'en dessous dit « Obowiązuje: piątek, 13 listopada ». Je ne sais plus si je peux me fier au chiffre et on me renvoie vers un journal officiel. Recommandation : mettre à jour les données au moins chaque jour ouvrable et appliquer la règle du week-end que le site explique lui-même. Si l'avis du vendredi couvre samedi, dimanche et lundi, écrire : « Obowiązuje: piątek 13 – poniedziałek 16 listopada (cena ogłoszona przed weekendem) ». Ne montrer l'alerte que si une annonce plus récente existe vraiment, et en clair : « Minister mógł już ogłosić nową cenę. Sprawdź komunikat na gov.pl » avec un lien direct, pas « Monitor Polski ».
2. **Pages du plan en anglais (03 à 09).** Vécu : je passe en anglais sans le vouloir et je perds la moitié du sens. Recommandation : garder le visiteur en polonais. Écrire le bouton « English » plutôt que « EN » et l'éloigner du ☰, ou le mettre dans le menu ou le pied de page. Vérifier que les liens du plan ouvrent les pages polonaises.
3. **« Jutro » sans réponse lisible (01-accueil-suite2, carte NASTĘPNE OGŁOSZENIE).** Vécu : « −8 gr / +7 gr — 8 razy na 10 w tych granicach » ne me dit pas combien je paierai demain. Recommandation : remplacer par une carte en clair, par exemple « Cena na jutro: jeszcze nieznana. Minister ogłasza ją zwykle po południu. Najczęściej zmienia się o kilka groszy: od 5,98 do 6,13 zł/l (8 razy na 10). » Remonter sous le calculateur les 3 lignes « Ceny paliw jutro: kiedy minister ogłasza nową cenę ».
4. **Chiffres incohérents entre pages (06-en-cpn-package-suite1, 07-en-diesel-price-suite4, 01-accueil-suite11).** Vécu : 6,06 sur l'accueil et 6,10 sur la page CPN ; 7,54 en titre diesel et 7,66 dans la décomposition ; « o 121 gr i 142 gr więcej » alors que 7,31 − 6,06 = 1,25. Je doute de tout. Recommandation : calculer partout sur le dernier prix en vigueur. Sinon, l'écrire en clair, par exemple : « Wyliczenie dla ceny 6,10 zł/l z obwieszczenia M.P. poz. 1121 (ostatnie z rozbiciem na składniki) ». Pour 2027, écrire l'écart par rapport au prix affiché : « o 1,25 zł i 1,54 zł więcej niż dziś ».
5. **Dates impossibles dans l'historique (09-…-suite6 et suite17).** « In force: 24 October – 23 October », « In force: 12 June – 11 June ». Vécu : une fin avant le début, donc les données sont fausses ? Recommandation : corriger (« 24 October » seul, ou annonce remplacée le jour même : « Replaced the same day by M.P. poz. 1036 »).
6. **Jargon de la page prévision (08).** « back-test », « walk-forward test », « Rule error », « "No change" error », « Direction: yes », « Range: 1 / Range: 5 ». Recommandation : écrire « Nasza prognoza myliła się średnio o 5 gr, a założenie "bez zmian" o 5,4 gr », puis « Kierunek pokazujemy: tak », « Przy następnym ogłoszeniu: −8 / +7 gr », « Za około tydzień: −36 / +23 gr ». Mettre 50 l par défaut au lieu de 150.
7. **Champ de consommation chevauché (06-…-suite1, 07-…-1).** « 6.5 » et « 5.5 » sont recouverts par « l/100 km ». Recommandation : élargir la zone d'unité ou écrire l'unité dans le libellé : « Spalanie (l/100 km) ».
8. **Polonais fautif et texte trop long sur l'accueil.** « Od piątek, 13 listopada », « obowiązuje od piątek, 13 listopada » (dire « Od piątku, 13 listopada », « od piątku 13 listopada ») ; « 2026 r.. » (double point) ; « bez limitu » pour le LPG (dire « brak ceny maksymalnej »). Replier par défaut les 10 derniers avis et les 3 périodes (accordéon « Pokaż 10 ostatnich cen »), et placer le lexique « Skróty » en info-bulle sur les sigles.

## 7. À garder

- Le gros chiffre « 6,06 zł/l » avec « z VAT, za litr; stacja może sprzedawać taniej » : parfait.
- Le coût du plein immédiat (« Tankowanie 50 l, najwyżej 303 zł ») et la comparaison avec le prix précédent (« 305 zł »).
- « Serwis niezależny: nie jesteśmy ministerstwem ani stacją paliw » et la source gov.pl cliquable sous le résultat.
- La phrase honnête « Przed ogłoszeniem nikt nie zna jutrzejszej ceny, także stacje. »
- L'explication « w piątek po południu poznajesz ceny na sobotę, niedzielę i poniedziałek ».
- « Limit nie jest ceną, którą trzeba płacić » et la page des prix moyens réels vs plafond (6,07 vs 6,12).
- Le scénario 2027 (le sujet qui inquiète tout le monde).
- La FAQ formulée comme mes questions, le lexique « Skróty », le menu bien rangé, les boutons Kopiuj / Link / Drukuj.
- Le calculateur annuel diesel (« PLN 518 a month », « Every 10 gr/l less saves a year PLN 83 ») : très concret.

## 8. Notes

Clarté : 6/10
Facilité : 6/10
Utilité : 7/10
