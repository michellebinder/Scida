import { useSession, getSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import CourseCard from "../components/courseCard";
import CourseList from "../components/courseList";
import dateToWeekParser from "../gloabl_functions/date";
const mysql = require("mysql2");

//This seems to work
export async function getServerSideProps({ req }) {
  ////Get current session in getServerSideProps - for @Marc////
  const session = await getSession({ req }); // works
  //Try recieving correct user role
  //Try catch is needed, otherwise it will fail if either of the sessions is null
  let role = "";
  let identifier;
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus; //Plug any desired attribute behind attributes.
    identifier = session.user.attributes.uid; //description.slice(1); //removes first letter before matrikelnummer
  } catch {
    try {
      role = session.user.account_role; //Plug any desired attribute behind user.
      identifier = session.user.email; //Plug any desired attribute behind user.
    } catch {}
  }
  //Log desired attribute on console
  let sqlQuery = "";
  if (role === "D") {
    sqlQuery = "SELECT * FROM blocks WHERE lecturer_id = ?;";
  } else if (role === "S") {
    sqlQuery =
      "SELECT * FROM blocks WHERE block_id IN (SELECT block_id FROM attendance WHERE student_username = ?)";
  } else if (role === "B" || role === "A") {
    sqlQuery = "SELECT * FROM blocks;";
  }
  if (sqlQuery != "" && role != "") {
    const connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "@UniKoeln123",
      port: 3306,
      database: "test_db",
    });

    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          reject(err);
        }

        connection.query(
          sqlQuery,
          [identifier /* usr, matri */],
          (err, results, fields) => {
            if (err) {
              reject(err);
            }

            let dataString = JSON.stringify(results);
            let data = JSON.parse(dataString);
            resolve({
              props: {
                data,
              },
            });
          }
        );
      });
    });
  } else {
    return { props: { data: "FAIL 6" } };
  }
}

export default function Home(props) {
  //Save props data in constant
  const propsData = props;
  console.log(propsData);

  //Code to secure the page
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Laden</button>
      </div>
    );
  }
  //Redirect user back if unauthenticated or wrong user role
  if (status === "unauthenticated") {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }
  //Try recieving correct user role
  var role;
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }
  if (role === "S" || role === "S") {
    return (
      <CourseList title="Meine Praktika" type="student">
        <div>
          {/* Input field: search */}
          <Link href={"/courseListStudent"}>
            {/* To change: call "searchStudent()" on click instead of automatically forwarding to next page */}
            <div className="input-group pb-5">
              <input
                onChange={(e) => createSearch(e.target.value)}
                id="search"
                name="search"
                type="text"
                placeholder="Suche Matrikelnummer..."
                className="input input-bordered text-neutral"
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-28"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </Link>
          <div className="grid w-fit sm:grid-cols-2 gap-5 ">
            {propsData ? (
              propsData.data.map((item) => (
                <CourseCard
                  type="student"
                  courses={item.block_name}
                  blockId={item.block_id}
                  week={dateToWeekParser(item.date_start, item.date_end)}
                  group={item.group_id}
                ></CourseCard>
              ))
            ) : (
              <>{/** TODO Ladeanimation */}</>
            )}
          </div>
        </div>
      </CourseList>
    );
  } else if (role === "B" || role === "A") {
    // TO DO (backend): get actual values from database – display ALL courses
    return (
      <CourseList title="Alle Praktika" type="admin">
        {" "}
        <div>
          <div className="grid w-fit sm:grid-cols-2 gap-5 ">
            {propsData ? (
              propsData.data.map((course) => (
                <CourseCard
                  type="admin"
                  courses={course.block_name}
                  blockId={course.block_id}
                  propsData={propsData}
                  week={dateToWeekParser(course.date_start, course.date_end)}
                ></CourseCard>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </CourseList>
    );
  } else if (role === "D") {
    return (
      <CourseList title="Meine Praktika" type="lecturer">
        <div>
          <div className="grid w-fit sm:grid-cols gap-5 ">
            {propsData ? (
              propsData.data.map((course) => {
                return (
                  <CourseCard
                    type="Lecturer"
                    courses={course.block_name}
                    blockId={course.block_id}
                    propsData={propsData}
                  ></CourseCard>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </CourseList>
    );
  }
}
