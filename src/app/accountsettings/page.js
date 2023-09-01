"use client";

import React from "react";
import Header from "../components/Header";
import EditAccount from "../components/EditAccount";
import { useAuth } from "../context/AuthContext";

function page() {
  const { currentUser, userIsAdmin } = useAuth();

  return (
    <>
      {currentUser && <Header />}
      <div className="flex flex-col justify-start max-h-screen px-20 py-10">
        {currentUser && <EditAccount />}
      </div>
    </>
  );
}

export default page;
