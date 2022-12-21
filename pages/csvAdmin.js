import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import Papa from "papaparse";
import React, { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function Home() {
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

        //Filtered Values
        setValues(valuesArray);
      },
    });
  };

  //Function to (finally) upload an submit file to api
  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });
  };

  //code to secure the page
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
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
  if (role === "Sekretariat" || role === "Studiendekanat" || role === "B") {
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
            <div className="hero grow">
              {/* grid for layouting the components (center of the screen) */}
              <div className="grid hero-content text-center text-neutral-content lg:p-10">
                {/* div that contains the header (CSV hochladen) */}
                <div className="grid justify-center">
                  <div className="text-secondary dark:text-white">
                    <h1 className="text-5xl font-bold">CSV hochladen</h1>
                  </div>
                </div>
                {/* grid for component (center of the screen) */}
                <div className="grid place-items-center">
                  <div className="grid gap-3 pt-6">
                    {/* single daisyUI card component  */}
                    <div className="card card-normal text-primary-content bg-primary">
                      <div className="card-body place-items-center shadow-2xl rounded-b-lg">
                        <div>
                          <input
                            type="file"
                            id="fileInput"
                            name="fileInput"
                            accept=".csv"
                            onChange={uploadToClient}
                            className="file-input w-full max-w-xs text-black dark:text-white"
                          />
                          <div className="pt-5">
                            <button
                              type="submit"
                              onClick={uploadToServer}
                              className="btn"
                            >
                              <label htmlFor="popup_create_user">
                                Hochladen
                              </label>
                            </button>
                          </div>
                          {/* Pop-up window (called Modal in daisyUI), which appears when the button "Hochladen" is clicked */}
                          <input
                            type="checkbox"
                            id="popup_create_user"
                            className="modal-toggle"
                          />
                          <label
                            htmlFor="popup_create_user"
                            className="modal cursor-pointer"
                          >
                            <div className="alert alert-success shadow-lg w-fit">
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="stroke-current flex-shrink-0 h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span>CSV-Datei erfolgreich hochgeladen!</span>
                              </div>
                            </div>
                          </label>
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
        </div>
      </div>
    );
  }
}
