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
      <div className="bg-white flex flex-col h-screen justify-between">
        <div id="start" className="z-10">
          <Header></Header>
        </div>
        <div className="font-sans font-family:Arial pl-10 pr-10 gap-10 grid grid-cols-3 z-0">
          <Login></Login>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Home;
