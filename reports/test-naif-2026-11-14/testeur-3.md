# Test naïf du 2026-11-14, testeur 3 : cenypaliwjutro.pl
**Persona :** Polonais(e) de 61 ans, se sert de son téléphone pour WhatsApp et la météo, lit lentement, se méfie des sites qui demandent des données, ne comprend pas les sigles, ne lit pas l'anglais. Il/elle a cliqué sur le résultat Google « Ceny paliw dzisiaj i jutro: cena maksymalna w Polsce » parce qu'il/elle a cette question pour lui/elle-même ou un proche.

## 1. Concept

**Après 5 s (01-accueil-1) :** « C'est le prix maximum de l'essence aujourd'hui. » Le titre « Ceny paliw dzisiaj i jutro » et la première phrase répondent tout de suite : « benzyna 95 najwyżej 6,06 zł/l, olej napędowy 7,54 zł/l ». C'est exactement ce que promettait Google. Bon départ.

**Après 2 min :** elle a compris trois choses. 1) L'État fixe un prix plafond (« żadna stacja w Polsce nie może sprzedać litra benzyny 95 drożej niż za 6,06 zł/l »). 2) Le site calcule ce que coûte un plein (« Tankowanie 50 l, najwyżej 303 zł »). 3) Le site n'est pas l'État (« Serwis niezależny: nie jesteśmy ministerstwem ani stacją paliw »). Le doute arrive vite. L'encadré rouge dit au passé « Ta cena obowiązywała do 13 listopada 2026 » et la renvoie au « Monitor Polski ». Elle ne sait donc plus si 6,06 zł est le prix d'aujourd'hui. Pour « jutro », elle ne trouve pas de prix, seulement « −8 gr / +7 gr, 8 razy na 10 w tych granicach », qu'elle ne comprend pas.

**Est-ce clair ?** Pour le prix plafond de l'essence 95 et du diesel, oui. Pour le reste (demain, prévision, CPN, historique), non.
**Pour qui ?** Un automobiliste qui veut savoir si la station le vole ou combien coûtera son plein.
**Bénéfice concret :** connaître le prix maximum légal et le coût d'un plein. La page « Stacja drożej niż limit », vue dans le menu, la rassurerait si elle la trouvait.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : non, pas au-delà du premier écran.** Le premier écran est clair. Ça décroche à quatre endroits :
- **La date de validité se contredit** (01-accueil-1 et suite1) : en haut « Od piątek, 13 listopada », au-dessus du bouton « Obowiązuje piątek, 13 listopada », mais dans l'encadré « Ta cena obowiązywała do 13 listopada 2026 ». Pour elle, « obowiązywała » veut dire « c'est fini ». On est le 14.
- **Les sigles** : « PB95 », « ON », « LPG », « CPN », « M.P. 2026 poz. 1121 », « KAS », « Dz.U. ». Ils sont expliqués, mais seulement au 13e écran de défilement (« Skróty używane w serwisie »). Elle n'ira jamais jusque-là.
- **Le jargon juridique** : « art. 34a ust. 6 ustawy o zapasach », « rozporządzenie MFiG », « obwieszczenie », « Monitor Polski ». Elle a l'impression de lire le Journal officiel.
- **À partir de 03-en-1, toutes les pages sont en anglais.** Elle ne lit pas l'anglais, donc le parcours s'arrête là pour elle. Seuls les chiffres restent lisibles. Le petit bouton « PL » en haut à droite est le seul moyen de revenir, et elle ne sait pas que c'est un bouton de langue.

## 3. Parcours écran par écran

