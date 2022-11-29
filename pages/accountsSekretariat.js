import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";

export default function Home() {
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
        <div className="hero bg-white">
          {/* Grid for layouting welcome text and card components, already responsive */}
          <div className="grid  hero-content text-center text-neutral-content lg:p-20 bg-white">
            <div className="text-secondary">
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
                {/* single daisyUI card component for creating a user*/}
                <div className="card card-normal bg-primary text-primary-content mr-3 text-center">
                  <div className="card-body">
                    <h2 className="card-title text-white flex justify-center">
                      Neuen Nutzer erstellen
                    </h2>
                    <div className="w-11/12 max-w-5xl">
                      <p className="text-center mb-5">
                        Lege hier einen neuen Nutzer an. Einfach die Felder ausfüllen und "Nutzenden erstellen" klicken. 
                      </p>
                      {/* Input group to enter information about the user that will be created */}
                      <div>
                        {/* Input field for first name */}
                        <label className="input-group pb-5 flex justify-center text-neutral">
                          <span>Vorname</span>
                          <input
                            type="text"
                            placeholder="Muster"
                            className="input input-bordered"
                          />
                        </label>
                        {/* Input field for last name */}
                        <label className="input-group pb-5 flex justify-center text-neutral">
                          <span>Nachname</span>
                          <input
                            type="text"
                            placeholder="Muster"
                            className="input input-bordered"
                          />
                        </label>
                        {/* Input field for e-mail address */}
                        <label className="input-group pb-5 flex justify-center text-neutral">
                          <span>E-Mail</span>
                          <input
                            type="text"
                            placeholder="muster@smail.uni-koeln.de"
                            className="input input-bordered"
                          />
                        </label>
                        {/* Input field for role */}
                        <div className="input-group flex justify-center text-neutral">
                          <span>Rolle</span>
                          <select className="select select-bordered">
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
                    <label htmlFor="popup_create_user" className="btn mt-10 w-56 ml-96">
                      Nutzenden erstellen
                    </label>
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
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
  );
}
