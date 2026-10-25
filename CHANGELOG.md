# Journal des versions

Chaque version liste uniquement ce qui a changé. Le reste du projet est identique à la version précédente.

## v1.14 — 3 novembre 2026 : photos du Range Rover Vogue / LWB

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `public/images/vehicules/range-rover-vogue-1.jpg` … `-7.jpg` | 7 photos (export WhatsApp) renommées et placées sur la fiche Range Rover Vogue / LWB : extérieur (face, profil, 3/4, arrière), porte ouverte, intérieur avant et arrière |
| `src/data/vehicles.ts` | `photos: 5` → `7` pour `range-rover-vogue` |
| `package.json` | Version 1.14.0 |

## v1.13 — 3 novembre 2026 : titre/description traduits + 3e article de presse

**Bug** : le `<title>` de l'onglet et la meta description restaient toujours en français ("Chauffeur privé à Monaco"), même sur les pages /en/, /it/, /ru/.

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/i18n/dictionary.ts`, `dictionaries/{fr,en,it,ru}.ts` | Nouvelle clé `meta` (titre, description, description Open Graph) traduite dans les 4 langues |
| `src/app/(fr)/layout.tsx` | `metadata` statique : titre/description/OG en français |
| `src/app/[locale]/layout.tsx` | `generateMetadata()` : titre/description/OG dans la langue du segment (en/it/ru), `locale` Open Graph correct (`en_US`/`it_IT`/`ru_RU`) |
| `src/data/content.ts` | 3e article de « Ils parlent de nous » confirmé : Virtually.mc (annuaire d'adresses de prestige à Monaco) |
| `public/images/presse/virtually-mc.svg` | Logo Virtually.mc (récupéré sur leur site, recoloré en noir pour rester visible sur fond blanc) |
| `package.json` | Version 1.13.0 |

## v1.12 — 3 novembre 2026 : sélecteur de langue, nouveau design

**Problème** : le sélecteur n'avait jamais reçu de style (CSS manquant) : "FR EN IT RU" s'affichaient collés les uns aux autres.

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/components/Header.tsx` | `LangSwitcher` : bouton compact `🌐 FR ▾` + menu déroulant sur le header desktop (fermeture au clic extérieur ou `Échap`) ; liste en 4 segments espacés dans le menu mobile |
| `src/app/components.css` | Styles `.lang-switcher__trigger`, `.lang-switcher__menu`, `.lang-switcher__item`, `.mobile-menu__lang` |
| `package.json` | Version 1.12.0 |

## v1.11 — 3 novembre 2026 : correctif sélecteur de langue

**Bug** : en cliquant sur EN/IT/RU, la navigation interne de Next.js réutilisait parfois l'ancien rendu : le contenu restait en français tant que la page n'était pas rechargée manuellement. Les paramètres de réservation en cours (trajet, véhicule…) étaient aussi perdus lors du changement de langue.

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/components/Header.tsx` | Sélecteur de langue : vrais `<a>` (plus `next/link`) pour forcer un rechargement complet de la page à chaque changement de langue, et conserve désormais les paramètres d'URL (`?from=...&to=...`) de la réservation en cours |
| `package.json` | Version 1.11.0 |

## v1.10 — 3 novembre 2026 : ajustements page Contact

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/i18n/dictionaries/{fr,en,it,ru}.ts` | `contact.emailNote` : « Via le formulaire » → « Ou via le formulaire » (et équivalents traduits) |
| `src/app/(fr)/contact/page.tsx` | Formulaire : fond `section--surface` au lieu de `section--alt` (évitait un bloc sombre étroit flottant sur fond crème, mal intégré à la page) ; largeur portée à 720 px |
| `package.json` | Version 1.10.0 |

