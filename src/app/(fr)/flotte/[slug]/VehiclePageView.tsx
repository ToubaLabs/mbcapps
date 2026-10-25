"use client";

import Link from "@/i18n/LocalizedLink";
import type { Vehicle } from "@/data/vehicles";
import { Gallery, VehicleTile } from "@/components/Vehicle";
import { bookingQuery } from "@/lib/query";
import { useI18n } from "@/i18n/context";
import { localizeVehicle } from "@/data/vehicles-i18n";

export default function VehiclePageView({ v, tariffs, similar }: { v: Vehicle; tariffs: { label: string; price: number }[]; similar: Vehicle[] }) {
  const { locale, t } = useI18n();
  const localized = localizeVehicle(v, locale);
  return (
    <>
      <div className="container" style={{ paddingTop: 32 }}>
        <span className="caption muted">{t.nav.home}  /  <Link href="/flotte/">{t.vehiclePage.breadcrumbFleet}</Link>  /  {v.name}</span>
      </div>
      <div className="container booking" style={{ paddingTop: 24, gap: 48 }}>
        <div className="booking__main" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 6 }}>
            <span className="kicker">{localized.label}</span>
            <h1 className="display-l">{v.name}</h1>
          </div>
          <Gallery v={v} />

          <section className="stack">
            <h2 className="display-m">{t.vehiclePage.specsHeading}</h2>
            <div className="grid grid-3" style={{ gap: 12 }}>
              {[
                [t.vehiclePage.specPassengers, v.passengers],
                [t.vehicleTile.bags, `${v.bags} ${t.vehiclePage.specBagsSuffix}`],
                [t.vehiclePage.specEngine, localized.engine],
                [t.vehiclePage.specInterior, localized.interior],
                [t.vehiclePage.specOnboard, localized.onboard],
                [t.vehiclePage.specComfort, t.vehiclePage.comfortValue],
              ].map(([k, val]) => (
                <div key={k} className="card" style={{ padding: "16px 20px" }}>
                  <div className="caption muted">{k}</div><div className="label">{val}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="stack">
            <h2 className="display-m">{t.vehiclePage.idealForHeading}</h2>
            <p className="muted" style={{ margin: 0 }}>{localized.idealFor}</p>
          </section>

          <section>
            <h2 className="display-m">{t.vehiclePage.tariffsHeading}</h2>
            {tariffs.map((tf) => (
              <div key={tf.label} className="row-line"><span>{tf.label}</span><span className="label gold">{tf.price}&nbsp;€</span></div>
            ))}
            <div className="row-line"><span>{t.vehiclePage.hourlyLabel}</span><span className="label gold">{v.hourly}&nbsp;€</span></div>
          </section>
        </div>

        <aside className="card card--pad recap">
          <h2 className="display-s">{t.vehiclePage.reserveHeading}</h2>
          <p className="body-s muted" style={{ margin: 0 }}>{t.vehiclePage.reserveText}</p>
          <div className="row-line" style={{ border: 0, padding: 0, alignItems: "center" }}>
            <span className="label">{t.vehiclePage.startingFrom}</span><span className="price">{v.basePrice}&nbsp;€</span>
          </div>
          <Link href={`/reserver/?${bookingQuery({ vehicle: v.name })}`} className="btn btn--primary btn--block">{t.vehiclePage.chooseMyTrip}</Link>
          <p className="caption muted" style={{ textAlign: "center", margin: 0 }}>{t.vehiclePage.tollsNotice}</p>
        </aside>
      </div>

      <section className="section section--surface">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 32 }}>{t.vehiclePage.similarVehicles}</h2>
          <div className="carousel">{similar.map((s) => <VehicleTile key={s.slug} v={s} />)}</div>
        </div>
      </section>

      <div className="sticky-bar">
        <div className="sticky-bar__row">
          <span><span className="caption muted">{t.vehiclePage.startingFrom}</span><br /><span className="price">{v.basePrice}&nbsp;€</span></span>
          <Link href={`/reserver/?${bookingQuery({ vehicle: v.name })}`} className="btn btn--primary">{t.vehicleTile.reserve}</Link>
        </div>
      </div>
    </>
  );
}
