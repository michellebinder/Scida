import Head from "next/head";
import React, {useRef} from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";


export default function Home(){

    // create a reference to the <video> element
    const videoElement = useRef(null);

    // prompt user for permission to use webcam
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        videoElement.current.srcObject = stream;
    });

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
                <Sidebar type="lecturer"></Sidebar>
                <div className="hero grow">
                    {/* Grid for layouting welcome text and card components, already responsive */}
                    <div className="grid hero-content text-center text-neutral-content lg:p-10">
                        <div className="text-secondary dark:text-white">
                            <h1 className="mb-5 text-5xl font-bold text-center">
                            QR-Code scannen
                            </h1>
                        </div>
                    </div>
                    {/* Add <video> element to page */}
                    <video ref={videoElement} autoPlay></video>
                </div>
            </div>
            <Footer></Footer>
        </div>
    </div>);
}
