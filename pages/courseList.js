import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import CourseCard from "../components/courseCard";
import CourseList from "../components/courseList";
import CourseTable from "../components/courseTable";
import Accordion from "../components/Accordion";
import dateToWeekParser from "../gloabl_functions/date";
const mysql = require("mysql2");

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

  // Code to secure the page
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Laden</button>
      </div>
    );
  }

  // Redirect user back if unauthenticated or wrong user role
  if (status === "unauthenticated") {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }

  // Try recieving correct user role
  var role;
  try {
    // Try ldap, if not existent do catch with local accounts
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
                  attendance={0} // item.attendance
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
    // TO DO (backend): get actual values from database – display ALL courses for each Praktikum
    return (
      <CourseList title="Alle Praktika" type="admin">
        <div className="gap-y-10">
          {/* Collapsible section which contains all the groups of the "Chirurgie" Praktikum */}
          {/* TODO backend: add as many Accordions as there are groups in the "Chirurgie" Praktikum */}
          <Accordion title="Chirurgie">
            <div className="pl-8 pr-8 gap-y-10">
              <Accordion title="Gruppe 1">
                <CourseTable praktID="2462" type="admin"></CourseTable>
              </Accordion>
              <Accordion title="Gruppe 2">
                <CourseTable praktID="2462" type="admin"></CourseTable>
              </Accordion>
              <Accordion title="Gruppe 3">
                <CourseTable praktID="2462" type="admin"></CourseTable>
              </Accordion>
            </div>
          </Accordion>
          {/* Collapsible section which contains all the groups of the "Innere Medizin" Praktikum */}
          {/* TODO backend: add as many Accordions as there are groups in the "Innere Medizin" Praktikum */}
          <Accordion title="Innere Medizin">
            <div className="pl-8 pr-8">
              <Accordion title="Inner accordion">
                <CourseTable praktID="2462" type="admin"></CourseTable>
              </Accordion>
            </div>
          </Accordion>
          {/* Collapsible section which contains all the groups of the "Pädiatrie" Praktikum */}
          {/* TODO backend: add as many Accordions as there are groups in the "Pädiatrie" Praktikum */}
          <Accordion title="Pädiatrie">
            <div className="pl-8 pr-8">
              <Accordion title="Inner accordion">
                <CourseTable praktID="2462" type="admin"></CourseTable>
              </Accordion>
            </div>
          </Accordion>
          {/* Collapsible section which contains all the groups of the "Gynäkologie" Praktikum */}
          {/* TODO backend: add as many Accordions as there are groups in the "Gynäkologie" Praktikum */}
          <Accordion title="Gynäkologie">
            <div className="pl-8 pr-8">
              <Accordion title="Inner accordion">
                <CourseTable praktID="2462" type="admin"></CourseTable>
              </Accordion>
            </div>
          </Accordion>
        </div>
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
