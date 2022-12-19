import React, { useState } from "react";
import CourseCardAdmin from "../components/courseCardAdmin";
import CourseList from "../components/courseList";
import dateToWeekParser from "../gloabl_functions/date";

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
  // TO DO (backend): get actual values from database – display ALL courses
  return (
    <CourseList title="Alle Praktika" type="admin">
      {" "}
      <div>
        <div className="grid w-fit sm:grid-cols-2 gap-5 ">
          {responseMessage ? (
            responseMessage.map((course) => {
              <CourseCardAdmin
                courses={course.block_name}
                praktID={course.block_id}
                week={dateToWeekParser(course.date_start, course.date_end)}
              ></CourseCardAdmin>;
            })
          ) : (
            <>{/** TODO Ladeanimation */}</>
          )}
        </div>
      </div>
    </CourseList>
  );
}
