"use client";

import EditBar from "@/components/EditBar";
import { getJobById } from "@/lib/firebaseService";
import React, { useEffect, useState } from "react";

interface Job {
  title: string;
  usersApplied: string[];
  createdBy: string;
  // Add other properties as needed
}

const JobPage = ({ params }: { params: { id: string } }) => {
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const job = await getJobById(params.id);
        setJob(job);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(job);

  return (
    <div>
      <h1>Job Details</h1>
      <p>Job ID: {params.id}</p>
      <p>{job?.title}</p>
      <EditBar
        applicants={job?.usersApplied}
        id={params.id}
        createdBy={job?.createdBy}
      />
    </div>
  );
};

export default JobPage;