| Écran | Compris / coince |
|---|---|
| 01-accueil-1 | **Compris** : titre, 6,06 et 7,54 zł/l, champ « Ile litrów tankujesz » (50) avec l'aide « Np. pełny bak osobówki: 40–60 l ». **Coince** : « Od piątek » (faute de grammaire : « Od piątku »), « Pokaż cały akapit » (elle ne sait pas si elle rate quelque chose). |
| 01-accueil-suite1 | **Compris** : gros « 6,06 zł/l », « stacja może sprzedawać taniej », « 303 zł ». **Coince** : la phrase en gras « Ta cena obowiązywała do 13 listopada 2026. Nowsze obwieszczenie sprawdź w Monitorze Polskim. » lui fait peur : le chiffre serait périmé, et on l'envoie dans un journal officiel qu'elle ne connaît pas. Puis « Obowiązuje piątek, 13 listopada » juste en dessous. Laquelle des deux phrases croire ? |
| 01-accueil-suite2 | **Compris** : « OLEJ NAPĘDOWY… 7,54 zł/l », « BENZYNA 98… 6,68 zł/l », « LPG… 3,94 zł/l, bez limitu ». **Coince** : « NASTĘPNE OGŁOSZENIE, PB95 −8 gr / +7 gr — 8 razy na 10 w tych granicach ». Elle ne voit pas le rapport avec « jutro », et « PB95 » est un sigle. |
| 01-accueil-suite3 et suite4 | **Compris** : le tableau carburant par carburant (« Cena maksymalna / Poprzednia / Zmiana / Bak 50 l »). Lisible, rassurant. **Coince** : « obowiązuje od piątek, 13 listopada, chyba że minister wcześniej ogłosi nowe ceny » ; « opublikowanego przed wpisem do Monitora Polskiego » est trop technique. |
| 01-accueil-suite5 | **Compris** : « w piątek po południu poznajesz ceny na sobotę, niedzielę i poniedziałek ». C'est utile. **Coince** : « W 103 ogłoszeniach… po pięciu kolejnych ogłoszeniach zmieniała się w 8 przypadkach na 10 o −36 gr do +23 gr » : phrase illisible pour elle. |
| 01-accueil-suite6 | **Compris** : « Limit nie jest ceną, którą trzeba płacić. Stacje mogą sprzedawać taniej. » C'est très bien. **Coince** : la formule (« średnią cenę hurtową pięciu największych dostawców… 0,30 zł/l… VAT… 8 % »). |
| 01-accueil-suite7 à suite9 | Liste « Ostatnie 10 cen maksymalnych ». **Compris** : on voit les prix baisser jour après jour. **Coince** : « Źródło: M.P. 2026 poz. 1121 », « gov.pl ». Les « Pb95 / Pb98 / ON » ne sont pas expliqués ici. |
| 01-accueil-suite10 et suite11 | **Coince** : « rozporządzenie Ministra Finansów obniża VAT », « Okres… Ogłoszenia 63, Pierwsza Pb95, Ostatnia ON ». Elle saute ce passage. **Compris et inquiétant** : « Co się stanie z cenami paliw 1 stycznia 2027 r. » → « benzyna 95 kosztowałaby około 7,31 zł/l ». Ça l'intéresse beaucoup. |
| 01-accueil-suite12 | **Compris** : « Polska na tle Unii », Pologne 2e moins chère. **Coince** : « Weekly Oil Bulletin » est en anglais. Et « średnia cena benzyny 95 w Polsce, 6,07 zł/l » est supérieure au plafond de 6,06 annoncé en haut : comment la moyenne peut-elle dépasser le maximum ? |
| 01-accueil-suite13 | **Compris** : « Ile kosztuje rok jazdy… 492 zł miesięcznie ». **Utile mais trop tard** : « Skróty używane w serwisie », qui aurait dû être en haut. |
| 01-accueil-suite14 | **Rassurant** : « Każdy kalkulator działa w Twojej przeglądarce i nic nie wysyła ». Pour quelqu'un de méfiant, c'est l'argument principal, mais il est caché très bas. **Compris** : la liste « Wszystkie strony » en polonais clair. |
| 01-accueil-suite15 et suite16 | **Compris** : les questions fréquentes sont bien formulées (« Czy stacja może sprzedawać paliwo drożej niż cena maksymalna? »). |
| 01-accueil-suite17 et suite18 | **Coince** : la liste de sources juridiques. « Opracowanie Radif Partners » est inconnu, sans visage. Le pied de page « O serwisie, informacje prawne i wszystkie strony » est fermé. |
| 02-menu-1 | **Compris** : les intitulés sont simples (« Ceny paliw dziś i jutro », « Cena diesla », « Stacja drożej niż limit »). **Coince** : « Koszty jazdy » est fermé alors que les deux autres groupes sont ouverts, donc elle croit qu'il est vide. « Pakiet CPN » et « Podatki i CPN » utilisent un sigle sans explication. |
| 03-en-1 à 03-en-suite17 | **Tout en anglais** (« Fuel prices in Poland today »). Elle reconnaît seulement les chiffres 6.06 / 7.54 et « PLN ». Elle croit être sortie du site ou avoir cassé quelque chose. Le bouton « PL » existe, mais rien ne dit « wróć do polskiej wersji ». |
| 04-en-about-1 à suite3 | En anglais. Elle repère « Radif Partners, 49 rue du Ressort, 63000 Clermont-Ferrand, France ». Une société française pour les prix de l'essence polonais : la méfiance augmente. La phrase rassurante « collects no contact details » est en anglais, donc perdue pour elle. |
| 05-en-average-fuel-prices-1 à suite7 | En anglais. Elle voit une liste de semaines avec « Pb95 average / Pb95 cap / Diesel cap » et des tirets « – » sans savoir pourquoi. « voivodeship » ne lui dit rien. |
| 06-en-cpn-package-1 à suite6 | En anglais. **Bug visible** : dans le champ « Consumption », le « 6.5 » est écrit par-dessus « l/100 km » (on lit « 6.5̸100 km »). « +121 gr/l per litre » dit deux fois « litre ». Le signe « + » pour une économie est déroutant. **Incohérence** : « Maximum price with the CPN PLN 6.10/l », alors que l'accueil disait 6,06. |
| 07-en-diesel-price-1 à suite8 | En anglais. Même **chevauchement** « 5.5 » / « l/100 km ». « PLN 6,221 » par an et « PLN 518 a month » se lisent. **Incohérence** : le tableau « Breakdown » termine sur « Maximum price Diesel PLN 7.66/l », alors que le haut de la même page dit 7.54. |
| 08-en-fuel-price-forecast-1 à suite7 | En anglais. Elle voit le gros « PLN 5.70/l – PLN 6.29/l » : une fourchette si large ne lui apprend rien. « Litres a month 150 » est beaucoup trop pour elle. « back-test », « walk-forward test », « Mean absolute error », « Range: 1 / Range: 5 » sont incompréhensibles. |
| 09-en-fuel-price-history-1 à suite31 | En anglais, et **31 écrans** de cartes identiques. **Erreurs visibles** : « In force: 24 October – 23 October » (suite6) et « In force: 12 June – 11 June » (suite16), deux dates à l'envers. Entre « 30 June » et « 17 August » (suite13), le saut n'est pas signalé dans la liste. Elle abandonne bien avant la fin. |

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Prix maximum du jour (accueil) | Oui, tout de suite | Oui, mais doute sur la validité (« obowiązywała do 13 listopada ») | Très | 4 |
| Calculateur coût du plein (« Ile litrów tankujesz ») | Oui | Oui (« Tankowanie 50 l, najwyżej 303 zł ») | Oui | 4 |
| Prix de demain / prochaine annonce | Oui (carte « NASTĘPNE OGŁOSZENIE ») | Non (« −8 gr / +7 gr, 8 razy na 10 ») | Elle ne peut pas en juger | 1 |
| Tableau des 3 carburants + plein 50 l | Oui | Oui | Oui | 4 |
| Liste des 10 derniers prix | Oui | À moitié (sigles Pb95/ON, « M.P. poz. ») | Moyen | 3 |
| Scénario 2027 | Oui, en défilant | Oui pour le chiffre (7,31 zł) | Oui, ça l'inquiète et l'intéresse | 3 |
| Comparaison UE | Oui | Oui (« 2. najniższa w 27 krajach ») | Moyen | 3 |
| Copier / Lien / Imprimer | Oui | Oui | Peu pour elle (elle partagerait par WhatsApp, sans savoir que « Link do udostępnienia » le permet) | 3 |
| Menu ☰ | Oui | Oui pour les intitulés en polonais, non pour « CPN » | Oui | 3 |
| Moyennes hebdomadaires (EN) | Par le parcours | Non (anglais) | Elle ne peut pas en juger | 1 |
| Pakiet CPN, calculateur d'économie (EN) | Par le parcours | Non (anglais, sigle, champ cassé) | Elle ne peut pas en juger | 1 |
| Prix du diesel, budget annuel (EN) | Par le parcours | Chiffres seulement | Moyen | 2 |
| Prévision (EN) | Par le parcours | Non | Non | 1 |
| Historique (EN) | Par le parcours | Chiffres seulement, 31 écrans | Faible | 1 |
| « Stacja drożej niż limit » (contrôler un ticket) | Vue dans le menu, pas ouverte | Le titre est clair | Probablement la plus utile pour elle | 3 (titre) |

