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
import {PropTypes} from "prop-types";

// import test from "./public/testAttendance.csv";
// console.log(test);

export default function Home() {
    const [blockName, createBlockName] = useState("");
    const [groupID, createGroupID] = useState("");
    const [semester, createSemester] = useState("");
    const [studentID, createStudentID] = useState("");
    const [responseMessage, setResponseMessage] = useState([]);
    /*test */
    const showCSV = async () => {
        //test
        // console.log(blockName);
        // console.log(groupID);
        // console.log(semester);
        // console.log(studentID);
        //POSTING the credentials
        try {
            const response = await fetch("/api/createFile", {
                //Insert API you want to call
                method: "POST",
                body: JSON.stringify({blockName,groupID,semester,studentID}),
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

    // const downloadCSV = async () => {
        
    //     const json2csvParser = new Parser();
    //     const csv = json2csvParser.parse(responseMessage);
    //     setCsvData(csv);
    //     console.log(csv);

    //     // const csv = data.map((e) => {
    //     //     return e.replace(/;/g, ",");
    //     // });

    //     // fs.writeFile("./public/testAttendance.txt", test, (err) => {
    //     //     console.log(err || "done");
    //     // });
    //     // setResponseMessage(data);
    //     /* console.log(responseMessage); */
    //     /* setHeadings(Object.keys(responseMessage[0]));
    //     console.log(headings); */

    // };

    /* const setHeadings = () => {
        return Object.keys(responseMessage[0]);
    } */

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
                        <div className="grid hero-content text-center text-neutral-content lg:p-10">
                            <div className="text-secondary dark:text-white">
                                <h1 className="mb-5 text-5xl font-bold text-center">
                                    Anwesenheit herunterladen
                                </h1>
                                <p className="mb-5">
                                    Hier kannst du die Anwesenheitslisten von Studierenden als CSV-Datei herunterladen.
                                </p>
                            </div>

                            <div className="flex grid flex-col gap-y-10 sm:grid-cols-2">
                                {/* single daisyUI card component to specify search criteria*/}
                                <div className="card card-normal bg-primary text-primary-content mr-3 basis-1/2">
                                    <div className="card-body">
                                        <h2 className="card-title text-white">
                                            Suche spezifizieren
                                        </h2>
                                        <div className="w-11/12 max-w-5xl">
                                            <p className="text-left mb-5">
                                                Bitte die Felder ausfüllen und "Suchen" klicken. <br></br>
                                                Sobald in der Vorschau die gewünschten Daten angezeigt werden,
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

                                        <button onClick={showCSV} value="show">
                                            <label
                                                htmlFor="popup_create_user"
                                                className="btn w-56"
                                            >
                                                Suchen
                                            </label>
                                        </button>
                                    </div>
                                </div>
                                {/* card to display preview of search results */}
                                <div className="card card-normal bg-primary text-primary-content basis-1/2">
                                    <div className="card-body flex justify-between">
                                        <h2 className="card-title text-white">
                                            Suchergebnisse
                                        </h2>
                                        {/* preview */}
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
                                        {/* Button to download CSV */}
                                        <div>
                                            <CSVLink 
                                            className="btn w-56 mt-5"
                                            filename="Anwesenheit.csv"
                                            data={responseMessage}>Herunterladen
                                            </CSVLink>                                               
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
