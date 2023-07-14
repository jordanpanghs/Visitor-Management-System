"use client"; //Temporary, will have to put data into state

import RegisteredVisitorsTable from "./RegisteredVisitorsTable";
import VisitorLogsTable from "./VisitorLogsTable";

export default function Home() {
  return (
    <div className="flex flex-col justify-start max-h-screen px-20 py-10">
      <div className="space-y-10">
        <VisitorLogsTable />
        <RegisteredVisitorsTable />
      </div>
    </div>
  );
}
