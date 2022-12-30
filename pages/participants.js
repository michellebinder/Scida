import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import Router from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { praktID } = router.query;

  {
    /* BACKEND: get matrikel from group and their respective attendance for that day */
  }
  const [matrikel, setAttend] = useState([
    { matr: "123456", checked: false },
    { matr: "234567", checked: false },
    { matr: "345678", checked: false },
    { matr: "456789", checked: false },
    { matr: "567890", checked: false },
  ]);

  const handleClick = (index) => {
    const updatedAttend = [...matrikel];
    updatedAttend[index].checked = !updatedAttend[index].checked;
    setAttend(updatedAttend);
  };

  const addRow = () => {
    // Add a new object to the matrikel array with default values
    const updatedMatrikel = [...matrikel, { matr: "0000", checked: false }];
    // Set the state to the updated array
    setAttend(updatedMatrikel);
  }

  const handleDelete = (index) => {
    // Remove the object at the specified index from the matrikel array
    const updatedMatrikel = [...matrikel];
    updatedMatrikel.splice(index, 1);
    // Set the state to the updated array
    setAttend(updatedMatrikel);
  }



  // TO DO (backend): get actual courseName from database based on praktID
  var courseName = "Beispiel Kurs";

  //code to secure the page
  const { data: session, status } = useSession();

  var role;

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
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }

  //Redirect user if authenticated, but wrong role
  if (role === "S") {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }

  if (role === "D") {
    return (
      <>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* Div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between bg-base-100">
          {/* Dashboard navbar with navigation items  */}
          <Navbar></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="lecturer"></Sidebar>
            <div className="hero grow">
              {/* Grid for layouting welcome text and card components, already responsive */}
              <div className="grid hero-content text-center text-neutral lg:p-10">
                <div className="text-secondary dark:text-white">
                  {/* display courseID as determined by href url */}
                  <h1 className="mb-5 text-5xl font-bold text-center">
                    {/* TODO: backend: find out and display course name not courseID */}
                    {courseName}
                  </h1>
                  <h1 className="mb-5 text-3xl font-bold text-center">
                    {/* TODO: frontend: pass chosen group number to this page and display here */}
                    Teilnehmerliste
                  </h1>
                </div>
                <div class="overflow-auto">
                  {/* display table component with attendance details for the course */}
                  <div className="grid w-fit sm:grid-cols-1 gap-5">
                    {/* TODO: backend: find out corresponding values for course and pass to courseDate */}
                    <div class="container mx-auto">
                      <div class="overflow-auto">
                        <table class="table table-normal w-full text-primary text-center dark:text-white">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Kürzel</th>
                              <th>Matrikelnr.</th>
                              <th>Anwesenheit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {matrikel.map((matr, index) => (
                              <tr class="hover">
                                <td>{index + 1}</td>
                                <td>mmuster1</td>
                                <td>{matr.matr}</td>
                                <td>
                                  <input
                                    type="checkbox"
                                    class="checkbox checkbox-primary"
                                    checked={matr.checked}
                                    onClick={() => handleClick(index)}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </>
    );
  } else if (role === "B" || role === "A") {
    return (
      <>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* Div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between bg-base-100">
          {/* Dashboard navbar with navigation items  */}
          <Navbar></Navbar>
          <div className="flex flex-row grow">
            {/* Sidebar only visible on large screens */}
            <Sidebar type="admin"></Sidebar>
            <div className="hero grow">
              {/* Grid for layouting welcome text and card components, already responsive */}
              <div className="grid hero-content text-center text-neutral lg:p-10">
                <div className="text-secondary dark:text-white">
                  {/* display courseID as determined by href url */}
                  <h1 className="mb-5 text-5xl font-bold text-center">
                    {/* TODO: backend: find out and display course name not courseID */}
                    {courseName}
                  </h1>
                  <h1 className="mb-5 text-3xl font-bold text-center">
                    {/* TODO: frontend: pass chosen group number to this page and display here */}
                    Teilnehmerliste
                  </h1>
                </div>
                <div class="overflow-auto">
                  {/* display table component with attendance details for the course */}
                  <div className="grid w-fit sm:grid-cols-1 gap-5">
                    {/* TODO: backend: find out corresponding values for course and pass to courseDate */}
                    <div class="container mx-auto">
                      <div class="overflow-auto">
                        <table class="table table-normal w-full text-primary text-center dark:text-white">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Kürzel</th>
                              <th>Matrikelnr.</th>
                              <th>Anwesenheit</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {matrikel.map((matr, index) => (
                              <tr class="hover">
                                <td>{index + 1}</td>
                                <td>mmuster1</td>
                                <td>{matr.matr}</td>
                                <td>
                                  <input
                                    type="checkbox"
                                    class="checkbox checkbox-primary"
                                    checked={matr.checked}
                                    onClick={() => handleClick(index)}
                                  />
                                </td>
                                {/* Column with "Trash"-icon for deleting rows */}
                                {/* TODO backend: Delete day from database when button is clicked */}
                                <td>
                                  <a href="#" onClick={() => handleDelete(index)}>
                                    {/* "Trash"-icon for deleting rows */}
                                    <svg
                                      class="svg-icon fill-current text-accent hover:stroke-current"
                                      viewBox="0 -9 20 27"
                                      width="30"
                                      height="40"
                                    >
                                      <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
                                    </svg>
                                    &nbsp;
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="flex flex-col">
                          {/* Button to add rows to the table */}
                          <button
                            type="button"
                            className="btn bg-secondary"
                            onClick={() => {addRow()}}
                          >
                            Neue Teilnehmende hinzufügen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </>
    );
  }
}
