import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      {/* red med fak bar */}
      <div className="bg-darkblue text-transparent font-bold font-apple text-xs p-1 w-screen flex md:flex-row flex-col items-center text-center">
        Dies ist ein Easter Egg
        <Link href="/">
          <div className="px-8 flex flex-row justify-center">
            <img
              className="w-8 rounded-2xl"
              src="SiegelMedFak.png"
              alt="Siegel der medizinischen Fakultät"
            />
          </div>
        </Link>
      </div>
      <div className="bg-red text-transparent font-bold font-apple text-xs p-0.02 w-screen flex md:flex-row flex-col items-center text-center">
        Dies ist ein Easter Egg 2
      </div>
      <div className="bg-slate-100 text-white font-bold font-apple text-xl pt-5 w-screen flex md:flex-row flex-col items-center text-center">
        <Link href="/">
        {/* <div className="hover:underline">Scida @ Universität zu Köln</div> */}
        </Link>
      </div>
    </div>
  );
}
