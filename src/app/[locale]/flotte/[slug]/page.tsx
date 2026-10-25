import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVehicle, vehicles } from "@/data/vehicles";
import { routes } from "@/data/routes";
import { getDictionary } from "@/i18n/dictionaries";
import VehiclePageView from "../../../(fr)/flotte/[slug]/VehiclePageView";
import { vehicleMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const v = getVehicle(slug);
  if (!v) notFound();
  return vehicleMetadata(locale, v);
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug, locale } = await params;
  const v = getVehicle(slug);
  if (!v) notFound();
  const routeIndexes = [0, 2, 3] as const;
  const labels = getDictionary(locale).pricing.routeLabels;
  const tariffs = routeIndexes.flatMap((index) => {
    const price = routes[index].prices[v.slug];
    return price === undefined ? [] : [{ label: labels[index], price }];
  });
  const similar = vehicles.filter((x) => x.slug !== v.slug).slice(0, 3);
  return <VehiclePageView v={v} tariffs={tariffs} similar={similar} />;
}