## 5. Enchaînement et navigation

- L'accueil polonais est **trop long : 18 écrans** de défilement. Ce qui est vraiment utile pour elle (« Limit nie jest ceną, którą trzeba płacić », « nic nie wysyła », les sigles) est enfoui au milieu de passages juridiques.
- **Après le menu, le parcours passe en anglais** sur toutes les pages suivantes. Pour elle, c'est une rupture totale : elle pense avoir quitté le site. Le bouton « EN / PL » est un sigle sans drapeau ni mot.
- Les pages se terminent toutes de la même façon (« Related pages », « Sources for this page », « Prepared by Radif Partners »). Rien ne l'aide à savoir où elle se trouve, sauf le fil « Home / … » (en anglais).
- Le menu ouvre deux groupes sur trois. « Koszty jazdy » reste fermé : c'est incohérent.
- **Incohérences de chiffres d'une page à l'autre** : 6,06 sur l'accueil, mais 6,10 sur CPN et dans le tableau du diesel (« Maximum price PLN 6.10/l », « 7.66/l »). La moyenne de 6,07 est supérieure au plafond de 6,06.
- Il n'y a ni bouton « retour en haut » ni sommaire sur les longues pages (historique : 31 écrans).

## 6. Difficultés classées

1. **01-accueil-suite1 : la validité du prix se contredit.**
   *Vécu* : « Le site me dit 6,06, puis "obowiązywała do 13 listopada", et on est le 14. Donc c'est faux aujourd'hui ? Je dois aller voir le "Monitor Polski" ? » Elle perd confiance dans le chiffre principal.
   *Recommandation* : une seule formulation, au présent, avec la date du jour. Si l'annonce suivante manque, le dire simplement.
   *Texte* : « Ostatnia znana cena maksymalna: 6,06 zł/l (ogłoszona 12 listopada, obowiązuje od piątku 13 listopada). Nowa cena mogła już zostać ogłoszona — sprawdzamy kilka razy dziennie. » Supprimer « Nowsze obwieszczenie sprawdź w Monitorze Polskim ».

