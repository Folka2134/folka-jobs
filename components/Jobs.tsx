import Image from "next/image";
import React from "react";

import manage from "../assets/images/manage.svg";

const Jobs = () => {
  return (
    <div className="b flex w-full flex-col items-center">
      <h1 className="text-2xl font-medium">Jobs</h1>
      <p className="flex w-full justify-end">Post Job</p>
      {/* loop over jobs from database */}
      <div className="flex h-56 w-full min-w-[370px] flex-col justify-evenly p-5 shadow-2xl lg:h-32 lg:flex-row">
        <div className="flex items-center lg:flex-1">
          <Image src={manage} height={90} width={90} alt="Job Logo" />
          <div className="ml-4">
            <div className="flex gap-3">
              <h3>Company Name</h3>
              <span className="h-7 rounded-2xl bg-green-500 p-1 text-sm text-white">
                NEW!
              </span>
              <span className="h-7 items-center justify-center rounded-2xl bg-gray-900 p-1 text-sm text-white">
                FEATURED
              </span>
            </div>
            <h2>Job title</h2>
            <ul className="flex gap-3">
              <li>1d ago</li>
              <li>Full time</li>
              <li>Remote</li>
            </ul>
          </div>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-3 border-t border-black pt-2 lg:flex-1 lg:justify-end lg:border-none lg:pt-0">
          <li className="rounded-md bg-gray-300 p-1 text-sm">Frontend</li>
          <li className="rounded-md bg-gray-300 p-1 text-sm">Senior</li>
          <li className="rounded-md bg-gray-300 p-1 text-sm">HTML</li>
          <li className="rounded-md bg-gray-300 p-1 text-sm">CSS</li>
          <li className="rounded-md bg-gray-300 p-1 text-sm">JavaScript</li>
        </ul>
      </div>
    </div>
  );
};

export default Jobs;
