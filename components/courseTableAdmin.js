import React from "react";
import Link from "next/link";

export default function CourseTableAdmin({
    praktID = "",  
}) {
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
                        <th>Anwesenheit</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        <tr class="hover">
                            <th>1</th>
                            <td>01.01.2021</td>
                            <td>Praktikum</td>
                            <td>Petra Pinzette</td>
                            <td>
                                <div className="card-actions flex flex-col justify-center gap-5">
                                    <Link href={`/courseDetailsAdmin`}>
                                        <button className="btn border-transparent bg-secondary text-background">Teilnehmerliste</button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr class="hover">
                            <th>2</th>
                            <td>02.01.2021</td>
                            <td>Seminar</td>
                            <td>Kurt Klemme</td>
                            <td>
                                <div className="card-actions flex flex-col justify-center gap-5">
                                    <Link href={`/courseDetailsAdmin`}>
                                        <button className="btn border-transparent bg-secondary text-background">Teilnehmerliste</button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        {/* <!-- row 3 --> */}
                        <tr class="hover">
                            <th>3</th>
                            <td>03.01.2021</td>
                            <td>Praktikum</td>
                            <td>Sandra Skalpell</td>
                            <td>
                                <div className="card-actions flex flex-col justify-center gap-5">
                                    <Link href={`/courseDetailsAdmin`}>
                                        <button className="btn border-transparent bg-secondary text-background">Teilnehmerliste</button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}