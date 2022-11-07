import Head from "next/head";
import React from "react";
/* 
set all the elments in footer
*/
export default function Footer() {
    return (

        <footer className="bg-darkblue font-sans font-family:Arial hover:shadow-2xl p-4 rounded-lg shadow md:flex md:items-center md:justify-center md:p-6">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022. Alle Rechte vorbehalten. | Support | Datenschutz | Impressum
            </span>
        </footer>

    );
}
