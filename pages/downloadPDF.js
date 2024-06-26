import Head from "next/head";
import React, { useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { Parser } from "json2csv";
import { CSVLink, CSVDownload } from "react-csv";
import { PropTypes } from "prop-types";

import { jsPDF } from "jspdf";

export default function Home() {
  const [blockName, createBlockName] = useState("");
  // const [groupID, createGroupID] = useState("");
  const [semester, createSemester] = useState("");
  const [studentID, createStudentID] = useState("");
  const [responseMessage, setResponseMessage] = useState([]);

  const [showResults, setShowResults] = useState(false);

  /*test */
  const showCSV = async () => {
    try {
      const response = await fetch("/api/getAdmissionList", {
        //Insert API you want to call
        method: "POST",
        body: JSON.stringify({ blockName, /* groupID, */ semester, studentID }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //Saving the RESPONSE in the responseMessage variable
      const res = await response.json();
      let data = JSON.parse(res);
      setResponseMessage(data);
    } catch (error) {}
  };

  const handleShowResults = () => {
    setShowResults(true);
  };
  //create a PDF file
  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: "p", // landscape
      unit: "mm", // points, pixels won't work properly
      format: [297, 210], //A4
    });
    let dataPerPage = 15;
    let requiredPages = responseMessage.length / dataPerPage;
    let distanceToTop = 100;
    let distanceLines = 10;
    if (responseMessage.length % dataPerPage > 0) {
      //add one more page
      requiredPages++;
    }
    for (let i = 2; i <= requiredPages; i++) {
      doc.addPage();
    }
    //get current date
    const d = new Date();
    let month = d.getMonth() + 1;
    let currentDate;
    if (month < 10) {
      currentDate = d.getDate() + "/" + 0 + month + "/" + d.getFullYear();
    } else {
      currentDate = d.getDate() + "/" + month + "/" + d.getFullYear();
    }
    // //get MedFak-Logo
    const img = new Image();
    img.src = "/MedFakSIegel_Schwarz.png";
    img.onload = () => {
      // await for the image to be fully loaded
      //for pages
      for (let i = 1; i <= requiredPages; i++) {
        doc.setPage(i);
        doc.addImage(img, "png", 175, 5, 24, 38);
        doc.setFont("Times", "bold");
        doc.setFontSize(15);
        //#ae131e
        doc.setTextColor(174, 19, 30);
        doc.text("Medizinische Fakultät", 10, 30);
        //black
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(30);
        doc.text("Universität zu Köln", 10, 20);
        doc.setFontSize(8);
        doc.text(
          "Universität zu Köln • Albertus-Magnus-Platz • 50923 Köln",
          10,
          40
        );
        doc.setFontSize(9);
        doc.text("Datum: " + currentDate, 175, 60);
        doc.setFontSize(20);
        doc.text("Zulassungsliste", 10, 55);
        doc.setFontSize(15);
        doc.setFontSize(14);
        doc.setFont("Times", "bold");
        doc.text("Block", 5, distanceToTop - 10);
        doc.text("Semester", 70, distanceToTop - 10);
        doc.text("Matrikelnummer", 110, distanceToTop - 10);
        doc.text("Anwesenheitsanteil", 150, distanceToTop - 10);

        //draw a line
        doc.setLineWidth(1);
        doc.line(5, distanceToTop - 5, 195, distanceToTop - 5);
        doc.setFont("Times", "normal");
        //for every Page
        for (
          let resIndex = dataPerPage * (i - 1);
          resIndex < dataPerPage * (i - 1) + dataPerPage;
          resIndex++
        ) {
          if (resIndex < responseMessage.length) {
            //draw a line above
            doc.setLineWidth(0.2);
            doc.line(
              5,
              distanceToTop + (resIndex % dataPerPage) * distanceLines - 5,
              195,
              distanceToTop + (resIndex % dataPerPage) * distanceLines - 5
            );
            doc.setFontSize(10);
            doc.text(
              responseMessage[resIndex].block_name,
              5,
              distanceToTop + (resIndex % dataPerPage) * distanceLines
            );
            doc.setFontSize(12);
            doc.text(
              responseMessage[resIndex].semester,
              70,
              distanceToTop + (resIndex % dataPerPage) * distanceLines
            );
            doc.text(
              responseMessage[resIndex].matrikelnummer,
              110,
              distanceToTop + (resIndex % dataPerPage) * distanceLines
            );
            doc.text(
              "" + parseInt(responseMessage[resIndex].percentage, 10) + "%",
              150,
              distanceToTop + (resIndex % dataPerPage) * distanceLines
            );
          }
        }

        doc.setFontSize(8);
        doc.text("Seite: " + i + "/" + doc.internal.getNumberOfPages(), 5, 290);
        doc.setFontSize(12);
        doc.text("SIEGEL", 160, 270);
      }
      doc.save("Zulassungsliste.pdf");
    };
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
  if (role === "B") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Unautorisiert</button>
      </div>
    );
  }

  if (role === "scidaSekretariat" || role === "scidaDekanat") {
    return (
      <>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* Div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between w-fit lg:w-screen">
          {/* Dashboard navbar with navigation items  */}
          <Navbar type="admin"></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="admin"></Sidebar>
            <div className="hero grow bg-base-100">
              {/* Grid for layouting welcome text and card components, already responsive */}
              <div className="grid hero-content lg:p-10 sm:max-w-fit">
                <div className="text-secondary text-center dark:text-white">
                  <h1 className="mb-5 text-5xl font-bold text-center">
                    Anwesenheitslisten
                  </h1>
                  <p className="mb-5">
                    Hier können Sie die Anwesenheitslisten für{" "}
                    <strong>bestandene </strong> Blockpraktika als PDF-Datei
                    herunterladen.
                  </p>
                </div>
                <div className="grid gap-y-10 sm:gap-x-10 sm:grid-cols-2">
                  {/* single daisyUI card component to specify search criteria*/}
                  <div className="card card-normal bg-primary text-primary-content">
                    <div className="card-body">
                      <h2 className="card-title text-white">
                        Suche spezifizieren
                      </h2>
                      <div className="w-11/12 max-w-5xl">
                        <p className="text-left mb-5">
                          Füllen Sie die Felder aus und klicken Sie auf
                          "Suchen". <br></br>
                          Sobald die Suchergebnisse die gewünschten Daten
                          angezeigen, auf "Herunterladen" klicken.
                        </p>
                        {/* Input group to enter information about the user that will be created */}
                        <div>
                          {/* Input field for first name */}
                          <label
                            htlmFor="blockName"
                            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                          >
                            <span className="font-bold w-40">
                              Blockpraktikum
                            </span>
                            <input
                              onChange={(e) => createBlockName(e.target.value)}
                              value={blockName}
                              id="blockName"
                              name="blockName"
                              type="text"
                              placeholder="z.B. Gynäkologie"
                              className="input input-bordered w-96"
                            />
                          </label>
                          <label
                            htmlFor="email"
                            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                          >
                            <span className="font-bold w-40">Semester</span>
                            <input
                              onChange={(e) => createSemester(e.target.value)}
                              value={semester}
                              id="semester"
                              name="semester"
                              type="text"
                              placeholder="z.B. WiSe2022/2023 oder SoSe2022"
                              className="input input-bordered w-96"
                            />
                          </label>
                          {/* Input field for role */}
                          <label
                            htmlFor="email"
                            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                          >
                            <span className="font-bold w-40">
                              Matrikelnummer
                            </span>
                            <input
                              onChange={(e) => createStudentID(e.target.value)}
                              value={studentID}
                              id="studentID"
                              name="studentID"
                              type="text"
                              placeholder="z.B. 0000000"
                              className="input input-bordered w-96"
                            />
                          </label>
                        </div>
                      </div>
                      {/* Button to show attendance */}
                      {/* Create button that calls 2 functions (showCSV and handleShowResults) when clicked */}
                      <div className="justify-center flex">
                        <button
                          className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white w-56"
                          onClick={() => {
                            showCSV();
                            handleShowResults();
                          }}
                        >
                          Suchen
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* card to display preview of search results */}
                  <div className="card card-normal bg-primary text-primary-content basis-1/2">
                    <div className="card-body flex justify-between">
                      <h2 className="card-title text-white">Suchergebnisse</h2>
                      {/* preview */}
                      {showResults ? (
                        <div className="overflow-x-auto">
                          <table className="table table-compact w-full text-black dark:text-white">
                            <thead>
                              <tr>
                                <th>Praktikum</th>
                                <th>Semester</th>
                                <th>Matrikelnummer</th>
                                <th>Anwesenheit (%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {responseMessage.map((item, index) => (
                                <tr key={index} className="hover">
                                  <td>{item.block_name}</td>
                                  <td>{item.semester}</td>
                                  <td>{item.matrikelnummer}</td>
                                  <td>
                                    {(
                                      Math.round(
                                        parseFloat(item.percentage) * 100
                                      ) / 100
                                    ).toFixed(2)}
                                    %
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-left mb-5">
                          Suche noch nicht gestartet.
                        </p>
                      )}
                      {/* Button to download PDF */}
                      <div className="flex justify-center">
                        <button
                          onClick={generatePDF}
                          className="btn shadow-none hover:shadow-lg hover:opacity-75 w-56 mt-5"
                        >
                          <label>Herunterladen</label>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </>
    );
  } else if (role === "S") {
    return (
      <>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* Div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between w-fit lg:w-screen">
          {/* Dashboard navbar with navigation items  */}
          <Navbar type="student"></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="student"></Sidebar>
            <div className="hero grow bg-base-100">
              {/* Grid for layouting welcome text and card components, already responsive */}
              <div className="grid hero-content lg:p-10">
                <div className="text-secondary text-center dark:text-white">
                  <h1 className="mb-5 text-5xl font-bold text-center">
                    Anwesenheitslisten
                  </h1>
                  <p className="mb-5">
                    Hier kannst du die Anwesenheitslisten für einzelne{" "}
                    <strong>bestandene </strong>
                    Blockpraktika als PDF-Datei herunterladen.
                  </p>
                </div>
                <div className="grid gap-y-10 lg:gap-x-10 lg:grid-cols-2">
                  {/* single daisyUI card component to specify search criteria*/}
                  <div className="card card-normal bg-primary text-primary-content">
                    <div className="card-body">
                      <h2 className="card-title text-white">
                        Suche spezifizieren
                      </h2>
                      <div className="">
                        <p className="text-left mb-5">
                          Fülle die Felder aus und klicke auf "Suchen".{" "}
                          <br></br>
                          Sobald die Suchergebnisse die gewünschten Daten
                          angezeigen, auf "Herunterladen" klicken.
                        </p>
                        {/* Input group to enter information about the download that will be created */}
                        <div>
                          {/* Input field for Blockpraktikum */}
                          <label
                            htlmFor="blockName"
                            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                          >
                            <span className="w-40 font-bold">
                              Blockpraktikum
                            </span>
                            <input
                              onChange={(e) => createBlockName(e.target.value)}
                              value={blockName}
                              id="blockName"
                              name="blockName"
                              type="text"
                              placeholder="z.B. Gynäkologie"
                              className="input input-bordered w-72"
                            />
                          </label>
                          {/* Input field for semester */}
                          <label
                            htmlFor="email"
                            className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                          >
                            <span className="w-40 font-bold">Semester</span>
                            <input
                              onChange={(e) => createSemester(e.target.value)}
                              value={semester}
                              id="semester"
                              name="semester"
                              type="text"
                              placeholder="z.B. WiSe2022/2023 oder SoSe2022"
                              className="input input-bordered w-72"
                            />
                          </label>
                        </div>
                      </div>
                      {/* Button to show attendance */}
                      {/* Create button that calls 2 functions (showCSV and handleShowResults) when clicked */}
                      <div className="justify-center flex">
                        <button
                          onClick={() => {
                            showCSV();
                            handleShowResults();
                          }}
                          className="btn shadow-none hover:shadow-lg hover:opacity-75 w-56"
                        >
                          <label>Suchen</label>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* card to display preview of search results */}
                  <div className="card card-normal bg-primary text-primary-content basis-1/2">
                    <div className="card-body flex justify-between">
                      <h2 className="card-title text-white">Suchergebnisse</h2>
                      {/* preview */}
                      {showResults ? (
                        <div className="overflow-x-auto">
                          <table className="table table-compact w-full text-black dark:text-white">
                            <thead>
                              <tr>
                                <th>Praktikum</th>
                                <th>Semester</th>
                                <th>Matrikelnummer</th>
                                <th>Anwesenheit (%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {responseMessage.map((item, index) => (
                                <tr key={index} className="hover">
                                  <td>{item.block_name}</td>
                                  <td>{item.semester}</td>
                                  <td>{item.matrikelnummer}</td>
                                  <td>
                                    {(
                                      Math.round(
                                        parseFloat(item.percentage) * 100
                                      ) / 100
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-left mb-5">
                          Suche noch nicht gestartet.
                        </p>
                      )}
                      {/* Button to download CSV */}
                      <div className="flex justify-center">
                        <button
                          onClick={generatePDF}
                          className="btn shadow-none hover:shadow-lg hover:opacity-75 w-56 mt-5"
                        >
                          <label>Herunterladen</label>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </>
    );
  }
}
