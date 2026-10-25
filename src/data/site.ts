// Coordonnées et réglages généraux du site.

export const site = {
  name: "Monaco Black Car",
  businessName: "MBC MONACO BLACK CAR",
  url: "https://monacoblackcar.mc",
  googleBusinessUrl: "https://share.google/iU2Au8f649c0H5mSH",
  phoneDisplay: "+33 6 49 83 14 34",
  phoneHref: "tel:+33649831434",
  // Numéro WhatsApp au format international, sans "+" ni espaces (utilisé par wa.me)
  whatsapp: "33649831434",
  whatsappDisplay: "+33 6 49 83 14 34",
  email: "info@monacoblackcar.mc",
  address: "Résidence Auteuil, 2 Boulevard du Ténao, 98000 Monaco",
  postalAddress: {
    streetAddress: "Résidence Auteuil, 2 Boulevard du Ténao",
    postalCode: "98000",
    addressLocality: "Monaco",
    addressCountry: "MC",
  },
  geo: { latitude: 43.7488133, longitude: 7.4315619 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=43.7488133%2C7.4315619",
  socialLinks: [
    { name: "Instagram", url: "https://www.instagram.com/monacoblackcars/" },
    { name: "Facebook", url: "https://www.facebook.com/p/Monaco-Black-car-61551831645740/" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/monaco-black-car/" },
  ],
  languages: "Français, anglais, italien",
  // Adresse de réception et validation à gérer dans le tableau de bord Formspree.
  contactFormEndpoint: "https://formspree.io/f/xkjjpdva",
};

export const nav = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Flotte", href: "/flotte/" },
  { label: "Tarifs", href: "/tarifs/" },
  { label: "Contact", href: "/contact/" },
];

export const mobileNav = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Événements", href: "/evenements/" },
  { label: "Flotte", href: "/flotte/" },
  { label: "Tarifs", href: "/tarifs/" },
  { label: "Journal", href: "/journal/" },
  { label: "À propos", href: "/a-propos/" },
  { label: "Contact", href: "/contact/" },
];

/**
 * Version de couleurs : "claire" (sections crème en alternance) ou "sombre" (tout en sombre).
 * Les deux versions existent dans Figma (pages 09 et 11), le client choisit.
 */
export const THEME: "claire" | "sombre" = "claire";
