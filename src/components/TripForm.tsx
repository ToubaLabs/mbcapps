"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { shortcutLabels, shortcuts } from "@/data/routes";
import { bookingQuery } from "@/lib/query";
import type { Booking } from "@/lib/whatsapp";
import DateTimePicker from "./DateTimePicker";
import { Counter, Field } from "./ui";

type Errors = Partial<Record<"from" | "to" | "date", string>>;

/**
 * Étape 1 : le trajet. Utilisé en barre horizontale sur l'accueil (variant="bar")
 * et en formulaire complet sur /reserver (variant="page").
 */
export default function TripForm({ initial, variant = "page" }: { initial?: Partial<Booking>; variant?: "bar" | "page" }) {
  const router = useRouter();
  const [b, setB] = useState<Booking>({ from: "", to: "", date: "", time: "", passengers: 2, bags: 2, ...initial });
  const [errors, setErrors] = useState<Errors>({});
  const [picker, setPicker] = useState(false);
  const set = (p: Partial<Booking>) => { setB((x) => ({ ...x, ...p })); setErrors((e) => ({ ...e, ...Object.fromEntries(Object.keys(p).map((k) => [k, undefined])) })); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (!b.from.trim()) err.from = "Indiquez une adresse de départ";
    if (!b.to.trim()) err.to = "Indiquez une destination";
    if (!b.date || !b.time) err.date = "Choisissez une date et une heure";
    setErrors(err);
    if (Object.keys(err).length) {
      const first = document.querySelector<HTMLElement>(".field--error input, .field--error button");
      first?.focus();
      return;
    }
    router.push(`/reserver/vehicule/?${bookingQuery(b)}`);
  };

  const dateLabel = b.date
    ? `${new Date(b.date + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long" })}${b.time ? `, ${b.time}` : ""}`
    : "";

  const dateField = (
    <div className={`field ${errors.date ? "field--error" : ""}`}>
      <span className="field-label">Date et heure</span>
      <button type="button" className="field-value picker-trigger" onClick={() => setPicker(true)}>
        {dateLabel || <span className="placeholder">Choisir</span>}
      </button>
      {errors.date && <span className="field-error" role="alert">{errors.date}</span>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className={variant === "bar" ? "trip-bar" : "trip-form"}>
      <Field label="Départ" error={errors.from}>
        <input value={b.from} onChange={(e) => set({ from: e.target.value })} placeholder="Adresse ou lieu de prise en charge" autoComplete="street-address" />
      </Field>
      <Field label="Destination" error={errors.to}>
        <input value={b.to} onChange={(e) => set({ to: e.target.value })} placeholder="Adresse, hôtel, aéroport…" />
      </Field>

      {variant === "page" && (
        <div className="chips" aria-label="Destinations fréquentes">
          {shortcutLabels.map((s, k) => (
            <button key={s} type="button" className="chip" aria-pressed={b.to === shortcuts[k]} onClick={() => set({ to: shortcuts[k] })}>{s}</button>
          ))}
        </div>
      )}

      {dateField}

      {variant === "page" && (
        <div className="grid grid-2">
          <Counter label="Passagers" value={b.passengers} min={1} max={7} onChange={(v) => set({ passengers: v })} />
          <Counter label="Bagages" value={b.bags} max={7} onChange={(v) => set({ bags: v })} />
        </div>
      )}

      <button type="submit" className={`btn btn--primary ${variant === "page" ? "btn--block" : ""}`}>
        {variant === "page" ? "Voir les véhicules et les prix" : "Voir les prix"}
      </button>

      {picker && (
        <DateTimePicker date={b.date} time={b.time} onClose={() => setPicker(false)}
          onConfirm={(date, time) => { set({ date, time }); setPicker(false); }} />
      )}
    </form>
  );
}
