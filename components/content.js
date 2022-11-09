import Head from "next/head";
import React from "react";
import Link from "next/link";
/* 
set all the elments in a content element
*/
export default function Content({ title = "", imageSrc = "", linkNextPage = "" }) {
  return (
    <div>
      <Link href={linkNextPage}>
        <div
          data-testid={title}
          className="border-b border-grey-500 p-1 md:p-10 bg-grey-500 border rounded-3xl text-base md:text-base md:text-justify" //custom design
        >
          <div className="justify-center p-16">
            <div className="flex flex-row justify-center">
              <img
                className="
            w-32 h-32 p-3 rounded-full object-cover
            2xl:w-60 2xl:h-60 2xl:rounded-full 2xl:object-cover"
                src={imageSrc}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-arial font-bold text-base md:text-lg text-center">
                {title}
              </h1>
            </div>
          </div>
          {/* <div id="team" className=" text-center">
          {text}
        </div> */}
        </div>
      </Link>
    </div>
  );
}
