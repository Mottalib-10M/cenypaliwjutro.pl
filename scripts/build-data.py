#!/usr/bin/env python3
"""Données du site, reconstruites depuis les sources officielles (rejouable).

Usage : python3 scripts/build-data.py [--fetch] [--garder]
  --fetch   relit les sources en ligne avant de reconstruire (sinon : copies de data-raw/).
  --garder  relecture planifiée (npm run update-data, GitHub Actions) : si une source échoue (réseau, 403 ou défi
            anti-robot, format changé, contrôle de cohérence), le fichier de données de cette source n'est pas réécrit :
            la dernière valeur reste, avec sa date de relevé, et le script sort à 0 avec un avertissement.
            Un blocage anti-robot n'est jamais contourné (même agent, pas de nouvel essai) : on relit à la main.

Sources
  1. Monitor Polski (Dziennik Urzędowy RP), obwieszczenia Ministra Energii « w sprawie maksymalnej ceny paliw
     ciekłych na stacji paliw » (art. 34a ust. 5 ustawy o zapasach) : liste par l'API ELI de la Chancellerie du
     Sejm (api.sejm.gov.pl/eli/acts/MP/<année>), texte PDF officiel de chaque position. Acte officiel : hors droit
     d'auteur (art. 4 pkt 2 ustawy o prawie autorskim).
  2. gov.pl/web/energia : communiqué du ministère pour une annonce que l'API ELI n'a pas encore indexée
     (prix TTC seulement ; la position au Monitor Polski reste à relire).
  3. Weekly Oil Bulletin de la Commission européenne (fichier « Prices history »), CC BY 4.0 : prix moyens
     hebdomadaires avec et sans taxes, euro-super 95, gazole, GPL, pour la Pologne et l'UE.

Sorties : src/data/ceny.json, src/data/wob.json. Aucune valeur n'est tapée à la main.
"""
import datetime as dt
import glob
import html
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'data-raw')
OUT = os.path.join(ROOT, 'src', 'data')
UA = 'Mozilla/5.0 (cenypaliwjutro.pl data build)'
FETCH = '--fetch' in sys.argv
GARDER = '--garder' in sys.argv

# Périodes de TVA réduite à 8 % (art. 146ej ustawy o VAT ; § 11, 11a, 11b, 11c du rozporządzenie du 9 décembre 2023,
# Dz.U. 2026 poz. 417, 573, 642, 699, 771, 1095, 1288) : la cena maksymalna ne vaut que pendant ces périodes (art. 34a ust. 1).
OKRESY = [
    {'od': '2026-03-31', 'do': '2026-06-30', 'akty': ['Dz.U. 2026 poz. 417', 'poz. 573', 'poz. 642', 'poz. 699', 'poz. 771']},
    {'od': '2026-08-17', 'do': '2026-08-31', 'akty': ['Dz.U. 2026 poz. 1095']},
    {'od': '2026-10-03', 'do': '2026-12-31', 'akty': ['Dz.U. 2026 poz. 1288']},
]


def curl(url, out):
    # --fail : une réponse 403/404/5xx est une erreur (jamais enregistrée comme donnée) ; fichier temporaire puis
    # renommage : un téléchargement coupé ne laisse pas de PDF tronqué dans le cache.
    os.makedirs(os.path.dirname(out), exist_ok=True)
    tmp = out + '.part'
    subprocess.run(['curl', '-sSL', '--fail', '--max-time', '60', '-A', UA, '-o', tmp, url], check=True)
    os.replace(tmp, out)


def pdf_text(path):
    import pypdf
    return re.sub(r'\s+', ' ', ' '.join(p.extract_text() for p in pypdf.PdfReader(path).pages))


def pl_num(s):
    return float(s.replace(',', '.'))


def day(s):
    return dt.date.fromisoformat(s)


# ---------------------------------------------------------------- 1. Monitor Polski
def obwieszczenia():
    lst = os.path.join(RAW, 'mp2026.json')
    if FETCH:
        curl('https://api.sejm.gov.pl/eli/acts/MP/2026', lst)
    items = [i for i in json.load(open(lst))['items'] if 'maksymalnej ceny paliw' in i['title']]
    rows = []
    for i in sorted(items, key=lambda x: x['pos']):  # trié ensuite par date lue dans le texte
        f = os.path.join(RAW, 'mp', f"{i['pos']}.pdf")
        if FETCH and not os.path.exists(f):
            curl(f"https://api.sejm.gov.pl/eli/acts/MP/2026/{i['pos']}/text.pdf", f)
        t = pdf_text(f)
        v = re.findall(r'wynosi (\d+,\d+) zł za 1 dm3, b\) powiększona o podatek od towarów i usług wynosi (\d+,\d+) zł', t)
        if len(v) != 3:
            sys.exit(f"M.P. 2026 poz. {i['pos']} : 3 prix attendus, {len(v)} lus")
        if 'art. 34a ust. 5' not in t:
            sys.exit(f"M.P. 2026 poz. {i['pos']} : base légale art. 34a ust. 5 absente")
        # Date de l'obwieszczenie lue dans le texte officiel (« z dnia 12 czerwca 2026 r. ») : la date d'annonce de
        # l'API ELI est parfois celle d'une autre position (poz. 552, 557, 601, 1036), ce qui faussait les périodes.
        z = re.search(r'OBWIESZCZENIE MINISTRA ENERGII\s*\d?\)?\s*z dnia (\d{1,2}) (\w+) (\d{4}) r\.', t)
        if not z or z.group(2) not in MOIS:
            sys.exit(f"M.P. 2026 poz. {i['pos']} : date « z dnia … » illisible")
        ogl = f"{z.group(3)}-{MOIS[z.group(2)]:02d}-{int(z.group(1)):02d}"
        net = {k: pl_num(a) for k, (a, _) in zip(('pb95', 'pb98', 'on'), v)}
        gross = {k: pl_num(b) for k, (_, b) in zip(('pb95', 'pb98', 'on'), v)}
        rows.append({'src': 'mp', 'poz': i['pos'], 'ogl': ogl, 'net': net, 'brutto': gross,
                     'url': f"https://api.sejm.gov.pl/eli/acts/MP/2026/{i['pos']}/text.pdf"})
    return sorted(rows, key=lambda r: (r['ogl'], r['poz']))


