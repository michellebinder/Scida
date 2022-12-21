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
export default function Home() {
    const [blockName, createBlockName] = useState("");
    const [groupID, createGroupID] = useState("");
    const [semester, createSemester] = useState("");
    const [studentID, createStudentID] = useState("");
    const [responseMessage, setResponseMessage] = useState();

    /*test */
    

    let called = false;
    const downloadCSV = async () => {
        //POSTING the credentials
        const response = await fetch("/api/download", {
            //Insert API you want to call
            method: "POST",
            body: JSON.stringify({ /* blockName, groupID, semester, studentID */ }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        //Saving the RESPONSE in the responseMessage variable
        //const data = await response.json();
        //setResponseMessage(data);
        
        const res = await response.json();
        console.log(res);
        let data = JSON.parse(res);
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(data);      
        console.log(csv);
        // setResponseMessage(data);
        
    };
        
    // if (!called) {
    //     downloadCSV();
    //     called = true;
    //   }

//     const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

    return (
        <>
            <Head>
                <title>Scida</title>
                <meta charSet="utf-8" />
            </Head>
            {/* Div that stretches from the very top to the very bottom */}
            <div className="flex flex-col justify-between bg-base-100">
                {/* Dashboard navbar with navigation items  */}
                <Navbar type="admin"></Navbar>
                <div className="flex flex-row grow">
                    {/* Sidebar only visible on large screens */}
                    <Sidebar type="admin"></Sidebar>
                    <div className="hero grow">
                        {/* Grid for layouting welcome text and card components, already responsive */}
                        <div className="grid hero-content text-center text-neutral-content lg:p-10">
                            <div className="text-secondary dark:text-white">
                                <h1 className="mb-5 text-5xl font-bold text-center">
                                    Anwesenheit herunterladen
                                </h1>
                                <p className="mb-5">
                                    Hier kannst du Daten als CSV Datei herunterladen
                                </p>
                                {/* div which controls the positioning of the card components (Nutzer erstellen, Nutzer bearbeiten)*/}
                                <div className="flex flex-row">
                                    {/* single daisyUI card component for creating a user*/}
                                    <div className="card card-normal bg-primary text-primary-content mr-3 basis-1/2">
                                        <div className="card-body flex justify-between flex-col">
                                            <h2 className="card-title text-white">
                                                Anwesenheit begrenzen
                                            </h2>
                                            <div className="w-11/12 max-w-5xl">
                                                <p className="text-left mb-5">
                                                    Bitte Beschränkungen
                                                    ausfüllen und "Datei Herunterladen" klicken.
                                                </p>
                                                {/* Input group to enter information about the user that will be created */}
                                                <div>
                                                    {/* Input field for first name */}
                                                    <label
                                                        htlmFor="blockName"
                                                        className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                                                    >
                                                        <span>Blockpraktika</span>
                                                        <input
                                                            onChange={(e) => createBlockName(e.target.value)}
                                                            value={blockName}
                                                            id="blockName"
                                                            name="blockName"
                                                            type="text"
                                                            placeholder="z.B Gynäkologie"
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
                                                            placeholder="z.B 5"
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
                                                            placeholder="z.B WS2022 oder SS2022"
                                                            className="input input-bordered"
                                                        />
                                                    </label>
                                                    {/* Input field for role */}
                                                    <label
                                                        htmlFor="email"
                                                        className="input-group pb-5 flex justify-left text-neutral dark:text-white"
                                                    >
                                                        <span>studentID</span>
                                                        <input
                                                            onChange={(e) => createStudentID(e.target.value)}
                                                            value={studentID}
                                                            id="studentID"
                                                            name="studentID"
                                                            type="text"
                                                            placeholder="z.B 0000000"
                                                            className="input input-bordered"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Button to create user */}

                                            <button onClick={downloadCSV} value="download">
                                                <label
                                                    htmlFor="popup_create_user"
                                                    className="btn mt-28 w-56"
                                                >
                                                    Datei Herunterladen
                                                </label>
                                            </button>

                                            {/* Pop-up window (called Modal in daisyUI), which appears when the button "Nutzenden erstellen" is clicked */}

                                            <label
                                                htmlFor="popup_create_user"
                                                className="modal cursor-pointer"
                                            >
                                                <label className="modal-box relative" htmlFor="">
                                                    {/* TODO backend: check whether the user really has been added successfully */}
                                                    <p className="text-lg font-bold text-neutral">
                                                        Der/die Nutzer:in wurde erfolgreich erstellt!
                                                    </p>
                                                </label>
                                            </label>
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
