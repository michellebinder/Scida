import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import CourseCardLecturer from "../components/courseCardLecturer";
import CourseList from "../components/courseList";
import CourseCard from "../components/courseCard";

let called = false;

export default function Home() {
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
