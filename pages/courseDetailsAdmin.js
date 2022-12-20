import { useRouter } from "next/router";
import React from "react";
import CourseTable from "../components/courseTable";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function Home() {
  const router = useRouter();
  const { praktID } = router.query;
  const { selectedValue } = router.query;

  {
    /* TODO: backend: fetch real courseName based on ID */
  }
  var courseName = "";
  if (praktID == "1220") {
    courseName = "Innere Medizin";
  } else if (praktID == "0921") {
    courseName = "Chirurgie";
  } else if (praktID == "2462") {
    courseName = "Gynäkologie und Geburtshilfe";
  } else if (praktID == "3551") {
    courseName = "Pädiatrie";
  } else {
    courseName = "Kursname = Error";
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
      <CourseDetail
        type="admin"
        courseName={courseName}
        praktID={praktID}
        selectedValue={selectedValue}
      >
        <CourseTable praktID={praktID} type="admin"></CourseTable>
      </CourseDetail>
    );
  }
}
