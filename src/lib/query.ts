import type { Booking } from "./whatsapp";

/** Utilitaires sans React : utilisables côté serveur et côté navigateur. */
export function bookingQuery(b: Partial<Booking>) {
  const q = new URLSearchParams();
  Object.entries(b).forEach(([k, v]) => {
    if (v === undefined || v === "") return;
    q.set(k === "passengers" ? "pax" : k, String(v));
  });
  return q.toString();
}

/** Date du jour au format AAAA-MM-JJ (fuseau du navigateur). */
export function todayIso() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}
