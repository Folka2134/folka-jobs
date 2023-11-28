"use client";

import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

const Navbar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-green-500 to-green-200 p-6">
      <div className="flex w-[23rem] flex-col gap-2">
        <h1 className="text-center text-7xl">Folka Jobs</h1>
        <div className="flex justify-end gap-4">
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
