import Head from "next/head";
import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* navbar of type student*/}
        <Navbar type="student"></Navbar>
        {/* div that stretches from below the navbar to the bottom, scrolling "disabled" */}
        {/* hero component from daisyUI with different daisyUI card components*/}
        <div className="hero grow">
          {/* grid for layouting welcome text and card components, already responsive */}
          <div className="grid hero-content text-center text-neutral-content lg:p-20">
            <div className="grid justify-center">
              <div className="text-secondary">
                <h1 className="mb-5 text-5xl font-bold">Hallo Lukas!</h1>
                <p className="mb-5 text-center">
                  Dies ist dein persönliches Dashboard. Hier siehst du alle
                  relevanten Informationen auf einen Blick.
                </p>
              </div>
            </div>
            {/* grid for daisyUI card components to display useful information at a glance */}
            <div className="grid place-items-center">
              <div className="grid sm:grid-cols-3 gap-3">
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  {/* TODO: Add correct Link when page availabe */}
                  <Link href="">
                    <div className="card-body">
                      <div className="flex justify-between">
                        <h2 className="card-title text-white">Anwesenheit</h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm0-2h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8 8h-1v-2h1v1h2v1h-1v1h-1v-1zm2 12v-1h-1v1h1zm-1-15v-1h-2v1h1v1h1v-1zm8-1v6h-1v-1h-4v-5h5zm-1 4v-3h-3v3h3zm-14 2h-1v1h2v-1h-1zm0 3h1v1h1v-3h-1v1h-2v2h1v-1zm5 1v2h1v-2h-1zm4-10h-1v3h1v-3zm0 5v-1h-1v1h1zm3-2h1v-1h-1v1zm-10-1h-1v1h1v-1zm2-2v5h-5v-5h5zm-1 1h-3v3h3v-3zm9 5v1h-1v-1h-2v1h-1v-1h-3v-1h-1v1h-1v1h1v2h1v-1h1v2h1v-2h3v1h-2v1h2v1h1v-3h1v1h1v2h1v-1h1v-1h-1v-1h-1v-1h1v-1h-2zm-11 8h1v-1h-1v1zm-2-3h5v5h-5v-5zm1 4h3v-3h-3v3zm12-3v-1h-1v1h1zm0 1h-1v1h-1v-1h-1v-1h1v-1h-2v-1h-1v2h-1v1h-1v3h1v-1h1v-1h2v2h1v-1h1v1h2v-1h1v-1h-2v-1zm-9-3h1v-1h-1v1zm10 2v1h1v1h1v-3h-1v1h-1zm2 4v-1h-1v1h1zm0-8v-1h-1v1h1z" />
                        </svg>
                      </div>
                      <p className="text-left pb-16">
                        Hier findest du QR-Codes, mit denen deine Anwesenheit
                        eingetragen werden kann.
                      </p>
                      {/* <div className="card-actions justify-end">
                      <button className="btn">Öffnen</button>
                    </div> */}
                    </div>
                  </Link>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <Link href="/courseList">
                    <div className="card-body">
                      <div className="flex justify-between">
                        <h2 className="card-title text-white">
                          Meine Praktika
                        </h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 21 21"
                          stroke="white"
                        >
                          <path
                            fill="none"
                            d="M1.683,3.39h16.676C18.713,3.39,19,3.103,19,2.749s-0.287-0.642-0.642-0.642H1.683
                    c-0.354,0-0.641,0.287-0.641,0.642S1.328,3.39,1.683,3.39z M1.683,7.879h11.545c0.354,0,0.642-0.287,0.642-0.641
                    s-0.287-0.642-0.642-0.642H1.683c-0.354,0-0.641,0.287-0.641,0.642S1.328,7.879,1.683,7.879z M18.358,11.087H1.683
                    c-0.354,0-0.641,0.286-0.641,0.641s0.287,0.642,0.641,0.642h16.676c0.354,0,0.642-0.287,0.642-0.642S18.713,11.087,18.358,11.087z
                     M11.304,15.576H1.683c-0.354,0-0.641,0.287-0.641,0.642s0.287,0.641,0.641,0.641h9.621c0.354,0,0.642-0.286,0.642-0.641
                    S11.657,15.576,11.304,15.576z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-left pb-16">
                        Alle deine Blockpraktika auf einen Blick!
                      </p>
                      {/* <div className="card-actions justify-end">
                        <button className="btn">Öffnen</button>
                      </div> */}
                    </div>
                  </Link>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  {/* TODO: Add correct Link when page availabe */}
                  <Link href="">
                    <div className="card-body">
                      <div className="flex justify-between">
                        <h2 className="card-title text-white">Ausdrucke</h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                        >
                          <path
                            fill="none"
                            d="M17.206,5.45l0.271-0.27l-4.275-4.274l-0.27,0.269V0.9H3.263c-0.314,0-0.569,0.255-0.569,0.569v17.062
								c0,0.314,0.255,0.568,0.569,0.568h13.649c0.313,0,0.569-0.254,0.569-0.568V5.45H17.206z M12.932,2.302L16.08,5.45h-3.148V2.302z
								 M16.344,17.394c0,0.314-0.254,0.569-0.568,0.569H4.4c-0.314,0-0.568-0.255-0.568-0.569V2.606c0-0.314,0.254-0.568,0.568-0.568
								h7.394v4.55h4.55V17.394z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-left">
                        Drucke dir die Anwesenheitslisten für deine Praktika
                        aus.
                      </p>
                      {/* <div className="card-actions justify-end">
                      <button className="btn">Öffnen</button>
                    </div> */}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
