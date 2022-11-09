import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Login from "../components/login";
import Content from "../components/content";
import Link from "next/link";
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

      {/*div that spans from the very top to the very bottom and spreads elements*/}
      <div className="bg-white flex flex-col h-screen justify-between">
        <Header></Header>
        {/*div that spans from below the header to the footer */}
        <div className="bg-white flex flex-col h-screen justify-center">
          <h1 className="font-arial font-bold text-2xl text-center pb-8">
            Bitte wählen Sie Ihren Login-Bereich aus:
          </h1>
          {/*div for the three login types*/}
          <div className="font-arial font-family:Arial md:pl-20 md:pr-20 grid grid-cols-3 gap-10 p-5 z-0">
            <Content title="Studierende" imageSrc="user-2.png" linkNextPage="/login"></Content>
            <Content title="Dozierende" imageSrc="user-2.png"></Content>
            <Content title="Admin" imageSrc="user-2.png"></Content>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
export default Home;
