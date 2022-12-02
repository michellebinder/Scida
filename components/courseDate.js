import React from "react";
import Link from "next/link";

export default function CourseDate({
    praktID = "",  
}) {
    return (
        <div class="container mx-auto">
            <div class="overflow-auto">
                <table class="table table-normal w-full text-primary">
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
                        {/* <!-- row 1 --> */}
                        <tr class="hover">
                            <th>1</th>
                            <td>01.01.2021</td>
                            <td>Praktikum</td>
                            <td>Petra Pinzette</td>
                            <td>
                                {/* TODO: frontend: make size of circle responsive */}
                                {/* TODO: backend: colour of circle depends on attendance */}
                                {/*<svg 
                                    viewBox="0 0 100 100" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="green"
                                    fill="green">
                                    <circle    
                                        cx="50" 
                                        cy="50" 
                                        r="20" 
                                    />
                                </svg>*/}
                            </td>
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr class="hover">
                            <th>2</th>
                            <td>02.01.2021</td>
                            <td>Seminar</td>
                            <td>Kurt Klemme</td>
                            <td>
                               {/* <svg 
                                    viewBox="0 0 100 100" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="red"
                                    fill="red">
                                    <circle    
                                        cx="50" 
                                        cy="50" 
                                        r="20" 
                                    />
                                </svg>*/}
                            </td>
                        </tr>
                        {/* <!-- row 3 --> */}
                        <tr class="hover">
                            <th>3</th>
                            <td>03.01.2021</td>
                            <td>Praktikum</td>
                            <td>Sandra Skalpell</td>
                            <td>
                               {/* <svg 
                                    viewBox="0 0 100 100" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="red"
                                    fill="red">
                                    <circle    
                                        cx="50" 
                                        cy="50" 
                                        r="20" 
                                    />
                                </svg>*/}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}