import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QrScan({ result }) {
  const [scanQRCode, setScanQrCode] = useState(false);

  const handleScan = (data) => {
    if (data) {
      result(data);
      setScanQrCode(false);
    }
  };

  return (
    <div>
      <label
        onClick={() => {
          setScanQrCode(true);
        }}
        htmlFor="my-modal-6"
        className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          className="mr-3"
        >
          <path d="M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm0-2h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8 8h-1v-2h1v1h2v1h-1v1h-1v-1zm2 12v-1h-1v1h1zm-1-15v-1h-2v1h1v1h1v-1zm8-1v6h-1v-1h-4v-5h5zm-1 4v-3h-3v3h3zm-14 2h-1v1h2v-1h-1zm0 3h1v1h1v-3h-1v1h-2v2h1v-1zm5 1v2h1v-2h-1zm4-10h-1v3h1v-3zm0 5v-1h-1v1h1zm3-2h1v-1h-1v1zm-10-1h-1v1h1v-1zm2-2v5h-5v-5h5zm-1 1h-3v3h3v-3zm9 5v1h-1v-1h-2v1h-1v-1h-3v-1h-1v1h-1v1h1v2h1v-1h1v2h1v-2h3v1h-2v1h2v1h1v-3h1v1h1v2h1v-1h1v-1h-1v-1h-1v-1h1v-1h-2zm-11 8h1v-1h-1v1zm-2-3h5v5h-5v-5zm1 4h3v-3h-3v3zm12-3v-1h-1v1h1zm0 1h-1v1h-1v-1h-1v-1h1v-1h-2v-1h-1v2h-1v1h-1v3h1v-1h1v-1h2v2h1v-1h1v1h2v-1h1v-1h-2v-1zm-9-3h1v-1h-1v1zm10 2v1h1v1h1v-3h-1v1h-1zm2 4v-1h-1v1h1zm0-8v-1h-1v1h1z" />
        </svg>
        QR-Scanner öffnen
      </label>
      {scanQRCode && (
        <>
          <input type="checkbox" id="my-modal-6" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center dark:text-white">
                Hier können Sie die QR-Codes der Studierenden scannen.
              </h3>
              <QrReader
                onResult={handleScan}
                constraints={{
                  facingMode: "environment",
                }}
              />
              <div className="modal-action" facingMode="environment">
                <label
                  onClick={() => {
                    setScanQrCode(false);
                  }}
                  htmlFor="my-modal-6"
                  className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white"
                >
                  Schließen
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
