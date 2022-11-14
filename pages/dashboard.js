import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-background">
        {/* dashboard navbar with navigation items  */}
        <Navbar type="dashboard"></Navbar>
        {/* div that stretches from below the navbar to the bottom, scrolling "disabled" */}
        <div
          className="hero grow"
          style={{
            backgroundImage: `url("https://placeimg.com/1000/800/arch")`,
          }}
        >
          {/* hero component from daisyUI with different daisyUI card components*/}
          <div className="hero-overlay bg-opacity-60"></div>
          {/* grid for layouting welcome text and card components, already responsive */}
          <div className="grid lg:grid-cols-2 hero-content text-center text-neutral-content">
            <div>
              {" "}
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hallo Lukas!</h1>
                <p className="mb-5">
                  Dies ist dein persönliches Dashboard. Hier siehst du alle
                  relevanten Informationen auf einen Blick.
                </p>
              </div>
            </div>
            {/* grid for daisyUI card components to display useful information at a glance */}
            <div className="grid place-items-center">
              <div className="grid grid-cols-2 gap-3">
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title">Anwesenheit</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                      {/* daisy UI radial progress component */}
                      <div
                        className="radial-progress"
                        style={{ "--value": 70 }}
                      >
                        70%
                      </div>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title">Meine Kurse</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                      <button className="btn">Buy Now</button>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title">Ausdrucke</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                      <button className="btn">Buy Now</button>
                    </div>
                  </div>
                </div>
                {/* single daisyUI card component  */}
                <div className="card card-normal bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title">Hilfe</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                      <button className="btn">Buy Now</button>
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
