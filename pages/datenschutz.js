import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* dashboard navbar with navigation items  */}
        <Navbar></Navbar>
      </div>
    </div>
  );
}
