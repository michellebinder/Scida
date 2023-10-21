import React, { useState } from "react";
import Link from "next/link";
import { remove_duplicates } from "../gloabl_functions/array";

export default function CourseCard({
  type = "",
  blockId = "",
  courses = "",
  group = "",
  propsData,
  semester = "",
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
            <div className="card-actions flex flex-col justify-center pr-5 ">
              <h2 className="font-bold text-white text-xl">{courses}</h2>
            </div>
            <div className="card-actions flex flex-col justify-center ">
              {/* Name courseID after const above */}
              <Link href={`/courseDetail?blockId=${blockId}&course=${courses}`}>
                <button className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white ">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
    {
      /* The component for admins only contains the titles of the Praktika */
    }
  } else if (type == "admin") {
    return (
      <div className="card card-normal bg-primary text-primary-content">
        <Link href={`/courseDetail?blockId=${blockId}&groupId=${group}`}>
          <div className="card-body">
            <div className="flex justify-center">
              <div className="card-actions flex flex-col justify-center">
                <h2 className="card-title text-white">{courses}</h2>
                <h3 className="card-subtitle">Semester: {semester} </h3>
                {/* TODO: add actual dozenten names */}
                <h3 className="card-subtitle">Dozenten: </h3>
              </div>
              <div className="card-actions flex flex-col justify-center gap-5"></div>
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="card card-normal bg-primary text-primary-content">
        <div className="card-body">
          <div className="flex justify-center">
            <div className="card-actions flex flex-col justify-center">
              <h2 className="card-title text-white">{courses}</h2>
              <div className="text-left">
                <div>
                  <h3 className="card-subtitle">Semester: {semester}</h3>
                </div>
              </div>
              <select
                id="group"
                className="select select-sm mt-5 max-w-xs text-primary dark:bg-neutral dark:text-white"
                onChange={handleChange}
              >
                <option disabled selected>
                  Gruppe auswählen
                </option>
                {propsData.data.map((item) => (
                  <option>Gruppe {item.lv_gruppe}</option>
                ))}
              </select>
            </div>
            <div className="card-actions flex flex-col justify-center gap-5 ml-5 mt-5">
              {/* when no option selected, selValue remains empty, thus, button disabled and not redirecting to link on click */}
              {selectedValue === "" ? (
                <button
                  className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white disabled:border-transparent disabled:bg-secondary"
                  disabled={true}
                >
                  Details
                </button>
              ) : (
                <Link
                  href={`/courseDetail?blockId=${blockId}&selectedValue=${selectedValue}`}
                >
                  <button className="btn shadow-none hover:shadow-lg hover:opacity-75 dark:text-white disabled:border-transparent disabled:bg-secondary">
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
