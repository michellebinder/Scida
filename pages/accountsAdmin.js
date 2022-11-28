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
                      <button className="btn mt-10 w-56">Nutzenden erstellen</button>
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
                          Bearbeite oder lösche Nutzende hier. Gib in das Suchfeld Namen, Matrikelnummer oder E-Mail Adresse ein.<br></br> Dann kannst du den Nutzenden bearbeiten oder löschen.
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
                      <button className="btn mt-5 w-56">Nutzenden erstellen</button>
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
