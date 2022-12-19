import Head from "next/head";
import { default as React } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function CourseDetail({
  courseName = "",
  type = "",
  praktID = 0,
  children,
  selectedValue = "",
}) {
  return (
    <>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* Div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* Dashboard navbar with navigation items  */}
        <Navbar></Navbar>
        <div className="flex flex-row grow">
          {/* Sidebar only visible on large screens */}
          <Sidebar type={type}></Sidebar>
          <div className="hero grow">
            {/* Grid for layouting welcome text and card components, already responsive */}
            <div className="grid hero-content text-center text-neutral lg:p-10">
              <div className="text-secondary dark:text-white">
                {/* display courseID as determined by href url */}
                <h1 className="mb-5 text-5xl font-bold text-center">
                  {/* TODO: backend: find out and display course name not courseID */}
                  {courseName}
                </h1>
                <h1 className="mb-5 text-3xl font-bold text-center">
                  {/* TODO: frontend: pass chosen group number to this page and display here */}
                  (ID: {praktID})
                </h1>
                <h1 className="mb-5 text-3xl font-bold text-center">
                  {/* TODO: frontend: pass chosen group number to this page and display here */}
                  {selectedValue}
                </h1>
              </div>
              <div>
                {/* display table component with attendance details for the course */}
                <div className="grid w-fit sm:grid-cols-1 gap-5">
                  {/* TODO: backend: find out corresponding values for course and pass to courseDate */}
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
