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
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 21 21"
                    stroke="white"
                    >
                    </svg>
                    
                    <div className="text-left">
                        <h3 className="card-subtitle">Praktikums-ID: {praktID}</h3>
                        <h3 className="card-subtitle">Woche: {week} </h3>
                        <h3 className="card-subtitle">Gruppe: {group}</h3>
                        <h3 className="card-subtitle">Anwesenheit: {attendance}</h3>
                    </div>
                    <div className="card-actions justify-end">
                    <Link href="/courseList">
                        <button className="btn border-transparent bg-white hover:bg-gray-400 text-neutral">Details</button>
                      </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}