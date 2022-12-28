import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import createAccount from "../components/createAccount";

export default function CourseTable({ type = "", praktID = "" }) {
  // TODO: backend: get dates based on praktID, then get courseType based on date (so that the table can be created dynamically)
  // Date format should be URL friendly
  var dates = ["01.01.2021", "02.01.2021", "03.01.2021"];
  var courseType = {
    "01.01.2021": "Praktikum",
    "02.01.2021": "Seminar",
    "03.01.2021": "Praktikum",
  };
  var lecturers = {
    "01.01.2021": "Petra Pinzette",
    "02.01.2021": "Kurt Klemme",
    "03.01.2021": "Sandra Skalpell",
  };

  // Number of rows for the admin view of the table
  const [noOfRows, setNoOfRows] = useState(1);

  // Decrement the number of rows by 1 (when the delete button is clicked)
  const handleDeleteRow = (index) => {
    setNoOfRows(noOfRows - 1);
  };

  // Declare a state variable to track the selected value of the `select` element (in the dropdown menu for selecting lecturers)
  const [selectedValue, setSelectedValue] = React.useState("");

  // Define a function to navigate to the '/accountsDekanat' page when the 'Neuen Dozenten erstellen' option is selected
  const handleChange = (event) => {
    // Update the selected value of the `select` element
    setSelectedValue(event.target.value);

    // Navigate to the '/accountsDekanat' page if the 'Neuen Dozenten erstellen' option is selected
    if (event.target.value === "Neuen Dozenten erstellen") {
      Router.push("/accountsDekanat");
    }
  };

  if (type == "lecturer") {
    return (
      <div class="container mx-auto">
        <div class="overflow-auto">
          <table class="table table-normal w-full text-primary dark:text-white">
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
              {dates.map((date, index) => (
                <tr class="hover">
                  <th>{index + 1}</th>
                  <td>{date}</td>
                  <td>{courseType[date]}</td>
                  <td>
                    <div className="card-actions flex flex-col justify-center gap-5">
                      <Link
                        href={`/participantsLecturer?praktID=${praktID}&date=${date}`}
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
        <div class="overflow-auto">
          <table class="table table-normal w-full text-primary dark:text-white">
            <thead>
              <tr>
                <th></th>
                <th>Datum</th>
                <th>Beschreibung</th>
                <th>Dozent*in</th>
                <th>QR-Code</th>
                <th>Anwesenheit</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over each date in array and create row */}
              {dates.map((date, index) => (
                <tr class="hover">
                  <th>{index + 1}</th>
                  <td>{date}</td>
                  <td>{courseType[date]}</td>
                  <td>{lecturers[date]}</td>
                  <td>
                    <Link href={"/qrGeneration"}>
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
                  <td></td>
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
            class="table table-normal w-full text-primary dark:text-white"
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
              </tr>
            </thead>
            <tbody>
              {[...Array(noOfRows)].map((elementInArray, index) => {
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
                        value="2022-12-12"
                        min="2022-12-12"
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
                        required
                      />
                    </td>
                    {/* Editable type column (Blockpraktikum, Blockseminar) dropdown menu */}
                    {/* TODO backend: Set the type value in database (Blockpraktikum/Blockseminar) */}
                    <td>
                      <select className="select select-bordered">
                        <option disabled selected>
                          Bitte auswählen
                        </option>
                        <option>Blockpraktikum</option>
                        <option>Blockseminar</option>
                      </select>
                    </td>
                    {/* Editable lecturer column */}
                    <td>
                      {/* Render the `select` element with the `onChange` event handler that calls the `handleChange` function */}
                      <select
                        className="select select-bordered"
                        onChange={handleChange}
                        defaultValue="Bitte auswählen"
                      >
                        <option value="Bitte auswählen">Bitte auswählen</option>
                        {/* TODO backend: Get the real lecturers of the course and add here */}
                        {/* TODO backend: Add the selected lecturer to the corresponding course */}
                        <option value="Dozent 1">Dozent 1</option>
                        <option value="Dozent 2">Dozent 2</option>
                        <option value="empty"></option>
                        <option value="Neuen Dozenten erstellen">
                          Neuen Dozenten erstellen
                        </option>
                      </select>
                    </td>
                    {/* Column with button to show all the participants */}
                    {/* TODO backend: Show the real participants of this course */}
                    <td>
                      <div className="card-actions flex flex-col justify-center gap-5">
                        <Link
                          href={`/participantsAdmin?praktID=${praktID}&date=${dates[0]}`}
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
              onClick={() => setNoOfRows(noOfRows + 1)}
            >
              Neuen Termin hinzufügen
            </button>
          </div>
        </div>
      </div>
    );
  }
}
