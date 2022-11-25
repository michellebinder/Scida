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
        <div className="card bg-base-100">
            <div className="card-body">
                <h2 className="card-title">{courses}</h2>
                <h3 className="card-subtitle">Praktikums-ID: {praktID}</h3>
                <p className="card-text">{text}</p>
                <div className="card-actions">
                    <Link href="/course">
                        <button className="btn btn-primary">Details</button>
                    </Link>
                </div>
                <div className="card-actions">
                    <Link href="/course">
                        <button className="btn btn-primary">Praktikumswoche</button>
                    </Link>
                </div>
                <div className="card-actions">
                    <Link href="/course">
                        <button className="btn btn-primary">Anwesenheit</button>
                    </Link>
                </div>
                <div className="card-actions">
                    <Link href="/course">
                        <button className="btn btn-primary">Gruppe</button>
                    </Link>
                </div>
            </div>
        </div>

        // <div class="card w-96 bg-primary text-primary-content">
        //     <div class="card-body">
        //         <h2 class="card-title">Praktikum</h2>
        //         {/* Head */}
        //         <thead>
        //             <tr>
        //               <th>Pr-ID</th>
        //               <th>Praktikum</th>
        //               <th>Woche</th>
        //               <th>Anwesenheit</th>
        //               <th>Gruppe</th>
        //             </tr>
        //         </thead>
        //         <div class="card-actions justify-end">
        //             <button class="btn">Details</button>
        //         </div>
        //     </div>
        // </div>
    );
}