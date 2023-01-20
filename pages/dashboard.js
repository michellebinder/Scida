import { useSession } from "next-auth/react";
import Router from "next/router";
import React from "react";
import Dashboard from "../components/dashboard";
import DashboardCard from "../components/dashboardCard";

export default function Home() {
  //code to secure the page
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Laden</button>
      </div>
    );
  }

  //Redirect user back if unAUTHENTICATED (logged out)
  if (status === "unauthenticated") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Ausloggen</button>
      </div>
    );
  }

  //Try recieving correct user role
  var role;
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }

  if (role === "scidaDekanat") {
    return (
      <Dashboard type="admin" session={session}>
        <div className="grid place-items-center">
          <div className="grid sm:grid-cols-2 gap-3">
            <DashboardCard
              title="Accounts verwalten"
              icon="M14.023,12.154c1.514-1.192,2.488-3.038,2.488-5.114c0-3.597-2.914-6.512-6.512-6.512
            c-3.597,0-6.512,2.916-6.512,6.512c0,2.076,0.975,3.922,2.489,5.114c-2.714,1.385-4.625,4.117-4.836,7.318h1.186
            c0.229-2.998,2.177-5.512,4.86-6.566c0.853,0.41,1.804,0.646,2.813,0.646c1.01,0,1.961-0.236,2.812-0.646
            c2.684,1.055,4.633,3.568,4.859,6.566h1.188C18.648,16.271,16.736,13.539,14.023,12.154z M10,12.367
            c-2.943,0-5.328-2.385-5.328-5.327c0-2.943,2.385-5.328,5.328-5.328c2.943,0,5.328,2.385,5.328,5.328
            C15.328,9.982,12.943,12.367,10,12.367z"
              description="Verwalten Sie hier die Accounts von Studierenden, Dozierenden und
                    Mitarbeitenden."
              url="/accounts"
            ></DashboardCard>
            {role === "scidaDekanat" && (
              <DashboardCard
                title="CSV hochladen"
                icon="M8.416,3.943l1.12-1.12v9.031c0,0.257,0.208,0.464,0.464,0.464c0.256,0,0.464-0.207,0.464-0.464V2.823l1.12,1.12c0.182,0.182,0.476,0.182,0.656,0c0.182-0.181,0.182-0.475,0-0.656l-1.744-1.745c-0.018-0.081-0.048-0.16-0.112-0.224C10.279,1.214,10.137,1.177,10,1.194c-0.137-0.017-0.279,0.02-0.384,0.125C9.551,1.384,9.518,1.465,9.499,1.548L7.76,3.288c-0.182,0.181-0.182,0.475,0,0.656C7.941,4.125,8.234,4.125,8.416,3.943z M15.569,6.286h-2.32v0.928h2.32c0.512,0,0.928,0.416,0.928,0.928v8.817c0,0.513-0.416,0.929-0.928,0.929H4.432c-0.513,0-0.928-0.416-0.928-0.929V8.142c0-0.513,0.416-0.928,0.928-0.928h2.32V6.286h-2.32c-1.025,0-1.856,0.831-1.856,1.856v8.817c0,1.025,0.832,1.856,1.856,1.856h11.138c1.024,0,1.855-0.831,1.855-1.856V8.142C17.425,7.117,16.594,6.286,15.569,6.286z"
                description="Laden Sie hier CSV-Dateien der Blockpraktika hoch. Sie
                    werden automatisch in das System eingepflegt."
                url="/csvAdmin"
              ></DashboardCard>
            )}

            <DashboardCard
              title="Praktika"
              icon="M1.683,3.39h16.676C18.713,3.39,19,3.103,19,2.749s-0.287-0.642-0.642-0.642H1.683
                    c-0.354,0-0.641,0.287-0.641,0.642S1.328,3.39,1.683,3.39z M1.683,7.879h11.545c0.354,0,0.642-0.287,0.642-0.641
                    s-0.287-0.642-0.642-0.642H1.683c-0.354,0-0.641,0.287-0.641,0.642S1.328,7.879,1.683,7.879z M18.358,11.087H1.683
                    c-0.354,0-0.641,0.286-0.641,0.641s0.287,0.642,0.641,0.642h16.676c0.354,0,0.642-0.287,0.642-0.642S18.713,11.087,18.358,11.087z
                     M11.304,15.576H1.683c-0.354,0-0.641,0.287-0.641,0.642s0.287,0.641,0.641,0.641h9.621c0.354,0,0.642-0.286,0.642-0.641
                    S11.657,15.576,11.304,15.576z"
              description="Hier finden Sie eine Übersicht aller Praktika, die
                    aktuell im System eingetragen sind."
              url="/courseList"
            ></DashboardCard>
            <DashboardCard
              title="Ausdrucke"
              icon="M17.206,5.45l0.271-0.27l-4.275-4.274l-0.27,0.269V0.9H3.263c-0.314,0-0.569,0.255-0.569,0.569v17.062
								c0,0.314,0.255,0.568,0.569,0.568h13.649c0.313,0,0.569-0.254,0.569-0.568V5.45H17.206z M12.932,2.302L16.08,5.45h-3.148V2.302z
								 M16.344,17.394c0,0.314-0.254,0.569-0.568,0.569H4.4c-0.314,0-0.568-0.255-0.568-0.569V2.606c0-0.314,0.254-0.568,0.568-0.568
								h7.394v4.55h4.55V17.394z"
              description="Laden Sie sich hier Anwesenheitslisten herunter."
              url="/downloadPDF"
            ></DashboardCard>
          </div>
        </div>
      </Dashboard>
    );
  }
  if (role === "scidaSekretariat") {
    return (
      <Dashboard type="admin" session={session}>
        <div className="grid place-items-center">
          <div className="grid sm:grid-cols-2 gap-3">
            <DashboardCard
              title="Accounts verwalten"
              icon="M14.023,12.154c1.514-1.192,2.488-3.038,2.488-5.114c0-3.597-2.914-6.512-6.512-6.512
            c-3.597,0-6.512,2.916-6.512,6.512c0,2.076,0.975,3.922,2.489,5.114c-2.714,1.385-4.625,4.117-4.836,7.318h1.186
            c0.229-2.998,2.177-5.512,4.86-6.566c0.853,0.41,1.804,0.646,2.813,0.646c1.01,0,1.961-0.236,2.812-0.646
            c2.684,1.055,4.633,3.568,4.859,6.566h1.188C18.648,16.271,16.736,13.539,14.023,12.154z M10,12.367
            c-2.943,0-5.328-2.385-5.328-5.327c0-2.943,2.385-5.328,5.328-5.328c2.943,0,5.328,2.385,5.328,5.328
            C15.328,9.982,12.943,12.367,10,12.367z"
              description="Verwalten Sie hier die Accounts von Studierenden, Dozierenden und
                    Mitarbeitenden."
              url="/accounts"
            ></DashboardCard>
            <DashboardCard
              title="Praktika"
              icon="M1.683,3.39h16.676C18.713,3.39,19,3.103,19,2.749s-0.287-0.642-0.642-0.642H1.683
                    c-0.354,0-0.641,0.287-0.641,0.642S1.328,3.39,1.683,3.39z M1.683,7.879h11.545c0.354,0,0.642-0.287,0.642-0.641
                    s-0.287-0.642-0.642-0.642H1.683c-0.354,0-0.641,0.287-0.641,0.642S1.328,7.879,1.683,7.879z M18.358,11.087H1.683
                    c-0.354,0-0.641,0.286-0.641,0.641s0.287,0.642,0.641,0.642h16.676c0.354,0,0.642-0.287,0.642-0.642S18.713,11.087,18.358,11.087z
                     M11.304,15.576H1.683c-0.354,0-0.641,0.287-0.641,0.642s0.287,0.641,0.641,0.641h9.621c0.354,0,0.642-0.286,0.642-0.641
                    S11.657,15.576,11.304,15.576z"
              description="Hier finden Sie eine Übersicht aller Praktika, die
                    aktuell im System eingetragen sind."
              url="/courseList"
            ></DashboardCard>
            <DashboardCard
              title="Ausdrucke"
              icon="M17.206,5.45l0.271-0.27l-4.275-4.274l-0.27,0.269V0.9H3.263c-0.314,0-0.569,0.255-0.569,0.569v17.062
								c0,0.314,0.255,0.568,0.569,0.568h13.649c0.313,0,0.569-0.254,0.569-0.568V5.45H17.206z M12.932,2.302L16.08,5.45h-3.148V2.302z
								 M16.344,17.394c0,0.314-0.254,0.569-0.568,0.569H4.4c-0.314,0-0.568-0.255-0.568-0.569V2.606c0-0.314,0.254-0.568,0.568-0.568
								h7.394v4.55h4.55V17.394z"
              description="Laden Sie sich hier Anwesenheitslisten herunter."
              url="/downloadPDF"
            ></DashboardCard>
            <DashboardCard
              title="Passwort zurücksetzen"
              icon="M7.62095 6.20695C8.81127 5.25458 10.2564 4.5 11.9998 4.5C16.1419 4.5 19.4998 7.85786 19.4998 12C19.4998 16.1421 16.1419 19.5 11.9998 19.5C8.74488 19.5 5.97175 17.4254 4.93515 14.5256C4.74925 14.0055 4.22477 13.6568 3.68448 13.7713L2.70621 13.9787C2.16592 14.0932 1.81614 14.6262 1.98184 15.1531C3.32107 19.4112 7.2982 22.5 11.9998 22.5C17.7987 22.5 22.4998 17.799 22.4998 12C22.4998 6.20101 17.7987 1.5 11.9998 1.5C9.21627 1.5 7.04815 2.76845 5.48857 4.07458L3.70689 2.29289C3.42089 2.00689 2.99077 1.92134 2.6171 2.07612C2.24342 2.2309 1.99978 2.59554 1.99978 3V8.5C1.99978 9.05228 2.4475 9.5 2.99978 9.5H8.49978C8.90424 9.5 9.26888 9.25636 9.42366 8.88268C9.57844 8.50901 9.49289 8.07889 9.20689 7.79289L7.62095 6.20695Z"
              description="Bitte ändern Sie hier das für Sie generierte Passwort."
              url="/resetPassword"
            ></DashboardCard>
          </div>
        </div>
      </Dashboard>
    );
  } else if (role === "B") {
    return (
      <Dashboard type="lecturer" session={session}>
        <div className="grid place-items-center">
          <div className="grid sm:grid-cols-1 gap-3">
            <DashboardCard
              title="Praktika"
              icon="M1.683,3.39h16.676C18.713,3.39,19,3.103,19,2.749s-0.287-0.642-0.642-0.642H1.683
                    c-0.354,0-0.641,0.287-0.641,0.642S1.328,3.39,1.683,3.39z M1.683,7.879h11.545c0.354,0,0.642-0.287,0.642-0.641
                    s-0.287-0.642-0.642-0.642H1.683c-0.354,0-0.641,0.287-0.641,0.642S1.328,7.879,1.683,7.879z M18.358,11.087H1.683
                    c-0.354,0-0.641,0.286-0.641,0.641s0.287,0.642,0.641,0.642h16.676c0.354,0,0.642-0.287,0.642-0.642S18.713,11.087,18.358,11.087z
                     M11.304,15.576H1.683c-0.354,0-0.641,0.287-0.641,0.642s0.287,0.641,0.641,0.641h9.621c0.354,0,0.642-0.286,0.642-0.641
                    S11.657,15.576,11.304,15.576z"
              url="/courseList"
              description="Hier finden Sie eine Übersicht über alle Ihre
                    Blockpraktika. "
            ></DashboardCard>
            {/* <DashboardCard
              title="Ausdrucke"
              icon="M17.206,5.45l0.271-0.27l-4.275-4.274l-0.27,0.269V0.9H3.263c-0.314,0-0.569,0.255-0.569,0.569v17.062
								c0,0.314,0.255,0.568,0.569,0.568h13.649c0.313,0,0.569-0.254,0.569-0.568V5.45H17.206z M12.932,2.302L16.08,5.45h-3.148V2.302z
								 M16.344,17.394c0,0.314-0.254,0.569-0.568,0.569H4.4c-0.314,0-0.568-0.255-0.568-0.569V2.606c0-0.314,0.254-0.568,0.568-0.568
								h7.394v4.55h4.55V17.394z"
              description="Laden Sie sich hier Anwesenheitslisten herunter."
              url=""
            ></DashboardCard> */}
            <DashboardCard
              title="Passwort zurücksetzen"
              icon="M7.62095 6.20695C8.81127 5.25458 10.2564 4.5 11.9998 4.5C16.1419 4.5 19.4998 7.85786 19.4998 12C19.4998 16.1421 16.1419 19.5 11.9998 19.5C8.74488 19.5 5.97175 17.4254 4.93515 14.5256C4.74925 14.0055 4.22477 13.6568 3.68448 13.7713L2.70621 13.9787C2.16592 14.0932 1.81614 14.6262 1.98184 15.1531C3.32107 19.4112 7.2982 22.5 11.9998 22.5C17.7987 22.5 22.4998 17.799 22.4998 12C22.4998 6.20101 17.7987 1.5 11.9998 1.5C9.21627 1.5 7.04815 2.76845 5.48857 4.07458L3.70689 2.29289C3.42089 2.00689 2.99077 1.92134 2.6171 2.07612C2.24342 2.2309 1.99978 2.59554 1.99978 3V8.5C1.99978 9.05228 2.4475 9.5 2.99978 9.5H8.49978C8.90424 9.5 9.26888 9.25636 9.42366 8.88268C9.57844 8.50901 9.49289 8.07889 9.20689 7.79289L7.62095 6.20695Z"
              description="Bitte ändern Sie hier das für Sie generierte Passwort."
              url="/resetPassword"
            ></DashboardCard>
          </div>
        </div>
      </Dashboard>
    );
  } else if (role === "S" || role === "S") {
    return (
      <Dashboard type="student" session={session}>
        <div className="grid place-items-center">
          <div className="grid sm:grid-cols-2 gap-3">
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
              url="/downloadPDF"
            ></DashboardCard>
          </div>
        </div>
      </Dashboard>
    );
  }
}
