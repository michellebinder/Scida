import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Login from "../components/login";
import Content from "../components/content";
import Link from "next/link";
import { motion } from "framer-motion";
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
      <div className="bg-slate-100 flex flex-col h-screen justify-between">
        <Header></Header>
        {/*div that spans from below the header to the footer (with animation) */}
        <motion.div
          className="bg-slate-100 flex flex-col h-screen justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          {/* placeholder  */}
          <h1 className="font-apple font-bold text-2xl text-center pb-8"></h1>

          {/*div for the login*/}
          <div className="md:pl-20 md:pr-20 gap-10 p-5 z-0">
            <Login></Login>
          </div>
        </motion.div>
        <Footer></Footer>
      </div>
    </div>
  );
}
export default Home;
