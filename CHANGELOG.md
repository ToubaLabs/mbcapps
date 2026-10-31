# Journal des versions

Chaque version liste uniquement ce qui a changé. Le reste du projet est identique à la version précédente.

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
