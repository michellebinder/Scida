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
        <div className="hero grow">
          {/* Grid for layouting welcome text and card components, already responsive */}
          <div className="grid hero-content text-center text-neutral-content lg:p-20">
            <div className="text-secondary">
              <h1 className="mb-5 text-5xl font-bold text-center">
                Accounts verwalten
              </h1>
              <p className="mb-5">
                Hier siehst du alle Nutzenden des Systems (Studierende,
                Dozierende und Mitarbeitende). Du kannst einen neuen Nutzer
                anlegen, indem du auf die Schaltfläche "Neuen Nutzer erstellen"
                klickst.
              </p>
              {/* Div which opens a popup window (called modal in daisyUI) to create a new user */}
              <div>
                {/* The button to open modal */}
                <label htmlFor="newUser" className="btn">
                  Neuen Nutzer erstellen
                </label>

                {/* Put this part before </body> tag */}
                <input
                  type="checkbox"
                  id="newUser"
                  className="modal-toggle"
                />
                <div className="modal flex justify-center">
                  <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">
                      Neuen Nutzer erstellen
                    </h3>
                     {/* Close button in the top right corner */}
                    <label htmlFor="newUser" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <p className="py-4">
                      Lege hier einen neuen Nutzer an. Einfach ausfüllen,
                      speichern drücken und fertig!
                    </p>
                    {/* Input group to enter information about the user that will be created */}
                    <div>
                      {/* Input field for first name */}
                      <label className="input-group pb-5 flex justify-center">
                        <span>Vorname</span>
                        <input
                          type="text"
                          placeholder="Muster"
                          className="input input-bordered"
                        />
                      </label>
                      {/* Input field for last name */}
                      <label className="input-group pb-5 flex justify-center">
                        <span>Nachname</span>
                        <input
                          type="text"
                          placeholder="Muster"
                          className="input input-bordered"
                        />
                      </label>
                      {/* Input field for e-mail address */}
                      <label className="input-group pb-5 flex justify-center">
                        <span>E-Mail</span>
                        <input
                          type="text"
                          placeholder="muster@smail.uni-koeln.de"
                          className="input input-bordered"
                        />
                      </label>
                      {/* Input field for role */}
                      <div className="input-group flex justify-center">
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
                      <button className="btn mt-5">Nutzenden anlegen</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Div which contains the table displaying all users */}
              {/* TODO: add backend connection, so that real values are displayed in the table */}
              <div className="overflow-x-auto pt-10">
                <table className="table w-full">
                  {/* Head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Vorname</th>
                      <th>Nachname</th>
                      <th>E-Mail Adresse</th>
                      <th>Rolle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="hover">
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Cy Ganderton</td>
                      <td>Cy Ganderton</td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover">
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Cy Ganderton</td>
                      <td>Cy Ganderton</td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover">
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Cy Ganderton</td>
                      <td>Cy Ganderton</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
