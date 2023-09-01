"use client";

import RegisteredVisitorTable from "./components/tables/RegisteredVisitorsTable.js";
import VisitorLogsTable from "./components/tables/RedeemedParcelsTable.js";
import Header from "./components/Header.js";
import Unverified from "./components/Unverified.js";

import { useAuth } from "./context/AuthContext.js";

export default function Page() {
  const { currentUser, userIsAdmin } = useAuth();
  return (
    <>
      <Header />
      <div className="flex flex-col justify-start max-h-screen px-20 py-10">
        {currentUser && userIsAdmin && <RegisteredVisitorTable />}
        {currentUser && userIsAdmin && <VisitorLogsTable />}
        {currentUser && !userIsAdmin && <Unverified />}
      </div>
    </>
  );
}
