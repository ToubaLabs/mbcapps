import Link from "next/link";
import { pressArticles } from "@/data/content";

const fmt = (iso: string) =>
  iso ? new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "";

/** Carte d'un article publié par un autre site. Composant Figma « Press Card ». */
export function PressCard({ media, title, date, summary, url }: (typeof pressArticles)[number]) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="card card--pad stack press-card">
      <span className="press-card__top">
        <span className="kicker">{media}</span>
        {date && <time className="caption muted" dateTime={date}>{fmt(date)}</time>}
      </span>
      <span className="display-s">{title}</span>
      <span className="body-s muted">{summary}</span>
      <span className="link">Lire l'article<span className="sr-only"> (nouvel onglet)</span></span>
    </a>
  );
}

/** Bande « Ils parlent de nous » de l'accueil : noms des médias (pas de logos sans accord). */
export function PressBand() {
  const featured = pressArticles.filter((p) => p.featured);
  if (!featured.length) return null;
  return (
    <section className="press-band">
      <div className="container press-band__inner">
        <span className="label muted">Ils parlent de nous</span>
        <div className="press-band__media">
          {featured.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer">{p.media}</a>
          ))}
        </div>
        <Link href="/journal/#presse" className="link">Lire les articles</Link>
      </div>
    </section>
  );
}
