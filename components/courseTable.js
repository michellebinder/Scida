import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import createAccount from "../components/createAccount";
import { dateParser } from "../gloabl_functions/date";

export default function CourseTable({
  type = "",
  blockId = "",
  data,
  groupId = "",
  blockName = "",
  indentifier = "",
}) {
  //calculate attendence in block
  let attendance = 0;
  //const length = data.length;
  console.log("data");
  console.log(data);
  data.map((row) => {
    if (row.confirmed_at) {
      attendance += 1;
    }
  });
  attendance = (attendance / data.length) * 100;

  //rows for the admin view of the table
  const [rows, setData] = useState(data);

  useEffect(() => {}, [rows]);

  //fill new row with standart data
  const handleAddRow = () => {
    setData([
      ...rows,
      {
        block_id: blockId,
        block_name: blockName,
        date_end: undefined,
        date_start: undefined,
        group_id: groupId,
        lecturer_id: undefined,
        sess_id: 9, // TODO
        sess_time: undefined,
        sess_type: undefined,
      },
    ]);
    console.log(rows);
  };

  const handleDeleteRow = (index) => {
    //TODO
  };

  //Save changes in tpye selection locally in the rows data
  const handleChangeDate = async (event) => {
    const selectedValue = event.target.value;
    const id = event.target.getAttribute("data-id"); //sess_id of the current row
    console.log("Selected sess_id: " + id);
    console.log("Selected date: " + selectedValue);

    let modified = rows[id - 1].sess_time.substr(0, 10); //Need to save it in a help variable, otherwise it would complain
    modified = selectedValue;
    rows[id - 1].sess_time = modified;
  };

  //Save changes in tpye selection locally in the rows data
  const handleChangeStartTime = async (event) => {
    const selectedValue = event.target.value;
    const id = event.target.getAttribute("data-id"); //sess_id of the current row
    console.log("Selected sess_id: " + id);
    console.log("Selected start time: " + selectedValue);

    //TODO:Save locally in rows data - database not ready yet!
  };

  //Save changes in tpye selection locally in the rows data
  const handleChangeEndTime = async (event) => {
    const selectedValue = event.target.value;
    const id = event.target.getAttribute("data-id"); //sess_id of the current row
    console.log("Selected sess_id: " + id);
    console.log("Selected end time: " + selectedValue);

    //TODO:Save locally in rows data - database not ready yet!
  };

  //Save changes in tpye selection locally in the rows data
  const handleChangeSessType = async (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const id = selectedOption.getAttribute("data-id"); //sess_id of the current row
    const value = selectedOption.value; //value of selected option
    console.log("Selected sess_id: " + id);
    console.log("Selected sess_type: " + value);

    rows[id - 1].sess_type = value; //Editing the value in local rows data
  };
  //Save changes in lecturer selection locally in the rows data
  const handleChangeLecturer = async (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const id = selectedOption.getAttribute("data-id"); //sess_id of the current row
    const value = selectedOption.value; //value of selected option
    console.log("Selected sess_id: " + id);
    console.log("Selected lecturer_id: " + value);

    rows[id - 1].lecturer_id = value; //Editing the value in local rows data
  };

  //This function pushes the changes in the rows data to the database
  const handleChangeDatabase = async (event) => {
    const id = event.target.getAttribute("data-id"); //sess_id of the current row
    console.log(rows[id - 1]); //Logs current row on console for dev purposes
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
                  <td>{dateParser(item.sess_time)}</td>
                  <td>{item.sess_type}</td>
                  <td>
                    <div className="card-actions flex flex-col justify-center gap-5">
                      <Link
                        href={`/participants?blockId=${blockId}&date=${date}`}
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
                  <td>{dateParser(item.sess_time)}</td>
                  <td>{item.sess_type}</td>
                  <td>{item.lecturer_id}</td>
                  <td>
                    {/* qr code icon leads to generation of qr code, passing necessary information to the page */}
                    <Link
                      href={`/qrGeneration?blockId=${item.block_id}&sessId=${item.sess_id}&sessTime=${item.sess_time}&description=${item.sess_type}&identifier=${indentifier}`}
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
                        defaultValue={
                          //This fixes the bug where the new selection was not being displayed
                          session.sess_time
                            ? session.sess_time.substring(0, 10)
                            : undefined
                        }
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
                        defaultValue={
                          //This fixes the bug where the new selection was not being displayed
                          session.date_start
                            ? session.date_start.substring(14, 19)
                            : undefined
                        }
                        required
                      />{" "}
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
                        defaultValue={
                          //This fixes the bug where the new selection was not being displayed
                          session.date_end
                            ? session.date_end.substring(14, 19)
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
                        defaultValue={session.sess_type} //This fixes the bug where the new selection was not being displayed
                        onChange={handleChangeSessType}
                      >
                        <option disabled>Bitte auswählen</option>
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
                        defaultValue={session.lecturer_id} //This fixes the bug where the new selection was not being displayed
                        onChange={handleChangeLecturer}
                      >
                        <option disabled>Bitte auswählen</option>
                        {/* TODO backend: Get the real lecturers of the course and add here */}
                        {/* TODO backend: Add the selected lecturer to the corresponding course */}
                        <option value="Dozent 1" data-id={session.sess_id}>
                          Dozent 1
                        </option>
                        <option value="Dozent 2" data-id={session.sess_id}>
                          Dozent 2
                        </option>
                        <option value={session.lecturer_id}>
                          {session.lecturer_id}
                        </option>
                        <option
                          value="empty"
                          data-id={session.sess_id}
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
                        <Link href={`/participants?blockId=${blockId}`}>
                          <button className="btn border-transparent bg-secondary text-background">
                            Teilnehmerliste
                          </button>
                        </Link>
                      </div>
                    </td>
                    {/* Column with icon for saving rows */}
                    <td>
                      {/* <svg
                        class="svg-icon fill-current text-primary hover:stroke-current"
                        viewBox="0 2 20 20"
                        width="30"
                        height="40"
                      >
                        <path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path>
                      </svg> */}
                      <button
                        className="btn"
                        data-id={session.sess_id}
                        onClick={handleChangeDatabase}
                      ></button>
                    </td>
                    {/* Column with "Trash"-icon for deleting rows */}
                    {/* TODO backend: Delete day from database when button is clicked */}
                    {/* TODO: Delete row in which the icon has been clicked (right now it always deletes the last row) */}
                    <td>
                      <a href="#" onClick={() => handleDeleteRow(index)}>
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
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-col">
            {/* Button to add rows to the table */}
            <button
              type="button"
              className="btn bg-secondary"
              onClick={handleAddRow}
            >
              Neuen Termin hinzufügen
            </button>
          </div>
        </div>
      </div>
    );
  }
}
