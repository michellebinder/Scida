import React, { useState } from "react";
import dateToWeekParser from "../gloabl_functions/date";
import { useSession } from "next-auth/react";
import Router from "next/router";
import CourseList from "../components/courseList";
import CourseCard from "../components/courseCard";
import CourseDetail from "../components/courseDetail";

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
  }
}