# ---------------------------------------------------------------- 2. gov.pl (annonces pas encore dans l'API ELI)
MOIS = {'stycznia': 1, 'lutego': 2, 'marca': 3, 'kwietnia': 4, 'maja': 5, 'czerwca': 6, 'lipca': 7, 'sierpnia': 8,
        'września': 9, 'października': 10, 'listopada': 11, 'grudnia': 12}


def govpl(apres):
    """Annonces du ministère publiées après la dernière position lue au Monitor Polski."""
    d = os.path.join(RAW, 'govpl')
    if FETCH:
        lst = os.path.join(RAW, 'govpl-liste.html')
        curl('https://www.gov.pl/web/energia/wiadomosci', lst)
        for slug in re.findall(r'href="/web/energia/(maksymalna-cena-detaliczna-paliw[^"]*)"', open(lst).read()):
            f = os.path.join(d, f'{slug}.html')
            if not os.path.exists(f):
                curl(f'https://www.gov.pl/web/energia/{slug}', f)
    out = []
    for f in glob.glob(os.path.join(d, 'maksymalna-cena-detaliczna-paliw*.html')):
        t = open(f, encoding='utf-8').read()
        m = re.search(r'<article.*?</article>', t, re.S)
        x = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', m.group(0) if m else t)))
        pub = re.search(r'(\d\d)\.(\d\d)\.(\d{4})', x)
        if not pub:
            continue
        ogl = f'{pub.group(3)}-{pub.group(2)}-{pub.group(1)}'
        if ogl <= apres:
            continue

        def g(p):
            mm = re.search(p + r'\s*[–-]\s*(\d+[,.]\d+)\s*zł', x, re.I)
            return pl_num(mm.group(1)) if mm else None
        b = {'pb95': g('benzyna 95'), 'pb98': g('benzyna 98'), 'on': g('olej napędowy')}
        if None in b.values() or ogl > dt.date.today().isoformat():
            print(f'ignoré (page sans les trois prix ou datée du futur) : {os.path.basename(f)}')
            continue
        slug = os.path.basename(f)[:-5]
        out.append({'src': 'govpl', 'poz': None, 'ogl': ogl, 'net': None, 'brutto': b,
                    'url': f'https://www.gov.pl/web/energia/{slug}'})
    return sorted(out, key=lambda r: r['ogl'])


def okres(d):
    for o in OKRESY:
        if o['od'] <= d <= o['do']:
            return o
    return None


def ważność(rows):
    """Art. 34a ust. 6 : la cena vaut le lendemain de l'annonce ; annoncée la veille d'un jour chômé, elle vaut
    jusqu'au jour ouvré suivant inclus, c'est-à-dire jusqu'au jour de l'annonce suivante. Bornée par la période
    de TVA réduite (art. 34a ust. 1)."""
    for i, r in enumerate(rows):
        od = (day(r['ogl']) + dt.timedelta(days=1)).isoformat()
        o = okres(od) or next((p for p in OKRESY if p['od'] > r['ogl']), None)
        if o and od < o['od']:
            od = o['od']
        r['od'] = od
        nxt = rows[i + 1]['ogl'] if i + 1 < len(rows) else None
        fin = o['do'] if o else od
        r['do'] = min(nxt, fin) if nxt else None  # None : en vigueur jusqu'à l'annonce suivante
        r['okres'] = OKRESY.index(o) if o else None
        if r['do'] is not None and r['do'] < r['od']:
            sys.exit(f"période impossible : annonce du {r['ogl']} ({r['url']}) du {r['od']} au {r['do']}")
    return rows


