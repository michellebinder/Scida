import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function Dashboard({ type = "", children, session = "" }) {
  return (
    <>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* navbar of type student*/}
        <Navbar type={type}></Navbar>
        <div className="flex flex-row grow">
          {/* Sidebar of type student, only visible on large screens */}
          <Sidebar type={type}></Sidebar>
          {/* hero component from daisyUI with different daisyUI card components*/}
          {/* important that the hero is set to grow to disable scrolling! */}
          <div className="hero grow">
            {/* grid for layouting welcome text and card components, already responsive */}
            <div className="grid hero-content text-center text-neutral-content lg:p-10">
              <div className="grid justify-center">
                <div className="text-secondary dark:text-white">
                  <h1 className="mb-5 text-5xl font-bold">
                    Hallo{" "}
                    {session.user.first_name ||
                      session.user.attributes.givenName}
                    !
                  </h1>
                  <p className="mb-5 text-center">
                    Dies ist dein persönliches Dashboard. Hier siehst du alle
                    relevanten Informationen auf einen Blick.
                  </p>
                </div>
              </div>
              {children}
              {/* grid for daisyUI card components to display useful information at a glance */}
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
