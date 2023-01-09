import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import createAccount from "../components/createAccount";
import { dateParser } from "../gloabl_functions/date";
import PopUp from "./popUp";
import { useRouter } from "next/router";

export default function CourseTable({
  type = "",
  blockId = "",
  data,
  group_id = "",
  blockName = "",
  indentifier = "",
}) {
  //calculate attendence in block
  let attendance = 0;
  //const length = data.length;
  data.map((row) => {
    if (row.confirmed_at) {
      attendance += 1;
    }
  });
  attendance = (attendance / data.length) * 100;

  //rows for the admin view of the table
  const [rows, setData] = useState(data);

  useEffect(() => {}, [rows]);

  //Consts for highlighting errors
  const lecturerIdRef = useRef(null);

  //Functions and constants for popup window
  const [popUpText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popUpType, setPopUpType] = useState(""); //Const to handle popup color
  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  //fill new row with standart data
  const handleAddRow = async () => {
    setData([
      ...rows,
      {
        block_name: rows[0].block_name, //Same for every entry in this instance/group - TODO: What if user deletes the first entry [0]??
        block_id: rows[0].block_id, //Same for every entry in this instance/group - TODO: What if user deletes the first entry [0]??
        semester: rows[0].semester, //Same for every entry in this instance/group - TODO: What if user deletes the first entry [0]??
        lecturer_id: undefined,
        group_id: rows[0].group_id, //Same for every entry in this instance/group - TODO: What if user deletes the first entry [0]??
        sess_end_time: "2000-01-01T00:00:00.000Z", //Insted of UNDEFINED - to prevent time select bug
        sess_id: rows[rows.length - 1].sess_id + 1, //TODO change to prevent getting ids that already existed once!!! TODO: What if user deletes the first entry [0]??
        sess_start_time: "2000-01-01T00:00:00.000Z", //Insted of UNDEFINED - to prevent time select bug
        sess_type: undefined,
      },
    ]);
  };

  const handleDeleteRow = async (
    selectedBlock_id,
    selectedSess_id,
    selectedGroup_id
  ) => {
    // Delete row visually
    setData((prevRows) =>
      prevRows.filter((row) => row.sess_id !== selectedSess_id)
    );

    //POSTING the delete
    const response = await fetch("/api/deleteRowTimetable", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({
        selectedBlock_id,
        selectedSess_id,
        selectedGroup_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    const responseMessage = await response.json();
    if (responseMessage == "SUCCESS") {
      setPopUpType("SUCCESS");
      setPopupText("Termin erfolgreich gelöscht");
    } else if (responseMessage == "ERROR") {
      setPopUpType("ERROR");
      setPopupText(
        "Ein Fehler ist aufgetreten! Bitte versuchen Sie es später erneut."
      );
    }
    handleShowPopup();
  };

  //Save changes in tpye selection locally in the rows data
  const handleChangeDate = async (event) => {
    const selectedValue = event.target.value;
    const selectedSess_id = event.target.getAttribute("data-id"); //sess_id of the current row

    //For loop to check where to update
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].sess_id == selectedSess_id) {
        //Edit date of sess_start_time
        const date1 = rows[i].sess_start_time; //Need to save it in a help variable, otherwise it would complain
        const dateModified1 = selectedValue + date1.substr(10);
        rows[i].sess_start_time = dateModified1;

        //Edit date of sess_end_time
        const date2 = rows[i].sess_end_time; //Need to save it in a help variable, otherwise it would complain
        const dateModified2 = selectedValue + date2.substr(10);
        rows[i].sess_end_time = dateModified2;
        break;
      }
    }

    setData([...rows]);
  };

  //Save changes in time selection locally in the rows data
  const handleChangeStartTime = async (event) => {
    const selectedValue = event.target.value;
    const selectedSess_id = event.target.getAttribute("data-id"); //sess_id of the current row

    //For loop to check where to update
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].sess_id == selectedSess_id) {
        //Edit time of sess_start_time
        const time = rows[i].sess_start_time; //Need to save it in a help variable, otherwise it would complain
        const timeModified =
          time.substring(0, 11) + selectedValue + time.substr(16, 24);
        rows[i].sess_start_time = timeModified;
        break;
      }
    }

    setData([...rows]);
  };

  //Save changes in time selection locally in the rows data
  const handleChangeEndTime = async (event) => {
    const selectedValue = event.target.value;
    const selectedSess_id = event.target.getAttribute("data-id"); //sess_id of the current row

    //For loop to check where to update
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].sess_id == selectedSess_id) {
        //Edit time of sess_end_time
        const time = rows[i].sess_end_time; //Need to save it in a help variable, otherwise it would complain
        const timeModified =
          time.substring(0, 11) + selectedValue + time.substr(16, 24);
        rows[i].sess_end_time = timeModified;
        break;
      }
    }
    setData([...rows]);
  };

  //Save changes in tpye selection locally in the rows data
  const handleChangeSessType = async (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const selectedSess_id = selectedOption.getAttribute("data-id"); //sess_id of the current row
    const value = selectedOption.value; //value of selected option

    //For loop to check where to update
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].sess_id == selectedSess_id) {
        rows[i].sess_type = value; //Editing the value in local rows data
        break;
      }
    }

    setData([...rows]);
  };
  //Save changes in lecturer selection locally in the rows data
  const handleChangeLecturer = async (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const selectedSess_id = selectedOption.getAttribute("data-id"); //sess_id of the current row
    const value = selectedOption.value; //value of selected option

    //For loop to check where to update
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].sess_id == selectedSess_id) {
        rows[i].lecturer_id = value; //Editing the value in local rows data
        break;
      }
    }

    setData([...rows]);
  };

  //This function pushes the changes in the rows data to the database
  const handleChangeDatabase = async (event) => {
    const transferData = rows;

    //POSTING the credentials
    const response = await fetch("/api/editRowTimetable", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({
        transferData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    const responseMessage = await response.json();
    if (responseMessage == "SUCCESS") {
      setPopUpType("SUCCESS");
      setPopupText("Änderungen erfolgreich gespeichert!");
    }
    if (responseMessage == "ERROR") {
      setPopUpType("ERROR");
      setPopupText(
        "Ein Fehler ist aufgetreten! Bitte versuchen Sie es später erneut."
      );
    }
    if (responseMessage.error == "INCOMPLETE") {
      // response.undefinedValues.forEach((key) => {
      //   const element = key + "Ref";
      //   element.current.classList.add("bg-red");
      // });
      setPopUpType("ERROR");
      setPopupText("Unvollständige Eingaben! Bitte ergänzen.");
    }
    handleShowPopup();
  };

  if (type == "lecturer") {
    return (
      <div class="container mx-auto">
        <div class="overflow-auto">
          <table class="table table-compact w-full text-primary dark:text-white">
            <thead>
              <tr>
                <th></th>
                <th>Datum</th>
                <th>Beschreibung</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Map over each date in array and create row */}
              {data.map((item, index) => (
                <tr class="hover">
                  <th>{index + 1}</th>
                  <td>{dateParser(item.sess_start_time)}</td>
                  <td>{item.sess_type}</td>
                  <td>
                    <div className="card-actions flex flex-col justify-center gap-5">
                      <Link
                        href={`/participants?blockId=${blockId}&sessId=${item.sess_id}`}
                      >
                        <button className="btn border-transparent bg-secondary text-background">
                          Teilnehmerliste
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (type == "student") {
    return (
      <div class="container mx-auto">
        <div
          className="radial-progress"
          style={{ "--value": attendance, "--max": 100 }}
        >
          {attendance}%
          {/* alternatively: specify radius and thickness of circle: 
                            style={{ "--value": attendance, "--size": "5rem", "--thickness": "20px" }}>{attendance}%</div>} */}
        </div>
        {attendance >= 80 && <p>Praktikum gilt als bestanden</p>}
        <div class="overflow-auto pt-10">
          <table class="table table-compact w-full text-primary dark:text-white">
            <thead>
              <tr>
                <th></th>
                <th>Datum</th>
                <th>Beschreibung</th>
                <th>Dozierende</th>
                <th>QR-Code</th>
                <th>Anwesenheit</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over each date in array and create row */}
              {data.map((item, index) => (
                <tr class="hover">
                  <th>{index + 1}</th>
                  <td>{dateParser(item.sess_start_time)}</td>
                  <td>{item.sess_type}</td>
                  <td>{item.lecturer_id}</td>
                  <td>
                    {/* qr code icon leads to generation of qr code, passing necessary information to the page */}
                    <Link
                      href={`/qrGeneration?blockId=${item.block_id}&sessId=${item.sess_id}&sessTime=${item.sess_start_time}&description=${item.sess_type}&identifier=${indentifier}`}
                    >
                      <button className="btn btn-ghost flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="black"
                        >
                          <path d="M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm0-2h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8 8h-1v-2h1v1h2v1h-1v1h-1v-1zm2 12v-1h-1v1h1zm-1-15v-1h-2v1h1v1h1v-1zm8-1v6h-1v-1h-4v-5h5zm-1 4v-3h-3v3h3zm-14 2h-1v1h2v-1h-1zm0 3h1v1h1v-3h-1v1h-2v2h1v-1zm5 1v2h1v-2h-1zm4-10h-1v3h1v-3zm0 5v-1h-1v1h1zm3-2h1v-1h-1v1zm-10-1h-1v1h1v-1zm2-2v5h-5v-5h5zm-1 1h-3v3h3v-3zm9 5v1h-1v-1h-2v1h-1v-1h-3v-1h-1v1h-1v1h1v2h1v-1h1v2h1v-2h3v1h-2v1h2v1h1v-3h1v1h1v2h1v-1h1v-1h-1v-1h-1v-1h1v-1h-2zm-11 8h1v-1h-1v1zm-2-3h5v5h-5v-5zm1 4h3v-3h-3v3zm12-3v-1h-1v1h1zm0 1h-1v1h-1v-1h-1v-1h1v-1h-2v-1h-1v2h-1v1h-1v3h1v-1h1v-1h2v2h1v-1h1v1h2v-1h1v-1h-2v-1zm-9-3h1v-1h-1v1zm10 2v1h1v1h1v-3h-1v1h-1zm2 4v-1h-1v1h1zm0-8v-1h-1v1h1z" />
                        </svg>
                      </button>
                    </Link>
                  </td>
                  <td>
                    {/* checkbox to mark attendance, place in the center of its cell as opposed to other values in the row */}
                    <div style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        class="checkbox checkbox-primary"
                        disabled={true}
                        checked={item.confirmed_at != undefined}
                      />
                      {item.confirmed_at != undefined && (
                        <p>({dateParser(item.confirmed_at)})</p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (type == "admin") {
    return (
      <div class="container mx-auto">
        <div class="overflow-auto">
          <table
            class="table table-compact w-full text-primary dark:text-white"
            id="table"
          >
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Datum</th>
                <th scope="col">Uhrzeit</th>
                <th scope="col">Typ</th>
                <th scope="col">Dozierende</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {console.log(rows)}
              {rows.map((session, index) => {
                return (
                  <tr>
                    <th contenteditable="true" scope="row">
                      {index + 1}
                    </th>
                    {/* Editable date column */}
                    {/* TODO backend: Save the edited date in database */}
                    <td contenteditable="true">
                      <input
                        className="bg-inherit rounded-md text-black hover:bg-secondary hover:text-white"
                        type="date"
                        id="start"
                        name="trip-start"
                        data-id={session.sess_id}
                        onChange={handleChangeDate}
                        value={
                          //This fixes the bug where the new selection was not being displayed
                          session.sess_start_time
                            ? session.sess_start_time.substring(0, 10)
                            : undefined
                        }
                        required
                      />
                    </td>
                    {/* Editable start-time column */}
                    {/* TODO backend: Save the edited start time in database */}
                    <td contenteditable="true">
                      <input
                        className="bg-inherit rounded-md hover:bg-secondary hover:text-white"
                        type="time"
                        id="start-time"
                        name="start-time"
                        min="07:00"
                        max="18:00"
                        data-id={session.sess_id}
                        onChange={handleChangeStartTime}
                        value={
                          //This fixes the bug where the new selection was not being displayed
                          session.sess_start_time
                            ? session.sess_start_time.substring(11, 16)
                            : undefined
                        }
                        required
                      />
                      - {/* Editable end-time column */}
                      {/* TODO backend: Save the edited end time in database */}
                      <input
                        className="bg-inherit rounded-md hover:bg-secondary hover:text-white"
                        type="time"
                        id="end-time"
                        name="end-time"
                        min="07:00"
                        max="18:00"
                        data-id={session.sess_id}
                        onChange={handleChangeEndTime}
                        value={
                          //This fixes the bug where the new selection was not being displayed
                          session.sess_end_time
                            ? session.sess_end_time.substring(11, 16)
                            : undefined
                        }
                        required
                      />
                    </td>
                    {/* Editable type column (Blockpraktikum, Blockseminar) dropdown menu */}
                    {/* TODO backend: Set the type value in database (Blockpraktikum/Blockseminar) */}
                    <td>
                      <select
                        className="select select-bordered"
                        onChange={handleChangeSessType}
                      >
                        <option
                          disabled={!session.sess_type} //Disabled when undefined
                          selected={!session.sess_type} //Selected when undefined
                          value={
                            session.sess_type ? session.sess_type : undefined
                          }
                        >
                          {session.sess_type
                            ? session.sess_type
                            : "Bitte auswählen"}
                        </option>
                        <option value="Praktikum" data-id={session.sess_id}>
                          Praktikum
                        </option>
                        <option value="Seminar" data-id={session.sess_id}>
                          Seminar
                        </option>
                      </select>
                    </td>
                    {/* Editable lecturer column */}
                    <td>
                      {/* Render the `select` element with the `onChange` event handler that calls the `handleChange` function */}
                      <select
                        className="select select-bordered"
                        onChange={handleChangeLecturer}
                        id="lecturer_id" //for highlighting on error
                        ref={lecturerIdRef} //for highlighting on error
                      >
                        {/* TODO backend: Get the real lecturers of the course and add here */}
                        {/* TODO backend: Add the selected lecturer to the corresponding course */}
                        <option
                          disabled={!session.sess_type} //Disabled when undefined
                          selected={!session.sess_type} //Selected when undefined
                          value={
                            session.lecturer_id
                              ? session.lecturer_id
                              : undefined
                          }
                          data-id={session.sess_id}
                        >
                          {session.lecturer_id
                            ? session.lecturer_id
                            : "Bitte auswählen"}
                        </option>
                        <option value="Dozent 1" data-id={session.sess_id}>
                          Dozent 1
                        </option>
                        <option value="Dozent 2" data-id={session.sess_id}>
                          Dozent 2
                        </option>
                        <option
                          value="empty"
                          data-id={session.sess_id}
                          disabled
                        ></option>
                        <option
                          value="Neuen Dozenten erstellen"
                          data-id={session.sess_id}
                        >
                          Neuen Dozenten erstellen
                        </option>
                      </select>
                    </td>
                    {/* Column with button to show all the participants */}
                    {/* TODO backend: Show the real participants of this course */}
                    <td>
                      <div className="card-actions flex flex-col justify-center gap-5">
                        <Link
                          href={`/participants?blockId=${blockId}&sessId=${session.sess_id}`}
                        >
                          <button className="btn border-transparent bg-secondary text-background">
                            Teilnehmerliste
                          </button>
                        </Link>
                      </div>
                    </td>
                    {/* Column with "Trash"-icon for deleting rows */}
                    {/* TODO backend: Delete day from database when button is clicked */}
                    {/* TODO: Delete row in which the icon has been clicked (right now it always deletes the last row) */}
                    <td>
                      <button
                        href="#"
                        onClick={() =>
                          handleDeleteRow(
                            session.block_id,
                            session.sess_id,
                            session.group_id
                          )
                        }
                      >
                        {/* "Trash"-icon for deleting rows */}
                        <svg
                          class="svg-icon fill-current text-accent hover:stroke-current"
                          viewBox="0 -9 20 27"
                          width="30"
                          height="40"
                        >
                          <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
                        </svg>
                        &nbsp;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-col m-1">
            {/* Button to add rows to the table */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddRow}
            >
              Neuen Termin hinzufügen
            </button>
          </div>
          <div className="flex flex-col m-1">
            {/* Button to add rows to the table */}
            <button
              type="button"
              className="btn btn-success"
              onClick={handleChangeDatabase}
            >
              Änderungen speichern
            </button>
          </div>
          {/* Custom Pop-up window, which appears when the button "Nutzenden erstellen" is clicked */}
          {showPopup && <PopUp text={popUpText} type={popUpType}></PopUp>}
        </div>
      </div>
    );
  }
}
