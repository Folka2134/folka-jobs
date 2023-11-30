import EditBar from "@/components/EditBar";
import { fireBasedb, getJobById } from "@/lib/firebaseService";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";

const JobPage = async ({ params }: { params: { id: string } }) => {
  const job = await getJobById(params.id);

  console.log(job);

  return (
    <div>
      <h1>Job Details</h1>
      <p>Job ID: {params.id}</p>
      <p>{job.title}</p>
      <EditBar id={params.id} createdBy={job.createdBy} />
    </div>
  );
};

export default JobPage;
