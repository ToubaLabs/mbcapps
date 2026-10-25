"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Booking } from "./whatsapp";

/**
 * Le trajet circule d'une étape à l'autre dans l'adresse de la page (paramètres d'URL).
 * Pas de stockage : si le visiteur ferme l'onglet, rien n'est conservé.
 */
export function useBooking(): [Booking, (b: Partial<Booking>, path: string) => void] {
  const params = useSearchParams();
  const router = useRouter();
  const booking: Booking = {
    from: params.get("from") ?? "",
    to: params.get("to") ?? "",
    date: params.get("date") ?? "",
    time: params.get("time") ?? "",
    passengers: Number(params.get("pax") ?? 2),
    bags: Number(params.get("bags") ?? 2),
    vehicle: params.get("vehicle") ?? undefined,
    price: params.get("price") ? Number(params.get("price")) : undefined,
  };
  const go = (b: Partial<Booking>, path: string) => {
    const next = { ...booking, ...b };
    const q = new URLSearchParams();
    if (next.from) q.set("from", next.from);
    if (next.to) q.set("to", next.to);
    if (next.date) q.set("date", next.date);
    if (next.time) q.set("time", next.time);
    q.set("pax", String(next.passengers));
    q.set("bags", String(next.bags));
    if (next.vehicle) q.set("vehicle", next.vehicle);
    if (next.price) q.set("price", String(next.price));
    router.push(`${path}?${q.toString()}`);
  };
  return [booking, go];
}
