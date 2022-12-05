import Head from "next/head";
import React, { useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import { useState } from "react";

export default function Home() {
  const [firstName, createFirstName] = useState("");
  const [lastName, createLastName] = useState("");
  const [email, createEmail] = useState("");
  const [role, createRole] = useState("");
  const [search, createSearch] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  let arr = {};

  const registerAccount = async () => {
    //POSTING the credentials
    const response = await fetch("/api/registerAccount", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, role }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    //const data = await response.json();
    //setResponseMessage(data);
  };

  const searchUser = async () => {
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
    setResponseMessage(data);
  };
  const deleteUser = async () => {
    //POSTING the credentials
    const id = responseMessage.split(";")[4];
    console.log(id);
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
    setResponseMessage(data);
  };
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* Div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* Dashboard navbar with navigation items  */}
        <Navbar></Navbar>
        <div className="hero">
          {/* Grid for layouting welcome text and card components, already responsive */}
          <div className="grid  hero-content text-center text-neutral-content lg:p-20">
            <div className="text-secondary dark:text-white">
              <h1 className="mb-5 text-5xl font-bold text-center">
                Accounts verwalten
              </h1>
              <p className="mb-5">
                Hier kannst du alle Nutzenden des Systems verwalten. Fülle das
                linke Formular aus, um einen neuen Nutzer anzulegen. Suche
                rechts nach Nutzenden, um sie zu bearbeiten, oder zu löschen. Du
                kannst nach beliebigen Eigenschaften suchen: Nach Vor- oder
                Nachname, nach Matrikelnummer oder E-Mail Adresse.
              </p>
              {/* div which controls the positioning of the card components (Nutzer erstellen, Nutzer bearbeiten)*/}
              <div className="flex flex-row">
                {/* single daisyUI card component for creating a user*/}
                <div className="card card-normal bg-primary text-primary-content mr-3 basis-1/2 ">
                  <div className="card-body">
                    <h2 className="card-title text-white">
                      Neuen Nutzer erstellen
                    </h2>
                    <div className="w-11/12 max-w-5xl">
                      <p className="text-left mb-5">
                        Lege hier einen neuen Nutzer an. Einfach die Felder
                        ausfüllen und "Nutzenden erstellen" klicken.
                      </p>
                      {/* Input group to enter information about the user that will be created */}
                      <div>
                        {/* Input field for first name */}
                        <label
                          htlmFor="firstName"
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
                        <div className="input-group flex justify-left">
                          <span className="text-neutral dark:text-white">Rolle</span>
                          <select
                            onChange={(e) => createRole(e.target.value)}
                            value={role}
                            id="role"
                            name="role"
                            type="text"
                            className="select select-bordered text-neutral dark:text-white"
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

                    <button onClick={registerAccount} value="sign">
                      <label
                        htmlFor="popup_create_user"
                        className="btn mt-28 w-56"
                      >
                        Nutzenden erstellen
                      </label>
                    </button>

                    {/* Pop-up window (called Modal in daisyUI), which appears when the button "Nutzenden erstellen" is clicked */}

                    <input
                      type="checkbox"
                      id="popup_create_user"
                      className="modal-toggle"
                    />

                    <label
                      htmlFor="popup_create_user"
                      className="modal cursor-pointer"
                    >
                      <label className="modal-box relative" htmlFor="">
                        {/* TODO backend: check whether the user really has been added successfully */}
                        <p className="text-lg font-bold text-neutral">
                          Der/die Nutzer:in wurde erfolgreich erstellt!
                        </p>
                      </label>
                    </label>
                  </div>
                </div>
                {/* single daisyUI card component for editing/deleting a user*/}
                <div className="card card-normal bg-primary text-primary-content mr-3 basis-1/2">
                  <div className="card-body">
                    <h2 className="card-title text-white">
                      Nutzer bearbeiten / löschen
                    </h2>
                    <div className="w-11/12 max-w-5xl">
                      <p className="text-left mb-5">
                        Bearbeite oder lösche Nutzende hier. Gib in das Suchfeld
                        Namen, Matrikelnummer oder E-Mail Adresse ein.<br></br>{" "}
                        Dann kannst du den Nutzenden bearbeiten oder löschen.
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
                            className="input input-bordered text-neutral"
                          />
                          <button
                            onClick={searchUser}
                            className="btn btn-square"
                          >
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
                            value={responseMessage.split(";")[0]}
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
                            value={responseMessage.split(";")[1]}
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
                            value={responseMessage.split(";")[2]}
                            placeholder="muster@smail.uni-koeln.de"
                            className="input input-bordered"
                          />
                        </label>
                        {/* Input field for role */}
                        {/* Is invisible as long as nothing has been entered to the search field */}
                        {/* Todo: Make visible when user has been found and fill fields with corresponding values */}
                        <div className="input-group flex justify-left text-neutral dark:text-white">
                          <span>Rolle</span>
                          <select className="select select-bordered">
                            <option disabled selected>
                              Ausgewählt:
                            </option>
                            <option selected>
                              {responseMessage.split(";")[3]}
                            </option>
                            <option>Dozierende</option>
                            <option>Sekretariat</option>
                            <option>Studiendekanat</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Div which positions buttons next to each other */}
                    <div className="flex flex-row">
                      {/* Button to save edit */}
                      {/* Pop-up window (called Modal in daisyUI), which appears when the button "Änderungen speichern" is clicked */}
                      {/* TODO backend: update user entries in database with values from the above input fields */}
                      <label
                        htmlFor="popup_save"
                        className="btn mt-5 w-56 mr-2"
                      >
                        Änderungen speichern
                      </label>
                      <input
                        type="checkbox"
                        id="popup_save"
                        className="modal-toggle"
                      />
                      <label
                        htmlFor="popup_save"
                        className="modal cursor-pointer"
                      >
                        <label className="modal-box relative" htmlFor="">
                          {/* TODO backend: check whether changes really have been saved successfully */}
                          <p className="text-lg font-bold text-neutral">
                            Deine Änderungen wurden erfolgreich gespeichert!
                          </p>
                        </label>
                      </label>
                      {/* Button to delete user */}
                      {/* Pop-up window (called Modal in daisyUI), which appears when the button "Nutzenden löschen" is clicked */}
                      <label
                        htmlFor="popup_delete"
                        className="btn btn-accent mt-5 w-56 mr-2"
                      >
                        Nutzenden löschen
                      </label>
                      <input
                        type="checkbox"
                        id="popup_delete"
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box">
                          <p className="py-4 text-lg font-bold text-accent">
                            Bist du sicher, dass du diese:n Nutzer:in löschen
                            möchtest?
                            <br></br>Das kann nicht rückgängig gemacht werden.
                          </p>
                          <div className="modal-action flex fles-row">
                            {/* TODO backend: Delete user when this button is clicked */}
                            <label
                              htmlFor="popup_delete"
                              onClick={deleteUser}
                              className="btn  basis-1/2"
                            >
                              Ja, löschen.
                            </label>
                            <label
                              htmlFor="popup_delete"
                              className="btn  basis-1/2"
                            >
                              Nein, nicht löschen.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
