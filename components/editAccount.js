import React, { useEffect, useState } from "react";
import PopUp from "./popUp";
import makeRandString from "../gloabl_functions/randString";
const CryptoJS = require("crypto-js");
import { useRouter } from "next/router";

export default function EditAccount({}) {
  const router = useRouter();

  const [search, createSearch] = useState("");
  const [searchIndex, changeIndex] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [length, setLength] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  let users = [];

  const [editFirstName, updateEditFirstName] = useState("");
  const [editLastName, updateEditLastName] = useState("");
  const [editEmail, updateEditEmail] = useState("");
  const [editRole, updateEditRole] = useState("");
  const [editId, updateEditId] = useState("");
  const [popUpText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [pwdParam, setPwdParam] = useState(false);
  const [popUpType, setPopUpType] = useState("");

  let password = "";
  let messageBody = "";
  let email_role = "";

  if (editRole == "B") {
    email_role = "Dozierende";
  } else if (editRole == "scidaSekretariat") {
    email_role = "Sekretariat";
  } else if (editRole == "scidaSekretariat") {
    email_role = "Dekanat";
  }

  useEffect(() => {
    let user = responseMessage.split(";");
    for (let i = 0; i < user.length; i++) {
      if (user[i].length > 2) {
        users.push(user[i].split(","));
      }
    }
    //console.log(users);

    setLength(users.length);
    if (users.length > 0) {
      updateEditFirstName(users[searchIndex][0]);
      updateEditLastName(users[searchIndex][1]);
      updateEditEmail(users[searchIndex][2]);
      updateEditRole(users[searchIndex][3]);
      updateEditId(users[searchIndex][4]);
    } else {
      updateEditFirstName("");
      updateEditLastName("");
      updateEditEmail("");
      updateEditRole("");
      updateEditId("");
    }
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
      setPopupText("Benutzerkonto konnte nicht geändert werden.");
      setPopUpType("");
    } else if (data == "SUCCESS") {
      setPopupText("Änderungen wurden erfolgreich gespeichert.");
      setPopUpType("SUCCESS");
    } else {
      setPopupText("Ein unerwarteter Fehler ist aufgetreten.");
      setPopUpType("ERROR");
    }
    handleShowPopupWithTimer();
    searchUser();
  };

  //Method to show popup
  const handleShowPopup = () => {
    setShowPopup(true);
  };
  const handleShowPopupWithTimer = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  //Const to check if search was successfull -> will enable input fields
  const [searchSuccess, setSearchSuccess] = useState(false);
  //Function to search for user
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
      setPopupText("Benutzerkonto konnte nicht gefunden werden.");
      setPopUpType("");
      handleShowPopupWithTimer();
    } else {
      //console.log(data);
      setResponseMessage(data);
      setSearchSuccess(true);
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
      setPopupText("Benutzerkonto konnte nicht gelöscht werden.");
      setPopUpType("");
    } else if (data == "SUCCESS") {
      setPopupText("Benutzerkonto wurde gelöscht.");
      setPopUpType("SUCCESS");
    } else {
      setPopupText("Ein unbekannter Fehler ist aufgetreten.");
      setPopUpType("ERROR");
    }
    handleShowPopupWithTimer();
  };

  //Function to create a new password
  const createPasssword = () => {
    password = makeRandString(8);
    setPwdParam(password);
    messageBody =
      "Sehr geehrte/r Herr/Frau " +
      editLastName +
      ",%0D%0A%0D%0A für Ihren " +
      email_role +
      "-Acccount für das Blockpraktika-Management Scida an der Universität zu Köln wurde ein neues Passwort generiert. Bitte loggen Sie sich unter www.scida.medfak.uni-koeln.de mit folgenden Daten ein:%0D%0A%0D%0ABenutzername: " +
      editEmail +
      "%0D%0APasswort: " +
      password +
      "%0D%0A%0D%0A%0D%0A%0D%0AMit freundlichen Grüßen%0D%0A%0D%0AIhr Scida-Support%0D%0AUniversität zu Köln";
  };

  //Api call to save new generated password
  const updatePassword = async () => {
    const id = editId;
    //Generate new password
    createPasssword();
    // Hash the data using SHA-256
    const hashHex = CryptoJS.SHA256(password).toString();
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
      router.push(
        "mailto:" +
          editEmail +
          "?subject=Universität zu Köln: Scida Support - Ihr neues Passwort&body=" +
          messageBody
      );
    } else if (data == "Error Code 1") {
      setPwdParam(""); //Nulling the pwd parameter, otherwise it would be displayed on the popup, not necessary here
      setPopupText("Leere Eingabe!");
      setPopUpType("");
    } else if (data == "Error Code 2") {
      setPwdParam(""); //Nulling the pwd parameter, otherwise it would be displayed on the popup, not necessary here
      setPopupText(
        "Ein unbekannter Fehler ist aufgetreten! Bitte versuchen Sie es später erneut."
      );
      setPopUpType("ERROR");
    }
    handleShowPopup();
  };
  return (
    <div className="card card-normal bg-primary text-primary-content mr-3 basis-1/2">
      <div className="card-body">
        <h2 className="card-title text-white text-2xl">
          Nutzer:in bearbeiten / löschen
        </h2>
        <div className="w-11/12 max-w-5xl">
          {/* Input group to enter information about the user that will be created */}
          <div>
            {/* Input field: search */}
            <div className="input-group pb-5">
              <input
                onChange={(e) => {
                  {
                    /* Handling of empty search */
                  }
                  setSearchValue(e.target.value);
                  createSearch(e.target.value);
                }}
                //Allow user to hit enter instead of clicking the button
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    if (searchValue && searchValue.length > 0) {
                      searchUser();
                    }
                  }
                }}
                id="search"
                name="search"
                type="text"
                placeholder="Suche..."
                className="input input-bordered text-neutral dark:text-white w-80"
              />
              <button
                onClick={() => {
                  {
                    /* Handling of empty search */
                  }
                  if (searchValue && searchValue.length > 0) {
                    searchUser();
                  }
                }}
                className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-11"
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
            <label className="input-group pb-5 flex justify-left text-neutral dark:text-white">
              <span className="w-28 font-bold">Vorname</span>
              <input
                type="text"
                value={editFirstName}
                onChange={(e) => updateEditFirstName(e.target.value)}
                placeholder="Muster"
                className="input input-bordered w-72"
                disabled={!searchSuccess}
              />
            </label>
            {/* Input field for last name */}
            {/* Is invisible as long as nothing has been entered to the search field */}
            <label className="input-group pb-5 flex justify-left text-neutral dark:text-white">
              <span className="w-28 font-bold">Nachname</span>
              <input
                type="text"
                value={editLastName}
                onChange={(e) => updateEditLastName(e.target.value)}
                placeholder="Muster"
                className="input input-bordered w-72"
                disabled={!searchSuccess}
              />
            </label>
            {/* Input field for e-mail address */}
            {/* Is invisible as long as nothing has been entered to the search field */}
            <label className="input-group pb-5 flex justify-left text-neutral dark:text-white">
              <span className="w-28 font-bold">E-Mail</span>
              <input
                type="text"
                value={editEmail}
                onChange={(e) => updateEditEmail(e.target.value)}
                placeholder="muster@smail.uni-koeln.de"
                className="input input-bordered w-72"
                disabled={!searchSuccess}
              />
            </label>
            {/* Input field for role */}
            {/* Is invisible as long as nothing has been entered to the search field */}
            <div className="input-group flex justify-left text-neutral dark:text-white">
              <span className="w-28 font-bold mb-5">Rolle</span>
              <select
                value={editRole}
                onChange={(e) => updateEditRole(e.target.value)}
                className="select select-bordered w-72 mb-5"
                disabled={!searchSuccess}
              >
                <option selected>Folgende Rolle wurde gewählt</option>

                <option value="B">Dozierende</option>
                <option value="scidaSekretariat">Sekretariat</option>
                <option value="scidaDekanat">Studiendekanat</option>
              </select>
            </div>
            <div className="flex flex-col lg:flex-row gap-1 mb-3">
              <label
                htmlFor="popup_edit_user"
                onClick={editAccount}
                className="btn flex w-1/2 shadow-none hover:shadow-lg hover:opacity-75 dark:text-white"
                disabled={
                  !editFirstName || !editLastName || !editEmail || !editRole
                }
              >
                Änderungen speichern
              </label>
              {/* Button to generate new password*/}
              {/* Pop-up window (called Modal in daisyUI), which appears when the button "Neues Passwort generieren" is clicked */}
              <label
                htmlFor="popup_updatePassword"
                className="btn flex w-1/2 shadow-none hover:shadow-lg hover:opacity-75 dark:text-white"
                disabled={
                  !editFirstName || !editLastName || !editEmail || !editRole
                }
              >
                Neues Passwort
              </label>
              <input
                type="checkbox"
                id="popup_updatePassword"
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box">
                  <p className="text-lg font-bold text-accent">
                    Sind Sie sicher, dass Sie für diese:n Nutzer:in ein neues
                    Passwort generieren möchten?
                    <br></br>Dies kann nicht rückgängig gemacht werden.
                  </p>
                  <div className="modal-action flex flex-row">
                    <label
                      htmlFor="popup_updatePassword"
                      onClick={updatePassword}
                      className="btn shadow-none hover:shadow-lg hover:opacity-75 basis-1/2"
                    >
                      Ja
                    </label>
                    <label
                      htmlFor="popup_updatePassword"
                      className="btn shadow-none hover:shadow-lg hover:opacity-75 basis-1/2"
                    >
                      Nein
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Button to delete user */}
            {/* Pop-up window (called Modal in daisyUI), which appears when the button "Nutzenden löschen" is clicked */}
            <label
              htmlFor="popup_delete"
              className="btn btn-accent flex justify-left mb-3"
              disabled={
                !editFirstName || !editLastName || !editEmail || !editRole
              }
            >
              Nutzer:in löschen
            </label>
            <input type="checkbox" id="popup_delete" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <p className="text-lg font-bold text-accent">
                  Sind Sie sicher, dass Sie diese:n Nutzer:in löschen möchten?
                  <br></br>Dies kann nicht rückgängig gemacht werden.
                </p>
                <div className="modal-action flex flex-row">
                  <label
                    htmlFor="popup_delete"
                    onClick={deleteUser}
                    className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white basis-1/2"
                  >
                    Ja, löschen
                  </label>
                  <label htmlFor="popup_delete" className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white basis-1/2">
                    Nein, nicht löschen
                  </label>
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              id="popup_edit_user"
              className="modal-toggle"
            />

            {/* Div which contains the buttons for multiple search */}
            <div className="flex flex-row">
              <button
                className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white disabled:text-background"
                disabled={searchIndex < 1}
                onClick={() => changeIndex(searchIndex - 1)}
              >
                &lt;
              </button>
              <p className="bg-secondary text-white pt-3">
                {length > 0 ? searchIndex + 1 : 0} / {length}
              </p>
              <button
                className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white disabled:text-background"
                disabled={searchIndex + 2 > length}
                onClick={() => changeIndex(searchIndex + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div></div>

      {showPopup && (
        <PopUp
          closePopUp={handleClosePopup}
          password={pwdParam}
          text={popUpText}
          type={popUpType}
        ></PopUp>
      )}
    </div>
  );
}
