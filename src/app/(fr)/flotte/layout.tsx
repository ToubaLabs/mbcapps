import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notre flotte", description: "Berlines, vans, SUV et véhicules électriques avec chauffeur à Monaco." };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
