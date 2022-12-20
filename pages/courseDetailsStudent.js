import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import CourseTableStudent from "../components/courseTableStudent";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CourseDetail from "../components/courseDetail";
import CourseTable from "../components/courseTable";
import { useRouter } from "next/router";

export default function Home() {
  // TODO (backend): get actual values from database
  const router = useRouter();
  const { praktID } = router.query;

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
    courseName = "Error";
  }

  return (
    <CourseDetail type="student" praktID={praktID} courseName={courseName}>
      <CourseTable praktID={praktID} type="student"></CourseTable>
    </CourseDetail>
  );
}
