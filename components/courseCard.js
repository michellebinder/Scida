import React, { useState } from "react";
import Link from "next/link";
import { remove_duplicates } from "../gloabl_functions/array";

export default function CourseCard({
  type = "",
  blockId = "",
  courses = "",
  week = "",
  attendance = "",
  group = "",
  propsData,
  children: text,
}) {
  // Use the useState Hook to manage the component's state
  const [selectedValue, setSelectedValue] = useState("");

  // Define an event handler to update the state when the select value changes
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  let groups = [];
  propsData
    ? propsData.data.map((item) => {
        if (item.block_id == blockId) {
          groups.push(item.group_id);
        }
      })
    : (groups = []);
  groups = remove_duplicates(groups);
  console.log(groups);

  if (type == "student") {
    return (
      <div className="card card-normal bg-primary text-primary-content">
        <div className="card-body">
          <div className="flex justify-between">
            <div className="card-actions flex flex-col justify-center">
              <h2 className="card-title text-white">{courses}</h2>
              <div className="text-left ml-5">
                <h3 className="card-subtitle">Praktikums-ID: {blockId}</h3>
                <h3 className="card-subtitle">Woche: {week} </h3>
                <h3 className="card-subtitle">Gruppe: {group}</h3>
              </div>
            </div>
            <div className="card-actions flex flex-col justify-center gap-5">
              {/* Name courseID after const above */}
              <Link href={`/courseDetail?blockId=${blockId}`}>
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
                    <h3 className="card-subtitle">Kurs-ID: {blockId}</h3>
                  </div>
                ) : (
                  <div className="text-left ml-5">
                    <h3 className="card-subtitle">Praktikums-ID: {blockId}</h3>
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
                {groups.map((group) => (
                  <option>Gruppe {group}</option>
                ))}
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
                  href={`/courseDetail?blockId=${blockId}&selectedValue=${selectedValue}`}
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
