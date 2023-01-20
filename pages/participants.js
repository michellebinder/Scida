import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react";
import PopUp from "../components/popUp";
import QrScan from "../components/qrScan";
const mysql = require("mysql2");

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req }); // works
  const sessId = query.sessId;
  const blockId = query.blockId;
  const groupId = query.groupId;
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
      "SELECT * FROM blocks INNER JOIN attendance ON attendance.block_id = blocks.block_id WHERE blocks.block_id = ? AND attendance.sess_id = ? AND attendance.group_id = ? AND attendance.lecturer_id = ?;";
  } else if (role === "scidaDekanat" || role === "scidaSekretariat") {
    sqlQuery =
      "SELECT * FROM blocks INNER JOIN attendance ON attendance.block_id = blocks.block_id WHERE blocks.block_id = ? AND attendance.sess_id = ? AND attendance.group_id = ?;";
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

        connection.query(
          sqlQuery,
          [blockId, sessId, groupId, identifier],
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

  const { blockId, sessId, groupId, lecturerId, blockName } = router.query;

  const [data, setData] = useState(props.data);
  const [popUpText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [matrikelnummer, setMatrValue] = useState("");
  const modalToggleRef = useRef();
  let matrikelnummerForDeletion = 0;
  const [type, setType] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {}, [data]);

  const pattern = /^\d{7}$/;
  const [errorMessage, setErrorMessage] = useState("");

  // Function that runs on change of the Matrikelnummer input field
  const checkMatrInput = (e) => {
    // Update the state with the current value of the input field
    setMatrValue(e.target.value);
    // Use the pattern to check if the current value is valid
    if (pattern.test(e.target.value)) {
      // If the value is valid, clear any error message
      setErrorMessage("");
    }
  };

  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleQrScan = (result) => {
    const resArray = result.text.split(";");
    if (
      blockId == resArray[1] &&
      groupId == resArray[2] &&
      sessId == resArray[3]
    ) {
      const index = data.findIndex((e) => e.matrikelnummer == resArray[0]);
      let dataCopy = [...data];
      dataCopy[index].confirmed_at = new Date().toISOString();
      setData(dataCopy);
    } else {
      setPopupText("Student ist in einem anderen Block/ einer anderen Gruppe");
      setType("ERROR");
      setShowPopup(true);
    }
  };
  const toggleModal = (matrikelnummer) => {
    matrikelnummerForDeletion = matrikelnummer;
    modalToggleRef.current.checked = !modalToggleRef.current.checked;
  };

  // Define the handleClick function to toggle the attendance of a student when the corresponding checkbox is clicked
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
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();
    if (resData == "FAIL CODE 8") {
      setPopupText("Benutzerkonto konnte nicht geändert werden");
      setType("ERROR");
    } else if (resData == "SUCCESS") {
      setPopupText("Änderungen wurden erfolgreich gespeichert");
      setType("SUCCESS");
    } else {
      setPopupText("Ein unbekannter Fehler ist aufgetreten");
      setType("ERROR");
    }
    handleShowPopup();
  };

  const handleDelete = async () => {
    const response = await fetch("/api/deleteStudentFromAttendance", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({
        matrikelnummerForDeletion,
        blockId,
        sessId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //Saving the RESPONSE in the responseMessage variable
    const data = await response.json();
    if (data == "FAIL CODE 4") {
      setPopupText("Student:in konnte nicht entfernt werden");
      setType("ERROR");
    } else if (data == "SUCCESS") {
      setPopupText("Student:in wurde entfernt");
      setType("SUCCESS");

      setData((prevData) =>
        prevData.filter(
          (data) => data.matrikelnummer !== matrikelnummerForDeletion
        )
      );
    } else {
      setPopupText("Ein unbekannter Fehler ist aufgetreten");
      setType("ERROR");
    }
    handleShowPopup();
  };

  const addStudent = async () => {
    if (!pattern.test(matrikelnummer)) {
      // If the value is not valid, set an error message
      setErrorMessage("Die Matrikelnummer muss genau 7 Ziffern haben!");
    } else {
      const response = await fetch("/api/addStudentToAttendance", {
        //Insert API you want to call
        method: "POST",
        body: JSON.stringify({
          matrikelnummer,
          blockId,
          sessId,
          groupId,
          lecturerId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      //Saving the RESPONSE in the responseMessage variable
      const responseMessage = await response.json();
      console.log(responseMessage);
      if (responseMessage == "SUCCESS") {
        setType("SUCCESS");
        setPopupText(
          "Student:in wurde erfolgreich hinzugefügt"
        );
        let newStudent = {
          block_id: blockId,
          block_name: blockName,
          confirmed_at: null,
          group_id: groupId,
          lecturer_id: undefined, //To be set by user
          matrikelnummer: matrikelnummer,
          semester: null, //Can be null as it won't influence neither the sessions table nor the attendance table
          sess_id: sessId,
        };
        setData([...data, newStudent]);
      } else if (responseMessage == "ER_DUP_ENTRY") {
        console.log("errorrrr")
        setType("ERROR");
        setPopupText(
          "Student:in wurde bereits hinzugefügt"
        );
      } else {
        setPopupText("Student:in konnte nicht hinzugefügt werden");
        setType("ERROR");
      }
      handleShowPopup();
    }
  };
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
  if (role === "S") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Unautorisiert</button>
      </div>
    );
  }

  if (role === "B") {
    return (
      <>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* Div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between bg-base-100">
          {/* Dashboard navbar with navigation items  */}
          <Navbar type="lecturer"></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="lecturer"></Sidebar>
            <div className="hero grow bg-base-100">
              {/* Grid for layouting welcome text and card components, already responsive */}
              <div className="grid hero-content text-center text-neutral lg:p-10">
                <div className="text-secondary dark:text-white">
                  {/* display courseID as determined by href url */}
                  <h1 className="mb-5 text-5xl font-bold text-center">
                    {blockName}
                  </h1>
                  <h1 className="mb-5 text-3xl font-bold text-center">
                    Teilnehmerliste
                  </h1>
                </div>
                <div className="overflow-auto">
                  {/* display table component with attendance details for the course */}
                  <div className="grid w-full sm:grid-cols-1 gap-5">
                    <div className="container mx-auto">
                      <div className="overflow-auto">
                        <table className="table table-normal w-full text-primary text-center dark:text-white">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Matrikelnr.</th>
                              <th>Anwesenheit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data ? (
                              data.map((student, index) => (
                                <tr className="hover">
                                  <td>{index + 1}</td>
                                  <td>{student.matrikelnummer}</td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      className="checkbox checkbox-primary"
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
                  <button
                    className="btn bg-success border-none text-neutral hover:bg-emerald-600 mb-5 w-full"
                    onClick={saveChanges}
                  >
                    Änderungen Speichern
                  </button>
                  <div className="divider ml-2 mr-2 mt-1 mb-1"></div>
                  <QrScan result={handleQrScan}></QrScan>
                </div>
              </div>
            </div>
          </div>
          {showPopup && <PopUp type={type} text={popUpText}></PopUp>}
          <Footer></Footer>
        </div>
      </>
    );
  } else if (role === "scidaSekretariat" || role === "scidaDekanat") {
    return (
      <>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* Div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between bg-base-100">
          {/* Dashboard navbar with navigation items  */}
          <Navbar type="admin"></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="admin"></Sidebar>
            <div className="hero grow bg-base-100">
              {/* Grid for layouting welcome text and card components, already responsive */}
              <div className="grid hero-content text-center text-neutral lg:p-10">
                <div className="text-secondary dark:text-white">
                  {/* display courseID as determined by href url */}
                  <h1 className="mb-5 text-5xl font-bold text-center">
                    {blockName}
                  </h1>
                  <h1 className="mb-5 text-3xl font-bold text-center">
                    Teilnehmerliste
                  </h1>
                </div>
                {/* <div className="overflow-auto"> */}
                {/* display table component with attendance details for the course */}
                <div className="grid sm:grid-cols-1 gap-5">
                  <div class="container mx-auto">
                    <div class="overflow-auto w-full">
                      <table class="table table-normal w-full text-primary text-center dark:text-white">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Matrikelnr.</th>
                            <th>Anwesenheit</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((row, index) => (
                            <tr class="hover">
                              <td>{index + 1}</td>
                              <td>{row.matrikelnummer}</td>
                              <td>
                                <input
                                  type="checkbox"
                                  class="checkbox checkbox-primary"
                                  checked={row.confirmed_at != undefined}
                                  onClick={() => handleClick(index)}
                                />
                              </td>
                              {/* Column with "Trash"-icon for deleting rows */}
                              <td>
                                <a
                                  href="#"
                                  onClick={() => {
                                    toggleModal(row.matrikelnummer);
                                  }}
                                >
                                  {/* "Trash"-icon for deleting rows */}
                                  <svg
                                    className="svg-icon fill-current text-accent hover:stroke-current"
                                    viewBox="0 -9 20 27"
                                    width="30"
                                    height="40"
                                  >
                                    <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
                                  </svg>
                                  &nbsp;
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div>
                        {/* Button to open the modal box for adding a new student to the course */}
                        <button
                          className="btn btn-secondary border-transparent text-background mt-3 w-full dark:btn dark:hover:shadow-lg dark:hover:opacity-75"
                          onClick={() => setModalIsOpen(!modalIsOpen)}
                        >
                          Teilnehmer:in hinzufügen
                        </button>
                        <div className="divider ml-2 mr-2 mt-1 mb-1"></div>
                        <button
                          className="btn bg-success border-none text-neutral hover:bg-emerald-600 w-full"
                          onClick={saveChanges}
                        >
                          Änderungen Speichern
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Modal box that appears when the add button is clicked */}
                <input
                  type="checkbox"
                  id="popup_add_student"
                  className="modal-toggle"
                  checked={modalIsOpen}
                />
                <div className="modal">
                  <div className="modal-box bg-secondary dark:bg-gray-700">
                    {/* Input field for the matr */}
                    <p className="text-center text-white text-lg font-bold mb-5">
                      Bitte tragen Sie hier die Matrikelnummer ein, <br></br> die Sie
                      hinzufügen möchten.
                    </p>
                    <label
                      htmlFor="matr"
                      className="input-group pb-5 flex justify-center text-neutral dark:text-white"
                    >
                      <span className="font-bold text-center">
                        Matrikelnummer
                      </span>
                      <input
                        onChange={checkMatrInput}
                        value={matrikelnummer}
                        id="matr"
                        name="matr"
                        type="text"
                        className="input input-bordered"
                      />
                    </label>
                    {/* Error message for invalid semester input */}
                    <label
                      // If the input is invalid, set background to red, else set it to transparent
                      className={`mb-10 text-center p-3 rounded-md ${
                        errorMessage !== ""
                          ? "bg-accent text-white modal-open"
                          : "bg-transparent"
                      }  w-fit`}
                    >
                      {errorMessage}
                    </label>
                    <div className="flex justify-between">
                      {/* Button calling function to add the new student to the course */}
                      <div className="modal-action flex-col gap-3">
                        <button
                          for="popup_add_student"
                          className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white mt-10 w-40"
                          onClick={() => {
                            addStudent();
                          }}
                        >
                          Hinzufügen
                        </button>
                      </div>
                      {/* Button to cancel operation */}
                      <div className="modal-action">
                        <label
                          for="popup_add_student"
                          className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white mt-10 w-40"
                          onClick={() => {
                            setModalIsOpen(!modalIsOpen);
                            setErrorMessage("");
                            setMatrValue("");
                          }}
                        >
                          Schließen
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="popup_delete_student"
                  class="modal-toggle"
                  ref={modalToggleRef}
                />
                <div class="modal">
                  <div class="modal-box bg-secondary">
                    {/* text field displaying "Sind Sie sicher?" */}
                    <div className="mb-2 text-2xl text-white">
                      <p>Sind Sie sicher?</p>
                    </div>
                    <div class="flex justify-between">
                      {/* Button calling function to delete student */}
                      <div class="modal-action">
                        <label
                          for="popup_delete_student"
                          class="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white mt-10 w-40"
                          onClick={() => handleDelete()}
                        >
                          Ja, löschen
                        </label>
                      </div>
                      {/* Button to cancel operation */}
                      <div class="modal-action">
                        <label
                          for="popup_delete_student"
                          class="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white mt-10 w-40"
                        >
                          Nein
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showPopup && <PopUp type={type} text={popUpText}></PopUp>}
          <Footer></Footer>
        </div>
      </>
    );
  }
}
