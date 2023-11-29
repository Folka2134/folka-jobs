"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { JobPosting } from "@/lib/types";
import { getJobs } from "@/lib/firebaseService";
import JobModal from "./PostJobModal";

import manage from "../assets/images/manage.svg";
import { Router } from "next/router";
import Link from "next/link";
import { Searchbar } from "./Searchbar";

const Jobs = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [openModal, setOpenModal] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  // Get Jobs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobs = await getJobs();
        setJobs(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const howOldIsJob = (formattedDate: string): number => {
    const jobDate = new Date(formattedDate);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - jobDate.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    return differenceInDays;
  };

  return (
    <div className="flex w-[400px] flex-col items-center md:w-[500px] lg:w-[900px]">
      {openModal && (
        <JobModal setOpenModal={setOpenModal} setError={setError} />
      )}
      <h1 className="text-2xl font-medium">Jobs</h1>
      <div className="my-5 flex w-full justify-between">
        <Searchbar />
        <button onClick={handleOpenModal}>Post Job</button>
      </div>
      <div className="flex w-full flex-col gap-12  ">
        {jobs.map((job) => (
          <Link key={job.id} href={`/job/${job.id}`}>
            <div
              key={job.id}
              className="flex h-56 flex-col justify-evenly p-5 shadow-2xl lg:h-32 lg:flex-row"
            >
              <div className="flex items-center lg:flex-1">
                <Image src={manage} height={90} width={90} alt="Job Logo" />
                <div className="ml-4">
                  <div className="flex gap-3">
                    <h3>{job.companyName}</h3>
                    {howOldIsJob(job.formattedDate) > 5 && (
                      <span className="h-7 rounded-2xl bg-green-500 p-1 text-sm text-white">
                        NEW!
                      </span>
                    )}
                    {job.featured && (
                      <span className="h-7 items-center justify-center rounded-2xl bg-gray-900 p-1 text-sm text-white">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <h2>{job.title}</h2>
                  <ul className="flex gap-3">
                    <li>{job.formattedDate}</li>
                    <li>{job.roleType}</li>
                    <li>{job.location}</li>
                  </ul>
                </div>
              </div>
              <ul className="flex flex-wrap items-center justify-center gap-3 border-t border-black pt-2 lg:flex-1 lg:justify-end lg:border-none lg:pt-0">
                {job.roles.map((role) => (
                  <li key={role} className="rounded-md bg-gray-300 p-1 text-sm">
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
