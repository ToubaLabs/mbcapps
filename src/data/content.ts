// Contenus éditoriaux : FAQ, témoignages, articles du Journal.

/** Clips du carrousel vidéo du hero (fond défilant), tous dans public/images/videos/. */
export const homeVideos = [
  { src: "/images/videos/hero.mp4", caption: "Prise en charge à la villa" },
  { src: "/images/videos/video-1.mp4", caption: "Confort à bord" },
  { src: "/images/videos/video-2.mp4", caption: "Un véhicule d'exception" },
  { src: "/images/videos/video-3.mp4", caption: "Arrivée à Monte-Carlo" },
];

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
      a: "Les péages sont inclus dans tous nos prix fixes. 15 minutes d'attente sont offertes ; au-delà, une heure d'attente est facturée au tarif horaire du véhicule.",
    },
    {
      q: "Comment se passe le paiement ?",
      a: "Au chauffeur, ou par un lien de paiement sécurisé envoyé par votre conseiller dans la conversation.",
    },
    { q: "Y a-t-il un supplément de nuit ?", a: "Non, nous ne pratiquons pas de tarif de nuit." },
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

// ⚠️ Section « Avis clients » de l'accueil désactivée temporairement (commentée dans src/app/page.tsx).
// Les données restent ici, prêtes à être réaffichées sur la fiche véhicule et ailleurs.
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
  image?: {
    alt: string;
    author: string;
    source: string;
    license: string;
    licenseUrl: string;
  };
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
    image: {
      alt: "Épingle du Fairmont sur le circuit du Grand Prix de Monaco",
      author: "Alexander Migl",
      source: "https://commons.wikimedia.org/wiki/File:Fairmont_Hairpin_Monaco_IMG_1012.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
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
    image: {
      alt: "Vue aérienne de l'aéroport Nice Côte d'Azur et du littoral",
      author: "Olivier Cleynen",
      source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Nice-C%C3%B4te_d%E2%80%99Azur_Airport.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
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
    image: {
      alt: "Façade du Casino de Monte-Carlo à Monaco",
      author: "Miguel Mendez",
      source: "https://commons.wikimedia.org/wiki/File:Monte_Carlo_Casino_(46940444965).jpg",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
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
    image: {
      alt: "Le village perché d'Èze dominant la Méditerranée",
      author: "Gilbert Bochenek",
      source: "https://commons.wikimedia.org/wiki/File:Eze-Village-PACA-France.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
    body: [{ type: "p", text: "Un itinéraire d'une demi-journée, idéal en mise à disposition." }],
  },
  {
    slug: "monaco-yacht-show-navettes",
    category: "Événements",
    title: "Monaco Yacht Show : organiser les navettes de vos invités",
    excerpt: "Port Hercule, hôtels, aéroport : comment coordonner plusieurs véhicules sans stress.",
    readTime: "4 min",
    image: {
      alt: "Superyachts amarrés au Port Hercule pendant le Monaco Yacht Show",
      author: "102Legobrick",
      source: "https://commons.wikimedia.org/wiki/File:MYS_2022_2.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    body: [{ type: "p", text: "Pendant le salon, les abords du port sont très fréquentés. Voici comment s'organiser." }],
  },
  {
    slug: "heliport-monaco",
    category: "Aéroport",
    title: "Héliport de Monaco : comment ça marche ?",
    excerpt: "7 minutes depuis Nice : horaires, bagages et transfert jusqu'à votre hôtel.",
    readTime: "3 min",
    image: {
      alt: "Hélicoptères Heli Air Monaco sur le tarmac de l'héliport de Monaco",
      author: "Arnaud 25",
      source: "https://commons.wikimedia.org/wiki/File:Heliport_Monaco_3.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
    body: [{ type: "p", text: "L'héliport de Fontvieille relie Nice à Monaco en quelques minutes." }],
  },
];

export const serviceImages: { src: string; credit?: Article["image"] }[] = [
  { src: "/images/journal/aeroport-nice-monaco-options.jpg", credit: articles[1].image },
  { src: "/images/journal/grand-prix-monaco-circuler.jpg", credit: articles[0].image },
  { src: "/images/vehicules/mercedes-classe-s-berline-1.jpg" },
];

/**
 * Articles publiés par d'autres sites : on affiche une carte qui renvoie vers l'article d'origine
 * (nouvel onglet). Le résumé est écrit par nous, jamais copié depuis l'article.
 * featured = affiché dans la bande « Ils parlent de nous » de l'accueil.
 * logo = fichier dans /public/images/presse/ (logo officiel du média). Si absent, le nom en texte s'affiche à la place.
 */
export const pressArticles: { media: string; title: string; date: string; summary: string; url: string; featured?: boolean; logo?: string }[] = [
  {
    media: "Forbes Afrique",
    title: "Mbaye Mangara : la réussite d'un entrepreneur sénégalais à Monaco",
    date: "2024-12-14",
    summary: "Le parcours du fondateur de Monaco Black Car, de sa première voiture en 2012 à une flotte de douze véhicules.",
    url: "https://forbesafrique.com/mbaye-mangara-la-reussite-dun-entrepreneur-senegalais-a-monaco/",
    featured: true,
    logo: "/images/presse/forbes-afrique.png",
  },
  {
    media: "BFM TV",
    title: "Monaco Black Cars, le spécialiste du transport haut de gamme avec chauffeurs",
    date: "2025-02-24",
    summary: "Monaco Black Cars présenté dans la rubrique « Entreprises d'avenir ».",
    url: "https://www.bfmtv.com/pratique/entreprises-d-avenir/monaco-black-cars-le-specialiste-du-transport-haut-de-gamme-avec-chauffeurs_AB-202502240019.html",
    featured: true,
    logo: "/images/presse/bfm-tv.svg",
  },
  {
    media: "Virtually.mc",
    title: "Service de transfert de luxe – Monaco Black Car – Monaco",
    date: "",
    summary: "Monaco Black Car présenté dans l'annuaire des adresses de prestige de Monaco : flotte variée (Mercedes Classe S, Maybach Classe S, Tesla Model Y, Classe V…), disponibilité 24h/24 7j/7 et mise à disposition.",
    url: "https://www.virtually.mc/fr/luxury-transfer-service-monaco-black-car-monaco/",
    featured: true,
    logo: "/images/presse/virtually-mc.svg",
  },
];

/**
 * Partenaires affichés sur l'accueil (bande « Nos partenaires »).
 * logo = fichier dans /public/images/partenaires/. Si absent, le nom en texte s'affiche à la place.
 */
export const partners: { name: string; tagline?: string; logo?: string; lightLogoBackground?: boolean }[] = [
  {
    name: "FindIt",
    tagline: "Monaco's Solutions",
    logo: "/images/partenaires/findit.jpg",
  },
  {
    name: "Fairmont Monte-Carlo",
    // Public domain: https://commons.wikimedia.org/wiki/File:Fairmont_Logo_2016.png
    logo: "/images/partenaires/fairmont.png",
    lightLogoBackground: true,
  },
  { name: "Métropole Monte-Carlo", logo: "/images/partenaires/metropole.svg", lightLogoBackground: true },
  { name: "Hôtel Miramar", logo: "/images/partenaires/miramar.svg" },
  { name: "Groupe Pastor", logo: "/images/partenaires/groupe-pastor.png", lightLogoBackground: true },
];
