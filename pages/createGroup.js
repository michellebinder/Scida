import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react";
import PopUp from "../components/popUp";
import QrScan from "../components/qrScan";
const mysql = require("mysql2");

export default function Home(props) {
  //Save props data in constant
  const propsData = props;

  // Code to secure the page
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

  // Try recieving correct user role
  var role;
  try {
    // Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }
  //   /Redirect user back if unAUTHORIZED (wrong role)
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
      <div>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between bg-base-100">
          {/* dashboard navbar with navigation items */}
          <Navbar type="admin"></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="admin"></Sidebar>
            {/* div that stretches from below the navbar to the very bottom  */}
            <div className="hero grow bg-base-100">
              {/* grid for layouting the components (center of the screen) */}
              <div className="grid hero-content text-center text-neutral-content lg:p-10">
                {/* div that contains the header (CSV hochladen) */}
                <div className="grid justify-center">
                  <div className="text-secondary dark:text-white">
                    <h1 className="text-5xl font-bold">Gruppe erstellen</h1>
                  </div>
                </div>
                {/* div that contains the text below the header */}
                <div className="text-secondary dark:text-white">
                  Hier können Sie die von Klips 2.0 generierten CSV-Dateien für
                  Blockpraktika hochladen.
                  <br /> <strong>Bitte beachten:</strong> Es können nur solche
                  Dateien hochgeladen werden, die die{" "}
                  <strong>Matrikelnummern der Studierenden</strong> beinhalten.{" "}
                  <br />
                  Bitte laden Sie keine Dateien hoch, die Vor- und Nachnamen der
                  Studierenden beinhalten.
                </div>
                
              </div>
            </div>
          </div>
          <Footer></Footer>
          {/* Custom Pop-up window, which appears when the button "Nutzenden erstellen" is clicked */}
        </div>
      </div>
    );
  }
}
