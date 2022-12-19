import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import CourseCardStudent from "../components/courseCardStudent";
import Sidebar from "../components/sidebar";
import { useState, useEffect } from "react";
import { sendError } from "next/dist/server/api-utils";
import dateToWeekParser from "../gloabl_functions/date";
import CourseList from "../components/courseList";
const mysql = require("mysql");

let called = false;

export default function Home(props) {
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

  return (
    <CourseList title="Meine Praktika" type="student">
      <div>
        <div className="grid w-fit sm:grid-cols-2 gap-5">
          {responseMessage ? (
            responseMessage.map((item) => (
              <CourseCardStudent
                courses={item.block_name}
                praktID={item.block_id}
                week={dateToWeekParser(item.date_start, item.date_end)}
                attendance={0} //item.attendance}
                group={item.group_id}
              ></CourseCardStudent>
            ))
          ) : (
            <>{/** TODO Ladeanimation */}</>
          )}
        </div>
      </div>
    </CourseList>
  );
}
