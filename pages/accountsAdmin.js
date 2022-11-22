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

                <input type="checkbox" id="newUser" className="modal-toggle" />
                <div className="modal flex justify-center">
                  <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">
                      Neuen Nutzer erstellen
                    </h3>
                    {/* Close button in the top right corner */}
                    <label
                      htmlFor="newUser"
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
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
                      {/* TODO: Only make button clickable when all input-fields have been filled */}
                      <button className="btn mt-5">Nutzer anlegen</button>
                      {/* Notification when Button above is clicked */}
                      {/* TODO: Only show notification when button has been clicked */}
                      <div className="alert alert-success shadow-lg mt-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Nutzer wurde erfolgreich erstellt!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Div which contains the table displaying all users */}
              {/* TODO: backend: add connection, so that real values are displayed in the table */}
              <div className="overflow-x-auto pt-10">
                {/* TODO: frontend: fix size of the rows (they are too big) */}
                <table className="table w-full ">
                  {/* Head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Vorname</th>
                      <th>Nachname</th>
                      <th>E-Mail Adresse</th>
                      <th>Rolle</th>
                      {/* TODO: Add functionality to modify an account (use modal, s.o.) */}
                      <th>Bearbeiten</th>
                      {/* TODO: Add functionality to delete an account (modal with text: are you sure you want to delete this account?) */}
                      {/* TODO: backend: Add functionality to delete an account */}
                      <th>Löschen</th>
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
                      <td>
                        {/* TODO: Fix size and position of the image */}
                        <svg class="svg-icon align-middle" viewBox="0 0 80 80">
                          <path
                            fill="black"
                            d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
                          ></path>
                        </svg>
                      </td>
                      <td>
                        {/* TODO: Fix size and position of the image */}
                        <svg class="svg-icon" viewBox="0 0 80 80">
                          <path
                            fill="red"
                            d="M18.693,3.338h-1.35l0.323-1.834c0.046-0.262-0.027-0.536-0.198-0.739c-0.173-0.206-0.428-0.325-0.695-0.325
							H3.434c-0.262,0-0.513,0.114-0.685,0.312c-0.173,0.197-0.25,0.46-0.215,0.721L2.79,3.338H1.307c-0.502,0-0.908,0.406-0.908,0.908
							c0,0.502,0.406,0.908,0.908,0.908h1.683l1.721,13.613c0.057,0.454,0.444,0.795,0.901,0.795h8.722c0.458,0,0.845-0.34,0.902-0.795
							l1.72-13.613h1.737c0.502,0,0.908-0.406,0.908-0.908C19.601,3.744,19.195,3.338,18.693,3.338z M15.69,2.255L15.5,3.334H4.623
							L4.476,2.255H15.69z M13.535,17.745H6.413L4.826,5.193H15.12L13.535,17.745z"
                          ></path>
                        </svg>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover">
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Cy Ganderton</td>
                      <td>Cy Ganderton</td>
                      <td>
                        {/* TODO: Fix size and position of the image */}
                        <svg class="svg-icon" viewBox="0 0 80 80">
                          <path
                            fill="black"
                            d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
                          ></path>
                        </svg>
                      </td>
                      <td>
                        {/* TODO: Fix size and position of the image */}
                        <svg class="svg-icon" viewBox="0 0 80 80">
                          <path
                            fill="red"
                            d="M18.693,3.338h-1.35l0.323-1.834c0.046-0.262-0.027-0.536-0.198-0.739c-0.173-0.206-0.428-0.325-0.695-0.325
							H3.434c-0.262,0-0.513,0.114-0.685,0.312c-0.173,0.197-0.25,0.46-0.215,0.721L2.79,3.338H1.307c-0.502,0-0.908,0.406-0.908,0.908
							c0,0.502,0.406,0.908,0.908,0.908h1.683l1.721,13.613c0.057,0.454,0.444,0.795,0.901,0.795h8.722c0.458,0,0.845-0.34,0.902-0.795
							l1.72-13.613h1.737c0.502,0,0.908-0.406,0.908-0.908C19.601,3.744,19.195,3.338,18.693,3.338z M15.69,2.255L15.5,3.334H4.623
							L4.476,2.255H15.69z M13.535,17.745H6.413L4.826,5.193H15.12L13.535,17.745z"
                          ></path>
                        </svg>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover">
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Cy Ganderton</td>
                      <td>Cy Ganderton</td>
                      <td>
                        {/* TODO: Fix size and position of the image */}
                        <svg class="svg-icon" viewBox="0 0 80 80">
                          <path
                            fill="black"
                            d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
                          ></path>
                        </svg>
                      </td>
                      <td>
                        {/* TODO: Fix size and position of the image */}
                        <svg class="svg-icon" viewBox="0 0 80 80">
                          <path
                            fill="red"
                            d="M18.693,3.338h-1.35l0.323-1.834c0.046-0.262-0.027-0.536-0.198-0.739c-0.173-0.206-0.428-0.325-0.695-0.325
							H3.434c-0.262,0-0.513,0.114-0.685,0.312c-0.173,0.197-0.25,0.46-0.215,0.721L2.79,3.338H1.307c-0.502,0-0.908,0.406-0.908,0.908
							c0,0.502,0.406,0.908,0.908,0.908h1.683l1.721,13.613c0.057,0.454,0.444,0.795,0.901,0.795h8.722c0.458,0,0.845-0.34,0.902-0.795
							l1.72-13.613h1.737c0.502,0,0.908-0.406,0.908-0.908C19.601,3.744,19.195,3.338,18.693,3.338z M15.69,2.255L15.5,3.334H4.623
							L4.476,2.255H15.69z M13.535,17.745H6.413L4.826,5.193H15.12L13.535,17.745z"
                          ></path>
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
