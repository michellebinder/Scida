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
    console.log(data);
    console.log(res);
    console.log("TEEST");
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
// //See documentation: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props

// export async function getServerSideProps() {
//   //Dummy stud
//   const username = "mmuster";
//   const matrikel = "5558107";

//   //Dummy data
//   // const data = [
//   //   { block_name: "Gynäkologie", block_id: "1", week:"05.10.22-10.10.22", attendance:"50", group: "1"},
//   //   { block_name: "Chirugie", block_id: "2", week:"10.10.22-15.10.22", attendance:"80", group: "3"},
//   //   { block_name: "Pädiatrie", block_id: "3", week:"15.10.22-20.10.22", attendance:"90", group: "9" },
//   //   { block_name: "Innere Medizin", block_id: "4", week:"20.10.22-25.10.22", attendance:"75", group: "6" },
//   // ];

//   //!!Not able to get the db query working, getting a SerializableError when trying to pass to data back to the frontend!!

//   //const sqlQuery =
//   //  "SELECT blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,attendance.* FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id AND attendance.student_username = ? INNER JOIN mytable_fake ON blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = ?;";
//   // const connection = mysql.createConnection({
//   //   host: "127.0.0.1",
//   //   user: "root",
//   //   password: "@UniKoeln123",
//   //   port: 3306,
//   //   database: "test_db",
//   // });

//   // connection.connect();
//   //   const data2 = await connection.query(
//   //     sqlQuery,
//   //     ["mmuster", "5558107" /* usr, matri */]
//   //   );
//   //   console.log("DATA: IUI");
//   //   console.log(data2);
//   // let data2 = null;
//   // let data = [
//   //   {
//   //     block_name: "Gynäkologie",
//   //     block_id: "1",
//   //     week: "05.10.22-10.10.22",
//   //     attendance: "50",
//   //     group: "1",
//   //   },
//   //   {
//   //     block_name: "Chirugie",
//   //     block_id: "2",
//   //     week: "10.10.22-15.10.22",
//   //     attendance: "80",
//   //     group: "3",
//   //   },
//   //   {
//   //     block_name: "Pädiatrie",
//   //     block_id: "3",
//   //     week: "15.10.22-20.10.22",
//   //     attendance: "90",
//   //     group: "9",
//   //   },
//   //   {
//   //     block_name: "Innere Medizin",
//   //     block_id: "4",
//   //     week: "20.10.22-25.10.22",
//   //     attendance: "75",
//   //     group: "6",
//   //   },
//   //   {
//   //     block_name: "Pädiatrie",
//   //     group_id: "07",
//   //     date_start: "2022-10-31T23:00:00.000Z",
//   //     date_end: "2022-11-04T23:00:00.000Z",
//   //     block_id: 4567,
//   //     student_username: "mmuster",
//   //     lecturer_id: "admin6@admin",
//   //     confirmed_at: "2022-10-31T23:00:00.000Z",
//   //   },
//   // ];

//   // const connection = mysql.createConnection({
//   //   host: "127.0.0.1",
//   //   user: "root",
//   //   password: "@UniKoeln123",
//   //   port: 3306,
//   //   database: "test_db",
//   // });
//   // connection.connect();

//   // let dataString = await JSON.stringify(res.RowDataPacket);
//   // console.log(dataString);
//   //     data = await JSON.parse(dataString);
//   //     console.log("Loggen");
//   //     console.log(data);

//   // //  connection.connect();//function (err) {
//   // const results = await fetch(
//   //   connection.query(
//   //     sqlQuery,
//   //     ["mmuster", "5558107" /* usr, matri */],
//   //     function(err, results, fields) {
//   //       if (err) {
//   //         throw err;
//   //       }

//   //       let dataString = JSON.stringify(results);
//   //       this.updateData(JSON.parse(dataString));
//   //       /*  res.status(200).json(results); */
//   //       /* res.status(200).json(`datareceived`); */

//   //       // console.log(results.length);
//   //       /* const data = [];
//   //           for(let i = 0; i<results.length; i++){
//   //               data.push(results[i]);
//   //           }
//   //           console.log(data); */

//   //       // console.log(data);
//   //       // data2 = data;

//   //       /* res.status(200).json(data); */
//   //     }
//   //   )
//   // );
//   //const res = await results.json();
//   //console.log("RESSS" + res.data);

//   //console.log(results);
//   //POSTING the credentials

//   //TODO Invalid URL
//   // const response = await fetch("/api/getCourse", {
//   //   //Insert API you want to call
//   //   method: "POST",
//   //   body: JSON.stringify({}),
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   // });
//   // //Saving the RESPONSE in the responseMessage variable
//   // const res = await response.json();
//   // let data = JSON.parse(res);
//   // console.log(data);
//   // console.log(res);
//   // console.log("TEEST");
//   // return { props: { data } };
// }