2. **03-en-1 → 09 : tout le parcours après le menu est en anglais.**
   *Vécu* : « Je ne comprends plus rien, j'ai dû appuyer sur un mauvais bouton. »
   *Recommandation* : depuis une page polonaise, ne jamais faire passer en anglais sans action claire. Remplacer « EN / PL » par « 🇬🇧 English » / « 🇵🇱 Polski », et ajouter en haut de chaque page anglaise un bandeau « Wersja polska → ».

3. **01-accueil-suite2 : « jutro » n'a pas de réponse lisible.**
   *Vécu* : « NASTĘPNE OGŁOSZENIE −8 gr / +7 gr, 8 razy na 10 : je ne sais pas ce que coûtera l'essence demain. »
   *Texte* : « Jutro: nowa cena nie jest jeszcze ogłoszona. Zwykle zmienia się najwyżej o kilka groszy: od 5,98 do 6,13 zł/l za benzynę 95. »

4. **Accueil et menu : sigles non expliqués à l'endroit où ils apparaissent** (« PB95 », « ON », « CPN », « M.P. poz. », « KAS »).
   *Recommandation* : écrire en toutes lettres dans les cartes et les tableaux (« benzyna 95 », « diesel (olej napędowy) »). Remonter « Skróty » ou mettre une info-bulle.
   *Texte* : « Pakiet CPN » → « Tańsze paliwo: obniżony VAT i akcyza (pakiet CPN) ».

