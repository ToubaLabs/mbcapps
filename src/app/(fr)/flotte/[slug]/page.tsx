import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVehicle, vehicles } from "@/data/vehicles";
import { routes } from "@/data/routes";
import { getDictionary } from "@/i18n/dictionaries";
import VehiclePageView from "./VehiclePageView";
import { vehicleMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const v = getVehicle((await params).slug);
  if (!v) notFound();
  return vehicleMetadata("fr", v);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const v = getVehicle((await params).slug);
  if (!v) notFound();
  const routeIndexes = [0, 2, 3] as const;
  const labels = getDictionary("fr").pricing.routeLabels;
  const tariffs = routeIndexes.flatMap((index) => {
    const price = routes[index].prices[v.slug];
    return price === undefined ? [] : [{ label: labels[index], price }];
  });
  const similar = vehicles.filter((x) => x.slug !== v.slug).slice(0, 3);

  return <VehiclePageView v={v} tariffs={tariffs} similar={similar} />;
}
