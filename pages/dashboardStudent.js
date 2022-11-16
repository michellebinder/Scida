import Head from "next/head";
import React from "react";
import NavbarStudent from "../components/navbarStudent";

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
        <NavbarStudent></NavbarStudent>
        {/* div that stretches from below the navbar to the bottom, scrolling "disabled" */}
        {/* hero component from daisyUI with different daisyUI card components*/}
        <div className="hero grow bg-white">
          {/* grid for layouting welcome text and card components, already responsive */}
          <div className="grid hero-content text-center text-neutral-content lg:p-20">
            <div>
              {" "}
              <div className="max-w-md text-secondary">
                <h1 className="mb-5 text-5xl font-bold">Hallo Lukas!</h1>
                <p className="mb-5 text-center">
                  Dies ist dein persönliches Dashboard. Hier siehst du alle
                  relevanten Informationen auf einen Blick.
                </p>
              </div>
            </div>
            {/* grid for daisyUI card components to display useful information at a glance */}
            <div className="grid place-items-center">
              <div className="grid sm:grid-cols-3 gap-3">
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title text-white">Anwesenheit</h2>
                    <p className="text-left">Hier findest du QR-Codes um deine Anwesenheit einzutragen!</p>
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
                    <h2 className="card-title text-white">Meine Praktika</h2>
                    <p className="text-left">Alle deine Blockpraktika auf einen Blick!</p>
                    <div className="card-actions justify-end">
                      <button className="btn">Öffnen</button>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title text-white">Ausdrucke</h2>
                    <p className="text-left">Drucke dir die Anwesenheitslisten zu deinen Praktika aus.</p>
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
