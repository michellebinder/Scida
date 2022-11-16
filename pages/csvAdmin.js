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
      <div className="flex flex-col justify-between">
        {/* dashboard navbar with navigation items  */}
        <NavbarAdmin></NavbarAdmin>
      </div>
      {/* single daisyUI card component  */}
      <div className="hero grow bg-base-100">
        {/* grid for layouting welcome text and card components, already responsive */}
        <div className="grid hero-content text-center text-neutral-content lg:p-20">
          <div className="grid justify-center">
            <div className="text-secondary">
              <h1 className="text-5xl font-bold">CSV hochladen</h1>
            </div>
          </div>
          {/* grid for daisyUI card components to display useful information at a glance */}
          <div className="grid place-items-center">
            <div className="grid gap-3 pt-6">
              {/* single daisyUI card component  */}
              <div className="card card-normal text-primary-content">
                <div className="card-body place-items-center shadow-2xl rounded-b-lg">
                  <form method="post" enctype="multipart/form-data">
                    <div>
                      <input
                        type="file"
                        id="fileInput"
                        name="fileInput"
                        multiple
                        accept=".csv"
                        className="file-input file-input-outline file-input-secondary w-full max-w-xs"
                      />
                    </div>
                    <div className="pt-5">
                      <button className="btn btn-outline btn-secondary">
                        Hochladen
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="table table-compact table-active w-full text-neutral border-black">
                  <thead>
                    <tr className="hover:table-secondary">
                      <th>Datei</th>
                      <th>Datum</th>
                      <th>Größe</th>
                      <th>Herunterladen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Littel, Schaden and Vandervort</td>
                      <td>Download</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
