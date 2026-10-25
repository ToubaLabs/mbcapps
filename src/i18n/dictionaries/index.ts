import type { Locale } from "../locales";
import type { Dictionary } from "../dictionary";
import fr from "./fr";
import en from "./en";
import it from "./it";
import ru from "./ru";
import { isLocale } from "../locales";

export const dictionaries: Record<Locale, Dictionary> = { fr, en, it, ru };

export function getDictionary(locale = "fr"): Dictionary {
  if (!isLocale(locale)) throw new Error(`Langue non prise en charge : ${locale}`);
  return dictionaries[locale];
}
