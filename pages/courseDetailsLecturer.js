import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import CourseTable from "../components/courseTable";
import { useRouter } from "next/router";

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
