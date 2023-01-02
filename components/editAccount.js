import React, { useEffect, useState } from "react";
import PopUp from "./popUp";
import makeRandString from "../gloabl_functions/randString";

export default function EditAccount({}) {
  const [search, createSearch] = useState("");
  const [searchIndex, changeIndex] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [length, setLength] = useState(0);

  let users = [];

  const [editFirstName, updateEditFirstName] = useState("");
  const [editLastName, updateEditLastName] = useState("");
  const [editEmail, updateEditEmail] = useState("");
  const [editRole, updateEditRole] = useState("");
  const [editId, updateEditId] = useState("");
  const [popUpText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [pwdParam, setPwdParam] = useState(false);

  let password = "";
  let messageBody = "";

  useEffect(() => {
    let user = responseMessage.split(";");
    for (let i = 0; i < user.length; i++) {
      users.push(user[i].split(","));
    }

    setLength(users.length);

    updateEditFirstName(users[searchIndex][0]);
    updateEditLastName(users[searchIndex][1]);
    updateEditEmail(users[searchIndex][2]);
    updateEditRole(users[searchIndex][3]);
    updateEditId(users[searchIndex][4]);
  }, [responseMessage, searchIndex]);

  //Api call to edit a user
  const editAccount = async () => {
    //POSTING the credentials
    const response = await fetch("/api/editAccount", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({
        editId,
        editFirstName,
        editLastName,
        editEmail,
        editRole,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPwdParam(""); //Nulling the pwd parameter, otherwise it would be displayed on the popup, not necessary here
    if (data == "FAIL CODE 2") {
      setPopupText("Benutzerkonto konnte nicht geändert werden");
    } else if (data == "SUCCESS") {
      setPopupText("Änderungen wurden erfolgreich gespeichert");
    } else {
      setPopupText("Ein unbekannter Fehler ist aufgetreten");
    }
    handleShowPopup();
    searchUser();
  };

  //Method to show popup
  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 8000);
  };

  const searchUser = async () => {
    changeIndex(0);
    //POSTING the credentials
    const response = await fetch("/api/getAccounts", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({ search }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    const data = await response.json();
    setPwdParam(""); //Nulling the pwd parameter, otherwise it would be displayed on the popup, not necessary here
    if (data == "FAIL CODE 3") {
      setPopupText("Benutzerkonto konnte nicht gefunden werden");
      handleShowPopup();
    } else {
      setResponseMessage(data);
    }
  };

  //Api call to delete a user
  const deleteUser = async () => {
    //POSTING the credentials
    const id = editId;
    const response = await fetch("/api/deleteAccount", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    const data = await response.json();
    updateEditFirstName("");
    updateEditLastName("");
    updateEditEmail("");
    updateEditRole("");
    updateEditId("");
    setPwdParam(""); //Nulling the pwd parameter, otherwise it would be displayed on the popup, not necessary here
    if (data == "FAIL CODE 4") {
      setPopupText("Benutzerkonto konnte nicht gelöscht werden");
    } else if (data == "SUCCESS") {
      setPopupText("Benutzerkonto wurde gelöscht");
    } else {
      setPopupText("Ein unbekannter Fehler ist aufgetreten");
    }
    handleShowPopup();
  };

  //Function to create a new password
  const createPasssword = () => {
    password = makeRandString(8);
    setPwdParam(password);
    messageBody =
      "Sehr geehrter Herr " +
      editLastName +
      ",%0D%0A%0D%0A für Ihren " +
      editRole +
      "-Acccount an der Uni zu Köln, wurde ein neues Passwort generiert. Bitte loggen sie sich unter www.scida.de mit folgenden Daten ein:%0D%0A%0D%0ABenutzername: " +
      editEmail +
      "%0D%0APasswort: " +
      password +
      "%0D%0A%0D%0AIhr Scida Support Team%0D%0AUni Zu Köln";

    console.log("msg: " + messageBody);
  };

  //Api call to save new generated password
  const updatePassword = async () => {
    const id = editId;
    console.log(id);
    //Generate new password
    createPasssword();
    const dataBuffer = new TextEncoder().encode(password);
    let hashHex = "";
    // Hash the data using SHA-256
    const hash = await window.crypto.subtle.digest("SHA-256", dataBuffer);
    // Convert the hash to a hexadecimal string
    hashHex = await Array.prototype.map
      .call(new Uint8Array(hash), (x) => ("00" + x.toString(16)).slice(-2))
      .join("");

    const response = await fetch("/api/updatePassword", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({ hashHex, id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    const data = await response.json();
    if (data == "SUCCESS") {
      setPopupText("Ein neues Passwort wurde erfolgreich generiert!");
      window.location.href =
        "mailto:" +
        editEmail +
        "?subject=Scida Support: Ihr neues Passwort&body=" +
        messageBody;
    } else if (data == "Error Code 1") {
      setPwdParam(""); //Nulling the pwd parameter, otherwise it would be displayed on the popup, not necessary here
      setPopupText("Leere Eingabe!");
    } else if (data == "Error Code 2") {
      setPwdParam(""); //Nulling the pwd parameter, otherwise it would be displayed on the popup, not necessary here
      setPopupText(
        "Ein unbekannter Fehler ist aufgetreten! Bitte versuchen Sie es später erneut."
      );
    }
    handleShowPopup();
  };
  return (
    <div className="card card-normal bg-primary text-primary-content mr-3 basis-1/2">
      <div className="card-body">
        <h2 className="card-title text-white">
          Nutzer:in bearbeiten / löschen
        </h2>
        <div className="w-11/12 max-w-5xl">
          <p className="text-left mb-5">
            Bearbeite oder lösche Nutzende hier. Gib in das Suchfeld Namen,
            Matrikelnummer oder E-Mail Adresse ein.<br></br> Dann kannst du
            den/die Nutzer:in bearbeiten oder löschen.
          </p>
          {/* Input group to enter information about the user that will be created */}
          <div>
            {/* Input field: search */}
            <div className="input-group pb-5">
              <input
                onChange={(e) => createSearch(e.target.value)}
                id="search"
                name="search"
                type="text"
                placeholder="Suche..."
                className="input input-bordered text-neutral dark:text-white"
              />
              <button onClick={searchUser} className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-28"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            {/* Input field for first name */}
            {/* Is invisible as long as nothing has been entered to the search field */}
            {/* Todo: Make visible when user has been found and fill fields with corresponding values */}
            <label className="input-group pb-5 flex justify-left text-neutral dark:text-white">
              <span>Vorname</span>
              <input
                type="text"
                value={editFirstName}
                onChange={(e) => updateEditFirstName(e.target.value)}
                placeholder="Muster"
                className="input input-bordered"
              />
            </label>
            {/* Input field for last name */}
            {/* Is invisible as long as nothing has been entered to the search field */}
            {/* Todo: Make visible when user has been found and fill fields with corresponding values */}
            <label className="input-group pb-5 flex justify-left text-neutral dark:text-white">
              <span>Nachname</span>
              <input
                type="text"
                value={editLastName}
                onChange={(e) => updateEditLastName(e.target.value)}
                placeholder="Muster"
                className="input input-bordered"
              />
            </label>
            {/* Input field for e-mail address */}
            {/* Is invisible as long as nothing has been entered to the search field */}
            {/* Todo: Make visible when user has been found and fill fields with corresponding values */}
            <label className="input-group pb-5 flex justify-left text-neutral dark:text-white">
              <span>E-Mail</span>
              <input
                type="text"
                value={editEmail}
                onChange={(e) => updateEditEmail(e.target.value)}
                placeholder="muster@smail.uni-koeln.de"
                className="input input-bordered"
              />
            </label>
            {/* Input field for role */}
            {/* Is invisible as long as nothing has been entered to the search field */}
            {/* Todo: Make visible when user has been found and fill fields with corresponding values */}
            <div className="input-group flex justify-left text-neutral dark:text-white">
              <span>Rolle</span>
              <select
                value={editRole}
                onChange={(e) => updateEditRole(e.target.value)}
                className="select select-bordered"
              >
                <option disabled selected>
                  Ausgewählt:
                </option>

                <option>Dozierende</option>
                <option>Sekretariat</option>
                <option>Studiendekanat</option>
              </select>
            </div>
            {/* Div which contains the buttons for multiple search */}
            <div className="flex flex-row mt-10">
              <button
                className="btn w-50 disabled:text-white opacity-70"
                disabled={searchIndex < 1}
                onClick={() => changeIndex(searchIndex - 1)}
              >
                &lt;
              </button>
              <p className="w-10 bg-secondary text-white pt-3">
                {searchIndex + 1} / {length}
              </p>
              <button
                className="btn w-50 disabled:text-white opacity-70"
                disabled={searchIndex + 2 > length}
                onClick={() => changeIndex(searchIndex + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        {/* Div which positions buttons next to each other */}
      </div>
      <div>
        {/* Div which positions buttons next to each other */}
        {/* Button to save edit */}
        {/* Pop-up window (called Modal in daisyUI), which appears when the button "Änderungen speichern" is clicked */}
        {/* TODO backend: update user entries in database with values from the above input fields */}
        {/* Button to save edit */}
        {/* Pop-up window (called Modal in daisyUI), which appears when the button "Änderungen speichern" is clicked */}
        {/* TODO backend: update user entries in database with values from the above input fields */}
        <label
          htmlFor="popup_edit_user"
          onClick={editAccount}
          className="btn m-1"
        >
          Änderungen speichern
        </label>
        <input type="checkbox" id="popup_edit_user" className="modal-toggle" />
        {/* Button to generate new password*/}
        {/* Pop-up window (called Modal in daisyUI), which appears when the button "Neues Passwort generieren" is clicked */}
        <label htmlFor="popup_updatePassword" className="btn m-1">
          Neues Passwort generieren
        </label>
        <input
          type="checkbox"
          id="popup_updatePassword"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <p className="py-4 text-lg font-bold text-accent">
              Bist du sicher, dass du für diese:n Nutzer:in ein neues Passwort
              generieren möchtest?
              <br></br>Dies kann nicht rückgängig gemacht werden.
            </p>
            <div className="modal-action flex flex-row">
              <label
                htmlFor="popup_updatePassword"
                onClick={updatePassword}
                className="btn  basis-1/2"
              >
                Ja
              </label>
              <label htmlFor="popup_updatePassword" className="btn  basis-1/2">
                Nein
              </label>
            </div>
          </div>
        </div>
        {/* Button to delete user */}
        {/* Pop-up window (called Modal in daisyUI), which appears when the button "Nutzenden löschen" is clicked */}
        <label htmlFor="popup_delete" className="btn btn-accent m-1">
          Nutzer:in löschen
        </label>
        <input type="checkbox" id="popup_delete" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <p className="py-4 text-lg font-bold text-accent">
              Bist du sicher, dass du diese:n Nutzer:in löschen möchtest?
              <br></br>Dies kann nicht rückgängig gemacht werden.
            </p>
            <div className="modal-action flex flex-row">
              {/* TODO backend: Delete user when this button is clicked */}
              <label
                htmlFor="popup_delete"
                onClick={deleteUser}
                className="btn  basis-1/2"
              >
                Ja, löschen.
              </label>
              <label htmlFor="popup_delete" className="btn  basis-1/2">
                Nein, nicht löschen.
              </label>
            </div>
          </div>
        </div>
      </div>

      {showPopup && <PopUp password={pwdParam} text={popUpText}></PopUp>}
    </div>
  );
}
