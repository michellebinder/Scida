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

export default function Home() {
  // TODO (backend): get actual values from database
  //const urlParams = new URLSearchParams(window.location.search);
  //const courseID = urlParams.get("courseID");
  // {
  //   /* TODO: backend: fetch real courseName based on ID */
  // }
  var courseName = "";

  const router = useRouter();
  const { praktID } = router.query;

  return (
    <CourseDetail type="student" praktID={praktID} courseName={courseName}>
      <CourseTableStudent praktID={praktID}></CourseTableStudent>
    </CourseDetail>
  );
}
