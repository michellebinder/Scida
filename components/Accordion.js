import React, { useState } from "react";

// Accordion component that displays a title and children elements that can be expanded or collapsed
const Accordion = ({ title, children }) => {
  // State to keep track of whether the accordion is open or closed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full rounded-md shadow-lg">
      {/* Button that toggles the open/closed state of the accordion when clicked  */}
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
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          ) : (
            // Icon for the closed state of the accordion
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          )}
        </svg>
        {/* Title of the accordion */}
        <span className="ml-3">{title}</span>
      </button>
      {/* Children elements of the accordion that are only shown when the accordion is open */}
      {isOpen && <div className="py-3 bg-gray-50">{children}</div>}
    </div>
  );
};

export default Accordion;
