import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between">
        {/* dashboard navbar with navigation items  */}
        <Navbar type="dashboard"></Navbar>
        {/* div that stretches from below the navbar to the bottom, scrolling "disabled" */}
        {/* hero component from daisyUI with different daisyUI card components*/}
        <div className="hero grow bg-white">
          {/* grid for layouting welcome text and card components, already responsive */}
          <div className="grid hero-content text-center text-neutral-content lg:p-20">
            <div>
              {" "}
              <div className="text-secondary">
                <h1 className="mb-5 text-5xl font-bold">Hallo Philipp!</h1>
                <p className="mb-5 ">
                  Dies ist dein persönliches Dashboard. Hier siehst du alle
                  relevanten Informationen auf einen Blick.
                </p>
              </div>
            </div>
            {/* grid for daisyUI card components to display useful information at a glance */}
            <div className="grid place-items-center">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <div className="flex justify-between">
                      <h2 className="card-title text-white text-left">
                        Account erstellen
                      </h2>
                      <svg
                        src="http://www.w3.org/2000/svg"
                        className="h-16 w-16"
                        fill=""
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          fill="none"
                          d="M15.971,7.708l-4.763-4.712c-0.644-0.644-1.769-0.642-2.41-0.002L3.99,7.755C3.98,7.764,3.972,7.773,3.962,7.783C3.511,8.179,3.253,8.74,3.253,9.338v6.07c0,1.146,0.932,2.078,2.078,2.078h9.338c1.146,0,2.078-0.932,2.078-2.078v-6.07c0-0.529-0.205-1.037-0.57-1.421C16.129,7.83,16.058,7.758,15.971,7.708z M15.68,15.408c0,0.559-0.453,1.012-1.011,1.012h-4.318c0.04-0.076,0.096-0.143,0.096-0.232v-3.311c0-0.295-0.239-0.533-0.533-0.533c-0.295,0-0.534,0.238-0.534,0.533v3.311c0,0.09,0.057,0.156,0.096,0.232H5.331c-0.557,0-1.01-0.453-1.01-1.012v-6.07c0-0.305,0.141-0.591,0.386-0.787c0.039-0.03,0.073-0.066,0.1-0.104L9.55,3.75c0.242-0.239,0.665-0.24,0.906,0.002l4.786,4.735c0.024,0.033,0.053,0.063,0.084,0.09c0.228,0.196,0.354,0.466,0.354,0.76V15.408z"
                        ></path>
                      </svg>
                    </div>

                    <p className="text-left">Füge Dozierenden- oder Mitarbeitenden Accounts hinzu.</p>
                    <div className="card-actions justify-end">
                      {/* <div
                        className="radial-progress"
                        style={{ "--value": 70 }}
                      >
                        70%
                      </div> */}
                      <button className="btn">Öffnen</button>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title text-white">CSV hochladen</h2>
                    <p className="text-left">
                      Lade hier CSV-Dateien der Blockpraktika hoch. Sie werden
                      automatisch in das System eingepflegt.
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn">Öffnen</button>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title text-white">Ausdrucke</h2>
                    <p>Lade dir hier Anwesenheitslisten runter.</p>
                    <div className="card-actions justify-end">
                      <button className="btn">Öffnen</button>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title text-white">Blockpraktika</h2>
                    <p>Hier findest du alle Blockpraktika.</p>
                    <div className="card-actions justify-end">
                      <button className="btn">Öffnen</button>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title text-white">Studierende</h2>
                    <p>Eine Übersicht aller Studierenden.</p>
                    <div className="card-actions justify-end">
                      <button className="btn">Öffnen</button>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title text-white">Dozierende</h2>
                    <p>Erstelle, bearbeite oder lösche Dozierenden-Accounts.</p>
                    <div className="card-actions justify-end">
                      <button className="btn">Öffnen</button>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title text-white">Hilfe</h2>
                    <p>
                      Passwort vergessen oder Verbesserungsvorschlag? Hier
                      entlang!
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn">Öffnen</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
