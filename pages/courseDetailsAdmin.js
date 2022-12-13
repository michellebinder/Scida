import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import CourseDate from "../components/courseTableStudent";
import Sidebar from "../components/sidebar";
import CourseTableAdmin from "../components/courseTableAdmin";
import { useRouter } from 'next/router';


export default function Home(){


    const router = useRouter();
    const { praktID } = router.query;
    const {selectedValue} = router.query;

  {/* TODO: backend: fetch real courseName based on ID */}
  var courseName = "";
  if (praktID == "1220") {
    courseName = "Innere Medizin";
  } else if (praktID == "0921") {
    courseName = "Chirurgie";
  } else if (praktID == "2462") {
    courseName = "Gynäkologie und Geburtshilfe";
  } else if (praktID == "3551") {
    courseName = "Pädiatrie";
  } else {
    courseName = "Kursname = Error";
  }

  return (
    <div>
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
          <Sidebar type="student"></Sidebar>
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
                  <CourseTableAdmin praktID={praktID}></CourseTableAdmin>
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
