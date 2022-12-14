import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import CourseCardAdmin from "../components/courseCardAdmin";
import Sidebar from "../components/sidebar";

export default function Home() {
  // TO DO (backend): get actual values from database – display ALL courses
  const courses = [
    "Innere Medizin",
    "Chirurgie",
    "Gynäkologie und Geburtshilfe",
    "Pädiatrie",
  ];
  const praktID = {
    "Innere Medizin": "1220",
    Chirurgie: "0921",
    "Gynäkologie und Geburtshilfe": "2462",
    Pädiatrie: "3551",
  };
  const week = {
    "Innere Medizin": "19.10.22-24.10.22",
    Chirurgie: "26.10.22-29.10.22",
    "Gynäkologie  und Geburtshilfe": "02.11.22-05.11.22",
    Pädiatrie: "28.11.22-02.12.22",
  };

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
          <Sidebar type="admin"></Sidebar>
          <div className="hero grow">
            {/* Grid for layouting welcome text and card components, already responsive */}
            <div className="grid hero-content text-center text-neutral-content lg:p-10">
              <div className="text-secondary dark:text-white">
                <h1 className="mb-5 text-5xl font-bold text-center">
                  Alle Praktika
                </h1>
              </div>
              {/* TODO: backend: display real values for each course */}
              <div>
                <div className="grid w-fit sm:grid-cols-2 gap-5 ">
                  {courses.map((course) => {
                    return (
                      <CourseCardAdmin
                        courses={course}
                        praktID={praktID[course]}
                        week={week[course]}
                      ></CourseCardAdmin>
                    );
                  })}
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
