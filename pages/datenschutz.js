import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useSession } from "next-auth/react";

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
        {/* if showLogout is false (user not logged in), display Navbar with type="basic", else display regular navbar */}
        <Navbar type="basic"></Navbar>
        <div className="hero grow bg-base-100">
          {/* grid for layouting welcome text and card components, already responsive */}
          <div className="grid hero-content text-center text-neutral-content bg-base-100 lg:p-20">
            <div className="text-secondary">
              <h1 className="mb-5 text-5xl font-bold text-center dark:text-white">
                Datenschutz
              </h1>
              <p className="mb-5 dark:text-white">
                Die Universität zu Köln nimmt den Schutz Ihrer personenbezogenen
                Daten sehr ernst. Wir möchten, dass Sie wissen, wann wir welche
                Daten speichern und wie wir sie verwenden, wenn Sie den
                Internetauftritt der Universität zu Köln benutzen.
                Personenbezogene Daten werden auf diesem zentralen Web-Server
                der Universität (www.uni-koeln.de) nur im notwendigen Umfang
                erhoben. In keinem Fall werden die erhobenen Daten verkauft oder
                aus anderen Gründen an Dritte weitergegeben. Diese
                Datenschutzerklärung betrifft die Nutzung von Webseiten der
                Universität zu Köln, soweit für Einzelseiten keine spezifische
                Datenschutzerklärung angegeben ist. Sie umfasst nicht andere
                Vorgänge der Verarbeitung personenbezogener Daten an der
                Universität zu Köln, beispielsweise bei der Verwaltung von
                Studienfächern, Studienleistungen und Prüfungen, der Nutzung von
                Bibliotheken oder der Administration der
                Parkraumbewirtschaftung. Bei Fragen zu Verarbeitungsvorgängen
                personenbezogener Daten außerhalb des Abrufens von Webseiten
                wenden Sie sich bitte an die jeweilige fachverantwortliche
                Stelle. Die nachfolgende Erklärung gemäß Art. 13
                Datenschutzgrundverordnung (DSGVO) gibt Ihnen einen Überblick
                darüber, wie wir diesen Schutz gewährleisten und welche Art von
                Daten zu welchem Zweck erhoben werden.
              </p>
            </div>
            {/* grid for daisyUI card components to display useful information at a glance */}
            <div className="grid place-items-center">
              {/* single daisyUI card component  */}
              <div className="card card-normal bg-primary text-primary-content">
                <div className="card-body items-center text-center">
                  <div className="flex justify-between">
                    <h2 className="card-title text-white">
                      Name und Kontaktdaten des Verantwortlichen
                    </h2>
                  </div>
                  <p className="text-center pb-10 text-base-300 dark:text-white">
                    Verantwortliche für die Verarbeitung personenbezogener Daten
                    beim Betrieb dieser Webseite ist: <br></br>
                    Universität zu Köln <br></br>
                    Körperschaft öffentlichen Rechts <br></br>
                    vertreten durch den Rektor <br></br>
                    <br></br>
                    Albertus-Magnus-Platz <br></br>
                    50923 Köln <br></br>
                    Tel.: 0221 / 470-0 <br></br>
                    E-Mail: &nbsp;
                    <a
                      href="mailto:online-redaktion[at]uni-koeln.de"
                      className="hover:underline"
                    >
                      online-redaktion[at]uni-koeln.de
                    </a>
                    <br></br>
                    Internet: &nbsp;
                    <a
                      href="http://www.uni-koeln.de"
                      className="hover:underline"
                    >
                      http://www.uni-koeln.de
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
