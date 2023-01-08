import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useSession } from "next-auth/react";

export default function Home(context) {
  const { data: status } = useSession();
  var showLogout;

  if (status === "unauthenticated") {
   showLogout = false;
  }

  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* dashboard navbar with navigation items  */}
        {/* if showLogout is false (user not logged in), display Navbar with type="basic", else display regular navbar */}
        {showLogout ? <Navbar></Navbar> : <Navbar type="basic"></Navbar>}
        <div className="hero grow">
          {/* grid for layouting welcome text and card components, already responsive */}
          <div className="grid hero-content text-center text-neutral-content lg:p-20">
            <div className="text-secondary">
              <h1 className="mb-5 text-5xl font-bold text-center">
                Scida Support
              </h1>
              <p className="mb-5">
                Liebe Studierende,
                <br></br>
                liebe Lehrende,
                <br></br>
                liebe Beschäftigte,
                <br></br>
                mit dieser Webseite möchten wir euch den Einstieg in den Umgang
                mit Scida, dem Laufzettelmanagementsystem der Universität zu
                Köln, erleichtern.
              </p>
            </div>
            {/* grid for daisyUI card components to display useful information at a glance */}
            <div className="grid place-items-center">
              {/* single daisyUI card component  */}
              <div className="card card-normal bg-primary text-primary-content">
                <div className="card-body items-center text-center">
                  <div className="flex justify-between">
                    <h2 className="card-title text-white">Kontakt</h2>
                  </div>
                  <p className="text-center pb-10">
                    Für Fragen rund um die technische Nutzung von Scida steht
                    Ihnen der Scida-Support zur Verfügung.<br></br>
                    Sie erreichen uns am besten per E-Mail unter folgender
                    Adresse:<br></br>
                    <br></br>
                    <a
                      href="mailto:scida[at]smail.uni-koeln.de"
                      className="text-white hover:underline"
                    >
                      scida[at]smail.uni-koeln.de
                    </a>
                  </p>
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
