import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";
import CourseCard from "../components/courseCard";
import CourseList from "../components/courseList";
import dateToWeekParser from "../gloabl_functions/date";
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

  //Code to secure the page
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  //Redirect user back if unauthenticated or wrong user role
  if (status === "unauthenticated") {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }
  if (
    session.user.account_role === "Studierende" ||
    session.user.attributes.UniColognePersonStatus === "S"
  ) {
    return (
      <CourseList title="Meine Praktika" type="student">
        <div>
          <div className="grid w-fit sm:grid-cols-2 gap-5">
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
  } else if (
    session.user.account_role === "Sekretariat" ||
    session.user.account_role === "Studiendekanat"
  ) {
    // TO DO (backend): get actual values from database – display ALL courses
    return (
      <CourseList title="Alle Praktika" type="admin">
        {" "}
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
        </div>
      </CourseList>
    );
  } else if (session.user.account_role === "Dozierende") {
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