## v1.9 — 3 novembre 2026 : hero vidéo défilant, « Nos partenaires » en dernière position

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/components/HeroSlider.tsx` | **Nouveau** : remplace `VideoCarousel` (supprimé). Fond vidéo plein cadre du hero, enchaîne automatiquement les 4 clips (légende, barres de progression segmentées cliquables, bouton lecture/pause) |
| `src/data/content.ts` | `homeVideos` : chaque clip a désormais une légende (`caption`) |
| `src/app/(fr)/page.tsx` | Hero : vidéo en fond plein cadre (recadrage centré) au lieu d'une vidéo étirée mal cadrée ; section « Monaco Black Car en vidéo » supprimée ; « Nos partenaires » déplacée en toute dernière section, juste avant le footer |
| `src/app/components.css`, `globals.css` | Styles `.hero-slider__*` ; suppression des styles `.carousel--video`/`.video-tile` devenus inutiles |
| `package.json` | Version 1.9.0 |

## v1.8 — 3 novembre 2026 : section « Nos partenaires » sur l'accueil

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `public/images/partenaires/findit.jpg`, `monaco-africa-growth-initiative.jpg` | **Nouveau** : logos fournis par le client, renommés et rangés |
| `src/data/content.ts` | `partners` : FindIt et Monaco Africa Growth Initiative |
| `src/components/Partners.tsx` | **Nouveau** : `PartnersBand`, affiche les logos partenaires (replie sur le nom en texte si le fichier manque) |
| `src/app/components.css` | Styles `.partners-band`, `.partner-card` |
| `src/i18n/dictionary.ts`, `dictionaries/{fr,en,it,ru}.ts` | Clé `partners` (kicker, titre) traduite dans les 4 langues |
| `src/app/(fr)/page.tsx` | Nouvelle section « Nos partenaires », juste avant « Ils parlent de nous » |
| `package.json` | Version 1.8.0 |

## v1.7 — 3 novembre 2026 : logo officiel Monaco Black Cars

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `public/images/logo.png` | **Nouveau** : logo complet (monogramme MBC + « Monaco Black Cars »), recadré depuis le fichier transmis par le client, fond transparent |
| `public/favicon.png` | **Nouveau** : favicon généré à partir du monogramme MBC seul, remplace le placeholder `favicon.svg` (supprimé) |
| `src/app/layout.tsx` | `icons.icon` pointe désormais vers `/favicon.png` |
| `src/components/Header.tsx`, `Footer.tsx` | Le nom du site en texte est remplacé par l'image du logo |
| `src/app/components.css` | Styles `.header__logo-img`, `.footer__logo-img` |
| `package.json` | Version 1.7.0 |

## v1.6 — 3 novembre 2026 : logos presse dans « Ils parlent de nous »

À la demande du client : affichage des logos des médias (au lieu du nom en texte seul).

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/data/content.ts` | `pressArticles` : nouveau champ `logo` (chemin du fichier dans `public/images/presse/`) |
| `public/images/presse/forbes-afrique.png`, `bfm-tv.svg` | **Nouveau** : logos officiels, récupérés sur Wikimedia Commons (versions actuelles, domaine public au sens du droit d'auteur texte/typographie — « PD textlogo » — mais restent des marques déposées de leurs titulaires respectifs) |
| `src/components/Press.tsx` | **Nouveau** : `PressLogo`, affiche le logo du média, replie sur le nom en texte si le fichier venait à manquer |
| `src/app/components.css` | Styles des logos (`.press-mention__media__img`, `.press-card__logo__img`) : plaque blanche pour rester lisibles sur fond sombre |
| `package.json` | Version 1.6.0 |

## v1.5 — 3 novembre 2026 : site disponible en anglais, italien et russe

**Figma** : aucun écran modifié — ajout d'une couche de traduction par-dessus l'interface existante.

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/i18n/` | **Nouveau** : `locales.ts` (langues, préfixes, format de date), `dictionary.ts` (type du dictionnaire), `dictionaries/{fr,en,it,ru}.ts` (traductions), `context.tsx` (`LocaleProvider`, `useI18n()`), `LocalizedLink.tsx` (liens préfixés automatiquement) |
| `src/app/(fr)/` | **Déplacement** : toutes les routes françaises existantes, inchangées, regroupées dans ce dossier (invisible dans l'URL) pour partager un layout commun avec `[locale]/` |
| `src/app/(fr)/layout.tsx` | **Nouveau** : fournit la langue française (Header, Footer, `LocaleProvider`) — reprend ce que faisait `app/layout.tsx` |
| `src/app/[locale]/` | **Nouveau** : routes `/en/`, `/it/`, `/ru/` ; la plupart ré-exportent les composants de `(fr)/` (la traduction vient du contexte, zéro contenu dupliqué) ; `flotte/[slug]/` et `journal/[slug]/` ont un petit wrapper dédié (contrainte de typage Next.js sur les segments dynamiques) |
| `src/app/layout.tsx` | Simplifié : document HTML uniquement (polices, metadata), la langue est fournie par `(fr)/layout.tsx` ou `[locale]/layout.tsx` |
| `src/components/Header.tsx` | Sélecteur de langue (desktop + menu mobile), navigation traduite et liens préfixés |
| `src/components/*.tsx` (Footer, TripForm, DateTimePicker, Vehicle, TripSummary, EventForm, FleetList, ContactForm, AddressField, WhatsAppButton, CookieBanner, Press, ui) | Texte français codé en dur remplacé par `useI18n()` |
| `src/app/(fr)/flotte/layout.tsx`, `tarifs/layout.tsx`, `contact/layout.tsx` | **Nouveau** : accueillent le `metadata` statique (toujours en français) pendant que la page elle-même devient traduisible |
| `src/app/(fr)/flotte/[slug]/VehiclePageView.tsx`, `journal/[slug]/JournalArticleView.tsx` | **Nouveau** : JSX extrait des pages dynamiques pour être réutilisé tel quel par `[locale]/` |
| `package.json` | Version 1.5.0 |

**Portée des traductions**
- Traduit : navigation, pied de page, réservation (3 étapes), devis événement, flotte, fiche véhicule, tarifs, contact, bandeau cookies, bouton WhatsApp flottant.
- Non traduit (reste en français, contenu éditorial) : Journal, pages légales, Services, À propos, FAQ, avis clients, descriptions détaillées des véhicules (`label`/`idealFor` dans `vehicles.ts`), messages envoyés sur WhatsApp.
- Traductions réalisées par IA, **à faire relire par un locuteur natif** avant mise en ligne (voir section 7 du README).

## v1.4 — 3 novembre 2026 : presse mise en avant, vidéos regroupées

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/components/Press.tsx` | `PressBand` repensée : titre de section, chaque marque dans une carte mise en exergue (nom en évidence, titre de l'article, date) |
| `src/app/components.css` | Styles `.press-mention` (carte), `.press-band__media` en grille de cartes |
| `public/images/videos/hero.mp4` | Vidéo du hero déplacée dans `public/images/videos/`, aux côtés des autres vidéos |
| `src/app/page.tsx` | Chemin du hero mis à jour (`/images/videos/hero.mp4`) |
| `src/data/content.ts` | `homeVideos` inclut désormais le hero en plus des 3 clips, tous dans le même dossier |
| `src/components/VideoCarousel.tsx`, `src/app/globals.css` | Carrousel adapté aux orientations mixtes (hero en paysage, clips en portrait) : hauteur fixe, largeur selon le ratio de chaque vidéo |
| `package.json` | Version 1.4.0 |

## v1.3 — 3 novembre 2026 : menu, photos EQS et vidéos fournies

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/data/site.ts` | Ajout de « Accueil » dans le menu desktop (`nav`) |
| `src/components/Header.tsx` | `aria-current` sur « Accueil » limité à la page `/` exacte |
| `public/images/vehicules/` | 9 photos réelles du Mercedes Classe S / EQS, renommées `mercedes-eqs-1.jpg` … `-9.jpg` |
| `src/data/vehicles.ts` | `mercedes-eqs.photos` passé à 9 |
| `public/images/evenements/yacht-show.jpg` | **Nouveau** : photo fournie, renommée et rangée (référencée par `evenements/page.tsx`) |
| `public/images/videos/video-1.mp4`, `-2.mp4`, `-3.mp4` | **Nouveau** : clips verticaux chauffeur/véhicule fournis, renommés et rangés |
| `src/components/VideoCarousel.tsx` | **Nouveau** : carrousel de vidéos verticales (même gabarit que les autres carrousels) |
| `src/data/content.ts` | `homeVideos` : liste des vidéos du carrousel de l'accueil |
| `src/app/page.tsx` | Nouvelle section « Monaco Black Car en vidéo » |
| `src/app/globals.css` | Styles `.carousel--video`, `.video-tile` |
| `package.json` | Version 1.3.0 |

## v1.2 — 3 novembre 2026 : flotte, bagages, parcours, devis et contact

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/data/vehicles.ts` | Renommage « Mercedes Classe S » → « Mercedes Maybach », « Mercedes EQS » → « Mercedes Classe S / EQS », « Range Rover Vogue » → « Range Rover Vogue / LWB » ; suppression de la BMW Série 7 |
| `src/app/tarifs/page.tsx`, `src/app/services/mise-a-disposition/page.tsx` | Mentions « Mercedes Classe S » → « Mercedes Maybach » ; tableau de tarifs recalculé sur les 5 véhicules restants |
| `src/components/ui.tsx` | **Nouveau** : `Modal`, popup générique réutilisable |
| `src/app/reserver/vehicule/page.tsx` | Popup automatique quand les bagages dépassent la capacité du véhicule choisi (véhicule plus grand ou véhicule supplémentaire) ; bouton « Continuer sur WhatsApp » renommé en « Continuer » |
| `src/lib/whatsapp.ts`, `src/lib/booking.ts` | `Booking.extraVehicle` (véhicule supplémentaire demandé) propagé dans l'URL et le message WhatsApp |
| `src/lib/geo.ts` | **Nouveau** : recherche d'adresses et géolocalisation inversée via l'API publique Nominatim/OpenStreetMap, sans clé |
| `src/components/AddressField.tsx` | **Nouveau** : champ d'adresse avec suggestions, bouton « Utiliser ma position » et sélection du terminal pour l'aéroport de Nice |
| `src/components/TripForm.tsx` | Champs Départ/Destination remplacés par `AddressField` |
| `src/lib/query.ts` | `isNiceAirport`, `niceAirportTerminals`, `withNiceTerminal` |
| `src/data/routes.ts` | Raccourci « Aéroport Nice Côte d'Azur » sans terminal pré-rempli |
| `src/components/EventForm.tsx`, `src/lib/whatsapp.ts` | Formulaire de devis : ajout du choix du véhicule, du nombre de passagers et de bagages |
| `src/app/page.tsx`, `src/data/content.ts` | Section « Avis clients » de l'accueil désactivée temporairement (commentée) |
| `src/components/ContactForm.tsx` | **Nouveau** : formulaire de contact relié à l'adresse e-mail de réception (Formspree) |
| `src/app/contact/page.tsx`, `src/components/Footer.tsx` | Remplacement du clic direct sur l'e-mail par le formulaire de contact |
| `src/data/site.ts` | `contactFormEndpoint` (⚠️ provisoire, à remplacer) |
| `package.json` | Version 1.2.0 |

**À confirmer avant mise en ligne**
- Identifiant Formspree réel (`src/data/site.ts` → `contactFormEndpoint`), voir README section 7.
- Nominatim/OpenStreetMap est un service gratuit à usage raisonnable (≈ 1 requête/seconde) : prévoir un fournisseur dédié si le trafic devient important.

## v1.1 — 14 octobre 2026 : section presse « Ils parlent de nous »

**Figma** : voir « Notes de livraison v1.1 » en page 10 (liens directs vers les écrans modifiés, repérés par le badge « ★ Mis à jour — v1.1 » en pages 06 et 07).

**Fichiers modifiés**

| Fichier | Changement |
|---|---|
| `src/components/Press.tsx` | **Nouveau** : `PressCard` (carte d'article externe) et `PressBand` (bande de l'accueil) |
| `src/data/content.ts` | `pressArticles` rempli avec 3 articles (Forbes Afrique, BFM TV, 1 à confirmer) + champ `featured` |
| `src/app/page.tsx` | Ajout de `<PressBand />` juste avant la section Journal |
| `src/app/journal/page.tsx` | Section presse avec titre, ancre `#presse` et `PressCard` |
| `src/app/components.css` | Styles « Presse (v1.1) » ajoutés en fin de fichier |
| `package.json` | Version 1.1.0 |

**Règles**
- Les liens presse s'ouvrent dans un nouvel onglet (`target="_blank" rel="noopener noreferrer"`).
- Résumés écrits par nous, jamais copiés de l'article. Pas de logo de média sans accord : noms en texte.
- Ajouter un article = ajouter une entrée dans `pressArticles`. `featured: true` l'affiche aussi sur l'accueil.

**À confirmer** : le 3e article (lien `share.google`) — média, titre et date.

## v1.0 — 11 octobre 2026

Première livraison : 31 pages, réservation en 3 étapes jusqu'à WhatsApp, devis événement, aucune donnée stockée.
