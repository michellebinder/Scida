import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react";
const mysql = require("mysql2");

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req }); // works
  const sessId = query.sessId;
  const blockId = query.blockId;
  //Try recieving correct user role and information
  let role = "";
  let identifier = "";
  //Try catch is needed, otherwise it will fail if either of the sessions is null
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus; //Plug any desired attribute behind attributes.
    identifier = session.user.attributes.uid; //description.slice(1); //removes first letter before matrikelnummer
    //identifier = "mmuster";
  } catch {
    try {
      role = session.user.account_role; //Plug any desired attribute behind user.
      identifier = session.user.email; //Plug any desired attribute behind user.
      identifier = "admin2@admin";
    } catch {}
  }

  //Define sql query depending on role
  let sqlQuery = "";
  if (role === "D") {
    //Show blocks, where the Lecturer is assigned
    sqlQuery =
      "SELECT * FROM blocks INNER JOIN attendance ON attendance.block_id = blocks.block_id WHERE blocks.block_id = ? AND blocks.lecturer_id = ? AND attendance.sess_id = ?;";
  }

  if (sqlQuery != "" && role != "" && identifier != "") {
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
          [blockId, identifier, sessId],
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
  const router = useRouter();
  const { blockId } = router.query;

  const [data, setData] = useState(props.data);
  const [popUpText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  {
    /* BACKEND: get matrikel from group and their respective attendance for that day */
  }

  useEffect(() => {}, [data]);

  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleClick = (index) => {
    let dataCopy = [...data];
    dataCopy[index].confirmed_at = dataCopy[index].confirmed_at
      ? undefined
      : new Date().toISOString();
    setData(dataCopy);
  };

  const saveChanges = async () => {
    //POSTING the credentials
    const response = await fetch("/api/updateAttendance", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({
        session,
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();
    if (resData == "FAIL CODE 8") {
      setPopupText("Benutzerkonto konnte nicht geändert werden");
    } else if (resData == "SUCCESS") {
      setPopupText("Änderungen wurden erfolgreich gespeichert");
    } else {
      setPopupText("Ein unbekannter Fehler ist aufgetreten");
    }
    handleShowPopup();
  };

  // TO DO (backend): get actual courseName from database based on blockId
  var courseName = props.data[0].block_name;

  //code to secure the page
  const { data: session, status } = useSession();

  var role;

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

  //Try recieving correct user role
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }

  //Redirect user back if unAUTHORIZED (wrong role)
  if (role === "S" || role === "B" || role === "A") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Unauthorisiert</button>
      </div>
    );
  }

  if (role === "D") {
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
            <Sidebar type="lecturer"></Sidebar>
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
                    Teilnehmerliste
                  </h1>
                </div>
                <div class="overflow-auto">
                  {/* display table component with attendance details for the course */}
                  <div className="grid w-fit sm:grid-cols-1 gap-5">
                    {/* TODO: backend: find out corresponding values for course and pass to courseDate */}
                    <div class="container mx-auto">
                      <div class="overflow-auto">
                        <table class="table table-normal w-full text-primary text-center dark:text-white">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Kürzel</th>
                              <th>Matrikelnr.</th>
                              <th>Anwesenheit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data ? (
                              data.map((student, index) => (
                                <tr class="hover">
                                  <td>{index + 1}</td>
                                  <td>{student.student_username}</td>
                                  <td>nicht gegeben</td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      class="checkbox checkbox-primary"
                                      checked={
                                        student.confirmed_at != undefined
                                      }
                                      onClick={() => handleClick(index)}
                                    />
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <p>Keine Daten Vorhanden</p>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn" onClick={saveChanges}>
                    Änderungen Speichern
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showPopup && <PopUp text={popUpText}></PopUp>}
          <Footer></Footer>
        </div>
      </>
    );
  }
}
