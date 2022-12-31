import Head from "next/head";
import { default as React } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Accordion from "../components/Accordion";
import CourseTable from "../components/courseTable";
import { useState } from "react";

export default function CourseDetail({
  courseName = "",
  type = "",
  blockId = 0,
  children,
  selectedValue = "",
}) {
  const [accordions, setAccordions] = useState([
    // Initialize the state with an array of accordion objects
    {
      title: "Gruppe 1",
      content: <CourseTable blockId="2462" type="admin" />,
    },
    {
      title: "Gruppe 2",
      content: <CourseTable blockId="2462" type="admin" />,
    },
  ]);

  const handleAddAccordion = () => {
    // Generate a new accordion object with a unique title
    const newAccordion = {
      title: `Gruppe ${accordions.length + 1}`,
      content: <CourseTable blockId="2462" type="admin" />,
    };

    // Append the new accordion object to the array of accordions
    setAccordions([...accordions, newAccordion]);
  };

  {
    if (type == "admin") {
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
            <div className="flex flex-row grow bg-base-100">
              {/* Sidebar only visible on large screens */}
              <Sidebar type={type}></Sidebar>
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
                      (ID: {blockId})
                    </h1>
                    <h1 className="mb-5 text-3xl font-bold text-center">
                      {/* TODO: frontend: pass chosen group number to this page and display here */}
                      {selectedValue}
                    </h1>
                  </div>
                  <div>
                    {/* display table component with attendance details for the course */}
                    {/* <div className="grid w-fit sm:grid-cols-1 gap-5">
                    {/* TODO: backend: find out corresponding values for course and pass to courseDate */}
                    {/*{children}
                  </div> */}
                  </div>
                  <div className="grid gap-y-5">
                    {/* Collapsible section which contains all the groups of the current Praktikum */}
                    {/* TODO backend: add as many Accordions as there are groups in the current Praktikum */}
                    {accordions.map((accordion) => (
                      <Accordion title={accordion.title}>
                        {accordion.content}
                      </Accordion>
                    ))}
                    {/* Button with a plus sign icon for adding a new group to a praktikum */}
                    <button
                      className="w-full bg-primary bg-opacity-20 rounded-md shadow-lg px-4 py-2 font-bold text-primary group flex items-center focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-primary transition duration-150 ease-in-out"
                      onClick={handleAddAccordion}
                    >
                      <svg
                        class="svg-icon stroke-primary mr-3"
                        viewBox="0 0 20 20"
                        width="18"
                        height="18"
                      >
                        <path
                          fill="none"
                          d="M13.388,9.624h-3.011v-3.01c0-0.208-0.168-0.377-0.376-0.377S9.624,6.405,9.624,6.613v3.01H6.613c-0.208,0-0.376,0.168-0.376,0.376s0.168,0.376,0.376,0.376h3.011v3.01c0,0.208,0.168,0.378,0.376,0.378s0.376-0.17,0.376-0.378v-3.01h3.011c0.207,0,0.377-0.168,0.377-0.376S13.595,9.624,13.388,9.624z M10,1.344c-4.781,0-8.656,3.875-8.656,8.656c0,4.781,3.875,8.656,8.656,8.656c4.781,0,8.656-3.875,8.656-8.656C18.656,5.219,14.781,1.344,10,1.344z M10,17.903c-4.365,0-7.904-3.538-7.904-7.903S5.635,2.096,10,2.096S17.903,5.635,17.903,10S14.365,17.903,10,17.903z"
                        ></path>
                      </svg>
                      Neue Gruppe hinzufügen
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Footer></Footer>
          </div>
        </>
      );
    } else {
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
            <div className="flex flex-row grow bg-base-100">
              {/* Sidebar only visible on large screens */}
              <Sidebar type={type}></Sidebar>
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
                      (ID: {blockId})
                    </h1>
                    <h1 className="mb-5 text-3xl font-bold text-center">
                      {/* TODO: frontend: pass chosen group number to this page and display here */}
                      {selectedValue}
                    </h1>
                  </div>
                  <div>
                    {/* display table component with attendance details for the course */}
                    <div className="grid w-fit sm:grid-cols-1 gap-5">
                      {/* TODO: backend: find out corresponding values for course and pass to courseDate */}
                      {children}
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
}
