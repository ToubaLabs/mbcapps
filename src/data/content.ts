// Contenus éditoriaux : FAQ, témoignages, articles du Journal.

export const faq = {
  Réservation: [
    {
      q: "Combien de temps à l'avance faut-il réserver ?",
      a: "Au moins 2 heures avant. Pour le Grand Prix et le Monaco Yacht Show, réservez plusieurs semaines à l'avance.",
    },
    {
      q: "Faut-il créer un compte ?",
      a: "Non. Vous choisissez votre trajet et votre véhicule sur le site, puis la réservation se finalise sur WhatsApp. Aucune donnée n'est enregistrée sur le site.",
    },
    {
      q: "Puis-je réserver pour quelqu'un d'autre ?",
      a: "Oui. Indiquez simplement le nom du passager dans la conversation WhatsApp.",
    },
  ],
  "Prix et paiement": [
    {
      q: "Les péages et l'attente sont-ils compris ?",
      a: "Oui. Les péages et 60 minutes d'attente à l'aéroport sont inclus dans tous nos prix fixes.",
    },
    {
      q: "Comment se passe le paiement ?",
      a: "Au chauffeur, ou par un lien de paiement sécurisé envoyé par votre conseiller dans la conversation.",
    },
    { q: "Y a-t-il un supplément de nuit ?", a: "Oui, +20 % entre 22 h et 6 h." },
  ],
  "Aéroport et vols": [
    {
      q: "Mon vol a du retard, que se passe-t-il ?",
      a: "Nous suivons votre vol : le chauffeur adapte son heure d'arrivée, sans frais supplémentaires.",
    },
    { q: "Où m'attend le chauffeur ?", a: "En salle d'arrivée du terminal, avec une pancarte à votre nom." },
  ],
  Annulation: [
    {
      q: "Puis-je annuler ma réservation ?",
      a: "Oui, gratuitement jusqu'à 24 heures avant la prise en charge. Écrivez simplement dans la conversation WhatsApp.",
    },
  ],
};

export const testimonials = [
  {
    quote: "« Arrivé avec deux heures de retard, mon chauffeur était là, pancarte à la main. »",
    name: "Thomas R.",
    context: "Transfert Nice → Monaco",
  },
  {
    quote: "« Trois voitures pour notre mariage, tout était parfaitement coordonné. »",
    name: "Clara et Hugo",
    context: "Mariage, Monte-Carlo",
  },
  {
    quote: "« Réservé en une minute depuis mon téléphone, le prix était exactement celui affiché. »",
    name: "Marco B.",
    context: "Mise à disposition",
  },
];

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  body: { type: "p" | "h" | "quote"; text: string }[];
};

