import React, { useState } from "react";
import Link from "next/link";
import CourseCard from "../components/courseCard";
import CourseList from "../components/courseList";
import dateToWeekParser from "../gloabl_functions/date";
import { useSession } from "next-auth/react";
import Router from "next/router";

let called = false;

export default function Home(props) {
  const [responseMessage, setResponseMessage] = useState();
  const [search, createSearch] = useState("");
  
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

  const searchStudent = async () => {
    // //POSTING the credentials
    // const response = await fetch("/api/getAccounts", {
    //   //Insert API you want to call
    //   method: "POST",
    //   body: JSON.stringify({ search }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // //Saving the RESPONSE in the responseMessage variable
    // const data = await response.json();
    // setResponseMessage(data);
  };

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
    // TO DO (backend): get actual values from database – display ALL courses
    return (
      <CourseList title="Alle Praktika" type="admin">
        {" "}
        <div>
            {/* Input field: search */}
            <Link href={"/courseListStudent"}>
              {/* To change: call "searchStudent()" on click instead of automatically forwarding to next page */}
              <div className="input-group pb-5">
                <input
                  onChange={(e) => createSearch(e.target.value)}
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Suche Matrikelnummer..."
                  className="input input-bordered text-neutral"
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-28"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </Link>
          <div className="grid w-fit sm:grid-cols-2 gap-5 ">
            {responseMessage ? (
              responseMessage.map((course) => {
                <CourseCard
                  type="admin"
                  courses={course.block_name}
                  praktID={course.block_id}
                  week={dateToWeekParser(course.date_start, course.date_end)}
                ></CourseCard>;
              })
            ) : (
              <>{/** TODO Ladeanimation */}</>
            )}
          </div>
        </div>
      </CourseList>
    );
  }
}
