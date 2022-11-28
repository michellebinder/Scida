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
        <div className="hero">
          {/* Grid for layouting welcome text and card components, already responsive */}
          <div className="grid  hero-content text-center text-neutral-content lg:p-20">
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
              <div className="flex flex-row">
                {/* single daisyUI card component for creating a user*/}
                <div className="card card-normal bg-primary text-primary-content mr-3 basis-1/2">
                  <div className="card-body">
                    <h2 className="card-title text-white">
                      Neuen Nutzer erstellen
                    </h2>
                    <div className="w-11/12 max-w-5xl">
                      <p className="text-left mb-5">
                        Lege hier einen neuen Nutzer an. Einfach ausfüllen,
                        speichern drücken und fertig!
                      </p>
                      {/* Input group to enter information about the user that will be created */}
                      <div>
                        {/* Input field for first name */}
                        <label className="input-group pb-5 flex justify-left text-neutral">
                          <span>Vorname</span>
                          <input
                            type="text"
                            placeholder="Muster"
                            className="input input-bordered"
                          />
                        </label>
                        {/* Input field for last name */}
                        <label className="input-group pb-5 flex justify-left text-neutral">
                          <span>Nachname</span>
                          <input
                            type="text"
                            placeholder="Muster"
                            className="input input-bordered"
                          />
                        </label>
                        {/* Input field for e-mail address */}
                        <label className="input-group pb-5 flex justify-left text-neutral">
                          <span>E-Mail</span>
                          <input
                            type="text"
                            placeholder="muster@smail.uni-koeln.de"
                            className="input input-bordered"
                          />
                        </label>
                        {/* Input field for role */}
                        <div className="input-group flex justify-left text-neutral">
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
                    <button className="btn mt-28 w-56">
                      Nutzenden erstellen
                    </button>
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
                       {/* Input field: search */}
                      <div>
                          <div className="input-group pb-5">
                            <input
                              type="text"
                              placeholder="Suche..."
                              className="input input-bordered"
                            />
                            <button className="btn btn-square">
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
                        <label className="invisible input-group pb-5 flex justify-left text-neutral">
                          <span>Vorname</span>
                          <input
                            type="text"
                            placeholder="Muster"
                            className="input input-bordered"
                          />
                        </label>
                        {/* Input field for last name */}
                        {/* Is invisible as long as nothing has been entered to the search field */}
                        <label className="invisible input-group pb-5 flex justify-left text-neutral">
                          <span>Nachname</span>
                          <input
                            type="text"
                            placeholder="Muster"
                            className="input input-bordered"
                          />
                        </label>
                        {/* Input field for e-mail address */}
                        {/* Is invisible as long as nothing has been entered to the search field */}
                        <label className="invisible input-group pb-5 flex justify-left text-neutral">
                          <span>E-Mail</span>
                          <input
                            type="text"
                            placeholder="muster@smail.uni-koeln.de"
                            className="input input-bordered"
                          />
                        </label>
                        {/* Input field for role */}
                        {/* Is invisible as long as nothing has been entered to the search field */}
                        <div className="invisible input-group flex justify-left text-neutral">
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
                    {/* Div which positions buttons next to each other */}
                    <div className="flex flex-row">
                    {/* Button to save edit */}
                    <button className="btn mt-5 w-56 mr-2">
                      Änderungen speichern
                    </button>
                     {/* Button to delete user */}
                    <button className="btn btn-accent mt-5 w-56 ml-2">
                      Nutzenden löschen
                    </button>
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
