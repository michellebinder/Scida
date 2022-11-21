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
      {/* div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* dashboard navbar with navigation items  */}
        <Navbar></Navbar>
        <div className="hero grow">
          {/* grid for layouting welcome text and card components, already responsive */}
          <div className="grid hero-content text-center text-neutral-content lg:p-20">
            <div className="text-secondary">
              <h1 className="mb-5 text-5xl font-bold text-center">Impressum</h1>
              <p className="mb-5">
                <h2>Verantwortung und Zuständigkeiten</h2>
                <h3>Universität zu Köln</h3>
                Die Universität zu Köln ist eine Körperschaft des Öffentlichen
                Rechts.<br></br> 
                Sie wird durch den Rektor Professor Dr. Axel Freimuth
                gesetzlich vertreten.<br></br> <br></br>
                Postanschrift:<br></br>
                Universität zu Köln<br></br>
                Albertus-Magnus-Platz<br></br>
                D-50923 Köln<br></br>
                Telefon: 0221 / 470-0<br></br> <br></br>
                Administrative Ansprechperson für die Bereitstellung des Systems <br></br>
                Muster Muster<br></br>
                Leitung Scida-Team<br></br>
                Prorektorat für Lehre und Studium<br></br>
                Scida Support<br></br>
                Musterstr 22a<br></br>
                D-50937 Köln<br></br>
                E-Mailadresse: s.muster[at]muster.uni-koeln.de <br></br>
                Haftungshinweis: Trotz sorgfältiger inhaltlicher
                Kontrolle übernehmen wir keine Haftung für die Inhalte externer
                Links. Für die organisatorischen Inhalte, wie zu
                Lehrveranstaltungen und Prüfungen, sind die einzelnen Fakultäten
                verantwortlich.
              </p>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
