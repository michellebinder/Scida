import Head from "next/head";
import React from "react";
import Link from "next/link";
import SidebarComponent from "./sidebarComponent";
import { useSession } from "next-auth/react";

//the idea is to have a sidebar on the left for navigation on large screens
//will have the same styling as the navbar/header
//will be replaced by sandwich menu on small screens
export default function Sidebar({ type = "" }) {
  const { data: session, status } = useSession();
  return (
    <div className="hidden lg:grid justify-center bg-base-100">
      {/* column with multiple navigation icons (to be replaced) */}
      <div className="flex flex-col items-center justify-center py-4 flex-shrink-0 w-20 bg-primary rounded-3xl">
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
          <ul className="flex flex-col">
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
                {/* <SidebarComponent
                  componentName="printOuts"
                  href=""
                ></SidebarComponent> */}
                {session.user.account_id && (
                  <SidebarComponent
                    componentName="resetPassword"
                    href="/resetPassword"
                  ></SidebarComponent>
                )}
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
                <SidebarComponent
                  componentName="resetPassword"
                  href="/resetPassword"
                ></SidebarComponent>
              </div>
            ) : (
              <div></div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
