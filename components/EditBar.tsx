"use client";

import { applyToJob, deleteJob } from "@/lib/firebaseService";
import { useSession } from "next-auth/react";

const EditBar = ({ createdBy, id, applicants }: any) => {
  const { data: session } = useSession();

  if (session) {
    var userEmail = session?.user?.email;
  }

  const handleApply = async (id: string) => {
    if (userEmail) {
      await applyToJob(id, userEmail);
    }
  };

  return (
    <div>
      {userEmail == createdBy ? (
        <div className="flex gap-3">
          <button onClick={() => deleteJob(id)}>Delete</button>
        </div>
      ) : (
        <button onClick={() => handleApply(id)}>
          {applicants.includes(userEmail) ? (
            <span className="bg-white">Applied</span>
          ) : (
            <span className="bg-green-400">Apply</span>
          )}
        </button>
      )}
    </div>
  );
};

export default EditBar;
