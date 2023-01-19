import { useSession, getSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import CourseCard from "../components/courseCard";
import CourseList from "../components/courseList";
import CourseTable from "../components/courseTable";
import Accordion from "../components/Accordion";
import dateToWeekParser from "../gloabl_functions/date";
const mysql = require("mysql2");

//This seems to work
export async function getServerSideProps({ req }) {
  const session = await getSession({ req }); // works

  //Try recieving correct user role and information
  let role = "";
  let identifier = "";
  //Try catch is needed, otherwise it will fail if either of the sessions is null
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus; //Plug any desired attribute behind attributes.
    if (role == "S") {
      identifier = session.user.attributes.description.slice(1); //removes first letter before matrikelnummer
    } else {
      identifier = session.user.attributes.mail; //removes first letter before matrikelnummer
    }
  } catch {
    try {
      role = session.user.account_role; //Plug any desired attribute behind user.
      identifier = session.user.email; //Plug any desired attribute behind user.
    } catch {}
  }

  //Define sql query depending on role
  let sqlQuery = "";
  if (role === "B") {
    //Show blocks, where the Lecturer is assigned
    sqlQuery =
      "SELECT * FROM blocks INNER JOIN sessions ON sessions.block_id = blocks.block_id WHERE sessions.lecturer_id = ?;";
  } else if (role === "S") {
    //Show blocks where the student is participating
    sqlQuery =
      "SELECT *,sessions.group_id FROM blocks INNER JOIN sessions ON sessions.block_id = blocks.block_id WHERE blocks.block_id IN (SELECT attendance.block_id FROM attendance WHERE matrikelnummer = ?)";
  } else if (role === "scidaSekretariat" || role === "scidaDekanat") {
    //Show all blocks
    sqlQuery = "SELECT * FROM blocks;";
  }
  if (sqlQuery != "" && role != "" && identifier != "") {
    const connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "@UniKoeln123",
      port: 3306,
      database: "test_db",
      timezone: "+00:00", //Use same timezone as in mysql database
    });

    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          reject(err);
        }
        connection.query(sqlQuery, [identifier], (err, results, fields) => {
          if (err) {
            reject(err);
          }

          let dataString = JSON.stringify(results);
          let data = JSON.parse(dataString);
          console.log(data);
          resolve({
            props: {
              data,
            },
          });
        });
      });
    });
  } else {
    return { props: { data: "FAIL 6" } };
  }
}

export default function Home(props) {
  //Save props data in constant
  const propsData = props;

  // Code to secure the page
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Laden</button>
      </div>
    );
  }

  //Redirect user back if unAUTHENTICATED (logged out)
  if (status === "unauthenticated") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Ausloggen</button>
      </div>
    );
  }

  // Try recieving correct user role
  var role;
  try {
    // Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }
  if (role === "S") {
    console.log(propsData.data);
    const filteredData = propsData.data.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.block_name === item.block_name)
    );
    console.log(filteredData);
    return (
      <CourseList title="Meine Praktika" type="student">
        <div>
          <p className="mb-10 text-secondary dark:text-white">
            Hier findest du alle deine Praktika. Klicke auf "Details", um die
            Termine und deine Anwesenheiten zu sehen.
          </p>
          <div className="grid w-fit grid-row xl:grid-cols-3 gap-5">
            {filteredData.length ? (
              filteredData.map((item) => (
                <CourseCard
                  type="student"
                  courses={item.block_name}
                  blockId={item.block_id}
                ></CourseCard>
              ))
            ) : (
              <p className="text-xl text-accent absolute">
                Du bist aktuell noch für keine Praktika angemeldet.
              </p>
              // <>{/** TODO Ladeanimation */}</>
            )}
          </div>
        </div>
      </CourseList>
    );
  } else if (role === "scidaSekretariat" || role === "scidaDekanat") {
    return (
      <CourseList title="Alle Praktika" type="admin">
        <div>
          <p className="mb-10 text-secondary dark:text-white">
            Hier finden Sie alle existierenden Praktika. Klicken Sie auf die
            Kacheln, um Gruppen, Termine und Teilnehmende der Praktika zu
            bearbeiten.
          </p>
          <div className="grid w-fit sm:grid-cols-2 xl:grid-cols-4 gap-5 ">
            {propsData.length ? (
              propsData.data.map((course) => (
                <CourseCard
                  type="admin"
                  courses={course.block_name}
                  blockId={course.block_id}
                  semester={course.semester}
                  propsData={propsData}
                  week={dateToWeekParser(course.date_start, course.date_end)}
                ></CourseCard>
              ))
            ) : (
              <p className="text-xl text-accent absolute text-center ml-20">
                Aktuell exisistieren noch keine Praktika. Bitte laden Sie die
                Daten aus Klips zunächst{" "}
                <a href="/csvAdmin" className="underline hover:font-bold">
                  hier
                </a>{" "}
                hoch.
              </p>
            )}
          </div>
        </div>
      </CourseList>
    );
  } else if (role === "B") {
    const filteredData = propsData.data.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) => t.block_id === item.block_id && t.semester === item.semester
        )
    );
    return (
      <CourseList title="Meine Praktika" type="lecturer">
        <div>
          <p className="mb-10 text-secondary dark:text-white">
            Hier finden Sie alle Ihre Praktika. Wählen Sie eine Gruppe aus, um
            Termine zu sehen und die Anwesenheit der Studierenden zu bearbeiten.
          </p>
          <div className="grid w-fit grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredData.length ? (
              filteredData.map((course) => {
                return (
                  <CourseCard
                    semester={course.semester}
                    type="Lecturer"
                    courses={course.block_name}
                    blockId={course.block_id}
                    propsData={props}
                  ></CourseCard>
                );
              })
            ) : (
              <p className="text-xl text-accent absolute">
                Aktuell sind für Sie noch keine Praktika hinterlegt.
              </p>
            )}
          </div>
        </div>
      </CourseList>
    );
  }
}
