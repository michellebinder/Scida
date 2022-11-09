import Head from "next/head";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
/* 
set all the elments in a content element
*/
export default function Content({
  title = "",
  imageSrc = "",
  linkNextPage = "",
}) {
  return (
    <div>
      {/* div container to create the hover animation */}
      <motion.div
        className="card"
        whileHover={{
          position: "relative",
          zIndex: 1,
          background: "bg-slate-300",
          scale: 1.2,
          transition: {
            duration: 0.2,
          },
        }}
      >
        {/* making rectangular content component a link to the respective login page */}
        <Link href={linkNextPage}>
          <div
            data-testid={title}
            className="bg-slate-300 border-b border-grey-500 p-1 md:p-10 border rounded-full text-base md:text-base md:text-justify" //custom design
          >
            <div className="justify-center ">
              <div className="flex flex-row justify-center">
                <img
                  className="w-16 h-16 p-3 rounded-full object-cover 2xl:w-30 2xl:h-30 2xl:rounded-full 2xl:object-cover"
                  src={imageSrc}
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-apple font-bold text-base md:text-lg text-center">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
