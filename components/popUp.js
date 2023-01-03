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

  if (type == "SUCCESS") {
    return (
      <>
        <div className="fixed z-10 left-0 right-0 top-0 bottom-0 m-auto flex flex-col justify-around">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              <div className="alert alert-success shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h1 className="text-neutral">{text}</h1>
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
  } else if (type == "ERROR") {
    return (
      <>
        <div className="fixed z-10 left-0 right-0 top-0 bottom-0 m-auto flex flex-col justify-around">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              <div className="alert alert-error shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h1 className="text-neutral">{text}</h1>
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
  } else {
    return (
      <>
        <div className="fixed z-10 left-0 right-0 top-0 bottom-0 m-auto flex flex-col justify-around">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              <div className="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h1 className="text-neutral">{text}</h1>
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
}
