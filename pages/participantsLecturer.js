import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

export default function Home() {
    
    // TO DO (backend): get actual courseName from database
    const courseName = "Innere Medizin";

    return (
        <div>
            <Head>
            <title>Scida</title>
            <meta charSet="utf-8" />
            </Head>
            {/* Div that stretches from the very top to the very bottom */}
            <div className="flex flex-col h-screen justify-between bg-base-100">
            {/* Dashboard navbar with navigation items  */}
                <Navbar></Navbar>
                <div className="flex flex-row grow">
                    {/* Sidebar only visible on large screens */}
                    <Sidebar type="student"></Sidebar>
                    <div className="hero grow">
                        {/* Grid for layouting welcome text and card components, already responsive */}
                        <div className="grid hero-content text-center text-neutral lg:p-10">
                            <div className="text-secondary dark:text-white">
                                {/* display courseID as determined by href url */}
                                <h1 className="mb-5 text-5xl font-bold text-center">
                                {/* TODO: backend: find out and display course name not courseID */}
                                {courseName}
                                </h1>
                                <h1 className="mb-5 text-3xl font-bold text-center">
                                {/* TODO: frontend: pass chosen group number to this page and display here */}
                                Teilnehmerliste
                                </h1>
                            </div>
                            <div>
                                {/* display table component with attendance details for the course */}
                                <div className="grid w-fit sm:grid-cols-1 gap-5">
                                {/* TODO: backend: find out corresponding values for course and pass to courseDate */}
                                    <div class="container mx-auto">
                                        <div class="overflow-auto">
                                            <table class="table table-normal w-full text-primary dark:text-white">
                                                <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Vorname</th>
                                                    <th>Nachname</th>
                                                    <th>Anwesenheit</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {/* <!-- row 1 --> */}
                                                    <tr class="hover">
                                                        <th>1</th>
                                                        <td>Dieter</td>
                                                        <td>Darm</td>
                                                        <td>Ja</td>
                                                    </tr>
                                                    {/* <!-- row 2 --> */}
                                                    <tr class="hover">
                                                        <th>2</th>
                                                        <td>Hannah</td>
                                                        <td>Herz</td>
                                                        <td>Nein</td>
                                                    </tr>
                                                    {/* <!-- row 3 --> */}
                                                    <tr class="hover">
                                                        <th>3</th>
                                                        <td>Norbert</td>
                                                        <td>Niere</td>
                                                        <td>Ja</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
      );
}