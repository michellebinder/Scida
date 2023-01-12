import Head from "next/head";
import React, { useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { Parser } from 'json2csv';
import { CSVLink, CSVDownload } from "react-csv";
import { PropTypes } from "prop-types";
import generatePDF from "../components/GeneratePDF";
import { jsPDF } from "jspdf";
// import autoTable from 'jspdf-autotable'
// import { applyPlugin } from 'jspdf-autotable'
// applyPlugin(jsPDF)

// import test from "./public/testAttendance.csv";
// console.log(test);

export default function Home() {
    const [blockName, createBlockName] = useState("");
    const [groupID, createGroupID] = useState("");
    const [semester, createSemester] = useState("");
    const [studentID, createStudentID] = useState("");
    const [responseMessage, setResponseMessage] = useState([]);

    const [showResults, setShowResults] = useState(false);

    /*test */
    const showCSV = async () => {

        try {
            const response = await fetch("/api/createFile", {
                //Insert API you want to call
                method: "POST",
                body: JSON.stringify({ blockName, groupID, semester, studentID }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //Saving the RESPONSE in the responseMessage variable
            const res = await response.json();
            let data = JSON.parse(res);
            setResponseMessage(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowResults = () => {
        setShowResults(true);
    };
    const generatePDF = async () => {
        //create a PDF file
        const doc = new jsPDF({
            orientation: 'p', // landscape
            unit: 'mm', // points, pixels won't work properly
            format: [297, 210]  //A4
        });
        doc.addPage();
        doc.setPage(1);
        let pdfPage = 1;
        //get current date
        const d = new Date();
        let month = d.getMonth() + 1;
        let currentDate;
        if (month < 10) {
            currentDate = d.getDate() + '/' + 0 + month + '/' + d.getFullYear();
        }
        else {
            currentDate = d.getDate() + '/' + month + '/' + d.getFullYear();
        }
        //get MedFak-Logo
        const img = new Image();
        img.src = '/MedFakSIegel_Schwarz.png';
        img.onload = () => {
            // await for the image to be fully loaded
            doc.setPage(pdfPage);
            doc.addImage(img, 'png', 5, 5, 24, 38);
            doc.setFontSize(30);
            doc.text("Medizinische Fakultät", 100, 25);
            doc.setFontSize(15);
            doc.text("Datum: " + currentDate, 150, 40);
            doc.setFontSize(14);
            doc.text("Block", 5, 60);
            doc.text("Semester", 70, 60);
            doc.text("Matrikelnummer", 110, 60);
            doc.text("Anwesenheitsanteil", 150, 60);
            let distanceToTop = 70;
            responseMessage.forEach(function (responseMessage, i) {

                /* if (70 + i * 10 > 270) {
                    //change page
                    // doc.addPage();
                    pdfPage += 1;
                    // doc.setPage(pdfPage);
                    doc.text("Block", 5, 10);
                    doc.text("Semester", 70, 10);
                    doc.text("Matrikelnummer", 110, 10);
                    doc.text("Anwesenheitsanteil", 150, 10);
                    distanceToTop = 20;

                } */
                //block name is too long, so I set it smaller
                doc.setFontSize(10);
                doc.text(responseMessage.block_name, 5, distanceToTop + i * 10);
                doc.setFontSize(12);
                doc.text(responseMessage.semester, 70, distanceToTop + i * 10);
                doc.text(responseMessage.matrikelnummer, 110, distanceToTop + i * 10);
                doc.text(responseMessage.percentage, 150, distanceToTop + i * 10);

                //test change pages
                // doc.setFontSize(10);
                // doc.text(responseMessage.block_name, 5, distanceToTop + i * 60);
                // doc.setFontSize(12);
                // doc.text(responseMessage.semester, 70, distanceToTop + i * 60);
                // doc.text(responseMessage.matrikelnummer, 110, distanceToTop + i * 60);
                // doc.text(responseMessage.percentage, 150, distanceToTop + i * 60);
            });
            //     //...
            //     // doc.autotable({
            //     //     //  head:[[
            //     //     //     "Block",
            //     //     //     "Semester",
            //     //     //     "Matrikelnummer",
            //     //     //     "Anwesenheitsanteil",
            //     //     //   ]]
            //     //     head: [['NAME', 'AGE', 'COUNTRY']],
            //     //     body: [['St', 11, 'DE'], ['Tom', 11, 'US']]

            //     // });



            doc.save('test.pdf');
        };



    };

    return (
        <>
            <Head>
                <title>Scida</title>
                <meta charSet="utf-8" />
            </Head>
            {/* Div that stretches from the very top to the very bottom */}
            <div className="flex flex-col h-screen justify-between">
                {/* Dashboard navbar with navigation items  */}
                <Navbar type="admin"></Navbar>
                <div className="flex flex-row grow">
                    {/* Sidebar only visible on large screens */}
                    <Sidebar type="admin"></Sidebar>
                    <div className="hero grow bg-base-100">
                        {/* Grid for layouting welcome text and card components, already responsive */}
                        <div className="grid hero-content lg:p-10 sm:max-w-fit">
                            <div className="text-secondary text-center text-neutral-content dark:text-white">
                                <h1 className="mb-5 text-5xl font-bold text-center">
                                    Anwesenheitslisten
                                </h1>
                                <p className="mb-5">
                                    Hier können Sie die Anwesenheitslisten für einzelne Studierende als .csv-Datei herunterladen.
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
                                                Füllen Sie die Felder aus und klicken Sie auf "Suchen". <br></br>
                                                Sobald die Suchergebnisse die gewünschten Daten angezeigen,
                                                auf "Herunterladen" klicken.
                                            </p>
                                            {/* Input group to enter information about the user that will be created */}
                                            <div>
                                                {/* Input field for first name */}
                                                <label
                                                    htlmFor="blockName"
                                                    className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                                                >
                                                    <span>Blockpraktikum</span>
                                                    <input
                                                        onChange={(e) => createBlockName(e.target.value)}
                                                        value={blockName}
                                                        id="blockName"
                                                        name="blockName"
                                                        type="text"
                                                        placeholder="z.B. Gynäkologie"
                                                        className="input input-bordered"
                                                    />
                                                </label>
                                                {/* Input field for last name */}
                                                <label
                                                    htmlFor="groupID"
                                                    className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                                                >
                                                    <span>Gruppe</span>
                                                    <input
                                                        onChange={(e) => createGroupID(e.target.value)}
                                                        value={groupID}
                                                        id="groupID"
                                                        name="groupID"
                                                        type="text"
                                                        placeholder="z.B. 05"
                                                        className="input input-bordered"
                                                    />
                                                </label>
                                                {/* Input field for e-mail address */}
                                                <label
                                                    htmlFor="email"
                                                    className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                                                >
                                                    <span>Semester</span>
                                                    <input
                                                        onChange={(e) => createSemester(e.target.value)}
                                                        value={semester}
                                                        id="semester"
                                                        name="semester"
                                                        type="text"
                                                        placeholder="z.B. WS2022 oder SS2022"
                                                        className="input input-bordered"
                                                    />
                                                </label>
                                                {/* Input field for role */}
                                                <label
                                                    htmlFor="email"
                                                    className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                                                >
                                                    <span>Matrikelnummer</span>
                                                    <input
                                                        onChange={(e) => createStudentID(e.target.value)}
                                                        value={studentID}
                                                        id="studentID"
                                                        name="studentID"
                                                        type="text"
                                                        placeholder="z.B. 0000000"
                                                        className="input input-bordered"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        {/* Button to show attendance */}
                                        {/* Create button that calls 2 functions (showCSV and handleShowResults) when clicked */}
                                        <div className="justify-center flex">
                                            <button className="btn w-56">
                                                <label
                                                    onClick={() => {
                                                        showCSV();
                                                        handleShowResults();
                                                    }}
                                                >
                                                    Suchen
                                                </label>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* card to display preview of search results */}
                                <div className="card card-normal bg-primary text-primary-content basis-1/2">
                                    <div className="card-body flex justify-between">
                                        <h2 className="card-title text-white">
                                            Suchergebnisse
                                        </h2>
                                        {/* preview */}
                                        {showResults ? (
                                            <div className="overflow-x-auto">
                                                <table className="table table-compact w-full text-black dark:text-white">
                                                    <thead className="text-black">
                                                        <tr>
                                                            {/* //header */}
                                                            {/* {headings.map(heading => {
                                                                return <th key={heading}>{heading}</th>
                                                            })} */}
                                                            <th>Praktikum</th>
                                                            {/* <th>GroupID</th> */}
                                                            <th>Semester</th>
                                                            <th>Matrikelnummer</th>
                                                            <th>Anwesenheit (%)</th>
                                                            {/* <th>BlockID</th> */}
                                                            {/* <th>SessionID</th> */}
                                                            {/* <th>SessionType</th> */}
                                                            {/* <th>SessionTime</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* TODO: show first 20 Records or 20 per page*/}
                                                        {responseMessage.map((item, index) => (

                                                            <tr key={index} className="hover">
                                                                <td>{item.block_name}</td>
                                                                {/* <td>{item.group_id}</td> */}
                                                                <td>{item.semester}</td>
                                                                <td>{item.matrikelnummer}</td>
                                                                <td>{item.percentage}</td>
                                                                {/* <td>{item.sess_time}</td> */}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p className="text-left mb-5">
                                                Suche noch nicht gestartet.
                                            </p>
                                        )
                                        }
                                        {/* Button to download CSV */}
                                        <div className="flex justify-center">
                                            {/* <button className="btn w-56 mt-5">
                                                <CSVLink
                                                    filename="Anwesenheit.csv"
                                                    data={responseMessage}>Herunterladen
                                                </CSVLink>
                                            </button> */}
                                            <button onClick={generatePDF} className="btn w-56 mt-5">
                                                <label>
                                                    Herunterladen
                                                </label>
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
