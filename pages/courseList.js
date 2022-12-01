import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Course from "../components/courseGeneral";

export default function Home() {

  // TO DO (backend): get actual values from database – not using course name as primary key like I did here
  const courses = ["Innere Medizin", "Chirurgie", "Gynäkologie"];
  const praktID = {"Innere Medizin": "1220", Chirurgie: "0921", "Gynäkologie": "2462"};
  const week = {"Innere Medizin": "19.10.22-24.10.22", Chirurgie: "26.10.22-29.10.22", "Gynäkologie": "02.11.22-05.11.22"};
  const attendance = {"Innere Medizin":"30", Chirurgie: "50", "Gynäkologie": "25"};
  const group = {"Innere Medizin": "12", Chirurgie: "12", "Gynäkologie": "12"};

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
        <div className="hero grow">
          {/* Grid for layouting welcome text and card components, already responsive */}
          <div className="grid hero-content text-center text-neutral-content lg:p-20">
            <div className="text-secondary">
              <h1 className="mb-5 text-5xl font-bold text-center">
                Meine Praktika
              </h1>
              </div>
              {/* TODO: backend: display real values for each course */}
              <div>
                <div className="grid w-fit sm:grid-cols-2 gap-5 ">
                {courses.map((course) => {
                  return (
                    <Course
                      courses = {course}
                      praktID = {praktID[course]}
                      week = {week[course]}
                      attendance = {attendance[course]}
                      group = {group[course]}
                    >
                    </Course>
                  );
                })}
              </div> 
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
  </div>
  );
}
