import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import Papa from "papaparse";
import React, { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import PopUp from "../components/popUp";

export default function Home() {
  //Conts and function for popup
  const [popUpText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popUpType, setPopUpType] = useState(""); //Const to handle popup color
  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

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
  if (role === "S") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Unautorisiert</button>
      </div>
    );
  }

  if (role === "scidaSekretariat" || role === "scidaDekanat" || role === "B") {
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
                    <h1 className="text-5xl font-bold">
                      Passwort zurücksetzen
                    </h1>
                  </div>
                </div>
                {/* div that contains the text below the header */}
                <div className="text-secondary dark:text-white">
                  Bitte setzen Sie hier das Passwort zurück, das für Sie
                  generiert wurde.
                </div>
                {/* grid for component (center of the screen) */}
                <div className="grid place-items-center">
                  <div className="grid gap-3 pt-6">
                    {/* single daisyUI card component  */}
                    <div className="card card-side text-primary-content bg-primary">
                      <div className="card-body place-items-center shadow-2xl rounded-b-lg">
                        <div>
                          <label
                            htmlFor="presentPassword"
                            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                          >
                            <span className="w-72 font-bold">
                              Aktuelles Passwort
                            </span>
                            <input
                              id="presentPassword"
                              name="presentPassword"
                              type="text"
                              className="input input-bordered w-72"
                            />
                          </label>
                          <label
                            htmlFor="newPassword"
                            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                          >
                            <span className="w-72 font-bold">
                              Neues Passwort
                            </span>
                            <input
                              id="newPassword"
                              name="newPassword"
                              type="text"
                              className="input input-bordered w-72"
                            />
                          </label>
                          <label
                            htmlFor="newPasswordAgain"
                            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                          >
                            <span className="w-72 font-bold">
                              Neues Passwort erneut eingeben
                            </span>
                            <input
                              id="newPasswordAgain"
                              name="newPasswordAgain"
                              type="text"
                              className="input input-bordered w-72"
                            />
                          </label>
                          <button value="sign">
                            <label
                              htmlFor="popup_create_user"
                              className="btn mt-28 w-56"
                            >
                              Passwort speichern
                            </label>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
          {/* Custom Pop-up window, which appears when the button "Nutzenden erstellen" is clicked */}
          {showPopup && <PopUp text={popUpText} type={popUpType}></PopUp>}
        </div>
      </div>
    );
  }
}
