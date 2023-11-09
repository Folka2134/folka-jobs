import { JobPosting } from "@/lib/types";
import React, { useState } from "react";

// interface JobModalProps {
//   setOpenModal: () => void;
//   openModal: () => void;
// }

const JobModal = ({ setOpenModal }: any) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="max-w-84 z-40 rounded-lg bg-opacity-80 p-5 shadow-2xl">
        <button
          onClick={() => setOpenModal(false)}
          className="my-2 mb-6 flex h-8 w-20 items-center justify-center gap-2 text-sm shadow-xl md:mb-2"
        >
          {/* <BsArrowLeft /> */}
          Cancel
        </button>
        test
      </div>
      <div
        className="overlay absolute z-30 h-full w-full  bg-opacity-70"
        onClick={() => setOpenModal(false)}
      />
    </div>
  );
};

export default JobModal;
