import { parseStream } from "fast-csv";
import React, { useState } from "react";

export default function PopUp({
  text = "",
  password = "",
  btnEnabled = false,
}) {
  btnEnabled = password != ""; //only if password exist, copy password activated
  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };
  return (
    <>
      <div className="fixed z-10 left-0 right-0 top-0 bottom-0 m-auto flex flex-col justify-around">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="bg-primary text-white p-10 rounded-2xl flex flex-col gap-4">
              <h1>{text}</h1>
              {btnEnabled && (
                <>
                  <p>Passwort: {password}</p>
                  <button className="btn" onClick={copyPassword}>
                    Passwort Kopieren
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
