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

export default function Home(props) {
  // TO DO (backend): get actual values from database – not using course name as primary key like I did here -> Almost done!
  // const courses = [
  //   "Innere Medizin",
  //   "Chirurgie",
  //   "Gynäkologie und Geburtshilfe",
  //   "Pädiatrie",
  // ];
  // const praktID = {
  //   "Innere Medizin": "1220",
  //   Chirurgie: "0921",
  //   "Gynäkologie und Geburtshilfe": "2462",
  //   Pädiatrie: "3551",
  // };
  // const week = {
  //   "Innere Medizin": "19.10.22-24.10.22",
  //   Chirurgie: "26.10.22-29.10.22",
  //   "Gynäkologie  und Geburtshilfe": "02.11.22-05.11.22",
  //   Pädiatrie: "28.11.22-02.12.22",
  // };
  // const attendance = {
  //   "Innere Medizin": "30",
  //   Chirurgie: "50",
  //   "Gynäkologie und Geburtshilfe": "25",
  //   Pädiatrie: "15",
  // };
  // const group = {
  //   "Innere Medizin": "12",
  //   Chirurgie: "12",
  //   "Gynäkologie und Geburtshilfe": "12",
  //   Pädiatrie: "5",
  // };

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
                  {props.data.map((item) => (
                    <CourseStudent
                      courses={item.block_name}
                      praktID={item.block_id}
                      week={item.week}
                      attendance={item.attendance}
                      group={item.group}
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

//Function that will pull the information once the site is loaded
//It is not useful to call an api route from inside getServerSideProps since it will cause an unnessecary extra call - therefore include the logic directly
//See documentation: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export async function getServerSideProps() {
  //Dummy stud
  const username = "mmuster";
  const matrikel = "5558107";

  //Dummy data
  const data = [
    { block_name: "Gynäkologie", block_id: "1", week:"05.10.22-10.10.22", attendance:"50", group: "1"},
    { block_name: "Chirugie", block_id: "2", week:"10.10.22-15.10.22", attendance:"80", group: "3"},
    { block_name: "Pädiatrie", block_id: "3", week:"15.10.22-20.10.22", attendance:"90", group: "9" },
    { block_name: "Innere Medizin", block_id: "4", week:"20.10.22-25.10.22", attendance:"75", group: "6" },
  ];

  //!!Not able to get the db query working, getting a SerializableError when trying to pass to data back to the frontend!!

  // const sqlQuery =
  //   "SELECT blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,attendance.* FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id AND attendance.student_username = ? INNER JOIN mytable_fake ON blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = ?;";
  // const connection = mysql.createConnection({
  //   host: "127.0.0.1",
  //   user: "root",
  //   password: "@UniKoeln123",
  //   port: 3306,
  //   database: "test_db",
  // });

  // connection.connect()
  //   const data = await connection.query(
  //     sqlQuery,
  //     ["mmuster", "5558107" /* usr, matri */]
  //   );

  
  return {
    props: {
      data,
    },
  };
}
