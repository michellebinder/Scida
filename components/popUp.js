import { parseStream } from "fast-csv";
import React, { useState } from "react";
import { blueGray } from "tailwindcss/colors";

export default function PopUp({
  text = "",
  password = "",
  btnEnabled = false,
  type = "", //success, error or blank for different colors
}) {
  btnEnabled = password != ""; //only if password exist, copy password activated
  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  //Set color depending on type
  const bgColor = "";
  if (type == "success") {
    bgColor = "bg-success p-10 rounded-2xl flex flex-col gap-4";
  } else if (type == "error") {
    bgColor = "bg-error p-10 rounded-2xl flex flex-col gap-4";
  } else {
    bgColor = "bg-gray-800 p-10 rounded-2xl flex flex-col gap-4";
  }
  return (
    <>
      <div className="fixed z-10 left-0 right-0 top-0 bottom-0 m-auto flex flex-col justify-around">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center">
            <div className={bgColor}>
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
