import Head from "next/head";
import React from "react";
import NavbarLecturer from "../components/navbarLecturer";

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
        <NavbarLecturer></NavbarLecturer>
        {/* div that stretches from below the navbar to the bottom, scrolling "disabled" */}
        {/* hero component from daisyUI with different daisyUI card components*/}
        <div className="hero grow bg-white">
          {/* grid for layouting welcome text and card components, already responsive */}
          <div className="grid hero-content text-center text-neutral-content lg:p-20">
            <div className="grid justify-center">
              <div className="max-w-md text-secondary">
                <h1 className="mb-5 text-5xl font-bold text-center">Hallo Dr. Testdoktor!</h1>
                <p className="mb-5">
                  Dies ist Ihr persönliches Dashboard. Hier sehen Sie alle
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
                    <p className="text-left">Scannen Sie einen QR-Code, um die Anwesenheit eines Studierenden einzutragen!</p>
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
                    <h2 className="card-title text-white">Praktika</h2>
                    <p className="text-left">Hier finden Sie alle Ihre Blockpraktika. </p>
                    <div className="card-actions justify-end">
                      <button className="btn">Öffnen</button>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title text-white">Ausdrucke</h2>
                    <p className="text-left">Holen Sie Sich die Bestätigung über die Anwesenheit in Ihren Blockpraktika!</p>
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
