"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

/** QR code généré dans le navigateur (aucun service externe). */
export default function QrCode({ value }: { value: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) QRCode.toCanvas(ref.current, value, { margin: 0, width: 392, color: { dark: "#0D0D0D", light: "#FFFFFF" } });
  }, [value]);
  return <div className="qr"><canvas ref={ref} aria-label="QR code vers WhatsApp" role="img" /></div>;
}
