# Monaco Black Car — site React (Next.js)

Version **1.0** du site, construite à partir des maquettes Figma « Monaco Black Car — Website Redesign » (pages 06, 07, 08 et 10).

- **React 19 + Next.js 16 (App Router) + TypeScript**
- **Site 100 % statique** : aucune base de données, aucun serveur, aucune donnée enregistrée.
- La réservation et les devis se **finalisent sur WhatsApp** via un lien `wa.me` avec message pré-rempli.

---

## 1. Lancer le projet

Prérequis : **Node.js 20 ou plus récent**.

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

## 3. Structure

```
src/
  app/                      Pages (une URL = un dossier)
    page.tsx                Accueil
    reserver/               Étape 1 : trajet
    reserver/vehicule/      Étape 2 : choix du véhicule et prix
    reserver/whatsapp/      Étape 3 : message pré-rempli, QR code, bouton WhatsApp
    services/               Services (+ transferts-aeroport, mise-a-disposition)
    evenements/             Page Événements + demande de devis vers WhatsApp
    flotte/                 Liste avec filtres, tri et état vide
    flotte/[slug]/          Fiche véhicule (galerie, tarifs, avis)
    tarifs/  faq/  journal/  journal/[slug]/  a-propos/  contact/
    mentions-legales/  cgv/  confidentialite/  not-found.tsx (page 404)
    globals.css             Tokens (couleurs, rayons, typo) = variables Figma « MBC Tokens »
    components.css          Styles des composants
  components/               Composants (mêmes noms que dans Figma, page 08)
  data/                     ⚠️ Tous les contenus modifiables sont ici
  lib/whatsapp.ts           Construction des liens et messages WhatsApp
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
| **Version de couleurs** (`"claire"` ou `"sombre"`) | `src/data/site.ts` → `THEME` |
| Véhicules, capacités, prix de référence | `src/data/vehicles.ts` |
| Trajets, formules de mise à disposition, suppléments | `src/data/routes.ts` |
| FAQ, avis clients, articles du Journal, articles de presse | `src/data/content.ts` |

## 5. Images à fournir

Déposer les fichiers dans `public/images/` avec ces noms. Tant qu'une image manque, un cadre neutre s'affiche.

```
public/images/hero.mp4 et hero.jpg              Vidéo / image de fond de l'accueil
public/images/partage.jpg                        Image d'aperçu des liens (1200 × 630)
public/images/vehicules/<slug>-1.jpg … -5.jpg    5 photos par véhicule (slug dans vehicles.ts)
public/images/services/transferts.jpg, evenements.jpg, mise-a-disposition.jpg
public/images/evenements/grand-prix.jpg, yacht-show.jpg, galas.jpg, mariages.jpg
public/images/journal/<slug-article>.jpg
public/images/chauffeurs/marc.jpg, sofia.jpg, karim.jpg, luca.jpg
public/images/a-propos.jpg
public/favicon.svg                               À remplacer par le logo
```

Formats conseillés : JPG ou WebP, 2400 px de large maximum pour les grandes images.

## 6. Règles fonctionnelles

- **Aucune donnée stockée** : pas de compte, pas d'envoi de formulaire. Le trajet passe d'une étape à l'autre dans l'URL.
- **Lien WhatsApp** : `https://wa.me/<numéro>?text=<message encodé>` (voir `lib/whatsapp.ts`).
- **Prix** : calculés dans le navigateur à partir de `data/` (fonction `priceFor` dans `reserver/vehicule/page.tsx`). **À remplacer par la vraie grille du client.**
- **Date et heure** : au moins 2 h à l'avance, créneaux de 15 minutes, jours passés désactivés.
- **Validation** : message sous le champ concerné, focus sur le premier champ en erreur, bouton toujours actif.
- **Véhicules** : ceux qui sont trop petits pour le nombre de passagers ou de bagages sont désactivés.
- **Cookies** : le choix est gardé dans le navigateur du visiteur (`localStorage`, clé `mbc-consent`). Brancher un outil d'audience anonyme seulement si la valeur est `"oui"`.
- **Accessibilité** : navigation au clavier, focus visible champagne, `prefers-reduced-motion` respecté.

## 7. ⚠️ Éléments provisoires (à remplacer avant la mise en ligne)

- Numéro WhatsApp **+377 67 23 76 08** : à confirmer par le client.
- Tous les **prix**, distances et durées des trajets.
- **Photos**, vidéo du hero, logo et favicon.
- **Textes légaux** (mentions, CGV, confidentialité) : seulement un plan.
- **Version anglaise** : non incluse (prévoir `next-intl` le moment venu).
- Adresse du site dans `src/app/layout.tsx` (`metadataBase`) si le domaine change.
