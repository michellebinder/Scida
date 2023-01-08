import React, { useState, useEffect } from "react";
// import nodemailer from 'nodemailer';
import makeRandString from "../gloabl_functions/randString";
import PopUp from "./popUp";

export default function CreateAccount({}) {
  const [firstName, createFirstName] = useState("");
  const [lastName, createLastName] = useState("");
  const [email, createEmail] = useState("");
  const [role, createRole] = useState("");
  const [popUpText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [pwdParam, setPwdParam] = useState(false);

  let password = "";
  let messageBody = "";

  const createPasssword = () => {
    password = makeRandString(8);
    setPwdParam(password);
    messageBody =
      "Sehr geehrter Herr " +
      lastName +
      ",%0D%0A%0D%0A für Sie wurde ein " +
      role +
      "-Acccount an der Uni zu Köln erstellt. Bitte loggen sie sich unter www.scida.de mit folgenden Daten ein:%0D%0A%0D%0ABenutzername: " +
      email +
      "%0D%0APasswort: " +
      password +
      "%0D%0A%0D%0AIhr Scida Support Team%0D%0AUni Zu Köln";

    registerAccount();
  };

  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 8000);
  };

  const registerAccount = async () => {
    const dataBuffer = new TextEncoder().encode(password);
    let hashHex = "";
    // Hash the data using SHA-256
    const hash = await window.crypto.subtle.digest("SHA-256", dataBuffer);
    // Convert the hash to a hexadecimal string
    hashHex = await Array.prototype.map
      .call(new Uint8Array(hash), (x) => ("00" + x.toString(16)).slice(-2))
      .join("");
    const response = await fetch("/api/registerAccount", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, role, hashHex }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    const data = await response.json();
    if (data == "SUCCESS") {
      setPopupText("Der/die Nutzer:in wurde erfolgreich erstellt!");
      window.location.href =
        "mailto:" +
        email +
        "?subject=Uni zu Köln: Scida Account Daten&body=" +
        messageBody;
    } else {
      setPwdParam("");
      setPopupText(
        "Ein Fehler ist aufgetreten! Bitte versuchen Sie es später erneut"
      );
    }
    handleShowPopup();
  };
  return (
    <div className="card card-normal bg-primary text-primary-content mr-3 basis-1/2">
      <div className="card-body flex justify-start flex-col">
        <h2 className="card-title text-white">Neue/n Nutzer:in erstellen</h2>
        <div className="w-11/12 max-w-5xl">
          <p className="text-left mb-5">
            Lege hier eine/n neue/n Nutzer:in an. Einfach die Felder ausfüllen
            und "Nutzer:in erstellen" klicken.
          </p>
          {/* Input group to enter information about the user that will be created */}
          <div>
            {/* Input field for first name */}
            <label
              htmlFor="firstName"
              className="input-group pb-5 flex justify-left text-neutral dark:text-white"
            >
              <span>Vorname</span>
              <input
                onChange={(e) => createFirstName(e.target.value)}
                value={firstName}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Muster"
                className="input input-bordered"
              />
            </label>
            {/* Input field for last name */}
            <label
              htmlFor="lastName"
              className="input-group pb-5 flex justify-left text-neutral dark:text-white"
            >
              <span>Nachname</span>
              <input
                onChange={(e) => createLastName(e.target.value)}
                value={lastName}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Muster"
                className="input input-bordered"
              />
            </label>
            {/* Input field for e-mail address */}
            <label
              htmlFor="email"
              className="input-group pb-5 flex justify-left text-neutral dark:text-white"
            >
              <span>E-Mail</span>
              <input
                onChange={(e) => createEmail(e.target.value)}
                value={email}
                id="email"
                name="email"
                type="text"
                placeholder="muster@smail.uni-koeln.de"
                className="input input-bordered"
              />
            </label>
            {/* Input field for role */}
            <div className="input-group flex justify-left text-neutral dark:text-white">
              <span>Rolle</span>
              <select
                onChange={(e) => createRole(e.target.value)}
                value={role}
                id="role"
                name="role"
                type="text"
                className="select select-bordered"
              >
                <option disabled selected>
                  Wähle eine Rolle aus
                </option>
                <option>Dozierende</option>
                <option>Sekretariat</option>
                <option>Studiendekanat</option>
              </select>
            </div>
          </div>
        </div>
        {/* Button to create user */}

        <button>
          <label onClick={createPasssword} htmlFor="popup_create_user" className="btn mt-28 w-56">
            Nutzer:in erstellen
          </label>
        </button>

        {/* Custom Pop-up window, which appears when the button "Nutzenden erstellen" is clicked */}
        {showPopup && <PopUp password={pwdParam} text={popUpText}></PopUp>}
      </div>
    </div>
  );
}
