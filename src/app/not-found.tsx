import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <div className="container stack" style={{ justifyItems: "center", gap: 20 }}>
        <span style={{ fontSize: "clamp(112px, 14vw, 160px)", fontWeight: 300, lineHeight: 1, color: "var(--champagne)" }}>404</span>
        <h1 className="display-l">Cette route ne mène nulle part.</h1>
        <p className="body-l muted" style={{ margin: 0, maxWidth: 560 }}>La page que vous cherchez n'existe plus ou a changé d'adresse. Votre chauffeur, lui, est toujours disponible.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="btn btn--primary">Retour à l'accueil</Link>
          <Link href="/reserver/" className="btn btn--secondary">Réserver un trajet</Link>
        </div>
      </div>
    </section>
  );
}
