"use client";

import { useEffect, useState } from "react";

const KEY = "mbc-consent";

/**
 * Bandeau de consentement pour la mesure d'audience anonyme.
 * Le choix est gardé dans le navigateur du visiteur uniquement (localStorage),
 * jamais envoyé à un serveur. Brancher l'outil d'audience seulement si consent === "oui".
 */
export default function CookieBanner() {
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
    <div className="cookie" role="dialog" aria-label="Votre vie privée">
      <div className="display-s">Votre vie privée</div>
      <p className="body-s muted">
        Nous mesurons l'audience du site de façon anonyme pour l'améliorer. Aucune donnée personnelle n'est collectée ni enregistrée.
      </p>
      <div className="cookie__actions">
        <button className="btn btn--primary btn--sm" onClick={() => choose("oui")}>Accepter</button>
        <button className="btn btn--secondary btn--sm" onClick={() => choose("non")}>Refuser</button>
      </div>
    </div>
  );
}
