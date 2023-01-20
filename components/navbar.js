import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";
import NavbarComponent from "./navbarComponent";
import { signOut, useSession } from "next-auth/react";

//modular navbar
//each navbar type shares some basic elements such as logo, home button and logout button
export default function Navbar({ type = "" }) {
  const [isListDisplayed, setIsListDisplayed] = useState(false);
  const { data: session, status } = useSession();
  const toggleList = () => {
    setIsListDisplayed((prevState) => !prevState);
  };

  return (
    <div>
      <div className="navbar text-white bg-primary">
        <div className="navbar-start" data-testid="navbar">
          {/* title and medfak logo, same for every navbar type */}
          <div className="avatar">
            {/* below is the old version of the logo, in case we might need it again */}
            {/* <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"> */}
            <div className="w-16 pl-2 pr-2">
              <img src="/SiegelMedFak.png" />
            </div>
          </div>
          <Link href="/">
            <h1 className="pl-3 text-2xl font-bold">Scida</h1>
            <h2 className="pl-3 text-sm max-sm:w-44">
              Medizinische Fakultät - Universität zu Köln
            </h2>
          </Link>
        </div>

        {/* center div of navbar currently not in used, soon to be subsituted by sidebar */}
        <div className="navbar-center hidden lg:flex"></div>
        {/* end div of navbar */}
        <div className="navbar-end">
          {/* not visible on landing page (!) */}
          {type != "basic" ? (
            <div>
              <div className="dropdown dropdown-end">
                {/* big logout button, invisible on small screens*/}

                <button
                  onClick={() => signOut()}
                  className="btn shadow-none hover:shadow-lg hover:opacity-75 gap-2 text-white hidden lg:flex"
                >
                  Logout
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    fill="white"
                  >
                    <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z" />
                  </svg>
                </button>

                {/* dropdown/sandwich menu icon */}
                <label
                  tabIndex={0}
                  onClick={toggleList}
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
                {/* list for single dropdown components */}
                {isListDisplayed && (
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52 lg:hidden"
                  >
                    {/* home button on small screens */}
                    <li>
                      <a href={"/dashboard"}>
                        <svg
                          src="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill=""
                          viewBox="0 0 24 24"
                          stroke="white"
                        >
                          <path
                            fill="none"
                            d="M15.971,7.708l-4.763-4.712c-0.644-0.644-1.769-0.642-2.41-0.002L3.99,7.755C3.98,7.764,3.972,7.773,3.962,7.783C3.511,8.179,3.253,8.74,3.253,9.338v6.07c0,1.146,0.932,2.078,2.078,2.078h9.338c1.146,0,2.078-0.932,2.078-2.078v-6.07c0-0.529-0.205-1.037-0.57-1.421C16.129,7.83,16.058,7.758,15.971,7.708z M15.68,15.408c0,0.559-0.453,1.012-1.011,1.012h-4.318c0.04-0.076,0.096-0.143,0.096-0.232v-3.311c0-0.295-0.239-0.533-0.533-0.533c-0.295,0-0.534,0.238-0.534,0.533v3.311c0,0.09,0.057,0.156,0.096,0.232H5.331c-0.557,0-1.01-0.453-1.01-1.012v-6.07c0-0.305,0.141-0.591,0.386-0.787c0.039-0.03,0.073-0.066,0.1-0.104L9.55,3.75c0.242-0.239,0.665-0.24,0.906,0.002l4.786,4.735c0.024,0.033,0.053,0.063,0.084,0.09c0.228,0.196,0.354,0.466,0.354,0.76V15.408z"
                          ></path>
                        </svg>
                        Home
                      </a>
                    </li>
                    {/* differentiation between different navbar types and their respective dropdown components */}
                    {/* advantage: shared navbar components dont have to be created twice */}
                    {/* potentially add dark mode component */}
                    {type == "student" ? (
                      <div>
                        <NavbarComponent
                          componentName="trainings"
                          url="/courseList"
                        ></NavbarComponent>
                        <NavbarComponent
                          componentName="printOuts"
                          url="/downloadPDF"
                        ></NavbarComponent>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {type == "lecturer" ? (
                      <div>
                        <NavbarComponent
                          componentName="trainings"
                          url="/courseList"
                        ></NavbarComponent>
                        {/* <NavbarComponent
                          componentName="printOuts"
                          url=" "
                        ></NavbarComponent> */}
                        {session.user.account_id && (
                          <NavbarComponent
                            componentName="resetPassword"
                            url="/resetPassword"
                          ></NavbarComponent>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {type == "admin" ? (
                      <div>
                        <NavbarComponent
                          componentName="accounts"
                          url="/accounts"
                        ></NavbarComponent>
                        <NavbarComponent
                          componentName="csv"
                          url="/csvAdmin"
                        ></NavbarComponent>
                        <NavbarComponent
                          componentName="trainings"
                          url="/courseList"
                        ></NavbarComponent>
                        <NavbarComponent
                          componentName="printOuts"
                          url="/downloadPDF"
                        ></NavbarComponent>
                        <NavbarComponent
                          componentName="resetPassword"
                          url="/resetPassword"
                        ></NavbarComponent>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {/* logout button on small screens */}
                    <li>
                      <button onClick={() => signOut()}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 1024 1024"
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          fill="white"
                        >
                          <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z" />
                        </svg>
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="bg-accent text-transparent font-bold font-apple text-xs p-0.02 w-full flex md:flex-row flex-col items-center text-center">
        Michelle | Jingwen | Felicia | Jonas | Lukas | Marc
      </div>
    </div>
  );
}
