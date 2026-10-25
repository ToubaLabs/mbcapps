"use client";

import { useState } from "react";
import Link from "@/i18n/LocalizedLink";
import { pressArticles } from "@/data/content";
import { localizePressArticle } from "@/data/articles-i18n";
import { useI18n } from "@/i18n/context";
import { localeTag, type Locale } from "@/i18n/locales";

const fmt = (iso: string, locale: Locale) =>
  iso ? new Date(iso + "T12:00:00").toLocaleDateString(localeTag[locale], { day: "numeric", month: "short", year: "numeric" }) : "";

/** Logo d'un média, avec repli sur son nom en texte tant que le fichier n'est pas fourni. */
function PressLogo({ media, logo, className }: { media: string; logo?: string; className?: string }) {
  const [failed, setFailed] = useState(!logo);
  if (failed) return <span className={className}>{media}</span>;
  return <img src={logo} alt={media} className={`${className}__img`} loading="lazy" onError={() => setFailed(true)} />;
}

/** Carte d'un article publié par un autre site. Composant Figma « Press Card ». */
export function PressCard(article: (typeof pressArticles)[number]) {
  const { locale, t } = useI18n();
  const { media, title, date, summary, url, logo } = localizePressArticle(article, locale);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="card card--pad stack press-card">
      <span className="press-card__top">
        <PressLogo media={media} logo={logo} className="press-card__logo" />
        {date && <time className="caption muted" dateTime={date}>{fmt(date, locale)}</time>}
      </span>
      <span className="display-s">{title}</span>
      <span className="body-s muted">{summary}</span>
      <span className="link">{t.journal.readArticle}<span className="sr-only"> ({t.journal.newTab})</span></span>
    </a>
  );
}

/** Bande « Ils parlent de nous » de l'accueil : logo du média (nom en texte tant qu'il manque). */
export function PressBand() {
  const { locale, t } = useI18n();
  const featured = pressArticles.filter((p) => p.featured).map((p) => localizePressArticle(p, locale));
  if (!featured.length) return null;
  return (
    <section className="section press-band">
      <div className="container">
        <div className="section-head" style={{ textAlign: "center", justifyItems: "center", margin: "0 auto 40px" }}>
          <span className="kicker">{t.press.kicker}</span>
          <h2 className="display-l">{t.press.title}</h2>
        </div>
        <div className="press-band__media">
          {featured.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className="press-mention">
              <PressLogo media={p.media} logo={p.logo} className="press-mention__media" />
              <span className="press-mention__title">{p.title}</span>
              {p.date && <time className="caption muted" dateTime={p.date}>{fmt(p.date, locale)}</time>}
            </a>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/journal/#presse" className="link">{t.press.readArticles}</Link>
        </div>
      </div>
    </section>
  );
}
