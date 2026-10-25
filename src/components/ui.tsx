"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  return (
    <div className="counter" role="group" aria-label={label}>
      <span>{label}</span>
      <button type="button" aria-label={`Moins de ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
      <output aria-live="polite">{value}</output>
      <button type="button" aria-label={`Plus de ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
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
  const steps = ["Trajet", "Véhicule", "WhatsApp"];
  return (
    <ol className="progress" aria-label={`Étape ${step} sur 3`}>
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

export function ArticleCard({ slug, category, title }: { slug: string; category: string; title: string }) {
  return (
    <Link href={`/journal/${slug}/`} className="article-card">
      <Media src={`/images/journal/${slug}.jpg`} alt="Photo de l'article" ratio="16/10" />
      <span className="kicker">{category}</span>
      <span className="display-s">{title}</span>
      <span className="label muted">Lire l'article</span>
    </Link>
  );
}
