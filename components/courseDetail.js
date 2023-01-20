import Head from "next/head";
import { default as React, useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Accordion from "../components/Accordion";
import CourseTable from "../components/courseTable";
import { useState } from "react";
import { remove_duplicates } from "../gloabl_functions/array";
import { useRouter } from "next/router";

export default function CourseDetail({
  courseName = "",
  type = "",
  blockId = 0,
  data,
  children,
  groupId = "",
}) {
  {
    if (type == "admin") {
      let res = [];
      let groups = [];
      data.map((row) => {
        groups.push(row.group_id);
      });
      groups = remove_duplicates(groups);
      groups.map((row) => {
        res.push({
          title: row,
          content: (
            <CourseTable
              group_id={row}
              blockId={blockId}
              blockName={courseName} //All Data is fetched only for one block -> index doesnt matter for block_name
              data={data.filter((item) => item.group_id == row)}
              type="admin"
            ></CourseTable>
          ),
        });
      });

      //Router for reload
      const router = useRouter();

      const [accordions, setAccordions] = useState(res);
      useEffect(() => {}, [accordions]);

      const handleUpdateGroup = async (data) => {
        let index = data.split(";")[0];
        let newGroupId = data.split(";")[1];
        const oldGroupId = groups[index];
        groups[index] = newGroupId;
        const response = await fetch("/api/updateGroup", {
          //Insert API you want to call
          method: "POST",
          body: JSON.stringify({
            blockId,
            newGroupId,
            oldGroupId,
            courseName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        //Saving the RESPONSE in the responseMessage variable
        router.reload();
      };

      const handleAddAccordion = () => {
        let maxGroup = Math.max(...groups);
        let newGroup = maxGroup + 1;
        if (newGroup < 10) {
          newGroup = "0" + newGroup;
        }
        groups.push(newGroup);
        let emptyRow = {
          block_name: courseName,
          block_id: blockId,
          semester: null, //TODO
          lecturer_id: null,
          group_id: groups[groups.length - 1],
          sess_end_time: "2023-01-01T00:00:00.000Z", //Insted of UNDEFINED - to prevent time select bug
          sess_id: 1,
          sess_start_time: "2023-01-01T00:00:00.000Z", //Insted of UNDEFINED - to prevent time select bug
          sess_type: null,
        };
        data.push(emptyRow);
        setAccordions([
          ...accordions,
          {
            disableGroupIdInput: true, //New groups will have a disabled group id input field because the user has to insert and save sessions first!
            title: `${newGroup}`,
            content: (
              <CourseTable
                group_id={emptyRow.group_id}
                blockId={blockId}
                blockName={courseName} //All Data is fetched only for one block -> index doesnt matter for block_name
                data={data.filter(
                  (item) => item.group_id == groups[groups.length - 1]
                )}
                type="admin"
              ></CourseTable>
            ),
          },
        ]);
      };

      const handleDeleteAccordion = async (index) => {
        const groupId = groups[index];
        const response = await fetch("/api/deleteGroup", {
          //Insert API you want to call
          method: "POST",
          body: JSON.stringify({
            blockId,
            groupId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        //Saving the RESPONSE in the responseMessage variable
        const data = await response.json();
        groups.splice(index, 1);
        res.splice(index, 1); // Remove the accordion at the given index from the accordions array
        setAccordions(accordions.filter((_, i) => i !== index));
        router.reload();
      };

      return (
        <>
          <Head>
            <title>Scida</title>
            <meta charSet="utf-8" />
          </Head>
          {/* Div that stretches from the very top to the very bottom */}
          <div className="flex flex-col h-screen justify-between w-fit lg:w-screen">
            {/* Dashboard navbar with navigation items  */}
            <Navbar type={type}></Navbar>
            <div className="flex flex-row grow bg-base-100">
              {/* Sidebar only visible on large screens */}
              <Sidebar type={type}></Sidebar>
              <div className="hero grow bg-base-100">
                {/* Grid for layouting welcome text and card components, already responsive */}
                <div className="grid hero-content text-center text-neutral lg:p-10 bg-base-100">
                  <div className="text-secondary dark:text-white">
                    {/* display courseID as determined by href url */}
                    <h1 className="mb-5 text-5xl font-bold text-center">
                      {courseName}
                    </h1>
                    <div>
                      Hier finden Sie alle Informationen zu den jeweiligen
                      Gruppen <br /> des Blockpraktikums {courseName}. <br />
                      Bitte beachten Sie, dass Feiertage <strong>
                        nicht
                      </strong>{" "}
                      eingetragen werden müssen!
                    </div>
                  </div>
                  <div>
                    {/* display table component with attendance details for the course */}
                  </div>
                  <div className="grid gap-y-5">
                    {/* Collapsible section which contains all the groups of the current Praktikum */}
                    {accordions.map((accordion, index) => (
                      <Accordion
                        disableGroupIdInput={accordion.disableGroupIdInput}
                        key={index}
                        group={handleUpdateGroup}
                        title={accordion.title}
                        x
                        index={index}
                        deleteAccordion={handleDeleteAccordion}
                      >
                        {accordion.content}
                      </Accordion>
                    ))}
                    {/* Button with a plus sign icon for adding a new group to a praktikum */}
                    <button
                      className="w-full bg-primary bg-opacity-20 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:text-white rounded-md shadow-lg px-4 py-2 font-bold text-primary group flex items-center focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-primary transition duration-150 ease-in-out"
                      onClick={handleAddAccordion}
                    >
                      <svg
                        className="svg-icon stroke-primary mr-3 dark:stroke-white"
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
            <Navbar type={type}></Navbar>
            <div className="flex flex-row grow bg-base-100">
              {/* Sidebar only visible on large screens */}
              <Sidebar type={type}></Sidebar>
              <div className="hero grow bg-base-100">
                {/* Grid for layouting welcome text and card components, already responsive */}
                <div className="grid hero-content text-center text-neutral lg:p-10">
                  <div className="text-secondary dark:text-white">
                    {/* display courseID as determined by href url */}
                    <h1 className="mb-5 text-3xl xl:text-5xl font-bold text-center">
                      {courseName}
                    </h1>
                    <h1 className="mb-5 text-3xl font-bold text-center">
                      {groupId}
                    </h1>
                  </div>
                  <div>
                    {/* display table component with attendance details for the course */}
                    <div className="w-full grid">
                      <div className="overflow-auto">{children}</div>
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
