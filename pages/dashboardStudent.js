import Head from "next/head";
import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import { useSession } from "next-auth/react";
import Dashboard from "../components/dashboard";
import DashboardCard from "../components/dashboardCard";
import Router from "next/router";

export default function Home() {
  // /*will be changed to data returned by LDAP-login, but I have no other ways to choose a student now */

  // const stud = {
  //   stud_username: "mmuster",
  //   stud_matrikel: "5558107",
  // };
  // const [responseMessage, setResponseMessage] = useState("");

  // const searchCourse = async () => {
  //   //POSTING the credentials
  //   const response = await fetch("/api/getCourse", {
  //     //Insert API you want to call
  //     method: "POST",
  //     body: JSON.stringify({ stud }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   //Saving the RESPONSE in the responseMessage variable
  //   /* const data = await response.json(); */
  //   /* setResponseMessage(data); */
  //   /* console.log(data); */
  //   const data = await response.json();
  //   setResponseMessage(data);
  //   console.log("test:" /* + responseMessage */);
  //   /* if (data == `datareceived` ){
  //     Router.push("/courseListStudent");
  //   } */
  //   if (!data) {
  //     console.log(data);
  //     Router.push("/dashboardAdmin");
  //   } else {
  //     console.log("Something wrong");
  //   }
  // };

  //Code to secure the page
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  //Redirect user back if unauthenticated or wrong user role
  if (
    status === "unauthenticated" ||
    session.user.account_role === "Dozierende" ||
    session.user.account_role === "Sekretariat" ||
    session.user.account_role === "Studiendekanat"
  ) {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }
  if (session.user.account_role === "Studierende") {
    return (
      <Dashboard type="student" session={session}>
        <div className="grid place-items-center">
          <div className="grid sm:grid-cols-3 gap-3">
            <DashboardCard
              title="Anwesenheit"
              description="Hier findest du QR-Codes, mit denen deine Anwesenheit
                    eingetragen werden kann."
              icon="M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm0-2h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8 8h-1v-2h1v1h2v1h-1v1h-1v-1zm2 12v-1h-1v1h1zm-1-15v-1h-2v1h1v1h1v-1zm8-1v6h-1v-1h-4v-5h5zm-1 4v-3h-3v3h3zm-14 2h-1v1h2v-1h-1zm0 3h1v1h1v-3h-1v1h-2v2h1v-1zm5 1v2h1v-2h-1zm4-10h-1v3h1v-3zm0 5v-1h-1v1h1zm3-2h1v-1h-1v1zm-10-1h-1v1h1v-1zm2-2v5h-5v-5h5zm-1 1h-3v3h3v-3zm9 5v1h-1v-1h-2v1h-1v-1h-3v-1h-1v1h-1v1h1v2h1v-1h1v2h1v-2h3v1h-2v1h2v1h1v-3h1v1h1v2h1v-1h1v-1h-1v-1h-1v-1h1v-1h-2zm-11 8h1v-1h-1v1zm-2-3h5v5h-5v-5zm1 4h3v-3h-3v3zm12-3v-1h-1v1h1zm0 1h-1v1h-1v-1h-1v-1h1v-1h-2v-1h-1v2h-1v1h-1v3h1v-1h1v-1h2v2h1v-1h1v1h2v-1h1v-1h-2v-1zm-9-3h1v-1h-1v1zm10 2v1h1v1h1v-3h-1v1h-1zm2 4v-1h-1v1h1zm0-8v-1h-1v1h1z"
              url=""
            ></DashboardCard>
            <DashboardCard
              title="Meine Praktika"
              description="Alle deine Blockpraktika auf einen Blick!"
              url="/courseList"
              icon="M1.683,3.39h16.676C18.713,3.39,19,3.103,19,2.749s-0.287-0.642-0.642-0.642H1.683
                    c-0.354,0-0.641,0.287-0.641,0.642S1.328,3.39,1.683,3.39z M1.683,7.879h11.545c0.354,0,0.642-0.287,0.642-0.641
                    s-0.287-0.642-0.642-0.642H1.683c-0.354,0-0.641,0.287-0.641,0.642S1.328,7.879,1.683,7.879z M18.358,11.087H1.683
                    c-0.354,0-0.641,0.286-0.641,0.641s0.287,0.642,0.641,0.642h16.676c0.354,0,0.642-0.287,0.642-0.642S18.713,11.087,18.358,11.087z
                     M11.304,15.576H1.683c-0.354,0-0.641,0.287-0.641,0.642s0.287,0.641,0.641,0.641h9.621c0.354,0,0.642-0.286,0.642-0.641
                    S11.657,15.576,11.304,15.576z"
            ></DashboardCard>
            <DashboardCard
              title="Ausdrucke"
              icon="M17.206,5.45l0.271-0.27l-4.275-4.274l-0.27,0.269V0.9H3.263c-0.314,0-0.569,0.255-0.569,0.569v17.062
                c0,0.314,0.255,0.568,0.569,0.568h13.649c0.313,0,0.569-0.254,0.569-0.568V5.45H17.206z M12.932,2.302L16.08,5.45h-3.148V2.302z
                 M16.344,17.394c0,0.314-0.254,0.569-0.568,0.569H4.4c-0.314,0-0.568-0.255-0.568-0.569V2.606c0-0.314,0.254-0.568,0.568-0.568
                h7.394v4.55h4.55V17.394z"
              description="Drucke dir die Anwesenheitslisten für deine Praktika aus."
              url=""
            ></DashboardCard>
          </div>
        </div>
      </Dashboard>
    );
  }
}
