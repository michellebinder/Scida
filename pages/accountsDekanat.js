import Head from "next/head";
import React from "react";
import CreateAccount from "../components/createAccount";
import EditAccount from "../components/editAccount";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function Home() {
  //code to secure the page
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  //Redirect user back if unauthenticated or wrong user role
  if (
    status === "unauthenticated" ||
    session.user.account_role === "Studierende" ||
    session.user.account_role === "Dozierende"
  ) {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }
  if (
    session.user.account_role === "Sekretariat" ||
    session.user.account_role === "Studiendekanat"
  ) {
    return (
      <>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* Div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between bg-base-100">
          {/* Dashboard navbar with navigation items  */}
          <Navbar type="admin"></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="admin"></Sidebar>
            <div className="hero grow">
              {/* Grid for layouting welcome text and card components, already responsive */}
              <div className="grid hero-content text-center text-neutral-content lg:p-10">
                <div className="text-secondary dark:text-white">
                  <h1 className="mb-5 text-5xl font-bold text-center">
                    Accounts verwalten
                  </h1>
                  <p className="mb-5">
                    Hier kannst du alle Nutzer:innen des Systems verwalten.
                    Fülle das linke Formular aus, um eine/n neue/n Nutzer:in
                    anzulegen. Suche rechts nach Nutzer:innen, um sie zu
                    bearbeiten, oder zu löschen. Du kannst nach beliebigen
                    Eigenschaften suchen: Nach Vor- oder Nachname, nach
                    Matrikelnummer oder E-Mail Adresse.
                  </p>
                  {/* div which controls the positioning of the card components (Nutzer erstellen, Nutzer bearbeiten)*/}
                  <div className="flex flex-row">
                    {/* single daisyUI card component for creating a user*/}
                    <CreateAccount></CreateAccount>
                    {/* single daisyUI card component for editing/deleting a user*/}
                    <EditAccount></EditAccount>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </>
    );
  }
}