5. **06-en-cpn-package-suite1 et 07-en-diesel-price-1 : champ « Consumption » cassé**, la valeur « 6.5 » / « 5.5 » chevauche « l/100 km ».
   *Recommandation* : élargir la marge droite du champ ou raccourcir l'unité (« l »), et mettre « l/100 km » dans le libellé : « Spalanie (litrów na 100 km) ».

6. **06-en-cpn et 07-en-diesel : chiffres différents de l'accueil** (6.10 / 7.66 contre 6,06 / 7,54).
   *Vécu* : « Quel est le vrai prix ? »
   *Recommandation* : partout le même dernier prix, ou une mention explicite.
   *Texte* : « obliczenie na podstawie obwieszczenia z 10 listopada (6,10 zł/l); aktualna cena: 6,06 zł/l ».

7. **09-en-fuel-price-history-suite6 et suite16 : dates à l'envers** (« 24 October – 23 October », « 12 June – 11 June »), plus une liste de 31 écrans.
   *Vécu* : « Ce site fait des erreurs. »
   *Recommandation* : corriger ces deux périodes, signaler les trous (« 1 lipca – 16 sierpnia: brak limitu »), replier la liste par mois.

8. **Accueil, 18 écrans de texte juridique ; argument de confiance enfoui.**
   *Recommandation* : remonter juste sous le calculateur les deux phrases qui rassurent, et replier les sections sur la formule, les périodes de TVA et les sources.
   *Texte* : « Limit to najwyższa cena — stacja może sprzedawać taniej. Nie zbieramy żadnych danych: kalkulator liczy w Twoim telefonie. »

## 7. À garder

- La première phrase de l'accueil : « benzyna 95 najwyżej 6,06 zł/l, olej napędowy 7,54 zł/l ». C'est la réponse immédiate à la question Google.
- Le calculateur du plein, prérempli à 50 l, avec l'aide « Np. pełny bak osobówki: 40–60 l » et le résultat « Tankowanie 50 l, najwyżej 303 zł ».
- « stacja może sprzedawać taniej » et « Limit nie jest ceną, którą trzeba płacić ».
- « Serwis niezależny: nie jesteśmy ministerstwem ani stacją paliw ».
- « w piątek po południu poznajesz ceny na sobotę, niedzielę i poniedziałek ». Concret et utile.
- Le tableau compact par carburant (prix max, précédent, variation, plein de 50 l).
- Les questions fréquentes, formulées comme elle se les pose (« Czy stacja może sprzedawać paliwo drożej niż cena maksymalna? »).
- Les intitulés du menu en polonais simple, surtout « Stacja drożej niż limit ».
- La section 2027 (« około 7,31 zł/l »), qui parle directement à son porte-monnaie.

## 8. Notes

Clarté : 5/10
Facilité : 5/10
Utilité : 7/10
