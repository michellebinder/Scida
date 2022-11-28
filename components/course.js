import React from "react";
import Link from "next/link";

export default function Course({
    courses = "",
    praktID = "",
    children: text,
    week = "",
    attendance = "",
    group = "",
}) {
    return (
        <div className="card card-normal bg-primary text-primary-content">
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title text-white">{courses}</h2>
                    <div className="text-left ml-5">
                        <h3 className="card-subtitle">Praktikums-ID: {praktID}</h3>
                        <h3 className="card-subtitle">Woche: {week} </h3>
                        <h3 className="card-subtitle">Gruppe: {group}</h3>
                    </div>
                    <div className="card-actions flex flex-col justify-center gap-5">
                        <div className="radial-progress"
                            style={{ "--value": attendance, "--max": 100 }} >{attendance}%
                            {/* alternatively: specify radius and thickness of circle: 
                            style={{ "--value": attendance, "--size": "5rem", "--thickness": "20px" }}>{attendance}%</div>}
                            */}
                        </div>
                        <Link href="/courseList">
                            <button className="btn border-transparent hover:border-transparent bg-neutral hover:bg-secondary text-background">Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}