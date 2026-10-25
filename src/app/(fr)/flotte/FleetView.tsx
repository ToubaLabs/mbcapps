"use client";

import { PageHead } from "@/components/ui";
import FleetList from "@/components/FleetList";
import { useI18n } from "@/i18n/context";

export default function Page() {
  const { t } = useI18n();
  return (
    <>
      <PageHead crumb={`${t.nav.home}  /  ${t.nav.fleet}`} title={t.fleet.pageTitle}>
        {t.fleet.pageDescription}
      </PageHead>
      <FleetList />
    </>
  );
}
