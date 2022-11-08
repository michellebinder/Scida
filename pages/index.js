import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Login from "../components/login";
import Content from "../components/content";
/*
function to create structure for our website
*/
function Home() {
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      <div className="bg-[#bada55] flex flex-col h-screen justify-between">
        <div id="start" className="fixed z-10">
          <Header></Header>
        </div>
        <div className="font-sans font-family:Arial md:pl-20 md:pr-20 md:pt-36 pt-56 grid grid-cols-1 gap-10 p-5 z-0">
          {/* <Login></Login> */}
          <Content title="Nutzer auswählen" pictureSrc="emoji1.jpeg"></Content>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default Home;
