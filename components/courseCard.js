import React, { useState } from "react";
import Link from "next/link";

export default function CourseCard({
  type = "",
  praktID = "",
  courses = "",
  week = "",
  attendance = "",
  group = "",
  children: text,
}) {
  // Use the useState Hook to manage the component's state
  const [selectedValue, setSelectedValue] = useState("");

  // Define an event handler to update the state when the select value changes
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  if (type == "student") {
    return (
      <div className="card card-normal bg-primary text-primary-content">
        <div className="card-body">
          <div className="flex justify-between">
            <div className="card-actions flex flex-col justify-center">
              <h2 className="card-title text-white">{courses}</h2>
              <div className="text-left ml-5">
                <h3 className="card-subtitle">Praktikums-ID: {praktID}</h3>
                <h3 className="card-subtitle">Woche: {week} </h3>
                <h3 className="card-subtitle">Gruppe: {group}</h3>
              </div>
            </div>
            <div className="card-actions flex flex-col justify-center gap-5">
              <div
                className="radial-progress"
                style={{ "--value": attendance, "--max": 100 }}
              >
                {attendance}%
                {/* alternatively: specify radius and thickness of circle: 
                            style={{ "--value": attendance, "--size": "5rem", "--thickness": "20px" }}>{attendance}%</div>} */}
              </div>
              {/* Name courseID after const above */}
              <Link href={`/courseDetailsStudent?praktID=${praktID}`}>
                <button className="btn btn-md ml-5 mt-5 border-transparent hover:border-transparent bg-neutral hover:bg-secondary text-background">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card card-normal bg-primary text-primary-content">
        <div className="card-body">
          <div className="flex justify-between">
            <div className="card-actions flex flex-col justify-center">
              <h2 className="card-title text-white">{courses}</h2>
              <div className="text-left ml-5">
                {type == "lecturer" ? (
                  <div className="text-left ml-5">
                    <h3 className="card-subtitle">Kurs-ID: {praktID}</h3>
                  </div>
                ) : (
                  <div className="text-left ml-5">
                    <h3 className="card-subtitle">Praktikums-ID: {praktID}</h3>
                    <h3 className="card-subtitle">Woche: {week} </h3>
                  </div>
                )}
              </div>
              <select
                id="group"
                className="select select-sm mt-5 max-w-xs text-primary"
                onChange={handleChange}
              >
                <option disabled selected>
                  Gruppe auswählen
                </option>
                {/* TODO Backend: get actual lecturer's groups */}
                <option>Gruppe 01</option>
                <option>Gruppe 02</option>
                <option>Gruppe 03</option>
              </select>
            </div>
            <div className="card-actions flex flex-col justify-center gap-5">
              {/* when no option selected, selValue remains empty, thus, button disabled and not redirecting to link on click */}
              {selectedValue === "" ? (
                <button
                  className="btn btn-md ml-5 mt-5 border-transparent disabled:border-transparent disabled:bg-secondary text-background"
                  disabled={true}
                >
                  Details
                </button>
              ) : (
                <Link
                  href={`/courseDetailsLecturer?praktID=${praktID}&selectedValue=${selectedValue}`}
                >
                  <button className="btn btn-md ml-5 mt-5 border-transparent disabled:border-transparent disabled:bg-secondary text-background">
                    Details
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
