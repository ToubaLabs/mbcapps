"use client";

import Link from "@/i18n/LocalizedLink";
import { bookingQuery } from "@/lib/query";
import type { Booking } from "@/lib/whatsapp";
import { useI18n } from "@/i18n/context";
import { formatDateLocale } from "@/i18n/locales";

/** Bandeau « Résumé trajet » sous le header, aux étapes 2 et 3. */
export default function TripSummary({ b }: { b: Booking }) {
  const { locale, t } = useI18n();
  return (
    <div className="trip-summary">
      <div className="container">
        <div className="trip-summary__info body-s">
          <span>{b.from} → {b.to}</span>
          <span className="muted">{formatDateLocale(b.date, locale)}, {b.time}</span>
          <span className="muted">{b.passengers} {t.tripSummary.passengersWord}, {b.bags} {t.tripSummary.bagsWord}</span>
        </div>
        <Link href={`/reserver/?${bookingQuery(b)}`} className="link">{t.tripSummary.modify}</Link>
      </div>
    </div>
  );
}
