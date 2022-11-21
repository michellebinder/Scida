import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      {/* navbar of the login page (includes only logo and title) */}
      <div className="navbar text-white bg-primary">
        <div className="navbar-start" data-testid="navbar">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="/SiegelMedFak.png" />
            </div>
          </div>
          <Link href="/">
            <span
              className="pl-3 badge-xl text-xl"
              onClick={() => (window.location.href = "/")}
            >
              Scida
            </span>
            {/* <span
                className="lg:visible badge-xl text-xl"
                onClick={() => (window.location.href = "/")}
              >
                - Universität zu Köln
              </span> */}
          </Link>
        </div>
      </div>
      <div className="bg-accent text-transparent font-bold font-apple text-xs p-0.02 w-screen flex md:flex-row flex-col items-center text-center">
        Dies ist ein Easter Egg 2
      </div>
    </div>
  );
}
