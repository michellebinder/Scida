import React from "react";
import Link from "next/link";

export default function CourseTable({
    type = "",
    praktID = "",  
}) {

    // TODO: backend: get dates based on praktID, then get courseType based on date
    //date format should be URL friendly
    var dates = ["01.01.2021", "02.01.2021", "03.01.2021"];
    var courseType = {"01.01.2021": "Praktikum", "02.01.2021": "Seminar", "03.01.2021": "Praktikum"}
    var lecturers = {"01.01.2021": "Petra Pinzette", "02.01.2021": "Kurt Klemme", "03.01.2021": "Sandra Skalpell"}

    if (type=="lecturer") {
        return (
            <div class="container mx-auto">
                <div class="overflow-auto">
                    <table class="table table-normal w-full text-primary dark:text-white">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Datum</th>
                            <th>Beschreibung</th>
                            <th>QR-Code</th>
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
                                        <Link href={"/qrScan"}>
                                            <button className="btn btn-ghost flex items-center">
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="black"
                                                >
                                                <path d="M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm0-2h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8 8h-1v-2h1v1h2v1h-1v1h-1v-1zm2 12v-1h-1v1h1zm-1-15v-1h-2v1h1v1h1v-1zm8-1v6h-1v-1h-4v-5h5zm-1 4v-3h-3v3h3zm-14 2h-1v1h2v-1h-1zm0 3h1v1h1v-3h-1v1h-2v2h1v-1zm5 1v2h1v-2h-1zm4-10h-1v3h1v-3zm0 5v-1h-1v1h1zm3-2h1v-1h-1v1zm-10-1h-1v1h1v-1zm2-2v5h-5v-5h5zm-1 1h-3v3h3v-3zm9 5v1h-1v-1h-2v1h-1v-1h-3v-1h-1v1h-1v1h1v2h1v-1h1v2h1v-2h3v1h-2v1h2v1h1v-3h1v1h1v2h1v-1h1v-1h-1v-1h-1v-1h1v-1h-2zm-11 8h1v-1h-1v1zm-2-3h5v5h-5v-5zm1 4h3v-3h-3v3zm12-3v-1h-1v1h1zm0 1h-1v1h-1v-1h-1v-1h1v-1h-2v-1h-1v2h-1v1h-1v3h1v-1h1v-1h2v2h1v-1h1v1h2v-1h1v-1h-2v-1zm-9-3h1v-1h-1v1zm10 2v1h1v1h1v-3h-1v1h-1zm2 4v-1h-1v1h1zm0-8v-1h-1v1h1z" />
                                                </svg>
                                            </button>
                                        </Link>
                                    </td>
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
    } else if (type=="student") {
        return (
            <div class="container mx-auto">
                <div class="overflow-auto">
                    <table class="table table-normal w-full text-primary dark:text-white">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Datum</th>
                            <th>Beschreibung</th>
                            <th>Dozent*in</th>
                            <th>Anwesenheit</th>
                        </tr>
                        </thead>
                        <tbody>
                            {/* Map over each date in array and create row */}
                            {dates.map((date, index) => (
                                <tr class="hover">
                                    <th>{index + 1}</th>
                                    <td>{date}</td>
                                    <td>{courseType[date]}</td>
                                    <td>{lecturers[date]}</td>
                                    <td></td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </div>
    
        );

    } else if (type=="admin") {
        return (
            <div class="container mx-auto">
                <div class="overflow-auto">
                    <table class="table table-normal w-full text-primary dark:text-white">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Datum</th>
                            <th>Beschreibung</th>
                            <th>Dozierende</th>
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
                                    <td>{lecturers[date]}</td>
                                    <td>
                                        <div className="card-actions flex flex-col justify-center gap-5">
                                            <Link href={`/participantsAdmin?praktID=${praktID}&date=${date}`}>
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
}