export const articles: Article[] = [
  {
    slug: "grand-prix-monaco-circuler",
    category: "Guides",
    title: "Grand Prix de Monaco : comment circuler pendant la course",
    excerpt:
      "Routes fermées, horaires, points de dépose autorisés : notre guide pour arriver à l'heure sans stress.",
    readTime: "6 min",
    body: [
      {
        type: "p",
        text: "Pendant le Grand Prix, une partie des rues de la Principauté devient circuit. Les trajets habituels changent, les accès sont filtrés et la circulation est très dense aux heures des séances.",
      },
      { type: "h", text: "Réservez tôt" },
      {
        type: "p",
        text: "Les chauffeurs sont pris d'assaut plusieurs semaines à l'avance. Fixez vos trajets dès que vos horaires sont connus, notamment le retour en fin de journée.",
      },
      { type: "h", text: "Prévoyez de la marge" },
      {
        type: "p",
        text: "Comptez nettement plus de temps qu'à l'ordinaire, surtout entre l'aéroport de Nice et Monaco les jours de course.",
      },
      {
        type: "quote",
        text: "« Le plus simple : un chauffeur à disposition pour la journée, qui vous dépose et vous récupère au plus près. »",
      },
      { type: "h", text: "Les points de dépose" },
      {
        type: "p",
        text: "Votre chauffeur connaît les accès autorisés et vous dépose au plus près de votre tribune, de votre hôtel ou de votre yacht.",
      },
    ],
  },
  {
    slug: "aeroport-nice-monaco-options",
    category: "Aéroport",
    title: "De l'aéroport de Nice à Monaco : toutes les options comparées",
    excerpt: "Bus, train, hélicoptère ou chauffeur : durée, prix et confort de chaque solution.",
    readTime: "5 min",
    body: [
      {
        type: "p",
        text: "L'aéroport Nice Côte d'Azur est à une trentaine de kilomètres de Monaco. Plusieurs solutions existent, chacune avec ses avantages.",
      },
      { type: "h", text: "Le chauffeur privé" },
      {
        type: "p",
        text: "Prise en charge en salle d'arrivée, bagages portés, trajet direct jusqu'à votre hôtel par la Basse Corniche ou l'autoroute selon la circulation.",
      },
    ],
  },
  {
    slug: "adresses-monte-carlo-diner",
    category: "Adresses",
    title: "Nos adresses préférées de Monte-Carlo pour un dîner",
    excerpt: "Tables étoilées, terrasses avec vue et adresses plus discrètes : la sélection de nos chauffeurs.",
    readTime: "4 min",
    body: [
      {
        type: "p",
        text: "Nos chauffeurs déposent chaque soir des clients dans les meilleures tables de la Principauté. Voici celles qu'ils recommandent le plus souvent.",
      },
    ],
  },
  {
    slug: "eze-cap-ferrat-chauffeur",
    category: "Guides",
    title: "Une journée à Èze et Saint-Jean-Cap-Ferrat avec chauffeur",
    excerpt: "Village perché, jardin exotique et villas de la Riviera, sans chercher où se garer.",
    readTime: "5 min",
    body: [{ type: "p", text: "Un itinéraire d'une demi-journée, idéal en mise à disposition." }],
  },
  {
    slug: "monaco-yacht-show-navettes",
    category: "Événements",
    title: "Monaco Yacht Show : organiser les navettes de vos invités",
    excerpt: "Port Hercule, hôtels, aéroport : comment coordonner plusieurs véhicules sans stress.",
    readTime: "4 min",
    body: [{ type: "p", text: "Pendant le salon, les abords du port sont très fréquentés. Voici comment s'organiser." }],
  },
  {
    slug: "heliport-monaco",
    category: "Aéroport",
    title: "Héliport de Monaco : comment ça marche ?",
    excerpt: "7 minutes depuis Nice : horaires, bagages et transfert jusqu'à votre hôtel.",
    readTime: "3 min",
    body: [{ type: "p", text: "L'héliport de Fontvieille relie Nice à Monaco en quelques minutes." }],
  },
];

/**
 * Articles publiés par d'autres sites : on affiche une carte qui renvoie vers l'article d'origine
 * (nouvel onglet). Le résumé est écrit par nous, jamais copié depuis l'article.
 * featured = affiché dans la bande « Ils parlent de nous » de l'accueil.
 */
export const pressArticles: { media: string; title: string; date: string; summary: string; url: string; featured?: boolean }[] = [
  {
    media: "Forbes Afrique",
    title: "Mbaye Mangara : la réussite d'un entrepreneur sénégalais à Monaco",
    date: "2024-12-14",
    summary: "Le parcours du fondateur de Monaco Black Car, de sa première voiture en 2012 à une flotte de douze véhicules.",
    url: "https://forbesafrique.com/mbaye-mangara-la-reussite-dun-entrepreneur-senegalais-a-monaco/",
    featured: true,
  },
  {
    media: "BFM TV",
    title: "Monaco Black Cars, le spécialiste du transport haut de gamme avec chauffeurs",
    date: "2025-02-24",
    summary: "Monaco Black Cars présenté dans la rubrique « Entreprises d'avenir ».",
    url: "https://www.bfmtv.com/pratique/entreprises-d-avenir/monaco-black-cars-le-specialiste-du-transport-haut-de-gamme-avec-chauffeurs_AB-202502240019.html",
    featured: true,
  },
  {
    // ⚠️ À CONFIRMER : média, titre et date du lien transmis par le client
    media: "Média à confirmer",
    title: "Titre de l'article à confirmer",
    date: "",
    summary: "Article à compléter : lien transmis par le client.",
    url: "https://share.google/TDTkADIAcII0FouVg",
  },
];
