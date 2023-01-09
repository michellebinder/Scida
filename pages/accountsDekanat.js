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
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Laden</button>
      </div>
    );
  }
  //Redirect user back if unAUTHENTICATED (logged out)
  if (status === "unauthenticated") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Ausloggen</button>
      </div>
    );
  }

  //Try recieving correct user role
  var role;
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }

   //Redirect user back if unAUTHORIZED (wrong role)
  if (role === "S" || role === "B") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Unautorisiert</button>
      </div>
    );
  }

  if (role === "scidaSekretariat" || role === "scidaDekanat") {
    return (
      <>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* Div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between">
          {/* Dashboard navbar with navigation items  */}
          <Navbar type="admin"></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="admin"></Sidebar>
            <div className="hero grow bg-base-100">
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
                  <div className="flex flex-col lg:flex-row gap-y-10">
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
