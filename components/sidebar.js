import { useSession } from "next-auth/react";
import React from "react";
import SidebarComponent from "./sidebarComponent";

//the idea is to have a sidebar on the left for navigation on large screens
//will have the same styling as the navbar/header
//will be replaced by sandwich menu on small screens
export default function Sidebar({ type = "" }) {
  //code to secure the page
  const { data: session } = useSession();

  //Try recieving correct user role
  var role;
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }

  return (
    <div className="hidden lg:grid justify-center bg-base-100">
      {/* column with multiple navigation icons (to be replaced) */}
      <div className="flex flex-col items-center justify-center py-4 flex-shrink-0 w-20 bg-primary m-4 rounded-3xl">
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
                {role === "scidaDekanat" && (
                  <SidebarComponent
                    componentName="csv"
                    href="/csvAdmin"
                  ></SidebarComponent>
                )}
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
