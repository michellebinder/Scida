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
  // TODO: add actual lecturer values and delete dummy values
  const [lecturers, setLecturers] = useState([
    { id: 1, email: "dozent1@beispiel.de" },
    { id: 2, email: "dozent2@beispiel.de" },
    { id: 3, email: "dozent3@beispiel.de" },
    { id: 4, email: "dozent4@beispiel.de" },
    { id: 5, email: "dozent5@beispiel.de" },
  ]);

  const [lecturerEmail, setLecturerEmail] = useState(lecturers[0].email); // Initialize lecturerEmail with the first email from the lecturers array
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the pop-up
  const [newLecturerEmail, setNewLecturerEmail] = useState(""); // State to hold the email entered in the pop-up

  // Function to handle the submission of the pop-up form
  const handleAddLecturer = () => {
    if (newLecturerEmail) {
      const newLecturer = { id: lecturers.length + 1, email: newLecturerEmail };
      const updatedLecturers = [...lecturers, newLecturer]; // Erstelle eine neue Array-Instanz mit dem neuen Dozenten
      setLecturers(updatedLecturers); // Aktualisiere den Zustand mit der neuen Dozentenliste
      setNewLecturerEmail(""); // Clear the text field
      setShowPopup(false); // Schließe das Pop-up
    }
  };
  const handleRemoveLecturer = (id) => {
    const updatedLecturers = lecturers.filter((lecturer) => lecturer.id !== id);
    setLecturers(updatedLecturers);
  };

  const [editingThreshold, setEditingThreshold] = useState(false);
  const [passingThreshold, setPassingThreshold] = useState(80);

  // Function to handle the edit button click (bestehensgrenze)
  const handleEditClick = () => {
    setEditingThreshold(true);
  };
  // Function to handle the save button click (bestehensgrenze)
  const handleSaveClick = () => {
    setEditingThreshold(false);
  };
  // Function to handle changes in the input field
  const handleThresholdChange = (e) => {
    // Update the state with the new value when the input changes
    setPassingThreshold(e.target.value);
  };

  // Funktion, die beim Initialisieren der Komponente ausgeführt wird, um die Bestehensgrenze zu holen
  useEffect(() => {
    const fetchThreshold = async () => {
      try {
        const response = await fetch(`/api/getThreshold?blockId=${blockId}`);
        const data = await response.json();
        if (response.ok && data.attendance_threshold !== undefined) {
          setPassingThreshold(data.attendance_threshold);
        } else {
          throw new Error("Fehler beim Laden der Bestehensgrenze.");
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Bestehensgrenze:", error);
      }
    };
    if (blockId) {
      fetchThreshold();
    }
  }, [blockId]);

  {
    if (type == "admin") {
      let res = [];
      let groups = [];
      data.map((row) => {
        groups.push(row.lv_gruppe);
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
              data={data.filter((item) => item.lv_gruppe == row)}
              type="admin"
            ></CourseTable>
          ),
        });
      });

      //Router for reload
      const router = useRouter();

      const [accordions, setAccordions] = useState(res);
      useEffect(() => {}, [accordions]);

      // Function which saves the attendance threshold
      const handleSaveClick = async () => {
        try {
          const response = await fetch("/api/updateThreshold", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              blockId: blockId,
              newThreshold: parseInt(passingThreshold, 10), // Stellen Sie sicher, dass die Zahl als Integer gesendet wird
            }),
          });
          const result = await response.json();
          if (response.ok) {
            // alert("Bestehensgrenze erfolgreich gespeichert.");
          } else {
            throw new Error(
              result.error || "Fehler beim Speichern der Bestehensgrenze."
            );
          }
        } catch (error) {
          console.error(error);
          // alert(error.toString());
        }
        setEditingThreshold(false);
      };

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
          semester: null,
          lecturer_id: null,
          lv_gruppe: groups[groups.length - 1],
          sess_end_time: "2023-01-01T00:00:00.000Z", //Insted of UNDEFINED - to prevent time select bug
          sess_id: 1,
          sess_start_time: "2023-01-01T00:00:00.000Z", //Insted of UNDEFINED - to prevent time select bug
          sess_type: null,
        };
        data.push(emptyRow);
        console.log(data);
        setAccordions([
          ...accordions,
          {
            disableGroupIdInput: true, //New groups will have a disabled group id input field because the user has to insert and save sessions first!
            title: `${newGroup}`,
            content: (
              <CourseTable
                group_id={emptyRow.lv_gruppe}
                blockId={blockId}
                blockName={courseName} //All Data is fetched only for one block -> index doesnt matter for block_name
                data={data.filter(
                  (item) => item.lv_gruppe == groups[groups.length - 1]
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

                  <div className="mb-5">
                    {/* Dozenten Übersicht */}
                    <h2 className="mb-3 text-2xl font-bold text-primary dark:text-white">
                      Dozierende für dieses Praktikum:
                    </h2>
                    <div className="flex flex-wrap -mx-2">
                      {lecturers.map((lecturer, index) => (
                        <div
                          key={lecturer.id}
                          className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4 relative"
                        >
                          <div className="rounded-md shadow-lg bg-white dark:bg-gray-700 p-2 relative overflow-hidden">
                            <span>{lecturer.email}</span>
                            <button
                              className="btn btn-ghost absolute top-1/2 right-0 transform -translate-y-1/2"
                              //TODO: delete lecturer in backend as well
                              onClick={() => handleRemoveLecturer(lecturer.id)} // Hier wird der Dozent entfernt
                            >
                              <label>
                                <svg
                                  className="svg-icon stroke-primary mr-3 dark:stroke-white"
                                  viewBox="0 0 20 20"
                                  width="18"
                                  height="18"
                                >
                                  <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46-0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
                                </svg>
                              </label>
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                        <label
                          htmlFor="popup_newLecturer"
                          onClick={() => setShowPopup(true)}
                          className="w-full bg-primary bg-opacity-20 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:text-white rounded-md shadow-lg px-4 py-2 font-bold text-primary group flex items-center justify-center focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-primary transition duration-150 ease-in-out"
                        >
                          Neuen Dozenten hinzufügen
                          <svg
                            className="svg-icon stroke-primary dark:stroke-white ml-2"
                            viewBox="0 0 20 20"
                            width="18"
                            height="18"
                          >
                            <path
                              fill="none"
                              d="M13.388,9.624h-3.011v-3.01c0-0.208-0.168-0.377-0.376-0.377S9.624,6.405,9.624,6.613v3.01H6.613c-0.208,0-0.376,0.168-0.376,0.376s0.168,0.376,0.376,0.376h3.011v3.01c0,0.208,0.168,0.378,0.376,0.378s0.376-0.17,0.376-0.378v-3.01h3.011c0.207,0,0.377-0.168,0.377-0.376S13.595,9.624,13.388,9.624z M10,1.344c-4.781,0-8.656,3.875-8.656,8.656c0,4.781,3.875,8.656,8.656,8.656c4.781,0,8.656-3.875,8.656-8.656C18.656,5.219,14.781,1.344,10,1.344z M10,17.903c-4.365,0-7.904-3.538-7.904-7.903S5.635,2.096,10,2.096S17.903,5.635,17.903,10S14.365,17.903,10,17.903z"
                            ></path>
                          </svg>
                        </label>
                        <input
                          type="checkbox"
                          id="popup_newLecturer"
                          className="modal-toggle"
                        />
                        {showPopup && (
                          <div className="modal">
                            <div className="modal-box">
                              <p className="text-lg">
                                Bitte geben Sie die E-Mail Adresse des Dozenten
                                ein.
                              </p>
                              <input
                                type="text"
                                placeholder="E-Mail"
                                className="input input-bordered w-full max-w-xs"
                                value={newLecturerEmail}
                                onChange={(e) =>
                                  setNewLecturerEmail(e.target.value)
                                }
                              />
                              <div className="modal-action flex flex-row">
                                <label
                                  htmlFor="popup_newLecturer"
                                  onClick={() => setShowPopup(false)}
                                  className="btn shadow-none hover:shadow-lg hover:opacity-75 basis-1/2"
                                >
                                  Abbrechen
                                </label>
                                <label
                                  htmlFor="popup_newLecturer"
                                  //TODO: add lecturer in backend as well
                                  onClick={handleAddLecturer}
                                  className="btn shadow-none hover:shadow-lg hover:opacity-75 basis-1/2"
                                >
                                  Speichern
                                </label>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    {/* Field to change attendance threshold */}
                    <h2 className="mb-3 text-2xl font-bold text-primary dark:text-white">
                      Bestehensgrenze für dieses Praktikum:{" "}
                      {editingThreshold ? (
                        <input
                          type="number"
                          className="shadow-lg bg-white hover:bg-opacity-30 rounded-md text-neutral hover:bg-secondary dark:text-white"
                          value={passingThreshold}
                          onChange={handleThresholdChange}
                        />
                      ) : (
                        <span>{passingThreshold}%</span>
                      )}
                    </h2>
                    {/* Conditional rendering for edit and save buttons */}
                    {editingThreshold ? (
                      <div className="flex items-center justify-center">
                        <button
                          className="btn btn-primary"
                          onClick={handleSaveClick}
                        >
                          Speichern
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <button
                          className="btn btn-secondary"
                          onClick={handleEditClick}
                        >
                          Bestehensgrenze bearbeiten
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    {/* display table component with attendance details for the course */}
                  </div>
                  <div className="grid gap-y-5">
                    {/* Gruppen Übersicht */}
                    <h2 className="mb-3 text-2xl font-bold text-primary dark:text-white">
                      Gruppen in diesem Praktikum:
                    </h2>
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
