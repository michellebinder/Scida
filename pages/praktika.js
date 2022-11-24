import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";

export default function Home() {
    return (
    <div>
        <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* Div that stretches from the very top to the very bottom */}
      <div className="flex flex-col h-screen justify-between bg-base-100">
        {/* Dashboard navbar with navigation items  */}
        <Navbar></Navbar>
        <div className="hero grow">
          {/* Grid for layouting welcome text and card components, already responsive */}
          <div className="grid hero-content text-center text-neutral-content lg:p-20">
            <div className="text-secondary">
              <h1 className="mb-5 text-5xl font-bold text-center">
                Meine Praktika
              </h1>
              </div>
              {/* Div which contains the table displaying all courses */}
              {/* TODO: backend: display real values for each course */}
              <div className="overflow-x-auto pt-10">
                <table className="table w-full ">
                  {/* Head */}
                  <thead>
                    <tr>
                      <th>Pr-ID</th>
                      <th>Praktikum</th>
                      <th>Woche</th>
                      {/* TODO: Add functionality to show percentage of attendance */}
                      <th>Anwesenheit</th>
                      <th>Gruppe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="hover">
                      <th></th>
                      <td>Blockpraktikum Innere Medizin</td>
                      <td>19.10.22-24.10.22</td>
                      <td>20%</td>
                      <td>12</td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover">
                        <th></th>
                      <td>Blockpraktikum Innere Chirurgie</td>
                      <td>12.10.22-16.10.22</td>
                      <td>50%</td>
                      <td>12</td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover">
                        <th></th>
                      <td>Blockpraktiktum Gynäkologie</td>
                      <td>27.10.22-31.10.22</td>
                      <td>5%</td>
                      <td>12</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
);
}
