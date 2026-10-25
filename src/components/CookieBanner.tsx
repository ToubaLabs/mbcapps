"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/context";

const KEY = "mbc-consent";

/**
 * Bandeau de consentement pour la mesure d'audience anonyme.
 * Le choix est gardé dans le navigateur du visiteur uniquement (localStorage),
 * jamais envoyé à un serveur. Brancher l'outil d'audience seulement si consent === "oui".
 */
export default function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(KEY); } catch { /* navigation privée : on affiche quand même */ }
    if (!stored) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (v: "oui" | "non") => {
    try { localStorage.setItem(KEY, v); } catch { /* ignore */ }
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-label={t.cookie.ariaLabel}>
      <div className="display-s">{t.cookie.title}</div>
      <p className="body-s muted">{t.cookie.text}</p>
      <div className="cookie__actions">
        <button className="btn btn--primary btn--sm" onClick={() => choose("oui")}>{t.cookie.accept}</button>
        <button className="btn btn--secondary btn--sm" onClick={() => choose("non")}>{t.cookie.refuse}</button>
      </div>
    </div>
  );
}
