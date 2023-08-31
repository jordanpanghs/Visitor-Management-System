"use client";

import Header from "../../components/Header";
import RegisterAccount from "../../components/RegisterAccount";
import Unverified from "../../components/Unverified";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { currentUser, userIsAdmin } = useAuth();

  return (
    <>
      {currentUser && <Header />}
      <div className="flex justify-start items-center">
        {currentUser && !userIsAdmin && <Unverified />}
        {currentUser && userIsAdmin && <RegisterAccount />}
      </div>
    </>
  );
}
