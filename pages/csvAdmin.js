import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import Papa from "papaparse";
import React, { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import PopUp from "../components/popUp";

export default function Home() {
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

  //State to store the semester values
  const [semester, setSemester] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Regular expression pattern for validating semester input
  // Matches SoSe followed by four digits, e.g. SS2022, or WiSe followed by four digits, a "/" and another four digits, e.g. WiSe2022/2023
  const pattern = /^(SoSe|WiSe)[0-9]{4}(\/[0-9]{4})?$/;

  // Function that runs on change of the semester input field
  const handleChange = (e) => {
    // Update the state with the current value of the input field
    setSemester(e.target.value);
    // Use the pattern to check if the current value is valid
    if (pattern.test(e.target.value)) {
      // If the value is valid, clear any error message
      setErrorMessage("");
    }
  };

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

        //Filtered Values
        setValues(valuesArray);
      },
    });
  };

  //Function to (finally) upload an submit file to api
  const uploadToServer = async (event) => {
    // Check if the semester input value is valid using the pattern
    if (!pattern.test(semester)) {
      // If the value is not valid, set an error message
      setErrorMessage(
        "Semester im falschen Format oder nicht eingetragen. Bsp: SoSe2022 oder WiSe2022/2023"
      );
    } else {
      // If the semester input value is valid, create a FormData object
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body,
        // Pass the semester value to the api
        headers: {
          semester: semester,
        },
      });
      //Saving the RESPONSE in the responseMessage variable
      const responseMessage = await response.json();
      //console.log(responseMessage);
      if (responseMessage == "SUCCESS") {
        //console.log("hier bin ich 2");
        const response = await fetch("/api/createInitialSessions", {
          method: "POST",
          // Pass the semester value to the api
        });
        setPopUpType("SUCCESS");
        setPopupText("Die CSV-Datei wurde erfolgreich hochgeladen.");
      } else if (responseMessage == "ER_DUP_ENTRY") {
        setPopUpType("ERROR");
        setPopupText(
          "Diese csv-Datei wurde bereits hochgeladen! Bitte verwenden Sie eine andere Datei."
        );
        handleShowPopup();
      } else {
        setPopUpType("ERROR");
        setPopupText(
          "Ein unerwarteter Fehler ist aufgetreten! Bitte versuchen Sie es später erneut."
        );
        handleShowPopup();
      }
    }
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
  if (role === "S" || role === "B") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Unautorisiert</button>
      </div>
    );
  }

  if (role === "scidaSekretariat" || role === "scidaDekanat") {
    return (
      <div>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between bg-base-100">
          {/* dashboard navbar with navigation items */}
          <Navbar type="admin"></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="admin"></Sidebar>
            {/* div that stretches from below the navbar to the very bottom  */}
            <div className="hero grow bg-base-100">
              {/* grid for layouting the components (center of the screen) */}
              <div className="grid hero-content text-center text-neutral-content lg:p-10">
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
                  <strong>Matrikelnummern der Studierenden</strong> beinhalten. <br />
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
                          <div className="flex-col">
                            {/* Input field for semester */}
                            <label className="input-group pb-5 justify-center text-slate-300 dark:text-white">
                              {/* Label for the input field */}
                              <span className="bg-neutral font-bold">
                                SEMESTER
                              </span>
                              <input
                                type="text"
                                className="input hover:bg-gray-300 text-primary w-96"
                                placeholder="z.B. SoSe2022 oder WiSe2022/2023"
                                required
                                value={semester}
                                onChange={handleChange}
                              />{" "}
                            </label>
                            {/* Error message for invalid semester input */}
                            <label
                              // If the input is invalid, set background to red, else set it to transparent
                              className={`mb-10 text-center p-3 rounded-md ${
                                errorMessage !== ""
                                  ? "bg-accent text-white"
                                  : "bg-transparent"
                              }  w-fit`}
                            >
                              {errorMessage}
                            </label>
                          </div>
                          <input
                            type="file"
                            id="fileInput"
                            name="fileInput"
                            accept=".csv"
                            onChange={uploadToClient}
                            className="file-input text-black dark:text-white hover:opacity-80 mt-10 w-96"
                          />
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
                </div>
                {/* Table to preview the uploaded csv file */}
                <div className="overflow-x-auto">
                  <table className="table table-compact w-full text-black dark:text-white">
                    <thead>
                      <tr>
                        {tableRows.map((rows, index) => {
                          return <th key={index}>{rows}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {values.map((value, index) => {
                        return (
                          <tr key={index}>
                            {value.map((val, i) => {
                              return <td key={i}>{val}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
