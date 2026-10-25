"use client";

import Link from "@/i18n/LocalizedLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mobileNav, nav, site } from "@/data/site";
import { useI18n } from "@/i18n/context";
import { allLocales, locales, localeHref, localeShortNames } from "@/i18n/locales";

/** Libellé traduit d'un lien de nav, par chemin : évite d'étendre le dictionnaire pour chaque entrée. */
function navLabel(t: ReturnType<typeof useI18n>["t"], href: string) {
  switch (href) {
    case "/": return t.nav.home;
    case "/services/": return t.nav.services;
    case "/evenements/": return t.footer.events;
    case "/flotte/": return t.nav.fleet;
    case "/tarifs/": return t.nav.pricing;
    case "/journal/": return t.footer.journal;
    case "/a-propos/": return t.footer.about;
    case "/contact/": return t.nav.contact;
    default: return href;
  }
}

/**
 * Sélecteur de langue : de vrais <a> (pas next/link), pour forcer un rechargement complet.
 * Next.js réutilise parfois le rendu client lors d'une navigation interne entre les routes
 * "(fr)" (sans préfixe) et "[locale]" (préfixées) : le contenu restait alors dans l'ancienne
 * langue tant que la page n'était pas rechargée manuellement. Un vrai lien évite ce problème
 * et conserve aussi les paramètres de la réservation en cours (trajet, véhicule…).
 *
 * Deux variantes : "dropdown" (bouton compact + menu, pour le header desktop) et "inline"
 * (liste à plat, pour le panneau mobile déjà ouvert en plein écran).
 */
function LangSwitcher({ className, variant }: { className: string; variant: "dropdown" | "inline" }) {
  const { locale, t } = useI18n();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  // Lecture directe de window.location (et non useSearchParams, qui exigerait un Suspense et
  // rendrait le sélecteur invisible tant que le JS n'a pas chargé sur ce site 100% statique).
  const [search, setSearch] = useState("");
  useEffect(() => setSearch(window.location.search.replace(/^\?/, "")), [path]);

  useEffect(() => {
    if (variant !== "dropdown" || !open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [variant, open]);

  const basePath = (() => {
    for (const l of locales) {
      if (path === `/${l}` || path.startsWith(`/${l}/`)) return path.slice(`/${l}`.length) || "/";
    }
    return path;
  })();

  const items = allLocales.map((l) => (
    <a
      key={l}
      href={`${localeHref(l, basePath)}${search ? `?${search}` : ""}`}
      aria-current={l === locale ? "page" : undefined}
      className="lang-switcher__item"
      role={variant === "dropdown" ? "menuitem" : undefined}
    >
      {localeShortNames[l]}
    </a>
  ));

  if (variant === "inline") {
    return <div className={className} aria-label={t.languageSwitcher.ariaLabel}>{items}</div>;
  }

  return (
    <div className={className} ref={boxRef}>
      <button
        type="button"
        className="lang-switcher__trigger"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t.languageSwitcher.ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden className="lang-switcher__icon">🌐</span>
        {localeShortNames[locale]}
        <span aria-hidden className="lang-switcher__caret">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="lang-switcher__menu" role="menu" aria-label={t.languageSwitcher.ariaLabel}>
          {items}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  const { t } = useI18n();

  // Nécessaire pour ne faire le portail (document.body) qu'après le montage côté client
  useEffect(() => setMounted(true), []);
  // Ferme le menu à chaque changement de page et bloque le défilement quand il est ouvert
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="header__logo">
          <img src="/images/logo.png" alt={site.name} className="header__logo-img" />
        </Link>

        <nav className="header__nav hide-mobile" aria-label={t.accessibility.mainNavigation}>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={(n.href === "/" ? path === "/" : path.startsWith(n.href)) ? "page" : undefined}>
              {navLabel(t, n.href)}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <a href={site.phoneHref} className="header__phone hide-mobile">{site.phoneDisplay}</a>
          <LangSwitcher className="lang-switcher hide-mobile" variant="dropdown" />
          <Link href="/reserver/" className="btn btn--primary btn--sm">{t.vehicleTile.reserve}</Link>
          <Link href="/evenements/" className="btn btn--primary btn--sm hide-mobile">{t.nav.quote}</Link>
          <button className="header__burger show-mobile" aria-label={t.accessibility.openMenu} aria-expanded={open} onClick={() => setOpen(true)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Portail vers document.body : le header applique un backdrop-filter qui crée un
          containing block pour les descendants en position fixed, ce qui empêchait le
          menu de couvrir tout l'écran sur mobile. */}
      {mounted && open && createPortal(
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={t.accessibility.menu}>
          <div className="mobile-menu__top">
            <Link href="/" className="header__logo">
              <img src="/images/logo.png" alt={site.name} className="header__logo-img" />
            </Link>
            <button className="mobile-menu__close" aria-label={t.accessibility.closeMenu} onClick={() => setOpen(false)}>✕</button>
          </div>
          <nav className="mobile-menu__links">
            {mobileNav.map((n) => (
              <Link key={n.href} href={n.href}>
                {navLabel(t, n.href)}<span aria-hidden>›</span>
              </Link>
            ))}
          </nav>
          <LangSwitcher className="mobile-menu__lang" variant="inline" />
          <div className="mobile-menu__actions">
            <Link href="/reserver/" className="btn btn--primary btn--block">{t.vehicleTile.reserve}</Link>
            <a href={site.phoneHref} className="btn btn--secondary btn--block">{t.common.call} {site.phoneDisplay}</a>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
