import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-green-500 to-green-200 p-6">
      <div className="flex w-[23rem] flex-col  gap-2">
        <h1 className="text-center text-7xl">Folka Jobs</h1>
        <div className="flex justify-end gap-4">
          <span>Sign-up</span>
          <span>Sign-in</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
