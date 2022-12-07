import React from "react";
import Link from "next/link";

export default function CourseAdmin({
    courses = "",
    praktID = "",
    children: text,
    week = "",
}) {
    return (
        <div className="card card-normal bg-primary text-primary-content">
            <div className="card-body">
                <div className="flex justify-between">
                    <div className="card-actions flex flex-col justify-center">
                        <h2 className="card-title text-white">{courses}</h2>
                        <div className="text-left ml-5">
                            <h3 className="card-subtitle">Praktikums-ID: {praktID}</h3>
                            <h3 className="card-subtitle">Woche: {week} </h3>
                        </div>
                    </div>
                    <div className="card-actions flex flex-col justify-center gap-5">
                        {/* add link to coursedetailsadmin and pass praktID as parameter */}
                        // add link to coursedetailsadmin and pass praktID as parameter
                        <Link href={`/courseDetailsAdmin?praktID=${praktID}`}>
                            <button className="btn ml-5 mt-5 border-transparent hover:border-transparent bg-neutral hover:bg-secondary text-background">Details</button>
                        </Link>

                        {/* <Link href='/courseDetailsAdmin'>
                            <button className="btn ml-5 mt-5 border-transparent hover:border-transparent bg-neutral hover:bg-secondary text-background">Details</button>
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>

    );
}