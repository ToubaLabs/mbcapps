import Link from "next/link";
import { bookingQuery } from "@/lib/query";
import { formatDate, type Booking } from "@/lib/whatsapp";

/** Bandeau « Résumé trajet » sous le header, aux étapes 2 et 3. */
export default function TripSummary({ b }: { b: Booking }) {
  return (
    <div className="trip-summary">
      <div className="container">
        <div className="trip-summary__info body-s">
          <span>{b.from} → {b.to}</span>
          <span className="muted">{formatDate(b.date)}, {b.time}</span>
          <span className="muted">{b.passengers} passager(s), {b.bags} bagage(s)</span>
        </div>
        <Link href={`/reserver/?${bookingQuery(b)}`} className="link">Modifier le trajet</Link>
      </div>
    </div>
  );
}
