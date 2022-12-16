import React, { useState } from "react";
import Link from "next/link";

export default function CourseCardLecturer({
    courses = "",
    praktID = "",
    children: text
  }) {
    // Use the useState Hook to manage the component's state
    const [selectedValue, setSelectedValue] = useState("");
  
    // Define an event handler to update the state when the select value changes
    const handleChange = event => {
      setSelectedValue(event.target.value);
    };
  
    // Use the state value to enable or disable the button and include it in the link href 
    return (
        <div className="card card-normal bg-primary text-primary-content">
          <div className="card-body">
            <div className="flex justify-between">
              <div className="card-actions flex flex-col justify-center">
                <h2 className="card-title text-white">{courses}</h2>
                <div className="text-left ml-5">
                    <h3 className="card-subtitle">Kurs-ID: {praktID}</h3>
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
                    <button
                      className="btn btn-md ml-5 mt-5 border-transparent disabled:border-transparent disabled:bg-secondary text-background"
                    >
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