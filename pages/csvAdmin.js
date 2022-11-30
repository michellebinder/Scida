import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  //Code snippets for csv api taken from https://codesandbox.io/s/thyb0?file=/pages/api/file.js and adapted for this usecase and node/fs/formidable version
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  //Function to upload selected file to local client, i.e. to display selected file in UI
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  //Function to (finally) upload an submit file to api
  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });
  };
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* dashboard navbar with navigation items */}
        <Navbar type="admin"></Navbar>
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
                    <div>
                      <input
                        type="file"
                        id="fileInput"
                        name="fileInput"
                        multiple
                        accept=".csv"
                        onChange={uploadToClient}
                        className="file-input w-full max-w-xs"
                      />
                      <div className="pt-5">
                        <button
                          type="submit"
                          onClick={uploadToServer}
                          className="btn"
                        >
                          Hochladen
                        </button>
                      </div>
                    </div>
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
