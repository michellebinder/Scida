import Head from "next/head";
import React from "react";
import NavbarAdmin from "../components/navbarAdmin";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* dashboard navbar with navigation items */}
        <NavbarAdmin></NavbarAdmin>
      {/* div that stretches from below the navbar to the very bottom  */}
      <div className="hero grow">
        {/* grid for layouting the components (center of the screen) */}
        <div className="grid hero-content text-center text-neutral-content lg:p-20">
          {/* div that contains the header (CSV hochladen) */}
          <div className="grid justify-center">
            <div className="text-secondary">
              <h1 className="text-5xl font-bold">CSV hochladen</h1>
            </div>
          </div>
          {/* grid for component (center of the screen) */}
          <div className="grid place-items-center">
            <div className="grid gap-3 pt-6">
              {/* single daisyUI card component  */}
              <div className="card card-normal text-primary-content bg-primary">
                <div className="card-body place-items-center shadow-2xl rounded-b-lg">
                  <form method="post" enctype="multipart/form-data">
                    <div>
                      <input
                        type="file"
                        id="fileInput"
                        name="fileInput"
                        multiple
                        accept=".csv"
                        className="file-input w-full max-w-xs"
                      />
                    </div>
                    <div className="pt-5">
                      <button className="btn">
                        Hochladen
                      </button>
                    </div>
                  </form>
                </div>
              </div>
             </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
