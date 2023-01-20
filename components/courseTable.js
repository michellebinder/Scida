import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import createAccount from "../components/createAccount";
import { dateParser } from "../gloabl_functions/date";
import PopUp from "./popUp";
import { useRouter } from "next/router";
import QrCode from "./qrCode";

export default function CourseTable({
  type = "",
  blockId = "",
  data,
  group_id = "",
  blockName = "",
  indentifier = "",
  matrikel = "",
}) {
  const router = useRouter();

  //rows for the admin view of the table
  const [rows, setData] = useState(data);

  useEffect(() => {}, [rows]);

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

  //Fill new row/session with standard data
  const handleAddRow = () => {
    setChangesSaved(false); //Disable "Teilnehmerliste" Button and enable "Änderungen speichern" button
    //Calculate sess_id
    let maxSessId = rows.reduce((max, current) => {
      return Math.max(max, current.sess_id);
    }, 0);

    //Create a new row/session object
    let newRow = {
      block_id: blockId,
      block_name: blockName,
      group_id: group_id,
      lecturer_id: null, //To be set by user
      sess_end_time: "2023-01-01T00:00:00.000Z", //Instead of UNDEFINED - to prevent time select bug - to be edited by user
      sess_start_time: "2023-01-01T00:00:00.000Z", //Instead of UNDEFINED - to prevent time select bug - to be edited by user
      sess_type: null, //To be set by user
      sess_id: maxSessId + 1,
    };
    //Set sess_id to 1 if rows array is empty -> for the case when user deletes all sessions and tries to add a new session
    if (rows.length === 0) {
      newRow.sess_id = 1;
    }
    //Set sess_id to 1 if (for some reason) sess_id is negative
    if (newRow.sess_id < 0) {
      newRow.sess_id = 1;
    }
    //Add new row/session to rows
    setData([...rows, newRow]);
  };

  //Function to delete a row both visually and in the database
  const handleDeleteRow = async (
    selectedBlock_id,
    selectedSess_id,
    selectedGroup_id
  ) => {
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
      setPopupText("Termin wurde erfolgreich gelöscht.");
      // Delete row visually
      setData((prevRows) =>
        prevRows.filter((row) => row.sess_id !== selectedSess_id)
      );
    } else if (responseMessage == "ERROR") {
      setPopUpType("ERROR");
      setPopupText(
        "Ein Fehler ist aufgetreten! Bitte versuchen Sie es später erneut."
      );
    }
    handleShowPopup();
  };

  //Save changes in tpye selection locally in the rows data
  const handleChangeDate = (event) => {
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
    setChangesSaved(false); //Disable "Teilnehmerliste" Button and enable "Änderungen speichern" button
  };

  //Save changes in time selection locally in the rows data
  const handleChangeStartTime = (event) => {
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
    setChangesSaved(false); //Disable "Teilnehmerliste" Button and enable "Änderungen speichern" button
  };

  //Save changes in time selection locally in the rows data
  const handleChangeEndTime = (event) => {
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
    setChangesSaved(false); //Disable "Teilnehmerliste" Button and enable "Änderungen speichern" button
  };

  //Save changes in tpye selection locally in the rows data
  const handleChangeSessType = (event) => {
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
    //console.log(value);

    setData([...rows]);
    setChangesSaved(false); //Disable "Teilnehmerliste" Button and enable "Änderungen speichern" button
  };
  const handleChangeLecturer = (event) => {
    const value = event.target.value;
    const selectedSess_id = event.target.getAttribute("data-id");

    //For loop to check where to update
    const newRows = [...rows];
    for (let i = 0; i < newRows.length; i++) {
      if (newRows[i].sess_id == selectedSess_id) {
        newRows[i].lecturer_id = value;
        break;
      }
    }
    setData(newRows);
    setChangesSaved(false); //Disable "Teilnehmerliste" Button and enable "Änderungen speichern" button
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
      //Enable "Teilnehmerliste" Button and disable "Änderungen speichern" Button
      setChangesSaved(true);
    } else if (responseMessage.error == "INCOMPLETE") {
      // response.undefinedValues.forEach((key) => {
      //   const element = key + "Ref";
      //   element.current.classList.add("bg-red");
      // });
      setPopUpType("ERROR");
      setPopupText("Unvollständige Eingaben! Bitte ergänzen.");
    } else {
      setPopUpType("ERROR");
      setPopupText(
        "Ein Fehler ist aufgetreten! Bitte versuchen Sie es später erneut."
      );
    }

    handleShowPopup();
  };

  //Const to control the availability and tooltips of the buttons
  //When there is only one entry, i.e. the inital entry, disable the "Teilnehmerliste" Button because the user has to click on "Änderungen speichern" first
  const [changesSaved, setChangesSaved] = useState(
    !(
      rows.length == 1 &&
      rows[0].sess_type == null &&
      rows[0].lecturer_id == null
    )
  );

  //Function to disable link behind "Teilnehmerliste" Button
  const handleLinkClick = (event) => {
    if (!changesSaved) {
      event.preventDefault();
    }
  };

  // Formats the time in the correct way
  function formatGermanTime(dateString) {
    // Create a new date object from the date string
    const date = new Date(dateString);
    // Subtract one hour from the time
    date.setUTCHours(date.getUTCHours() - 1);
    // Options for formatting the time string
    const options = { hour: "numeric", minute: "numeric", hour12: false };
    // Use toLocaleTimeString to format the time string in German
    return date.toLocaleTimeString("de-DE", options) + " Uhr";
  }

  if (type == "lecturer") {
    return (
      <div className="container mx-auto">
        <div className="overflow-auto">
          <table className="table table-compact w-full text-primary dark:text-white">
            <thead>
              <tr>
                <th></th>
                <th>Datum</th>
                <th>Uhrzeit</th>
                <th>Beschreibung</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Map over each date in array and create row */}
              {data.map((item, index) => (
                <tr className="hover">
                  <th>{index + 1}</th>
                  <td>{dateParser(item.sess_start_time)}</td>
                  <td>
                    {formatGermanTime(item.sess_start_time)} -{" "}
                    {formatGermanTime(item.sess_end_time)}
                  </td>
                  <td>{item.sess_type}</td>
                  <td>
                    <div className="card-actions flex flex-col justify-center gap-5">
                      <Link
                        href={`/participants?blockId=${blockId}&sessId=${item.sess_id}&groupId=${item.group_id}&blockName=${item.block_name}`}
                      >
                        <button className="btn border-transparent btn-secondary text-background">
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
    //calculate attendence in block for first semester and sum all semesters up
    const distinctSemesters = Array.from(
      new Set(data.map((item) => item.semester))
    );
    const firstSemester = data.filter(
      (item) => item.semester === distinctSemesters[0]
    );
    let attendance = 0;
    data.map((row) => {
      if (row.confirmed_at) {
        attendance += 1;
      }
    });
    attendance = (attendance / firstSemester.length) * 100;
    const passed = attendance >= 80;
    let style = "";
    if (passed) {
      style = "container mx-auto text-success";
    } else {
      style = "container mx-auto dark:text-white text-primary";
    }

    //console.log(style);

    return (
      <div className={style}>
        <div
          className="radial-progress fill-success"
          style={{
            "--value": attendance,
            "--size": "7rem",
          }}
        >
          {attendance.toFixed(2)}%
          {/* alternatively: specify radius and thickness of circle: 
                            style={{ "--value": attendance, "--size": "5rem", "--thickness": "20px" }}>{attendance}%</div>} */}
        </div>
        {attendance >= 80 && (
          <p className="pt-4 text-success">Praktikum gilt als bestanden</p>
        )}
        {distinctSemesters.map((row) => (
          <div className="shadow-lg">
            <p className="dark:text-gray-300 text-primary font-bold text-xl pt-10 ">
              {row}
            </p>
            <div className="overflow-auto pt-2">
              <table className="table table-compact w-full text-primary dark:text-white">
                <thead>
                  <tr>
                    <th></th>
                    <th>Datum</th>
                    <th>Uhrzeit</th>
                    <th>Beschreibung</th>
                    <th>Dozierende</th>
                    <th>QR-Code</th>
                    <th>Anwesenheit</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over each date in array and create row */}
                  {console.log(data)}
                  {data
                    .filter((item) => item.semester === row)
                    .map((item, index) => (
                      <tr className="hover">
                        <th>{index + 1}</th>
                        <td>{dateParser(item.sess_start_time)}</td>
                        <td>
                          {formatGermanTime(item.sess_start_time)} -{" "}
                          {formatGermanTime(item.sess_end_time)}
                        </td>
                        <td>{item.sess_type}</td>
                        <td>{item.lecturer_id}</td>
                        <td>
                          <div className="grid justify-center">
                            {/* qr code icon leads to generation of qr code, passing necessary information to the page */}
                            <QrCode
                              identifier={matrikel}
                              block_id={item.block_id}
                              group_id={item.group_id}
                              sess_id={item.sess_id}
                            ></QrCode>
                          </div>
                        </td>
                        <td>
                          {/* checkbox to mark attendance, place in the center of its cell as opposed to other values in the row */}
                          <div style={{ textAlign: "center" }}>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary"
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
        ))}
      </div>
    );
  } else if (type == "admin") {
    //console.log(rows);
    return (
      <div className="container mx-auto">
        <div className="overflow-auto">
          <table
            className="table table-compact text-primary dark:text-white"
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
              {rows.map((session, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    {/* Editable date column */}
                    <td>
                      <input
                        className="bg-inherit rounded-md text-black hover:bg-secondary hover:text-white dark:text-white"
                        type="date"
                        id="start"
                        name="trip-start"
                        data-id={session.sess_id}
                        onChange={handleChangeDate}
                        value={
                          //This fixes the bug where the new selection was not being displayed
                          session.sess_start_time
                            ? session.sess_start_time.substring(0, 10)
                            : null
                        }
                        required
                      />
                    </td>
                    {/* Editable start-time column */}
                    <td>
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
                            : null
                        }
                        required
                      />
                      - {/* Editable end-time column */}
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
                          session.sess_end_time
                            ? session.sess_end_time.substring(11, 16)
                            : null
                        }
                        required
                      />
                    </td>
                    {/* Editable type column (Blockpraktikum, Blockseminar) dropdown menu */}
                    <td>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        onChange={handleChangeSessType}
                      >
                        <option
                          disabled
                          selected={!session.sess_type} //Selected when null
                        >
                          Bitte auswählen
                        </option>
                        <option
                          value="Praktikum"
                          data-id={session.sess_id}
                          selected={session.sess_type === "Praktikum"}
                        >
                          Praktikum
                        </option>
                        <option
                          value="Seminar"
                          data-id={session.sess_id}
                          selected={session.sess_type === "Seminar"}
                        >
                          Seminar
                        </option>
                      </select>
                    </td>
                    {/* Editable lecturer column */}
                    <td>
                      <input
                        onChange={handleChangeLecturer}
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        data-id={session.sess_id}
                        placeholder="Dozierenden Email"
                        defaultValue={
                          session.lecturer_id ? session.lecturer_id : null
                        }
                      ></input>
                    </td>
                    {/* Column with button to show all the participants */}
                    <td>
                      <div className="card-actions flex flex-col justify-center gap-5">
                        {/* Disable both link and button when changes have not been saved */}
                        {/* Since there is no disabled attribute for the link, we have to disable the default behavior in the onclick function */}
                        <Link
                          href={`/participants?blockId=${blockId}&sessId=${session.sess_id}&groupId=${group_id}&lecturerId=${session.lecturer_id}&blockName=${blockName}`}
                          onClick={handleLinkClick}
                        >
                          {/* Checking if changes have been saved, if true display button, if false display disabled button and tooltip */}
                          {changesSaved ? (
                            <button className="btn border-transparent btn-secondary text-background">
                              Teilnehmerliste
                            </button>
                          ) : (
                            <div
                              className="tooltip tooltip-error"
                              data-tip="Bitte Änderungen speichern"
                            >
                              <button
                                className="btn border-transparent btn-secondary text-background"
                                disabled
                              >
                                Teilnehmerliste
                              </button>
                            </div>
                          )}
                        </Link>
                      </div>
                    </td>
                    {/* Column with "Trash"-icon for deleting rows */}
                    <td>
                      <label htmlFor="popup_delete_date" href="#">
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
                      </label>
                      {/* Pop-up window (modal), which appears when the button "Termin löschen" is clicked */}
                      <input
                        type="checkbox"
                        id="popup_delete_date"
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box">
                          <p className="text-lg font-bold text-accent">
                            Sind Sie sicher, dass Sie diesen Termin löschen{" "}
                            <br></br>
                            möchten?
                          </p>
                          <div className="modal-action flex flex-row">
                            <label
                              htmlFor="popup_delete_date"
                              onClick={() =>
                                handleDeleteRow(
                                  session.block_id,
                                  session.sess_id,
                                  session.group_id
                                )
                              }
                              className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white basis-1/2"
                            >
                              Ja, löschen
                            </label>
                            <label
                              htmlFor="popup_delete_date"
                              className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white basis-1/2"
                            >
                              Nein, nicht löschen
                            </label>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Button to add rows to the table */}
          <button
            type="button"
            className="btn btn-secondary border-transparent text-background w-full dark:btn dark:hover:shadow-lg dark:hover:opacity-75"
            onClick={handleAddRow}
          >
            Neuen Termin hinzufügen
          </button>
          <div className="divider ml-2 mr-2 mt-1 mb-1"></div>
          {/* Checking if changes have been saved, if false add tooltip, if true remove tooltip */}
          {changesSaved ? (
            //Button to add rows to the table
            <button
              type="button"
              className="btn bg-success border-none text-neutral hover:bg-emerald-600 w-full"
              disabled
            >
              Änderungen speichern
            </button>
          ) : (
            <div
              className="tooltip tooltip-open w-full"
              data-tip="Bitte Änderungen speichern"
            >
              {/* Button to add rows to the table */}
              <button
                type="button"
                className="btn bg-success border-none text-neutral hover:bg-emerald-600 w-full"
                onClick={handleChangeDatabase}
              >
                Änderungen speichern
              </button>
            </div>
          )}
          {/* Custom Pop-up window, which appears when the button "Nutzenden erstellen" is clicked */}
          {showPopup && <PopUp text={popUpText} type={popUpType}></PopUp>}
        </div>
      </div>
    );
  }
}
