import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function CourseList({ children, title = "", type = "" }) {
  return (
    <>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* Div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between">
        {/* Dashboard navbar with navigation items */}
        <Navbar type={type}></Navbar>
        <div className="flex flex-row grow">
          {/* Sidebar only visible on large screens */}
          <Sidebar type={type}></Sidebar>
          <div className="flex flex-col flex-grow bg-base-100">
            <div className="hero-container">
              <div className="hero grow bg-base-100">
                {/* Grid for layouting welcome text and card components, already responsive */}
                <div className="grid hero-content text-center text-neutral-content lg:p-10">
                  <div className="text-secondary dark:text-white">
                    <h1 className="mb-5 text-4xl xl:text-5xl font-bold text-center">
                      {title}
                    </h1>
                  </div>
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
