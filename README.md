# Monaco Black Car — site React (Next.js)

Version **1.0** du site, construite à partir des maquettes Figma « Monaco Black Car — Website Redesign » (pages 06, 07, 08 et 10).

- **React 19 + Next.js 16 (App Router) + TypeScript**
- **Site 100 % statique** : aucune base de données, aucun serveur, aucune donnée enregistrée.
- La réservation et les devis se **finalisent sur WhatsApp** via un lien `wa.me` avec message pré-rempli.

---

## 1. Lancer le projet

Prérequis : **Node.js 22.23+, 24.22+ ou 26.12+**.

```bash
npm install
npm run dev        # site en local sur http://localhost:3000
npm run build      # génère le site final dans le dossier /out
npm start          # prévisualise le dossier /out
```

## 2. Mettre en ligne

`npm run build` produit un dossier **`/out`** contenant uniquement des fichiers HTML, CSS, JS et images.
Il se dépose tel quel sur n'importe quel hébergeur : Vercel, Netlify, OVH, o2switch, un serveur Apache/Nginx…
Les pages sont générées à l'avance : Google et les aperçus de liens (WhatsApp, réseaux) voient tout le contenu.

### Déployer sur Cloudflare Workers

La configuration Cloudflare du dépôt utilise **Workers avec Vinext**. Elle ne déploie pas le dossier `/out` produit par `npm run build` et ne correspond pas à Cloudflare Pages.

1. Installer les dépendances avec `npm ci`.
2. S'authentifier auprès de Cloudflare : `npx cf auth login`.
3. Vérifier la compilation Worker : `npm run build:vinext`.
4. Déployer : `npm run deploy:vinext`.

Le déploiement crée ou met à jour le Worker `monaco-black-car`. `npm run dev:vinext` lance aussi le site en local sur le port 3001. Pour une intégration continue, ne stocker aucun jeton Cloudflare dans le dépôt : utiliser les secrets de l'environnement de build.

