// Coordonnées et réglages généraux du site.

export const site = {
  name: "Monaco Black Car",
  tagline: "Chauffeur privé à Monaco et sur la Côte d'Azur",
  phoneDisplay: "+33 6 49 83 14 34",
  phoneHref: "tel:+33649831434",
  // Numéro WhatsApp au format international, sans "+" ni espaces (utilisé par wa.me)
  whatsapp: "33649831434",
  whatsappDisplay: "+33 6 49 83 14 34",
  email: "info@monacoblackcar.mc",
  address: "Monaco, Principauté de Monaco",
  availability: "24h/24, 7j/7, 365 jours par an",
  languages: "Français, anglais, italien",
};

export const nav = [
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
