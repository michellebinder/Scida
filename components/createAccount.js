import React, { useState, useEffect } from "react";
// import nodemailer from 'nodemailer';
import makeRandString from "../gloabl_functions/randString";
import PopUp from "./popUp";
import { useRouter } from "next/router";
const CryptoJS = require("crypto-js");

export default function CreateAccount({}) {
  //Router for email
  const router = useRouter();

  const [firstName, createFirstName] = useState("");
  const [lastName, createLastName] = useState("");
  const [email, createEmail] = useState("");
  const [role, createRole] = useState("");
  const [popUpText, setPopupText] = useState("");
  const [popUpType, setPopUpType] = useState(""); //Const to handle popup color
  const [showPopup, setShowPopup] = useState(false);
  const [pwdParam, setPwdParam] = useState(false);

  let password = "";
  let messageBody = "";
  let email_role = "";

  if (role == "B") {
    email_role = "Dozierende";
  } else if (role == "scidaSekretariat") {
    email_role = "Sekretariat";
  } else if (role == "scidaSekretariat") {
    email_role = "Dekanat";
  }

  const createPasssword = () => {
    password = makeRandString(8);
    setPwdParam(password);
    messageBody =
      "Sehr geehrte/r Herr/Frau " +
      lastName +
      ",%0D%0A%0D%0A für Sie wurde ein " +
      email_role +
      "-Acccount für das Blockpraktika-Management Scida an der Universität zu Köln erstellt. Bitte loggen Sie sich unter www.scida.medfak.uni-koeln.de mit folgenden Daten ein:%0D%0A%0D%0ABenutzername: " +
      email +
      "%0D%0APasswort: " +
      password +
      "%0D%0A%0D%0A%0D%0A%0D%0AMit freundlichen Grüßen%0D%0A%0D%0AIhr Scida-Support%0D%0AUniversität zu Köln";

    registerAccount();
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const registerAccount = async () => {
    // Hash the data using SHA-256
    const hashHex = CryptoJS.SHA256(password).toString();
    console.log(hashHex);
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
      router.push(
        "mailto:" +
          email +
          "?subject=Universität zu Köln: Login-Daten für das Blockpraktika-Managementsystem Scida&body=" +
          messageBody
      );
    } else {
      setPopUpType("ERROR");
      setPwdParam("");
      setPopupText(
        "Ein Fehler ist aufgetreten! Bitte versuchen Sie es später erneut."
      );
    }
    handleShowPopup();
  };
  return (
    <div className="card card-normal bg-primary text-primary-content mr-3 basis-1/2">
      <div className="card-body flex justify-start flex-col">
        <h2 className="card-title text-white text-2xl">
          Neue/n Nutzer:in erstellen
        </h2>
        {/* Input group to enter information about the user that will be created */}
        <div className="mb-10">
          {/* Input field for first name */}
          <label
            htmlFor="firstName"
            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
          >
            <span className="w-28 font-bold">Vorname</span>
            <input
              onChange={(e) => createFirstName(e.target.value)}
              value={firstName}
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Muster"
              className="input input-bordered w-60"
            />
          </label>
          {/* Input field for last name */}
          <label
            htmlFor="lastName"
            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
          >
            <span className="w-28 font-bold">Nachname</span>
            <input
              onChange={(e) => createLastName(e.target.value)}
              value={lastName}
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Muster"
              className="input input-bordered w-60"
            />
          </label>
          {/* Input field for e-mail address */}
          <label
            htmlFor="email"
            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
          >
            <span className="w-28 font-bold">E-Mail</span>
            <input
              onChange={(e) => createEmail(e.target.value)}
              value={email}
              id="email"
              name="email"
              type="text"
              placeholder="muster@smail.uni-koeln.de"
              className="input input-bordered w-60"
            />
          </label>
          {/* Input field for role */}
          <div className="input-group flex justify-left text-neutral dark:text-white pb-5">
            <span className="w-28 font-bold">Rolle</span>
            <select
              onChange={(e) => createRole(e.target.value)}
              value={role}
              id="role"
              name="role"
              type="text"
              className="select select-bordered w-60"
            >
              <option selected>Wählen Sie eine Rolle aus</option>
              <option value="B">Dozierende</option>
              <option value="scidaSekretariat">Sekretariat</option>
              <option value="scidaDekanat">Studiendekanat</option>
            </select>
          </div>
        </div>
        {/* Button to create user */}
        <div>
          <label
            onClick={createPasssword}
            htmlFor="popup_create_user"
            className="btn w-fit flex justify-left shadow-none hover:shadow-lg hover:opacity-75 dark:text-white"
            disabled={!firstName || !lastName || !email || !role}
          >
            Nutzer:in erstellen
          </label>
        </div>
        {/* Custom Pop-up window, which appears when the button "Nutzenden erstellen" is clicked */}
        {showPopup && (
          <PopUp
            closePopUp={handleClosePopup}
            password={pwdParam}
            text={popUpText}
            type={popUpType}
          ></PopUp>
        )}
      </div>
    </div>
  );
}
