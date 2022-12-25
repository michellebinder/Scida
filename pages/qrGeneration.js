import React, { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Head from "next/head";

export default function Home() {

    var matrikel = "123456";
    const [qrCodeUrl, setQrCodeUrl] = useState(null);

    const handleQrCodeButtonClick = async () => {
      const response = await fetch(
        "https://api.qrserver.com/v1/create-qr-code/?data=" + matrikel +"&size=200x200"
      );
      const qrCodeUrl = await response.url;
      setQrCodeUrl(qrCodeUrl);
    };

    handleQrCodeButtonClick();
    
    return (
    <>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* Div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* Dashboard navbar with navigation items  */}
        <Navbar type="student"></Navbar>
        <div className="flex flex-row grow">
          {/* Sidebar only visible on large screens */}
          <Sidebar type="student"></Sidebar>
          <div className="hero grow">
            {/* Grid for layouting welcome text and card components, already responsive */}
            <div className="grid hero-content text-center text-neutral-content lg:p-10">
                {qrCodeUrl && <img src={qrCodeUrl} alt="" title="" />}
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
