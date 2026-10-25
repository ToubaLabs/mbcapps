"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { shortcutLabels, shortcuts } from "@/data/routes";
import { bookingQuery } from "@/lib/query";
import type { Booking } from "@/lib/whatsapp";
import { useI18n } from "@/i18n/context";
import { localeHref, formatDateLocale } from "@/i18n/locales";
import AddressField from "./AddressField";
import DateTimePicker from "./DateTimePicker";
import { Counter, Field } from "./ui";

type Errors = Partial<Record<"from" | "to" | "date", string>>;

/**
 * Étape 1 : le trajet. Utilisé en barre horizontale sur l'accueil (variant="bar")
 * et en formulaire complet sur /reserver (variant="page").
 */
export default function TripForm({ initial, variant = "page" }: { initial?: Partial<Booking>; variant?: "bar" | "page" }) {
  const router = useRouter();
  const { locale, t } = useI18n();
  const [b, setB] = useState<Booking>({ from: "", to: "", date: "", time: "", passengers: 2, bags: 2, ...initial });
  const [errors, setErrors] = useState<Errors>({});
  const [picker, setPicker] = useState(false);
  const set = (p: Partial<Booking>) => { setB((x) => ({ ...x, ...p })); setErrors((e) => ({ ...e, ...Object.fromEntries(Object.keys(p).map((k) => [k, undefined])) })); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (!b.from.trim()) err.from = t.tripForm.fromError;
    if (!b.to.trim()) err.to = t.tripForm.toError;
    if (!b.date || !b.time) err.date = t.tripForm.dateError;
    setErrors(err);
    if (Object.keys(err).length) {
      const first = document.querySelector<HTMLElement>(".field--error input, .field--error button");
      first?.focus();
      return;
    }
    router.push(`${localeHref(locale, "/reserver/vehicule/")}?${bookingQuery(b)}`);
  };

  const dateLabel = b.date
    ? `${formatDateLocale(b.date, locale, { weekday: "short", day: "numeric", month: "long" })}${b.time ? `, ${b.time}` : ""}`
    : "";

  const dateField = (
    <div className={`field ${errors.date ? "field--error" : ""}`}>
      <span className="field-label">{t.tripForm.dateTimeLabel}</span>
      <button type="button" className="field-value picker-trigger" onClick={() => setPicker(true)}>
        {dateLabel || <span className="placeholder">{t.tripForm.chooseDateTime}</span>}
      </button>
      {errors.date && <span className="field-error" role="alert">{errors.date}</span>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className={variant === "bar" ? "trip-bar" : "trip-form"}>
      <Field label={t.tripForm.fromLabel} error={errors.from}>
        <AddressField value={b.from} onChange={(v) => set({ from: v })} placeholder={t.tripForm.fromPlaceholder} autoComplete="street-address" geolocate />
      </Field>
      <Field label={t.tripForm.toLabel} error={errors.to}>
        <AddressField value={b.to} onChange={(v) => set({ to: v })} placeholder={t.tripForm.toPlaceholder} />
      </Field>

      {variant === "page" && (
        <div className="chips" aria-label={t.tripForm.frequentDestinationsAria}>
          {shortcutLabels.map((s, k) => (
            <button key={s} type="button" className="chip" aria-pressed={b.to === shortcuts[k]} onClick={() => set({ to: shortcuts[k] })}>{s}</button>
          ))}
        </div>
      )}

      {dateField}

      {variant === "page" && (
        <div className="grid grid-2">
          <Counter label={t.common.passengers} value={b.passengers} min={1} max={7} onChange={(v) => set({ passengers: v })} />
          <Counter label={t.common.bags} value={b.bags} max={7} onChange={(v) => set({ bags: v })} />
        </div>
      )}

      <button type="submit" className={`btn btn--primary ${variant === "page" ? "btn--block" : ""}`}>
        {variant === "page" ? t.tripForm.submitPage : t.tripForm.submitBar}
      </button>

      {picker && (
        <DateTimePicker date={b.date} time={b.time} onClose={() => setPicker(false)}
          onConfirm={(date, time) => { set({ date, time }); setPicker(false); }} />
      )}
    </form>
  );
}
