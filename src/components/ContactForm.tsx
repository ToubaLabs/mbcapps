"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { useI18n } from "@/i18n/context";
import { Field } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulaire de contact, relié à l'adresse e-mail de réception via Formspree
 * (service tiers de formulaires statiques : aucun backend propre nécessaire).
 * L'adresse publique du formulaire est définie dans `site.contactFormEndpoint`.
 * L'attribut action/method est conservé pour fonctionner même sans JavaScript.
 */
export default function ContactForm() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (!name.trim()) err.name = t.contact.nameError;
    if (!email.trim()) err.email = t.contact.emailError;
    if (!message.trim()) err.message = t.contact.messageError;
    setErrors(err);
    if (Object.keys(err).length) return;

    setStatus("sending");
    try {
      const res = await fetch(site.contactFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="card card--pad stack" style={{ gap: 12 }}>
        <h2 className="display-m">{t.contact.sentHeading}</h2>
        <p className="muted" style={{ margin: 0 }}>{t.contact.sentText}</p>
      </div>
    );
  }

  return (
    <form className="card card--pad stack" style={{ gap: 20 }} action={site.contactFormEndpoint} method="POST" onSubmit={submit} noValidate>
      <h2 className="display-m">{t.contact.formHeading}</h2>
      <p className="body-l muted" style={{ margin: 0 }}>{t.contact.formSubtitle}</p>
      <Field label={t.contact.nameLabel} error={errors.name}>
        <input name="name" value={name} onChange={(x) => setName(x.target.value)} placeholder={t.contact.namePlaceholder} autoComplete="name" />
      </Field>
      <Field label={t.contact.emailFieldLabel} error={errors.email}>
        <input type="email" name="email" value={email} onChange={(x) => setEmail(x.target.value)} placeholder={t.contact.emailPlaceholder} autoComplete="email" />
      </Field>
      <Field label={t.contact.messageLabel} error={errors.message}>
        <textarea name="message" value={message} onChange={(x) => setMessage(x.target.value)} placeholder={t.contact.messagePlaceholder} />
      </Field>
      <div>
        <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
          {status === "sending" ? t.contact.sending : t.contact.send}
        </button>
      </div>
      {status === "error" && (
        <p className="caption" style={{ color: "var(--error)", margin: 0 }}>
          {t.contact.errorText}
        </p>
      )}
    </form>
  );
}