Le workflow GitHub Actions de `.github/workflows/deploy-cloudflare.yml` appelle le workflow réutilisable de [`ToubaLabs/github-workflows`](https://github.com/ToubaLabs/github-workflows). Il déploie automatiquement la version correspondante quand une release GitHub est publiée. Ajouter `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` dans **Settings → Secrets and variables → Actions** du dépôt.

La commande `npm run build` reste disponible pour produire l'export statique destiné aux autres hébergeurs.

## 3. Structure

```
src/
  app/                      Pages (une URL = un dossier)
    layout.tsx              Document HTML, polices, metadata (pas de langue ici — voir section 8)
    (fr)/                   Routes françaises (dossier invisible dans l'URL — voir section 8)
      page.tsx                Accueil
      reserver/               Étape 1 : trajet
      reserver/vehicule/      Étape 2 : choix du véhicule et prix
      reserver/whatsapp/      Étape 3 : message pré-rempli, QR code, bouton WhatsApp
      services/               Services (+ transferts-aeroport, mise-a-disposition)
      evenements/             Page Événements + demande de devis vers WhatsApp
      flotte/                 Liste avec filtres, tri et état vide
      flotte/[slug]/          Fiche véhicule (galerie, tarifs, avis)
      tarifs/  faq/  journal/  journal/[slug]/  a-propos/  contact/
      mentions-legales/  cgv/  confidentialite/
    [locale]/               Mêmes routes, en anglais/italien/russe (/en/, /it/, /ru/)
    not-found.tsx           Page 404
    globals.css             Tokens (couleurs, rayons, typo) = variables Figma « MBC Tokens »
    components.css          Styles des composants
  components/               Composants (mêmes noms que dans Figma, page 08)
  data/                     ⚠️ Tous les contenus modifiables sont ici
  i18n/                     Langues : dictionnaires, contexte, lien localisé (voir section 8)
  lib/whatsapp.ts           Construction des liens et messages WhatsApp
  lib/geo.ts                Auto-complétion d'adresses et géolocalisation (Nominatim/OSM)
```

### Correspondance Figma → code

| Composant Figma (page 08) | Code |
|---|---|
| Button | classes `.btn--primary`, `.btn--secondary`, `.btn--whatsapp` |
| Field (+ états d'erreur) | `Field` dans `components/ui.tsx` |
| Chip | classe `.chip` (`aria-pressed` = sélectionné) |
| Counter | `Counter` dans `components/ui.tsx` |
| Progress | `Progress` dans `components/ui.tsx` |
| Vehicle Card / Vehicle Tile / Galerie véhicule | `components/Vehicle.tsx` |
| Day Cell, Day Pill, Time Chip | `components/DateTimePicker.tsx` |
| FAQ Item | `FaqItem` (balise `<details>`) |
| Header + menu mobile | `components/Header.tsx` |
| Footer | `components/Footer.tsx` |
| WhatsApp Button (flottant) | `components/WhatsAppButton.tsx` |
| Bandeau cookies | `components/CookieBanner.tsx` |

## 4. Modifier les contenus (sans toucher aux pages)

| Quoi | Fichier |
|---|---|
| Téléphone, WhatsApp, e-mail, adresse, menu | `src/data/site.ts` |
| Dénomination publique, coordonnées GPS, lien Maps et réseaux sociaux | `src/data/site.ts` → `businessName`, `postalAddress`, `geo`, `mapsUrl`, `socialLinks` |
| **Version de couleurs** (`"claire"` ou `"sombre"`) | `src/data/site.ts` → `THEME` |
| Identifiant Formspree du formulaire de contact | `src/data/site.ts` → `contactFormEndpoint` |
| Véhicules, capacités, prix de référence | `src/data/vehicles.ts` |
| Trajets et suppléments | `src/data/routes.ts` |
| Tarifs horaires par véhicule | `src/data/vehicles.ts` |
| FAQ, avis clients, articles du Journal, articles de presse, partenaires, vidéos de l'accueil | `src/data/content.ts` |

La catégorie Classe E/EQE/Tesla est une seule entrée : les 9 photos montrent une EQE (badge visible) et sont nommées `mercedes-eqe-1.jpg` à `mercedes-eqe-9.jpg` (`photoPrefix: "mercedes-eqe"`). L'identifiant historique `mercedes-eqs` est conservé uniquement pour ne pas casser les liens de la fiche. Les prix de transfert de référence utilisent la colonne Nice/Aéroport de la grille fournie (150 € pour cette catégorie). Le tarif horaire est de 100 €/h.

La Mercedes Classe S (`mercedes-classe-s-berline`) est distincte de la Maybach (`mercedes-classe-s`, identifiant historique conservé). Ses 11 photos WhatsApp sont renommées `mercedes-classe-s-berline-1.jpg` à `-11.jpg`. Selon la nouvelle grille, le transfert Nice/Aéroport est de 220 € pour la Classe S et la Classe V. Les capacités sont de 3 passagers et 2 bagages. La motorisation reste à confirmer.

## 5. Images à fournir

Déposer les fichiers dans `public/images/` avec ces noms. Tant qu'une image manque, un cadre neutre s'affiche.

```
public/images/videos/hero.mp4 et hero.jpg        Vidéo / image de fond de l'accueil
public/images/partage.jpg                        Image d'aperçu des liens (1200 × 630)
public/images/vehicules/<slug>-1.jpg … -N.jpg    Photos par véhicule (slug et nombre dans vehicles.ts)
public/images/services/transferts.jpg, evenements.jpg, mise-a-disposition.jpg
public/images/evenements/grand-prix.jpg, yacht-show.jpg, galas.jpg, mariages.jpg
public/images/journal/<slug-article>.jpg
public/images/videos/video-1.mp4, video-2.mp4, video-3.mp4   Carrousel vidéo de l'accueil (liste dans content.ts → homeVideos)
```

Déjà fournis : `public/images/logo.png` (logo complet, en-tête et pied de page) et `public/favicon.png` (favicon, monogramme MBC), à partir du logo transmis par le client. Le logo FindIt se trouve dans `public/images/partenaires/findit.jpg`. Les hôtels partenaires sont affichés en texte dans `data/content.ts` → `partners`, en attendant leurs logos. L'aperçu `public/images/partage.jpg` (1200 × 630) est un recadrage de la photo fournie `mercedes-eqe-5.jpg`, devant le port de Monaco.

Formats conseillés : JPG ou WebP, 2400 px de large maximum pour les grandes images.

Les trois premiers articles de « Bien circuler à Monaco » utilisent des photos Wikimedia Commons, stockées dans `public/images/journal/` et optimisées à 1600 px. Les auteurs, sources et licences sont renseignés dans `src/data/content.ts` (`articles[].image`) et affichés sur les cartes et les articles (liens source/licence sur l'article). Les photos du circuit et de l'aéroport, y compris leurs versions redimensionnées et recadrées, restent sous CC BY-SA 4.0 ; celle du Casino est sous CC BY 2.0. Ces licences concernent les photos, pas le code du site. Conserver les crédits lors de toute réutilisation.

La page Services réutilise les photos de l'aéroport et du circuit, avec crédits et liens source/licence sous les cartes. La mise à disposition utilise la photo fournie de la Classe S. Les références sont centralisées dans `src/data/content.ts` (`serviceImages`).

La page Tarifs traduit également les trajets, suppléments et FAQ (`pricing` dans les dictionnaires). Les prix fixes par destination et véhicule, fournis dans les deux grilles, sont centralisés dans `src/data/routes.ts` et s'appliquent dans les deux sens lorsque Monaco est le départ ou l'arrivée. Les autres trajets et les cases non tarifées sont affichés « sur demande ». Les tarifs horaires sont dans `src/data/vehicles.ts` ; la mise à disposition est de trois heures minimum. Le dictionnaire anglais emploie « driver » pour désigner le chauffeur.

La page Événements (contenu et métadonnées) utilise `events` dans les dictionnaires. Les FAQ de l'accueil et de la page FAQ utilisent les mêmes traductions que Tarifs et Transferts, complétées par `faqPage` pour la réservation, l'annulation et les rubriques. Les ancres des rubriques FAQ restent identiques dans toutes les langues.

La page À propos utilise la photo fournie `public/images/vehicules/mercedes-eqe-5.jpg` (véhicule devant le port de Monaco), avec un texte alternatif traduit. La section de portraits « Nos chauffeurs » a été retirée.

## 6. Règles fonctionnelles

- **Aucune donnée stockée côté site** : pas de compte, pas de base de données. Le trajet passe d'une étape à l'autre dans l'URL. Seul le formulaire de contact (`components/ContactForm.tsx`) envoie un message, via le service tiers Formspree (voir point 7).
- **Lien WhatsApp** : `https://wa.me/<numéro>?text=<message encodé>` (voir `lib/whatsapp.ts`).
- **Prix** : calculés dans le navigateur à partir de `data/` (fonction `priceFor` dans `reserver/vehicule/page.tsx`). **À remplacer par la vraie grille du client.**
- **Date et heure** : au moins 2 h à l'avance, créneaux de 15 minutes, jours passés désactivés.
- **Validation** : message sous le champ concerné, focus sur le premier champ en erreur, bouton toujours actif.
- **Véhicules** : seuls ceux qui sont trop petits pour le nombre de passagers sont désactivés. Le contrôle des bagages intervient après un choix explicite de véhicule (jamais à l'arrivée sur l'étape) : si sa capacité est dépassée, un popup propose un véhicule plus grand ou un véhicule supplémentaire. Ce contrôle reste actif si le nombre de bagages est ensuite modifié (`reserver/vehicule/page.tsx`).
- **Adresses** : suggestions et « Utiliser ma position » via l'API publique Nominatim/OpenStreetMap, sans clé (`lib/geo.ts`, `components/AddressField.tsx`).
- **Cookies** : le choix est gardé dans le navigateur du visiteur (`localStorage`, clé `mbc-consent`). Brancher un outil d'audience anonyme seulement si la valeur est `"oui"`.
- **Accessibilité** : navigation au clavier, focus visible champagne, `prefers-reduced-motion` respecté.

## 7. ⚠️ Éléments provisoires (à remplacer avant la mise en ligne)

- Numéro WhatsApp **+377 67 23 76 08** : à confirmer par le client.
- Les distances et durées des trajets restent à valider.
- **Photos**, vidéo du hero.
- **Textes légaux** (mentions, CGV, confidentialité) : seulement un plan.
- **Version anglaise** : voir section 8, langues disponibles.
- Adresse du site dans `src/app/layout.tsx` (`metadataBase`) si le domaine change.
- **Formulaire de contact** : `src/data/site.ts` → `contactFormEndpoint` utilise `https://formspree.io/f/xkjjpdva`. L'adresse de réception et sa validation sont gérées dans le tableau de bord [Formspree](https://formspree.io/forms), indépendamment du champ `site.email`. Vérifier la réception d'un message après configuration.
- **Nominatim/OpenStreetMap** (auto-complétion d'adresses) : service gratuit à usage raisonnable uniquement (~1 requête/s). Prévoir un fournisseur dédié (Google Places, Mapbox…) si le trafic devient important.
- **Traductions anglais/italien/russe** : réalisées automatiquement (IA), pas par un traducteur professionnel. À faire relire par un locuteur natif de chaque langue avant la mise en ligne, en particulier le russe.

## 8. 🌍 Langues (i18n)

Le site est disponible en **français** (langue par défaut, sans préfixe d'URL : `/flotte/`) et en **anglais, italien, russe** (préfixés : `/en/flotte/`, `/it/flotte/`, `/ru/flotte/`).

**Portée des traductions** : l'interface et les parcours clés sont traduits — navigation, réservation (3 étapes), devis événement, flotte, tarifs, contact, **Services**, **Événements**, **FAQ**, **À propos** et **Journal** (contenu et métadonnées). Les textes d'interface sont dans `src/i18n/dictionaries/{fr,en,it,ru}.ts` ; les traductions des articles sont dans `src/data/articles-i18n.ts`. Les **pages légales** restent en français. Les **messages envoyés sur WhatsApp** restent toujours en français, quelle que soit la langue du site : l'équipe qui les reçoit communique en français.

Pas de `next-intl` ni de middleware : le site étant 100 % statique (aucun serveur en production), la langue par défaut (français) ne peut pas être détectée/réécrite au moment de la requête. La solution retenue est un *routing* simple et entièrement pré-calculé au build :

```
src/
  app/
    layout.tsx              Document HTML (<html>, polices, metadata). Pas de langue ici.
    (fr)/                    Groupe de routes françaises (dossier invisible dans l'URL)
      layout.tsx             Fournit la langue "fr" (Header, Footer, LocaleProvider)
      page.tsx, flotte/, reserver/, …   Mêmes routes qu'avant, inchangées
    [locale]/                Routes préfixées (en, it, ru uniquement — pas "fr")
      layout.tsx              Fournit la langue courante (Header, Footer, LocaleProvider)
      page.tsx, flotte/, …     La plupart ré-exportent le composant de (fr)/ (DRY) :
                               la traduction vient du contexte, pas d'un fichier dupliqué
  i18n/
    locales.ts               Langues, préfixes d'URL, formatage de date par langue
    dictionary.ts             Type TypeScript du dictionnaire (une clé = une chaîne d'interface)
    dictionaries/{fr,en,it,ru}.ts   Un dictionnaire par langue, même forme que dictionary.ts
    context.tsx               LocaleProvider + useI18n() (langue + dictionnaire courants)
    LocalizedLink.tsx          Remplace next/link : préfixe automatiquement les liens internes
```

**Comment ça marche** : un composant appelle `const { t } = useI18n()` et affiche `t.nav.fleet` au lieu d'un texte français codé en dur. Le même composant sert à la fois aux pages `(fr)/` (contexte "fr" fourni par `(fr)/layout.tsx`) et aux pages `[locale]/` (contexte "en"/"it"/"ru" fourni par `[locale]/layout.tsx`) : aucune page n'est dupliquée pour les parcours traduits.

**Modifier une traduction** : éditer la chaîne correspondante dans `src/i18n/dictionaries/<langue>.ts`. Ne pas changer la *forme* du dictionnaire dans un seul fichier : `dictionary.ts` définit le type commun aux 4 langues, donc une clé ajoutée/retirée doit l'être dans les 4 fichiers.

**Sélecteur de langue** : dans l'en-tête (`components/Header.tsx`), desktop et menu mobile.

## 9. Référencement Google et moteurs IA

Le domaine canonique est **https://monacoblackcar.mc**, défini dans `src/data/site.ts` (`site.url`). Une publication sur `mbc-react.vercel.app` ne remplace pas le site du domaine officiel : celui-ci doit être raccordé au projet d'hébergement avant la migration.

- `src/lib/seo.ts` centralise les titres, descriptions, URL canoniques, variantes `hreflang` et aperçus Open Graph/Twitter. Les pages interactives conservent une enveloppe serveur pour générer ces balises dans le HTML statique.
- `src/app/sitemap.ts` génère `/sitemap.xml` : pages traduites, véhicules et Journal en français, anglais, italien et russe ; pages légales uniquement en français. Leurs copies préfixées restent accessibles, mais désignent la version française comme canonique.
- `src/app/robots.ts` génère `/robots.txt` et indique le sitemap. Les étapes de réservation portent `noindex, follow`, sans blocage dans robots.txt afin que les moteurs puissent lire cette consigne.
- `src/components/BusinessStructuredData.tsx` décrit l'entreprise et ses trois services en JSON-LD, avec le lien Google Business fourni. Aucun avis, classement, numéro d'immatriculation ou adresse de rue n'est inventé.
- La fiche Google Business `/g/11ssfx6tck`, consultée le 3 novembre 2026, affiche « MBC MONACO BLACK CAR », Résidence Auteuil, 2 Boulevard du Ténao, 98000 Monaco, et le point GPS `43.7488133, 7.4315619`. Sa rubrique Profils renvoie vers `https://www.instagram.com/monacoblackcars/`. Ces informations sont visibles dans Contact et le pied de page et reprises en JSON-LD (`alternateName`, `address`, `geo`, `sameAs`, `hasMap`). La dénomination publique n'est pas déclarée comme raison sociale juridique ; seuls les profils confirmés sont ajoutés.
- Les pages Facebook `https://www.facebook.com/p/Monaco-Black-car-61551831645740/` et LinkedIn `https://www.linkedin.com/company/monaco-black-car/` sont également renseignées dans `socialLinks`. Vérification le 3 novembre 2026 : les publications Facebook indexées reprennent le téléphone du site ; la page LinkedIn renvoie vers `monacoblackcar.mc` et reprend son e-mail et son téléphone. Les liens sont automatiquement affichés dans Contact et le pied de page, et inclus dans `sameAs`.
- L'attribut `lang` du document reste français dans le HTML initial ; la langue de l'interface est ensuite appliquée côté client. Les canoniques et `hreflang`, eux, sont générés côté serveur. Une évolution vers des documents racines par langue reste possible.

### Avant de remplacer l'ancien site

1. Recenser les URL WordPress actuellement indexées et préparer des redirections **301** vers les pages correspondantes du nouveau site, sur l'hébergeur (ne pas tout renvoyer vers l'accueil).
2. Raccorder le domaine officiel au projet Vercel, conserver les enregistrements e-mail et vérifier HTTPS, les redirections entre variantes de domaine et les pages existantes. Aucune modification DNS n'est faite par le code.
3. Vérifier la propriété du domaine dans **Google Search Console**, puis soumettre `https://monacoblackcar.mc/sitemap.xml` une fois le nouveau site effectivement accessible à cette adresse. Contrôler les canoniques et l'indexation avec l'inspection d'URL.
4. Harmoniser le lien du site et les coordonnées sur Google Business ; compléter les services et photos réelles, et solliciter uniquement des avis authentiques.
5. Publier des informations locales utiles, exactes et régulièrement revues ; suivre les requêtes et clics dans Search Console plutôt qu'un classement ponctuel.

Après `npm run build`, vérifier les fichiers `out/sitemap.xml`, `out/robots.txt`, les canoniques/variantes linguistiques dans le HTML et l'image de partage. Les prix et textes provisoires doivent être confirmés avant de les présenter comme des engagements commerciaux.

Ces fondations améliorent la compréhension et l'exploration du site, mais ne garantissent ni la première place ni une citation par une IA. [Google recommande les mêmes fondamentaux SEO pour ses fonctionnalités IA](https://developers.google.com/search/docs/appearance/ai-features), sans balisage IA spécial obligatoire.
