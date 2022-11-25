import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Course from "../components/course";

export default function Home() {

  const courses = ["Innere Medizin", "Chirurgie", "Allgemeine Medizin"];
  const praktID = ["1220", "0921", "2462"];
  const week = ["19.10.22-24.10.22", "26.10.22-29.10.22", "02.11.22-05.11.22"];
  const attendance = ["30%", "50%", "25%"];
  const group = ["12", "12", "12"];

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
              {/* Div which contains the table displaying all courses */}
              {/* TODO: backend: display real values for each course */}
              <div>
                <div className="grid justify-self-stretch xl:grid-flow-row 3xl:grid-cols-6 xl:grid-cols-2 2xl:grid-cols-3 gap-4 ">
                {courses.map((course) => {
                  return (
                    <Course
                      courses = {course}
                      praktID = {praktID}
                      week = {week}
                      attendance = {attendance}
                      group = {group}
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
