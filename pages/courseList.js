import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import CourseCard from "../components/courseCard";
import CourseList from "../components/courseList";
import CourseTable from "../components/courseTable";
import dateToWeekParser from "../gloabl_functions/date";
import Collapsible from "react-collapsible";
const mysql = require("mysql2");

let called = false;

export default function Home(props) {
  const [responseMessage, setResponseMessage] = useState();
  const [search, createSearch] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);
  const [heading1Visible, setHeading1Visible] = useState(false);
  const [heading11Visible, setHeading11Visible] = useState(false);
  const [heading2Visible, setHeading2Visible] = useState(false);
  const [heading3Visible, setHeading3Visible] = useState(false);
  const [heading4Visible, setHeading4Visible] = useState(false);
  const [heading5Visible, setHeading5Visible] = useState(false);

  function toggleHeading1() {
    setHeading1Visible(!heading1Visible);
  }

  function toggleHeading11() {
    setHeading11Visible(!heading11Visible);
  }

  function toggleHeading2() {
    setHeading2Visible(!heading2Visible);
  }

  function toggleHeading3() {
    setHeading3Visible(!heading3Visible);
  }

  function toggleHeading4() {
    setHeading4Visible(!heading4Visible);
  }

  function toggleHeading5() {
    setHeading5Visible(!heading5Visible);
  }

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

  //Code to secure the page
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Laden</button>
      </div>
    );
  }

  //Redirect user back if unauthenticated or wrong user role
  if (status === "unauthenticated") {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }

  //Try recieving correct user role
  var role;
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }

  if (role === "S" || role === "S") {
    return (
      <CourseList title="Meine Praktika" type="student">
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
              responseMessage.map((item) => (
                <CourseCard
                  type="student"
                  courses={item.block_name}
                  praktID={item.block_id}
                  week={dateToWeekParser(item.date_start, item.date_end)}
                  attendance={0} //item.attendance}
                  group={item.group_id}
                ></CourseCard>
              ))
            ) : (
              <>{/** TODO Ladeanimation */}</>
            )}
          </div>
        </div>
      </CourseList>
    );
  } else if (role === "B" || role === "A") {
    // TO DO (backend): get actual values from database – display ALL courses
    return (
      <CourseList title="Alle Praktika" type="admin">
        <div className="flex flex-col">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="collapsible rounded-md px-4 py-2 text-3xl text-center font-medium leading-5 text-primary hover:text-white hover:bg-secondary focus:outline-none transition duration-150 ease-in-out"
          >
            Chirurgie
          </button>

          <div
            className="content p-4 rounded-md shadow-xs text-primary"
            style={{ display: collapsed ? "none" : "block" }}
          >
            <p
              className="collapsible text-2xl text-center hover:text-white hover:bg-secondary hover:bg-opacity-50 transition duration-150 ease-in-out rounded-md"
              onClick={() => setCollapsed2(!collapsed2)}
            >
              Gruppe 1
            </p>
            <div style={{ display: collapsed2 ? "none" : "block" }}>
              <CourseTable praktID="2462" type="admin"></CourseTable>
            </div>
          </div>
        </div>
        {/* 
        <div>
          <div className="grid w-fit sm:grid-cols-2 gap-5 ">
            {responseMessage ? (
              responseMessage.map((course) => (
                <CourseCard
                  type="admin"
                  courses={course.block_name}
                  praktID={course.block_id}
                  week={dateToWeekParser(course.date_start, course.date_end)}
                ></CourseCard>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>*/}
      </CourseList>
    );
  } else if (role === "D") {
    return (
      <CourseList title="Meine Praktika" type="lecturer">
        <div>
          <div className="grid w-fit sm:grid-cols gap-5 ">
            {responseMessage ? (
              responseMessage.map((course) => {
                return (
                  <CourseCard
                    type="Lecturer"
                    courses={course.block_name}
                    praktID={course.block_id}
                  ></CourseCard>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </CourseList>
    );
  }
}
