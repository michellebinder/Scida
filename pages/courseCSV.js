import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import Papa from "papaparse";
import React, { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import PopUp from "../components/popUp";

const COLUMN_OF_LECTURER = 12;

export default function Home() {
  // Initialize an array to keep track of checkbox values
  var initialCheckboxValues;

  const [checkboxValues, setCheckboxValues] = useState();
  const [lecturer, setLecturer] = useState();
  const [lecturerMail, setLecturerMail] = useState([]);

  // Function to handle checkbox click and update the state
  const handleCheckboxChange = (index) => {
    const newCheckboxValues = [...checkboxValues];
    newCheckboxValues[index] = !newCheckboxValues[index];
    setCheckboxValues(newCheckboxValues);
  };
  //Conts and function for popup
  const [popUpText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popUpType, setPopUpType] = useState(""); //Const to handle popup color
  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };
  //NOTE: Code snippets taken from https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0 and https://codesandbox.io/s/thyb0?file=/pages/api/file.js and adapted for this usecase and node/fs/formidable version
  //Constants used in uploadToServer function
  const [file, setFile] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  //Store parsed data in array format
  const [arrayData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  //Function to upload selected file to local client, i.e. to display selected file in UI
  const uploadToClient = (event) => {
    //Save file for later use in uploadToServer function
    const i = event.target.files[0];
    setFile(i);
    setCreateObjectURL(URL.createObjectURL(i));
    //Passing file data (event.target.files[0]) to parse using Papa.parse, i.e. breaking down the csv file
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        const rowsArray = [];
        const valuesArray = [];

        //Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        //Parsed Data Response in array format
        setParsedData(results.data);

        //Filtered Column Names
        setTableRows(rowsArray[0]);
        console.log(rowsArray);

        console.log(valuesArray[0][COLUMN_OF_LECTURER]);
        let uniqueLecturer = [];
        valuesArray.forEach((row, i) => {
          if (uniqueLecturer.indexOf(row[COLUMN_OF_LECTURER]) == -1) {
            uniqueLecturer.push(row[COLUMN_OF_LECTURER]);
          }
        });
        setLecturer(uniqueLecturer);
        //Filtered Values
        setValues(valuesArray);
        initialCheckboxValues = new Array(valuesArray.length).fill(false);
        setCheckboxValues(initialCheckboxValues);
      },
    });
  };

  //Function to (finally) upload an submit file to api
  const uploadToServer = async (event) => {
    // If the semester input value is valid, create a FormData object
    const body = new FormData();
    body.append("file", file);
    console.log("checkboxValues");
    console.log(checkboxValues);
    console.log("lecturer");
    console.log(lecturer);
    console.log("lecturerMail");
    console.log(lecturerMail);
    const responseUpload = await fetch("/api/uploadSessions", {
      method: "POST",
      body: JSON.stringify({ checkboxValues, lecturerMail, lecturer }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    const responseMessageUpload = await responseUpload.json();
    if (responseMessageUpload == "SUCCESS") {
      setPopUpType("SUCCESS");
      setPopupText("Die CSV-Datei wurde erfolgreich hochgeladen.");
    } else if (responseMessageUpload == "ER_DUP_ENTRY") {
      setPopUpType("ERROR");
      setPopupText(
        "Diese csv-Datei wurde bereits hochgeladen! Bitte verwenden Sie eine andere Datei."
      );
    } else {
      setPopUpType("ERROR");
      setPopupText(
        "Ein unerwarteter Fehler ist aufgetreten! Bitte versuchen Sie es später erneut."
      );
    }
    handleShowPopup();
  };

  //code to secure the page
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

  //Try recieving correct user role
  var role;
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }

  //Redirect user back if unAUTHORIZED (wrong role)
  if (role === "S" || role === "B" || role === "scidaSekretariat") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Unautorisiert</button>
      </div>
    );
  }

  if (role === "scidaDekanat") {
    return (
      <div>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between bg-base-100 w-fit lg:w-screen">
          {/* dashboard navbar with navigation items */}
          <Navbar type="admin"></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="admin"></Sidebar>
            {/* div that stretches from below the navbar to the very bottom  */}
            <div className="hero grow bg-base-100">
              {/* grid for layouting the components (center of the screen) */}
              <div className="grid text-center text-neutral-content lg:p-10 gap-10">
                {/* div that contains the header (CSV hochladen) */}
                <div className="grid justify-center">
                  <div className="text-secondary dark:text-white">
                    <h1 className="text-5xl font-bold">CSV hochladen</h1>
                  </div>
                </div>
                {/* div that contains the text below the header */}
                <div className="text-secondary dark:text-white">
                  Hier können Sie die von Klips 2.0 generierten CSV-Dateien für
                  Blockpraktika hochladen.
                  <br /> <strong>Bitte beachten:</strong> Es können nur solche
                  Dateien hochgeladen werden, die die{" "}
                  <strong>Matrikelnummern der Studierenden</strong> beinhalten.{" "}
                  <br />
                  Bitte laden Sie keine Dateien hoch, die Vor- und Nachnamen der
                  Studierenden beinhalten.
                </div>
                {/* grid for component (center of the screen) */}
                <div className="grid place-items-center">
                  <div className="grid gap-3 pt-6">
                    {/* single daisyUI card component  */}
                    <div className="card card-side text-primary-content bg-primary">
                      <div className="card-body place-items-center shadow-2xl rounded-b-lg">
                        <div>
                          {/* Instructions for the semester input */}
                          <p className="mb-10">
                            Bitte tragen Sie hier das Semester ein, in dem die
                            Blockpraktika der CSV-Datei stattfinden werden.
                          </p>
                          <input
                            type="file"
                            id="fileInput"
                            name="fileInput"
                            accept=".csv"
                            onChange={uploadToClient}
                            className="file-input text-black dark:text-white hover:opacity-80 mt-10 w-96"
                          />
                        </div>
                        <div className="flex flex-col gap-10">
                          {lecturer && (
                            <p>
                              Bitte tragen Sie die Email der Vortragenden
                              Person(en) ein.
                            </p>
                          )}
                          {lecturer &&
                            lecturer.map((value, index) => {
                              return (
                                <div key={index}>
                                  <p>{value}</p>
                                  <input
                                    type="text"
                                    placeholder="email@uni-koeln.de"
                                    className="input input-bordered w-60"
                                    onChange={(e) => {
                                      // Create a copy of lecturerMail
                                      const updatedLecturerMail = [
                                        ...lecturerMail,
                                      ];

                                      // Update the email address for the current lecturer
                                      updatedLecturerMail[index] =
                                        e.target.value;

                                      // Update the state with the new array
                                      setLecturerMail(updatedLecturerMail);
                                    }}
                                  ></input>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Table to preview the uploaded csv file */}
                <div className="overflow-x-auto">
                  <table
                    className="table table-compact w-full text-black dark:text-white"
                    style={{ tableLayout: "auto" }}
                  >
                    <thead>
                      <tr>
                        <th>Pflichtermin</th>
                        {tableRows.map((rows, index) => {
                          return <th key={index + 1}>{rows}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {values.map((value, index) => {
                        console.log("Hier2");
                        return (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                checked={checkboxValues[index]}
                                onChange={() => handleCheckboxChange(index)}
                              />
                            </td>
                            {value.map((val, i) => {
                              return <td key={i}>{val}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="pt-5">
                    <button
                      type="submit"
                      onClick={uploadToServer}
                      className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white"
                    >
                      hochladen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
          {/* Custom Pop-up window, which appears when the button "Nutzenden erstellen" is clicked */}
          {showPopup && <PopUp text={popUpText} type={popUpType}></PopUp>}
        </div>
      </div>
    );
  }
}
