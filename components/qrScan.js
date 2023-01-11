import React, { useState, useRef, useEffect } from "react";
import QrScanner from "react-qr-scanner";

export default function QrScan({ result }) {
  const [scanQRCode, setScanQrCode] = useState(false);

  const returnQrScan = (data) => {
    if (data != null && data != "") {
      result(data);
      setScanQrCode(false);
    }
  };

  return (
    <div className="card-actions flex flex-col justify-center gap-5">
      <button
        className="btn border-transparent bg-secondary text-background"
        onClick={() => {
          setScanQrCode(!scanQRCode);
        }}
      >
        Scan Qr Code
      </button>

      {scanQRCode && <QrScanner onScan={(data) => returnQrScan(data)} />}
    </div>
  );
}
