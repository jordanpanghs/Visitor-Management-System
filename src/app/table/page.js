"use client";

import React from "react";

import ReactTable from "../components/tables/ReactTable";

export default function TablePage() {
  return (
    <>
      <div className="flex flex-col justify-start max-h-screen px-20 py-10">
        {" "}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md h-full w-full">
          <ReactTable />
        </div>
      </div>
    </>
  );
}
