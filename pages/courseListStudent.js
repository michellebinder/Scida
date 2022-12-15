import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import CourseStudent from "../components/courseCardStudent";
import Sidebar from "../components/sidebar";
import { useState, useEffect } from "react";
import { sendError } from "next/dist/server/api-utils";
const mysql = require("mysql");

let called = false;

export default function Home(props) {
  const dateToWeekParser = (date) => {
    let dateString = "";
    dateString =
      date.substring(8, 10) +
      "." +
      date.substring(5, 7) +
      "." +
      date.substring(0, 4);
    return dateString;
  };

  let dummy = [
    {
      block_name: "Gynäkologie",
      block_id: "1",
      week: "05.10.22-10.10.22",
      attendance: "50",
      group: "1",
    },
  ];
  const [responseMessage, setResponseMessage] = useState(dummy);
  const getCourses = async () => {
    //POSTING the credentials
    const response = await fetch("/api/getCourse", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    const res = await response.json();
    let data = JSON.parse(res);
    setResponseMessage(data);
  };
  if (!called) {
    getCourses();
    called = true;
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
            <div className="grid hero-content text-center text-neutral-content lg:p-10">
              <div className="text-secondary dark:text-white">
                <h1 className="mb-5 text-5xl font-bold text-center">
                  Meine Praktika
                </h1>
              </div>
              {/* TODO: backend: display real values for each course */}
              <div>
                <div className="grid w-fit sm:grid-cols-2 gap-5 ">
                  {responseMessage.map((item) => (
                    <CourseStudent
                      courses={item.block_name}
                      praktID={item.block_id}
                      week={dateToWeekParser(item.date_start)}
                      attendance={item.attendance}
                      group={item.group_id}
                    ></CourseStudent>
                  ))}
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
