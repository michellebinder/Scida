import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import CourseDetail from "../components/courseDetail";
import CourseTable from "../components/courseTable";
import { useRouter } from "next/router";
import Router from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  // TODO (backend): get actual values from database

  const router = useRouter();
  const { praktID } = router.query;
  const { selectedValue } = router.query;

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
    courseName = "Bespiel-Fachgebiet";
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
    session.user.account_role === "Sekretariat" ||
    session.user.account_role === "Studiendekanat"
  ) {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }
  if (session.user.account_role === "Dozierende") {
    return (
      <CourseDetail
        type="lecturer"
        selectedValue={selectedValue}
        courseName={courseName}
        praktID={praktID}
      >
        <CourseTable praktID={praktID} type="lecturer"></CourseTable>
      </CourseDetail>
    );
  }
}
