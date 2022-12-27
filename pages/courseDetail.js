import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { default as React, default as React } from "react";
import CourseDetail from "../components/courseDetail";
import CourseTable from "../components/courseTable";

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
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Laden</button>
      </div>
    );
  }
  //Redirect user back if unauthenticated or wrong user role
  if (status === "unauthenticated") {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }

  //Try recieving correct user role
  var role;
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }

  if (role === "D") {
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
  } else if (role === "S") {
    return (
      <CourseDetail type="student" praktID={praktID} courseName={courseName}>
        <CourseTable praktID={praktID} type="student"></CourseTable>
      </CourseDetail>
    );
  } else if (role === "B" || role === "A") {
    return (
      <CourseDetail
        type="admin"
        praktID={praktID}
        courseName={courseName}
        selectedValue={selectedValue}
      >
        <CourseTable praktID={praktID} type="admin"></CourseTable>
      </CourseDetail>
    );
  }
}
