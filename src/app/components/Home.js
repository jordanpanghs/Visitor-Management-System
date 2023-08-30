"use client"; //Temporary, will have to put data into state

import RegisteredVisitorsTable from "./tables/RegisteredVisitorsTable";
import VisitorLogsTable from "./tables/VisitorLogsTable";

export default function Home() {
  return (
    <div className="flex flex-col justify-start max-h-screen px-20 py-10">
      <div className="">
        <RegisteredVisitorsTable />
        <VisitorLogsTable />
      </div>
    </div>
  );
}
