"use client";

import { deleteJob } from "@/lib/firebaseService";
import { useSession } from "next-auth/react";

const EditBar = ({ createdBy, id }: any) => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.email == createdBy ? (
        <div className="flex gap-3">
          <button onClick={() => deleteJob(id)}>Delete</button>
        </div>
      ) : (
        <button>Apply</button>
      )}
    </div>
  );
};

export default EditBar;