# ---------------------------------------------------------------- 3. Weekly Oil Bulletin
PAYS = {'AT': 'Austria', 'BE': 'Belgium', 'BG': 'Bulgaria', 'CY': 'Cyprus', 'CZ': 'Czechia', 'DE': 'Germany', 'DK': 'Denmark',
        'EE': 'Estonia', 'ES': 'Spain', 'FI': 'Finland', 'FR': 'France', 'GR': 'Greece', 'HR': 'Croatia', 'HU': 'Hungary',
        'IE': 'Ireland', 'IT': 'Italy', 'LT': 'Lithuania', 'LU': 'Luxembourg', 'LV': 'Latvia', 'MT': 'Malta', 'NL': 'Netherlands',
        'PL': 'Poland', 'PT': 'Portugal', 'RO': 'Romania', 'SE': 'Sweden', 'SI': 'Slovenia', 'SK': 'Slovakia'}


def wob():
    import openpyxl
    f = os.path.join(RAW, 'wob', 'hist.xlsx')
    if FETCH:
        curl('https://energy.ec.europa.eu/document/download/906e60ca-8b6a-44e7-8589-652854d2fd3f_en?filename=Weekly_Oil_Bulletin_Prices_History_maticni_4web.xlsx', f)
    wb = openpyxl.load_workbook(f, read_only=True, data_only=True)

    def feuille(nom):
        it = wb[nom].iter_rows(values_only=True)
        hdr = next(it)
        idx = {c: j for j, c in enumerate(hdr) if c}
        rows = [r for r in it if isinstance(r[0], dt.datetime)]
        return idx, rows
    iw, rw = feuille('Prices with taxes')
    io_, ro = feuille('Prices wo taxes')
    wo = {r[0].date().isoformat(): r for r in ro}
    pl = []
    for r in rw:
        d = r[0].date().isoformat()
        if d < '2024-01-01':
            continue
        o = wo.get(d)
        g = lambda i, c: (i[c] is not None and c in i and r[i[c]]) or None
        pl.append({'d': d, 'kurs': r[iw['PL_exchange_rate']],
                   'pb95': r[iw['PL_price_with_tax_euro95']], 'on': r[iw['PL_price_with_tax_diesel']], 'lpg': r[iw['PL_price_with_tax_LPG']],
                   'pb95_bez': o[io_['PL_price_wo_tax_euro95']] if o else None, 'on_bez': o[io_['PL_price_wo_tax_diesel']] if o else None,
                   'lpg_bez': o[io_['PL_price_wo_tax_LPG']] if o else None,
                   'ue95': r[iw['EU_price_with_tax_euro95']]})
    pl.sort(key=lambda x: x['d'])
    last = max(rw, key=lambda r: r[0])
    kraje = []
    for k, nom in PAYS.items():
        c95, con, clpg = f'{k}_price_with_tax_euro95', f'{k}_price_with_tax_diesel', f'{k}_price_with_tax_LPG'
        v = lambda c: (round(last[iw[c]], 2) if c in iw and isinstance(last[iw[c]], (int, float)) and last[iw[c]] > 0 else None)
        kraje.append({'k': k, 'en': nom, 'pb95': v(c95), 'on': v(con), 'lpg': v(clpg)})
    ue = {'pb95': last[iw['EU_price_with_tax_euro95']], 'on': last[iw.get('EU_price_with_tax_diesel')] if 'EU_price_with_tax_diesel' in iw else None}
    return {'tydzien': last[0].date().isoformat(), 'pl': pl, 'kraje': kraje, 'ue': ue}


def garde(nom, f):
    """Exécute une lecture ; avec --garder, un échec laisse le fichier de données précédent en place."""
    if not GARDER:
        return f()
    try:
        return f()
    except (Exception, SystemExit) as e:  # sys.exit des contrôles de cohérence compris
        print(f'::warning::{nom} : lecture impossible ({e}) ; dernière valeur conservée')
        return None


def ceny_rows():
    rows = obwieszczenia()
    ost = rows[-1]['ogl']
    rows += govpl(ost)
    rows = ważność(rows)
    for r in rows:
        r['ogl_dzien'] = r['ogl']
    return rows


def main():
    now = dt.date.today().isoformat()
    rows = garde('Monitor Polski / gov.pl', ceny_rows)
    if rows is not None:
        old = os.path.join(OUT, 'ceny.json')
        prev = json.load(open(old)) if os.path.exists(old) else None
        if GARDER and prev and len(rows) < len(prev['ceny']):
            print(f"::warning::moins d'annonces lues ({len(rows)}) que dans les données ({len(prev['ceny'])}) ; dernière valeur conservée")
        else:
            json.dump({'odczyt': now, 'okresy': OKRESY, 'ceny': rows}, open(old, 'w'), ensure_ascii=False, indent=0)
            print(f"{len(rows)} annonces (dont {sum(r['src'] == 'govpl' for r in rows)} gov.pl), de {rows[0]['ogl']} à {rows[-1]['ogl']}")
    w = garde('Weekly Oil Bulletin', wob)
    if w is not None:
        w['odczyt'] = now
        json.dump(w, open(os.path.join(OUT, 'wob.json'), 'w'), ensure_ascii=False, indent=0)
        print(f"WOB : {len(w['pl'])} semaines PL, dernière {w['tydzien']}, {len(w['kraje'])} pays")


if __name__ == '__main__':
    main()
