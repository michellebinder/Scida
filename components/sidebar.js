import Head from "next/head";
import React from "react";
import Link from "next/link";
import SidebarComponent from "./sidebarComponent";

//the idea is to have a sidebar on the left for navigation on large screens
//will have the same styling as the navbar/header
//will be replaced by sandwich menu on small screens
export default function Sidebar({ type = "" }) {
  return (
    <div className="hidden lg:grid justify-center">
      {/* column with multiple navigation icons (to be replaced) */}
      <div className="flex flex-col items-center justify-between py-4 flex-shrink-0 w-20 m-1 bg-primary rounded-3xl">
        <div>
          {/* home button as standard for every sidebar type */}
          <button href="#" className="btn btn-ghost flex items-center">
            <svg
              src="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill=""
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                fill="none"
                d="M15.971,7.708l-4.763-4.712c-0.644-0.644-1.769-0.642-2.41-0.002L3.99,7.755C3.98,7.764,3.972,7.773,3.962,7.783C3.511,8.179,3.253,8.74,3.253,9.338v6.07c0,1.146,0.932,2.078,2.078,2.078h9.338c1.146,0,2.078-0.932,2.078-2.078v-6.07c0-0.529-0.205-1.037-0.57-1.421C16.129,7.83,16.058,7.758,15.971,7.708z M15.68,15.408c0,0.559-0.453,1.012-1.011,1.012h-4.318c0.04-0.076,0.096-0.143,0.096-0.232v-3.311c0-0.295-0.239-0.533-0.533-0.533c-0.295,0-0.534,0.238-0.534,0.533v3.311c0,0.09,0.057,0.156,0.096,0.232H5.331c-0.557,0-1.01-0.453-1.01-1.012v-6.07c0-0.305,0.141-0.591,0.386-0.787c0.039-0.03,0.073-0.066,0.1-0.104L9.55,3.75c0.242-0.239,0.665-0.24,0.906,0.002l4.786,4.735c0.024,0.033,0.053,0.063,0.084,0.09c0.228,0.196,0.354,0.466,0.354,0.76V15.408z"
              ></path>
            </svg>
          </button>
        </div>
        <div>
          <ul className="flex flex-col space-y-2">
            {/* differentiation between different navbar types and their respective dropdown components */}
            {/* advantage: shared navbar components dont have to be created twice */}
            {type == "student" ? (
              <div>
                <SidebarComponent componentName="attendance"></SidebarComponent>
                <SidebarComponent componentName="trainings"></SidebarComponent>
                <SidebarComponent componentName="printOuts"></SidebarComponent>
              </div>
            ) : (
              <div></div>
            )}
            {type == "lecturer" ? (
              <div>
                <SidebarComponent componentName="attendance"></SidebarComponent>
                <SidebarComponent componentName="trainings"></SidebarComponent>
                <SidebarComponent componentName="printOuts"></SidebarComponent>
              </div>
            ) : (
              <div></div>
            )}
            {type == "admin" ? (
              <div>
                <SidebarComponent componentName="accounts"></SidebarComponent>
                <SidebarComponent componentName="csv"></SidebarComponent>
                <SidebarComponent componentName="trainings"></SidebarComponent>
                <SidebarComponent componentName="printOuts"></SidebarComponent>
              </div>
            ) : (
              <div></div>
            )}
          </ul>
        </div>
        <div>
          {/* future nightmode button? */}
          <button className="mt-auto flex items-center justify-center hover:text-indigo-100 text-indigo-500 h-10 w-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
