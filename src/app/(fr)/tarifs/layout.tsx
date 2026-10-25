import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tarifs", description: "Prix fixes TTC des trajets avec chauffeur au départ de Monaco : aéroport de Nice, Cannes, Saint-Tropez, mise à disposition." };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
