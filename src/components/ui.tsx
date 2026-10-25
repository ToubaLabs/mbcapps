"use client";

import Link from "@/i18n/LocalizedLink";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/i18n/context";
import type { Article } from "@/data/content";
import { localizeArticle } from "@/data/articles-i18n";

/** Popup générique (même gabarit visuel que le sélecteur date/heure), monté via portail. */
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return createPortal(
    <div className="picker-backdrop" onClick={onClose}>
      <div className="picker" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

/** Image avec repli : si le fichier n'existe pas encore, un cadre neutre s'affiche. */
export function Media({ src, alt, ratio = "16/10", className = "" }: { src?: string; alt: string; ratio?: string; className?: string }) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);
  // L'image peut échouer avant que React ne soit prêt : on vérifie aussi au montage.
  useEffect(() => { const i = ref.current; if (i && i.complete && i.naturalWidth === 0) setFailed(true); }, [src]);
  return (
    <div className={`media ${failed ? "media--empty" : ""} ${className}`} style={{ aspectRatio: ratio }} data-label={alt}>
      {!failed && <img ref={ref} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
}

export function Counter({ label, value, onChange, min = 0, max = 12 }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  const { t } = useI18n();
  return (
    <div className="counter" role="group" aria-label={label}>
      <span>{label}</span>
      <button type="button" aria-label={`${t.accessibility.decrease} : ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
      <output aria-live="polite">{value}</output>
      <button type="button" aria-label={`${t.accessibility.increase} : ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}

export function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className={`field ${error ? "field--error" : ""}`}>
      <label>{label}</label>
      {children}
      {error && <span className="field-error" role="alert">{error}</span>}
    </div>
  );
}

export function Progress({ step }: { step: 1 | 2 | 3 }) {
  const { t } = useI18n();
  const steps = [t.common.trip, t.step2.vehicle, "WhatsApp"];
  return (
    <ol className="progress" aria-label={t.accessibility.step.replace("{step}", String(step))}>
      {steps.map((s, i) => (
        <li key={s} className={i < step ? "is-done" : ""} aria-current={i + 1 === step ? "step" : undefined}>
          <span className="progress__bar" />
          <span className="progress__label">{i + 1}. {s}</span>
        </li>
      ))}
    </ol>
  );
}

export function FaqItem({ q, a, open = false }: { q: string; a: string; open?: boolean }) {
  return (
    <details className="faq-item" open={open}>
      <summary>{q}<span aria-hidden className="faq-item__sign" /></summary>
      <p>{a}</p>
    </details>
  );
}

export function PageHead({ crumb, title, children }: { crumb: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="page-head">
      <div className="container">
        <div className="crumb">{crumb}</div>
        <h1 className="display-l">{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </section>
  );
}

export function Testimonial({ quote, name, context }: { quote: string; name: string; context: string }) {
  return (
    <figure className="card card--pad testimonial">
      <blockquote>{quote}</blockquote>
      <figcaption>
        <span className="testimonial__avatar" aria-hidden />
        <span><span className="label">{name}</span><br /><span className="caption muted">{context}</span></span>
      </figcaption>
    </figure>
  );
}

export function ArticleImage({ slug, image, ratio = "16/10", linkedCredit = false }: Pick<Article, "slug" | "image"> & { ratio?: string; linkedCredit?: boolean }) {
  const { t } = useI18n();
  return (
    <figure style={{ margin: 0 }}>
      <Media src={`/images/journal/${slug}.jpg`} alt={image?.alt ?? t.journal.imageFallback} ratio={ratio} />
      {image && (
        <figcaption className="caption muted" style={{ marginTop: 8 }}>
          © {linkedCredit ? <a href={image.source} target="_blank" rel="noopener noreferrer">{image.author}</a> : image.author}
          {" · "}
          {linkedCredit ? <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer">{image.license}</a> : image.license}
          {" · "}{t.journal.imageChanges}
        </figcaption>
      )}
    </figure>
  );
}

export function ArticleCard(article: Article) {
  const { locale, t } = useI18n();
  const { slug, category, title, image } = localizeArticle(article, locale);
  return (
    <Link href={`/journal/${slug}/`} className="article-card">
      <ArticleImage slug={slug} image={image} />
      <span className="kicker">{category}</span>
      <span className="display-s">{title}</span>
      <span className="label muted">{t.journal.readArticle}</span>
    </Link>
  );
}
