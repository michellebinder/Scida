import React from "react";
import Link from "next/link";

export default function CourseTableLecturer({
    praktID = "",  
}) {

    // TODO: backend: get dates based on praktID, then get courseType based on date
    //date format should be URL friendly
    var dates = ["01.01.2021", "02.01.2021", "03.01.2021"];
    var courseType = {"01.01.2021": "Praktikum", "02.01.2021": "Seminar", "03.01.2021": "Praktikum"}

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
                                        <Link href={`/participantsLecturer?praktID=${praktID}&date=${date}`}>
                                            <button className="btn border-transparent bg-secondary text-background">Teilnehmerliste</button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
}