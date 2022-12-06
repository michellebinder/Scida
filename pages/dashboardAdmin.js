import Head from "next/head";
import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* div that stretches from the very top to the very bottom, h-screen streches the div to the size of the viewport(!) */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* navbar of type admin*/}
        <Navbar type="admin"></Navbar>
        <div className="flex flex-row grow">
          {/* Sidebar only visible on large screens */}
          <Sidebar type="admin"></Sidebar>
          {/* hero component from daisyUI with different daisyUI card components*/}
          {/* important that the hero is set to grow to disable scrolling! */}
          <div className="hero grow">
            {/* grid for layouting welcome text and card components, already responsive */}
            <div className="grid hero-content text-center text-neutral-content lg:p-10">
              <div className="grid justify-center">
                <div className="text-secondary">
                  <h1 className="mb-5 text-5xl font-bold">Hallo Philipp!</h1>
                  <p className="mb-5 ">
                    Dies ist dein persönliches Dashboard. Hier siehst du alle
                    relevanten Informationen auf einen Blick.
                  </p>
                </div>
              </div>
              {/* grid for daisyUI card components to display useful information at a glance */}
              <div className="grid place-items-center">
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* single daisyUI card component  */}
                  <div className="card card-normal bg-primary text-primary-content">
                    <div className="card-body">
                      <div className="flex justify-between">
                        <h2 className="card-title text-white text-left">
                          Accounts verwalten
                        </h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                        >
                          <path
                            fill="none"
                            d="M14.023,12.154c1.514-1.192,2.488-3.038,2.488-5.114c0-3.597-2.914-6.512-6.512-6.512
								c-3.597,0-6.512,2.916-6.512,6.512c0,2.076,0.975,3.922,2.489,5.114c-2.714,1.385-4.625,4.117-4.836,7.318h1.186
								c0.229-2.998,2.177-5.512,4.86-6.566c0.853,0.41,1.804,0.646,2.813,0.646c1.01,0,1.961-0.236,2.812-0.646
								c2.684,1.055,4.633,3.568,4.859,6.566h1.188C18.648,16.271,16.736,13.539,14.023,12.154z M10,12.367
								c-2.943,0-5.328-2.385-5.328-5.327c0-2.943,2.385-5.328,5.328-5.328c2.943,0,5.328,2.385,5.328,5.328
								C15.328,9.982,12.943,12.367,10,12.367z"
                          ></path>
                        </svg>
                      </div>

                      <p className="text-left">
                        Verwalte hier die Accounts von Studierenden, Dozierenden
                        und Mitarbeitenden.
                      </p>
                      <div className="card-actions justify-end">
                        {/* single daisyUI card component 
                      <Link href="/accountsSekretariat"> */}
                        <Link href="/accountsDekanat">
                          <button className="btn">Öffnen</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* single daisyUI card component  */}
                  <div className="card card-normal bg-primary text-primary-content">
                    <div className="card-body">
                      <div className="flex justify-between">
                        <h2 className="card-title text-white">CSV hochladen</h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                        >
                          <path
                            fill="none"
                            d="M8.416,3.943l1.12-1.12v9.031c0,0.257,0.208,0.464,0.464,0.464c0.256,0,0.464-0.207,0.464-0.464V2.823l1.12,1.12c0.182,0.182,0.476,0.182,0.656,0c0.182-0.181,0.182-0.475,0-0.656l-1.744-1.745c-0.018-0.081-0.048-0.16-0.112-0.224C10.279,1.214,10.137,1.177,10,1.194c-0.137-0.017-0.279,0.02-0.384,0.125C9.551,1.384,9.518,1.465,9.499,1.548L7.76,3.288c-0.182,0.181-0.182,0.475,0,0.656C7.941,4.125,8.234,4.125,8.416,3.943z M15.569,6.286h-2.32v0.928h2.32c0.512,0,0.928,0.416,0.928,0.928v8.817c0,0.513-0.416,0.929-0.928,0.929H4.432c-0.513,0-0.928-0.416-0.928-0.929V8.142c0-0.513,0.416-0.928,0.928-0.928h2.32V6.286h-2.32c-1.025,0-1.856,0.831-1.856,1.856v8.817c0,1.025,0.832,1.856,1.856,1.856h11.138c1.024,0,1.855-0.831,1.855-1.856V8.142C17.425,7.117,16.594,6.286,15.569,6.286z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-left">
                        Lade hier CSV-Dateien der Blockpraktika hoch. Sie werden
                        automatisch in das System eingepflegt.
                      </p>
                      <div className="card-actions justify-end">
                        <Link href="/csvAdmin">
                          <button className="btn">Öffnen</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* single daisyUI card component  */}
                  <div className="card card-normal bg-primary text-primary-content">
                    <div className="card-body">
                      <div className="flex justify-between">
                        <h2 className="card-title text-white">Praktika</h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-9 w-9"
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
                      <p className="text-left">
                        Hier findest du eine Übersicht aller Praktika, die
                        aktuell im System eingetragen sind.
                      </p>
                      <div className="card-actions justify-end">
                        <button className="btn">Öffnen</button>
                      </div>
                    </div>
                  </div>
                  {/* single daisyUI card component  */}
                  <div className="card card-normal bg-primary text-primary-content">
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
                        Lade dir hier Anwesenheitslisten herunter.
                      </p>
                      <div className="card-actions justify-end">
                        <button className="btn">Öffnen</button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="w-full"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
