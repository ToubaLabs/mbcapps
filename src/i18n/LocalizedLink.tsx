"use client";

import NextLink, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { useI18n } from "./context";
import { localeHref } from "./locales";

type Props = Omit<LinkProps, "href"> & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Remplace next/link pour les liens internes : préfixe automatiquement l'URL avec
 * la langue courante (sauf français, sans préfixe). Les liens externes (mailto:,
 * tel:, http…) passent inchangés.
 */
export default function Link({ href, ...props }: Props) {
  const { locale } = useI18n();
  return <NextLink href={localeHref(locale, href)} {...props} />;
}
