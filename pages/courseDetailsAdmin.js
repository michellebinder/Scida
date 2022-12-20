import { useRouter } from "next/router";
import React from "react";
import CourseTable from "../components/courseTable";

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
