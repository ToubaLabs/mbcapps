"use client";

import Link from "@/i18n/LocalizedLink";
import { Suspense, useEffect, useState } from "react";
import { useBooking } from "@/lib/booking";
import { vehicles } from "@/data/vehicles";
import { routePrice } from "@/data/routes";
import { Counter, Modal, Progress } from "@/components/ui";
import { VehicleOption } from "@/components/Vehicle";
import TripSummary from "@/components/TripSummary";
import { useI18n } from "@/i18n/context";
import { formatDateLocale } from "@/i18n/locales";

function Step2() {
  const { locale, t } = useI18n();
  const [b, go] = useBooking();
  const [pax, setPax] = useState(b.passengers);
  const [bags, setBags] = useState(b.bags);
  const initial = vehicles.find((v) => v.name === b.vehicle)?.slug ?? "mercedes-classe-s";
  const [sel, setSel] = useState(initial);
  const selected = vehicles.find((v) => v.slug === sel)!;
  const price = routePrice(b.from, b.to, sel);

  // Après le choix du véhicule, si les bagages dépassent sa capacité,
  // on propose un véhicule plus adapté ou un véhicule supplémentaire.
  const [bagsModal, setBagsModal] = useState(false);
  const [extraVehicle, setExtraVehicle] = useState(Boolean(b.extraVehicle));
  useEffect(() => {
    if (b.from && b.to && bags > selected.bags && !extraVehicle) setBagsModal(true);
  }, [b.from, b.to, bags, selected.bags, extraVehicle]);
  const selectVehicle = (v: (typeof vehicles)[number]) => {
    setSel(v.slug);
    setBagsModal(bags > v.bags && !extraVehicle);
  };
  const changeBags = (value: number) => {
    setBags(value);
    setBagsModal(value > selected.bags && !extraVehicle);
  };
  const biggerVehicle = vehicles
    .filter((v) => v.slug !== sel && v.passengers >= pax && v.bags >= bags)
    .sort((a, b2) => a.bags - b2.bags)[0];
  const bagsOk = bags <= selected.bags || extraVehicle;
  const passengersOk = pax <= selected.passengers;

  if (!b.from || !b.to) {
    return (
      <div className="container booking" style={{ display: "block" }}>
        <div className="empty">
          <h1 className="display-s">{t.step2.emptyTitle}</h1>
          <p className="muted">{t.step2.emptyText}</p>
          <Link href="/reserver/" className="btn btn--primary">{t.step2.indicateTrip}</Link>
        </div>
      </div>
    );
  }

  const next = () => {
    if (!bagsOk) {
      setBagsModal(true);
      return;
    }
    go({ passengers: pax, bags, vehicle: selected.name, price, extraVehicle }, "/reserver/whatsapp/");
  };

  return (
    <>
      <TripSummary b={b} />
      <div className="container booking">
        <div className="booking__main">
          <Progress step={2} />
          <h1 className="display-l">{t.step2.title}</h1>
          <p className="muted" style={{ margin: 0 }}>{t.step2.subtitle}</p>
          <div className="grid grid-2">
            <Counter label={t.common.passengers} value={pax} min={1} max={7} onChange={setPax} />
            <Counter label={t.common.bags} value={bags} max={7} onChange={changeBags} />
          </div>
          <div className="stack">
            {vehicles.map((v) => (
              <VehicleOption key={v.slug} v={v} price={routePrice(b.from, b.to, v.slug)} selected={v.slug === sel}
                disabled={v.passengers < pax} onSelect={() => selectVehicle(v)} />
            ))}
          </div>
        </div>

        <aside className="card card--pad recap">
          <h2 className="display-s">{t.step2.yourTrip}</h2>
          <dl>
            <div><dt>{t.step2.departure}</dt><dd>{b.from}</dd></div>
            <div><dt>{t.step2.arrival}</dt><dd>{b.to}</dd></div>
            <div><dt>{t.step2.date}</dt><dd>{formatDateLocale(b.date, locale)} {t.dateTimePicker.at} {b.time}</dd></div>
            <div><dt>{t.step2.vehicle}</dt><dd>{selected.name}</dd></div>
          </dl>
          <hr className="divider" />
          <div className="row-line" style={{ border: 0, padding: 0, alignItems: "center" }}>
            <span className="label">{t.step2.totalTtc}</span>
            <span className="price">{price === undefined ? t.step2.priceOnRequest : <>{price}&nbsp;€</>}</span>
          </div>
          {price === undefined && <p className="caption muted" style={{ margin: 0 }}><Link href="/contact/" className="link">{t.step2.requestQuote}</Link></p>}
          {extraVehicle && <p className="caption gold" style={{ margin: 0 }}>{t.step2.extraVehicleNotice}</p>}
          <button className="btn btn--primary btn--block" onClick={next} disabled={!passengersOk}>{t.step2.continueBtn}</button>
          <p className="caption muted" style={{ textAlign: "center", margin: 0 }}>{t.step2.cancelNotice}</p>
        </aside>
      </div>

      <div className="sticky-bar">
        <div className="sticky-bar__row">
          <span><span className="label">{selected.name}</span><br /><span className="caption muted">{t.step2.totalTtc}</span></span>
          <span className="price">{price === undefined ? t.step2.priceOnRequest : <>{price}&nbsp;€</>}</span>
        </div>
        <button className="btn btn--primary btn--block" onClick={next} disabled={!passengersOk}>{t.step2.continueBtn}</button>
      </div>

      {bagsModal && (
        <Modal title={t.step2.modalTitle} onClose={() => setBagsModal(false)}>
          <div className="stack" style={{ gap: 16 }}>
            <h2 className="display-s">{t.step2.modalHeadingPrefix} {selected.name}</h2>
            <p className="body-s muted" style={{ margin: 0 }}>
              {selected.name} {t.step2.modalTextPrefix} {selected.bags} {t.step2.modalTextMiddle} {bags}.{" "}
              {t.step2.modalTextSuffix}
            </p>
            {biggerVehicle ? (
              <button type="button" className="btn btn--primary btn--block"
                onClick={() => { setSel(biggerVehicle.slug); setExtraVehicle(false); setBagsModal(false); }}>
                {t.step2.chooseBiggerPrefix} {biggerVehicle.name} ({biggerVehicle.bags} {t.common.bags.toLowerCase()})
              </button>
            ) : (
              <p className="caption muted" style={{ margin: 0 }}>{t.step2.noBiggerVehicle}</p>
            )}
            <button type="button" className="btn btn--secondary btn--block"
              onClick={() => { setExtraVehicle(true); setBagsModal(false); }}>
              {t.step2.addExtraVehicle}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default function Page() {
  return <Suspense><Step2 /></Suspense>;
}
