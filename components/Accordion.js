import React, { useState, useEffect } from "react";

// Accordion component that displays a title and children elements that can be expanded or collapsed
const Accordion = ({ index, group, title, children, deleteAccordion }) => {
  // State to keep track of whether the accordion is open or closed
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroup] = useState(title);
  const handleChange = (value) => {
    setGroup(value);
  };
  const handleSubmit = () => {
    group(index + ";" + groupName);
  };

  useEffect(() => {
    setGroup(title);
  }, [title]);

  const handleDelete = () => {
    deleteAccordion(index);
  };

  return (
    <div className="w-full rounded-md shadow-lg bg-gray-100 dark:bg-gray-700">
      {/* Button that toggles the open/closed state of the accordion when clicked  */}
      <div className="flex">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 font-bold text-primary group flex items-center focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-primary transition duration-150 ease-in-out"
        >
          {/* SVG icon that changes based on the open/closed state of the accordion  */}
          <svg
            className="h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition duration-150 ease-in-out"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {isOpen ? (
              // Icon for the open state of the accordion
              <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              />
            ) : (
              // Icon for the closed state of the accordion
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
        <div className="flex flex-col justify-center">
          <span className="text-primary dark:text-white">Gruppe</span>
        </div>
        <div className="flex flex-row tooltip ml-3" data-tip="Gruppennummer bearbeiten">
          <input
            className="text-primary bg-white dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-primary hover:bg-opacity-20"
            value={groupName}
            onChange={(e) => handleChange(e.target.value)}
          ></input> {" "}
        </div>
        <div className="ml-auto mr-5 mt-2">
          <div class="tooltip" data-tip="Neuen Gruppennamen speichern">
            {/* Button for saving the changes that have been made to the group name */}
            <button onClick={handleSubmit}>
              <svg
                className="svg-icon fill-current text-primary hover:stroke-current dark:text-white"
                viewBox="0 2 20 20"
                width="30"
                height="40"
              >
                <path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path>
              </svg>
            </button>
          </div>
          <div class="tooltip" data-tip="Gruppe löschen">
            {/* Button for deleting a group */}
            <label
              htmlFor="popup_delete_group">
              <svg
                className="svg-icon fill-current text-accent hover:stroke-current ml-2"
                viewBox="0 -1 20 27"
                width="30"
                height="40"
              >
                <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
              </svg>
            </label>
          </div>
          {/* Pop-up window (modal), which appears when the button "Gruppe löschen" is clicked */}
          <input type="checkbox" id="popup_delete_group" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <p className="text-lg font-bold text-accent">
                  Sind Sie sicher, dass Sie diese Gruppe löschen möchten?
                </p>
                <div className="modal-action flex flex-row">
                  <label
                    htmlFor="popup_delete_group"
                    onClick={handleDelete}
                    className="btn basis-1/2"
                  >
                    Ja, löschen
                  </label>
                  <label htmlFor="popup_delete_group" className="btn basis-1/2">
                    Nein, nicht löschen
                  </label>
                </div>
              </div>
            </div> 
        </div>
      </div>
      {/* Children elements of the accordion that are only shown when the accordion is open */}
      {isOpen && <div className="py-3 bg-gray-50 dark:bg-gray-600">{children}</div>}
    </div>
  );
};

export default Accordion;
