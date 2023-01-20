import React, { useState } from "react";
import { Form } from "react";
import Link from "next/link";

export default function DashboardCard({
  title = "",
  description = "",
  url = "",
  icon = "",
}) {
  return (
    <div className="card card-normal bg-primary text-primary-content">
      <Link href={url}>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title text-white text-left">{title}</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path fill="none" d={icon}></path>
            </svg>
          </div>

          <p className="text-left pb-2">{description}</p>
          {/* <div className="card-actions justify-end">
    <button className="btn">Öffnen</button>
  </div> */}
        </div>
      </Link>
    </div>
  );
}
