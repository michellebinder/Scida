import Head from "next/head";
import React from "react";

export default function Header() {
    return (

        <div className="">
                <div className="bg-darkblue text-white font-bold font-sans font-family:Arial text-xl p-5 w-screen flex md:flex-row flex-col items-center text-center">
                <a className="px-8 flex flex-row justify-center" href="#mission">
                    <img className="w-12 h-1/12 rounded-2xl" src="SiegelMedFak.png" alt="Siegel der medizinischen Fakultät" />
                </a>
                <a className="hover:underline">
                Universität zu Köln
                </a>
                </div>
                <div className="bg-red text-transparent font-bold font-sans font-family:Arial text-xs p-0.02 w-screen flex md:flex-row flex-col items-center text-center">Dies ist ein Easter Egg</div>
        </div>
    );
}