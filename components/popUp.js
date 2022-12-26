import { parseStream } from "fast-csv";
import React, { useState } from "react";

export default function PopUp({ text = "", password = "" }) {
  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };
  return (
    <>
      <input type="checkbox" id="popup_create_user" className="modal-toggle" />

      <label htmlFor="popup_create_user" className="modal cursor-pointer">
        <label className="modal-box relative">
          {/* TODO backend: check whether the user really has been added successfully */}
          <p className="text-lg font-bold text-white">{text + password}</p>
          <button className="btn" onClick={copyPassword}>
            Passwort Kopieren
          </button>
        </label>
      </label>
    </>
  );
}
