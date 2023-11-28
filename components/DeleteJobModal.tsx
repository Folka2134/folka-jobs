import React from "react";
import { Button } from "./ui/button";

const DeleteJobModal = () => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="max-w-84 z-40 rounded-lg bg-white p-5 shadow-2xl">
        <Button>Cancel</Button>
      </div>
    </div>
  );
};

export default DeleteJobModal;
