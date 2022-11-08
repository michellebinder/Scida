import Head from "next/head";
import React from "react";
/* 
set all the elments in a content element
*/
export default function Content({ title = "", imageSrc = "" }) {
    return (
      <div
        data-testid={title}
        className="border-b border-grey-500 p-1 md:p-10 bg-grey-500 border rounded-3xl text-lg md:text-2xl md:text-justify" //custom design 
      >
        <div className="flex justify-center pb-16">
        <img
              className="
              w-32 h-32 p-3 rounded-full object-cover
              2xl:w-40 2xl:h-40 2xl:rounded-full 2xl:object-cover
              "
              src={imageSrc}
            />
          <div className="flex flex-col justify-center">
            <h1 className="font-arial font-bold text-2xl md:text-4xl text-center">
              {title}
            </h1>
          </div>
        </div>
        {/* <div id="team" className=" text-center">
          {text}
        </div> */}
      </div>
    );
  }