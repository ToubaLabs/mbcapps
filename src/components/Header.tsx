"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { mobileNav, nav, site } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const path = usePathname();

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
        <Link href="/" className="header__logo">{site.name}</Link>

        <nav className="header__nav hide-mobile" aria-label="Navigation principale">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <a href={site.phoneHref} className="header__phone hide-mobile">{site.phoneDisplay}</a>
          <Link href="/reserver/" className="btn btn--primary btn--sm">Réserver</Link>
          <Link href="/evenements/" className="btn btn--primary btn--sm hide-mobile">Devis</Link>
          <button className="header__burger show-mobile" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Portail vers document.body : le header applique un backdrop-filter qui crée un
          containing block pour les descendants en position fixed, ce qui empêchait le
          menu de couvrir tout l'écran sur mobile. */}
      {mounted && open && createPortal(
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-menu__top">
            <Link href="/" className="header__logo">{site.name}</Link>
            <button className="mobile-menu__close" aria-label="Fermer le menu" onClick={() => setOpen(false)}>✕</button>
          </div>
          <nav className="mobile-menu__links">
            {mobileNav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}<span aria-hidden>›</span>
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__actions">
            <Link href="/reserver/" className="btn btn--primary btn--block">Réserver un trajet</Link>
            <a href={site.phoneHref} className="btn btn--secondary btn--block">Appeler le {site.phoneDisplay}</a>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
