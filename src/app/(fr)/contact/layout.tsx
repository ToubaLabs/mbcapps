import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact", description: `Contactez Monaco Black Car sur WhatsApp ou au ${site.phoneDisplay}, 24h/24.` };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
