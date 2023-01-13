import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

let called = false;

export default function CourseList({ children, title = "", type = "" }) {
  return (
    <>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* Div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* Dashboard navbar with navigation items  */}
        <Navbar type={type}></Navbar>
        <div className="flex flex-row grow">
          {/* Sidebar only visible on large screens */}
          <Sidebar type={type}></Sidebar>
          <div className="flex flex-col flex-grow justify-center bg-base-100">
            <div className="hero-container h-screen overflow-y-auto">
              <div className="hero grow">
                {/* Grid for layouting welcome text and card components, already responsive */}
                <div className="grid hero-content text-center text-neutral-content lg:p-10">
                  <div className="text-secondary dark:text-white">
                    <h1 className="mb-5 text-5xl font-bold text-center">{title}</h1>
                  </div>
                  {/* TODO: backend: display real values for each course */}
                  {children}
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
