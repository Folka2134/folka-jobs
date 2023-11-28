import { fireBasedb } from "@/lib/firebaseService";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";

async function getJob(id: any) {
  try {
    const job = query(collection(fireBasedb, "jobs"), where("id", "==", id));
    const snapshot = await getDocs(job);

    return snapshot;
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw error;
  }
}

const JobPage = async ({ params }: { params: { id: string } }) => {
  const job = await getJob(params.id);

  return (
    <div>
      <h1>Job Details</h1>
      <p>Job ID: {params.id}</p>
    </div>
  );
};

export default JobPage;
