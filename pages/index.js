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
        {/*div that spans from below the header to the footer */}
        <div className="flex flex-col grid grid-cols-2 justify-center">
          {/* left side of the main div */}
          <div className="grid content-center">
            <div class="flex items-center justify-center px-16">
              <div class="relative w-full max-w-lg">
                <div class="absolute top-0 -left-4 w-72 h-72 bg-darkblue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div class="absolute top-0 -right-4 w-72 h-72 bg-red rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div class="absolute -bottom-8 left-20 w-72 h-72 bg-mediumblue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div class="m-8 relative space-y-4">
                  <h1 className="font-apple font-bold text-slate-200 text-6xl text-center">
                    Scida
                  </h1>
                  <h2 className="font-apple font-bold text-slate-200 text-2xl text-center">
                    Von Studierenden, für Studierende.
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <motion.div
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
            <h2 className="font-apple font-bold text-2xl text-center pb-8">
              Bitte wählen Sie Ihren Login-Bereich aus:
            </h2>

            {/*right side of the main div, for the three login types */}
            <div className="md:pl-20 md:pr-20 grid grid-cols-2 gap-10 z-0">
              <Content
                title="Studierende"
                imageSrc="user-2.png"
                linkNextPage="/login"
              ></Content>
              <Content title="Dozierende" imageSrc="user-2.png"></Content>
              <Content title="Admin" imageSrc="user-2.png"></Content>
            </div>
          </motion.div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
export default Home;
