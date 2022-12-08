import React from "react";
import Link from "next/link";

export default function CourseLecturer({
    courses = "",
    praktID = "",
    children: text,
}) 
{   var e = Boolean;

    {/* e shall be set to true when option is selected. Otherwise button remains disabled */}

    return (
        <div className="card card-normal bg-primary text-primary-content">
            <div className="card-body">
                <div className="flex justify-between">
                    <div className="card-actions flex flex-col justify-center">
                        <h2 className="card-title text-white">{courses}</h2>
                        <div className="text-left ml-5">
                            <h3 className="card-subtitle">Kurs-ID: {praktID}</h3>
                        </div>
                        <select id="group" class="select select-sm mt-5 max-w-xs text-primary">
                            <option disabled selected>Gruppe auswählen</option>
                            {/* TODO: Backend: display actual groups for this course */}
                            {/* TODO: Frontend: make button clickable when group was selected, then show group details */}
                            <option>Gruppe 01</option>
                            <option>Gruppe 02</option>
                            <option>Gruppe 03</option>
                        </select>
                    </div>
                    <div className="card-actions flex flex-col justify-center gap-5">
                        {/* add link and pass praktID as parameter */}
                        <Link href={`/courseDetailsLecturer?praktID=${praktID}`}>
                            <button className="btn btn-md ml-5 mt-5 border-transparent disabled:border-transparent disabled:bg-secondary text-background" disabled={true}>Details</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>

    );
}