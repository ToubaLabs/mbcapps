import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import FleetList from "@/components/FleetList";

export const metadata: Metadata = { title: "Notre flotte", description: "Berlines, vans, SUV et véhicules électriques avec chauffeur à Monaco." };

export default function Page() {
  return (
    <>
      <PageHead crumb="Accueil  /  Flotte" title="Notre flotte">
        Véhicules de moins de deux ans, vitres teintées, Wi-Fi et eau à bord.
      </PageHead>
      <FleetList />
    </>
  );
}
