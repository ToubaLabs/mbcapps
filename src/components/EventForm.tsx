"use client";

import { useState } from "react";
import { eventMessage, whatsappLink, type EventRequest } from "@/lib/whatsapp";
import { todayIso } from "@/lib/query";
import { site } from "@/data/site";
import { vehicles } from "@/data/vehicles";
import { useI18n } from "@/i18n/context";
import { Counter, Field } from "./ui";
import { WhatsAppIcon } from "./WhatsAppButton";

// Valeurs canoniques (toujours en français : utilisées dans le message WhatsApp final).
const TYPES = ["Grand Prix", "Yacht Show", "Gala ou soirée", "Mariage", "Autre"] as const;

/** Demande de devis événement : rien n'est envoyé au site, la demande part sur WhatsApp. */
export default function EventForm() {
  const { t } = useI18n();
  const [e, setE] = useState<EventRequest>({
    type: "Grand Prix", date: "", hours: "", place: "", guests: 8, sedans: 2, vans: 1,
    vehicle: "", passengers: 1, bags: 1, notes: "",
  });
  const [errors, setErrors] = useState<{ date?: string; place?: string }>({});
  const set = (p: Partial<EventRequest>) => { setE((x) => ({ ...x, ...p })); setErrors({}); };

  const typeLabel = (v: string) => {
    switch (v) {
      case "Grand Prix": return t.devis.types.grandPrix;
      case "Yacht Show": return t.devis.types.yachtShow;
      case "Gala ou soirée": return t.devis.types.gala;
      case "Mariage": return t.devis.types.wedding;
      default: return t.devis.types.other;
    }
  };

  const send = (ev: React.FormEvent) => {
    ev.preventDefault();
    const err: typeof errors = {};
    if (!e.date) err.date = t.devis.dateError;
    if (!e.place.trim()) err.place = t.devis.placeError;
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
        <h2 className="display-l">{t.devis.title}</h2>
        <p className="muted" style={{ margin: 0 }}>{t.devis.subtitle}</p>
        <span className="label muted">{t.devis.eventTypeLabel}</span>
        <div className="chips">
          {TYPES.map((v) => <button key={v} type="button" className="chip" aria-pressed={e.type === v} onClick={() => set({ type: v })}>{typeLabel(v)}</button>)}
        </div>
        <div className="grid grid-2">
          <Field label={t.devis.dateLabel} error={errors.date}><input type="date" min={todayIso()} value={e.date} onChange={(x) => set({ date: x.target.value })} /></Field>
          <Field label={t.devis.hoursLabel}><input value={e.hours} onChange={(x) => set({ hours: x.target.value })} placeholder={t.devis.hoursPlaceholder} /></Field>
        </div>
        <Field label={t.devis.placeLabel} error={errors.place}><input value={e.place} onChange={(x) => set({ place: x.target.value })} placeholder={t.devis.placePlaceholder} /></Field>
        <span className="label muted">{t.devis.guestsVehiclesLabel}</span>
        <div className="grid grid-3">
          <Counter label={t.devis.guests} value={e.guests} max={60} onChange={(v) => set({ guests: v })} />
          <Counter label={t.devis.sedans} value={e.sedans} max={12} onChange={(v) => set({ sedans: v })} />
          <Counter label={t.devis.vans} value={e.vans} max={12} onChange={(v) => set({ vans: v })} />
        </div>
        <span className="label muted">{t.devis.vehicleWanted}</span>
        <Field label={t.step2.vehicle}>
          <select value={e.vehicle} onChange={(x) => set({ vehicle: x.target.value })}>
            <option value="">{t.devis.noPreference}</option>
            {vehicles.map((v) => <option key={v.slug} value={v.name}>{v.name}</option>)}
          </select>
        </Field>
        <div className="grid grid-2">
          <Counter label={t.devis.passengers} value={e.passengers} min={1} max={7} onChange={(v) => set({ passengers: v })} />
          <Counter label={t.devis.bags} value={e.bags} max={7} onChange={(v) => set({ bags: v })} />
        </div>
        <Field label={t.devis.notes}><textarea value={e.notes} onChange={(x) => set({ notes: x.target.value })} placeholder={t.devis.notesPlaceholder} /></Field>
        <div><button type="submit" className="btn btn--whatsapp"><WhatsAppIcon size={18} /> {t.devis.submit}</button></div>
      </form>
      <aside className="card card--pad recap" style={{ background: "var(--sea)" }}>
        <h3 className="display-s">{t.devis.alwaysIncludedTitle}</h3>
        <ul className="dot-list body-s">
          {t.devis.included.map((i) => <li key={i}>{i}</li>)}
        </ul>
        <hr className="divider" />
        <span className="label">{t.devis.immediateResponse}</span>
        <a href={site.phoneHref} className="display-s gold">{site.phoneDisplay}</a>
      </aside>
    </div>
  );
}
