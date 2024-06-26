import React, { useState, useEffect } from "react";

// Accordion component that displays a title and children elements that can be expanded or collapsed
const Accordion = ({
  disableGroupIdInput,
  index,
  group,
  title,
  children,
  deleteAccordion,
}) => {
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
        <div
          className={
            disableGroupIdInput //New groups will have a disabled group id input field because the user has to insert and save sessions first!
              ? "flex flex-row tooltip tooltip-error ml-3"
              : "flex flex-row tooltip ml-3"
          }
          data-tip={
            disableGroupIdInput //New groups will have a disabled group id input field because the user has to insert and save sessions first!
              ? "Bearbeiten der Gruppennummer erst nach Anlegen von Terminen, Speichern und Neuladen möglich"
              : "Gruppennummer bearbeiten und mit Enter speichern"
          }
        >
          <input
            className="text-neutral bg-gray-100 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-primary hover:bg-opacity-20"
            value={groupName}
            disabled={disableGroupIdInput} //New groups will have a disabled group id input field because the user has to insert and save sessions first!
            onChange={(e) => handleChange(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          ></input>{" "}
        </div>
        <div className="ml-auto mr-2 mt-2">
          <div class="tooltip" data-tip="Gruppe löschen">
            {/* Button for deleting a group */}
            <button className="btn btn-ghost" onClick={handleDelete}>
              <label htmlFor="popup_delete_group">
                <svg
                  className="svg-icon fill-current text-accent"
                  viewBox="0 -1 20 27"
                  width="30"
                  height="40"
                >
                  <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
                </svg>
              </label>
            </button>
          </div>
        </div>
      </div>
      {/* Children elements of the accordion that are only shown when the accordion is open */}
      {isOpen && <div className="py-3 bg-base-100">{children}</div>}
    </div>
  );
};

export default Accordion;
