import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Login from "../components/login";
import Link from "next/link";
import { motion } from "framer-motion";

function Home() {
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-background">
        {/* basic navbar without navigation items */}
        <Navbar type="basic"></Navbar>

        {/* div that stretches from below the navbar to the bottom, scrolling "disabled" */}
        <div className="grow grid justify-center">
          {/* div with bubble animation */}
          <div class="flex items-center justify-center px-16">
            <div class="relative w-full max-w-lg">
              <div class="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full  filter blur-xl opacity-70 animate-blob"></div>
              <div class="absolute top-0 -right-4 w-72 h-72 bg-accent rounded-full  filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div class="absolute -bottom-8 left-20 w-72 h-72 bg-secondary rounded-full  filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div class="m-8 relative space-y-4">
                {/* motion div to create morph in animation on page loading*/}
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
                  <Login></Login>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
