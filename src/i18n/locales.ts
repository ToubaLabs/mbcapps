/**
 * Langues du site. Le français est la langue par défaut, servie sans préfixe
 * d'URL (/flotte/). Les autres langues sont préfixées (/en/flotte/, /it/flotte/,
 * /ru/flotte/) via le segment dynamique src/app/[locale]/.
 *
 * Portée des traductions : l'interface et les parcours clés (navigation, réservation,
 * devis, événements, FAQ, flotte, tarifs, contact, services, À propos et Journal) sont traduits.
 * Les pages légales restent en français pour l'instant. Les messages envoyés sur WhatsApp restent
 * aussi en français, quelle que soit la langue du site, car l'équipe qui les reçoit
 * communique en français.
 */

export const defaultLocale = "fr" as const;

/** Langues disponibles avec un préfixe d'URL dédié (le français n'en a pas). */
export const locales = ["en", "it", "ru"] as const;
export type PrefixedLocale = (typeof locales)[number];

export type Locale = typeof defaultLocale | PrefixedLocale;

export const allLocales: Locale[] = [defaultLocale, ...locales];

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  it: "Italiano",
  ru: "Русский",
};

/** Code court affiché dans le sélecteur de langue. */
export const localeShortNames: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  it: "IT",
  ru: "RU",
};

/** Code BCP 47 utilisé pour le formatage des dates (Intl/toLocaleDateString). */
export const localeTag: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  it: "it-IT",
  ru: "ru-RU",
};

/**
 * Date lisible dans la langue courante de l'interface (recaps, résumé de trajet…).
 * À distinguer de lib/whatsapp.ts → formatDate(), qui reste toujours en français :
 * le message final est lu par un conseiller qui communique en français.
 */
export function formatDateLocale(iso: string, locale: Locale, opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }) {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString(localeTag[locale], opts);
}

export function isLocale(value: string): value is Locale {
  return (allLocales as string[]).includes(value);
}

/** Préfixe une URL interne (commençant par "/") avec la langue, sauf pour le français. */
export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href; // liens externes (mailto:, tel:, http…) inchangés
  if (locale === defaultLocale) return href;
  return `/${locale}${href}`;
}
