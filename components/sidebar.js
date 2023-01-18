import Head from "next/head";
import React from "react";
import Link from "next/link";
import SidebarComponent from "./sidebarComponent";

//the idea is to have a sidebar on the left for navigation on large screens
//will have the same styling as the navbar/header
//will be replaced by sandwich menu on small screens
export default function Sidebar({ type = "" }) {
  return (
    <div className="hidden lg:grid justify-center bg-base-100">
      {/* column with multiple navigation icons (to be replaced) */}
      <div className="flex flex-col items-center justify-between py-4 flex-shrink-0 w-20 m-1 bg-primary rounded-3xl">
        <div>
          {type == "student" ? (
            <SidebarComponent
              componentName="home"
              href="/dashboard"
            ></SidebarComponent>
          ) : (
            <div></div>
          )}
          {type == "lecturer" ? (
            <SidebarComponent
              componentName="home"
              href="/dashboard"
            ></SidebarComponent>
          ) : (
            <div></div>
          )}
          {type == "admin" ? (
            <SidebarComponent
              componentName="home"
              href="/dashboard"
            ></SidebarComponent>
          ) : (
            <div></div>
          )}
          {/* home button as standard for every sidebar type */}
        </div>
        <div>
          <ul className="flex flex-col space-y-2">
            {/* differentiation between different navbar types and their respective dropdown components */}
            {/* advantage: shared navbar components dont have to be created twice */}
            {type == "student" ? (
              <div>
                {/* <SidebarComponent
                  componentName="attendance"
                  href=""
                ></SidebarComponent> */}
                <SidebarComponent
                  componentName="trainings"
                  href="/courseList"
                ></SidebarComponent>
                <SidebarComponent
                  componentName="printOuts"
                  href="/downloadPDF"
                ></SidebarComponent>
              </div>
            ) : (
              <div></div>
            )}
            {type == "lecturer" ? (
              <div>
                <SidebarComponent
                  componentName="trainings"
                  href="/courseList"
                ></SidebarComponent>
                <SidebarComponent
                  componentName="printOuts"
                  href=""
                ></SidebarComponent>
              </div>
            ) : (
              <div></div>
            )}
            {type == "admin" ? (
              <div>
                <SidebarComponent
                  componentName="accounts"
                  href="/accounts"
                ></SidebarComponent>
                <SidebarComponent
                  componentName="csv"
                  href="/csvAdmin"
                ></SidebarComponent>
                <SidebarComponent
                  componentName="trainings"
                  href="/courseList"
                ></SidebarComponent>
                <SidebarComponent
                  componentName="printOuts"
                  href="/downloadPDF"
                ></SidebarComponent>
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
