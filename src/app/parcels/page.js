"use client";

import Header from "../components/Header";
import RegisteredParcelsTable from "../components/tables/RegisteredParcelsTable";
import RedeemedParcelsTable from "../components/tables/RedeemedParcelsTable";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser && <Header />}
      <div className="flex flex-col justify-start max-h-screen px-20 py-10">
        {currentUser && <RegisteredParcelsTable />}
        {currentUser && <RedeemedParcelsTable />}
      </div>
    </>
  );
}
