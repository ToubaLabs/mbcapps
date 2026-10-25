"use client";

import { createContext, useContext, useEffect } from "react";
import type { Dictionary } from "./dictionary";
import type { Locale } from "./locales";

const LocaleContext = createContext<{ locale: Locale; t: Dictionary } | null>(null);

/**
 * Fournit la langue courante et son dictionnaire de traduction à tout l'arbre.
 * Le layout racine fournit "fr" par défaut ; src/app/[locale]/layout.tsx fournit
 * une valeur qui écrase ce défaut pour les pages sous /en/, /it/, /ru/.
 */
export function LocaleProvider({ locale, dict, children }: { locale: Locale; dict: Dictionary; children: React.ReactNode }) {
  // Synchronise <html lang="…"> côté client : le layout racine (seul à définir <html>)
  // ne connaît pas la langue des segments [locale] imbriqués.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, t: dict }}>{children}</LocaleContext.Provider>;
}

/** Langue courante et dictionnaire de traduction (chaînes de l'interface, voir src/i18n/dictionary.ts). */
export function useI18n() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useI18n() doit être utilisé sous <LocaleProvider>.");
  return ctx;
}
