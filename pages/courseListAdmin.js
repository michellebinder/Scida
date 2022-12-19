import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import CourseCardAdmin from "../components/courseCardAdmin";
import Sidebar from "../components/sidebar";
import { useState, useEffect } from "react";
import dateToWeekParser from "../gloabl_functions/date";
import { useSession } from "next-auth/react";
import Router from "next/router";

let called = false;

export default function Home(props) {
  // TO DO (backend): get actual values from database – display ALL courses

  const [responseMessage, setResponseMessage] = useState();
  const getCourses = async () => {
    //POSTING the credentials
    const response = await fetch("/api/getCourse", {
      //Insert API you want to call
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    const res = await response.json();
    let data = JSON.parse(res);
    setResponseMessage(data);
  };
  if (!called) {
    getCourses();
    called = true;
  }

  //code to secure the page
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  //Redirect user back if unauthenticated or wrong user role
  if (
    status === "unauthenticated" ||
    session.user.account_role === "Studierende" ||
    session.user.account_role === "Dozierende"
  ) {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }
  if (
    session.user.account_role === "Sekretariat" ||
    session.user.account_role === "Studiendekanat"
  ) {
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
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="admin"></Sidebar>
            <div className="hero grow">
              {/* Grid for layouting welcome text and card components, already responsive */}
              <div className="grid hero-content text-center text-neutral-content lg:p-10">
                <div className="text-secondary dark:text-white">
                  <h1 className="mb-5 text-5xl font-bold text-center">
                    Alle Praktika
                  </h1>
                </div>
                {/* TODO: backend: display real values for each course */}
                <div>
                  <div className="grid w-fit sm:grid-cols-2 gap-5 ">
                    {responseMessage ? (
                      responseMessage.map((course) => {
                        return (
                          <CourseCardAdmin
                            courses={course.block_name}
                            praktID={course.block_id}
                            week={dateToWeekParser(
                              course.date_start,
                              course.date_end
                            )}
                          ></CourseCardAdmin>
                        );
                      })
                    ) : (
                      <>{/** TODO Ladeanimation */}</>
                    )}
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
}
