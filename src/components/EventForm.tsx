"use client";

import { useState } from "react";
import { eventMessage, whatsappLink, type EventRequest } from "@/lib/whatsapp";
import { todayIso } from "@/lib/query";
import { site } from "@/data/site";
import { Counter, Field } from "./ui";
import { WhatsAppIcon } from "./WhatsAppButton";

const TYPES = ["Grand Prix", "Yacht Show", "Gala ou soirée", "Mariage", "Autre"];

/** Demande de devis événement : rien n'est envoyé au site, la demande part sur WhatsApp. */
export default function EventForm() {
  const [e, setE] = useState<EventRequest>({ type: "Grand Prix", date: "", hours: "", place: "", guests: 8, sedans: 2, vans: 1, notes: "" });
  const [errors, setErrors] = useState<{ date?: string; place?: string }>({});
  const set = (p: Partial<EventRequest>) => { setE((x) => ({ ...x, ...p })); setErrors({}); };

  const send = (ev: React.FormEvent) => {
    ev.preventDefault();
    const err: typeof errors = {};
    if (!e.date) err.date = "Choisissez la date de l'événement";
    if (!e.place.trim()) err.place = "Indiquez le lieu de l'événement";
    setErrors(err);
    if (Object.keys(err).length) return;
    // Un vrai clic sur un <a> (plutôt que window.open) : sur iOS Safari, window.open()
    // appelé après preventDefault()/setState n'est plus traité comme un clic natif direct,
    // ce qui fait échouer la redirection vers l'appli WhatsApp et laisse un onglet about:blank.
    const a = document.createElement("a");
    a.href = whatsappLink(eventMessage(e));
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  return (
    <div className="booking" style={{ paddingTop: 0 }}>
      <form className="booking__main" onSubmit={send} noValidate>
        <h2 className="display-l">Demande de devis</h2>
        <p className="muted" style={{ margin: 0 }}>Réponse sous 2 heures, sans engagement. Votre demande est envoyée sur WhatsApp : aucune donnée n'est enregistrée sur notre site.</p>
        <span className="label muted">Type d'événement *</span>
        <div className="chips">
          {TYPES.map((t) => <button key={t} type="button" className="chip" aria-pressed={e.type === t} onClick={() => set({ type: t })}>{t}</button>)}
        </div>
        <div className="grid grid-2">
          <Field label="Date *" error={errors.date}><input type="date" min={todayIso()} value={e.date} onChange={(x) => set({ date: x.target.value })} /></Field>
          <Field label="Horaires"><input value={e.hours} onChange={(x) => set({ hours: x.target.value })} placeholder="Ex. 18:00 à 02:00" /></Field>
        </div>
        <Field label="Lieu principal *" error={errors.place}><input value={e.place} onChange={(x) => set({ place: x.target.value })} placeholder="Hôtel, restaurant, adresse…" /></Field>
        <span className="label muted">Invités et véhicules</span>
        <div className="grid grid-3">
          <Counter label="Invités" value={e.guests} max={60} onChange={(v) => set({ guests: v })} />
          <Counter label="Berlines" value={e.sedans} max={12} onChange={(v) => set({ sedans: v })} />
          <Counter label="Vans" value={e.vans} max={12} onChange={(v) => set({ vans: v })} />
        </div>
        <Field label="Précisions (facultatif)"><textarea value={e.notes} onChange={(x) => set({ notes: x.target.value })} placeholder="Ex. accueil des invités à l'héliport à 17:00" /></Field>
        <div><button type="submit" className="btn btn--whatsapp"><WhatsAppIcon size={18} /> Continuer sur WhatsApp</button></div>
      </form>
      <aside className="card card--pad recap" style={{ background: "var(--sea)" }}>
        <h3 className="display-s">Toujours inclus</h3>
        <ul className="dot-list body-s">
          <li>Un chauffeur dédié par véhicule</li>
          <li>Attente illimitée pendant l'événement</li>
          <li>Un seul interlocuteur pour tout coordonner</li>
          <li>Eau et chargeurs à bord</li>
        </ul>
        <hr className="divider" />
        <span className="label">Besoin d'une réponse immédiate ?</span>
        <a href={site.phoneHref} className="display-s gold">{site.phoneDisplay}</a>
      </aside>
    </div>
  );
}
