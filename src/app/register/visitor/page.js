"use client";

import Header from "../../components/Header";
import RegisterVisitor from "../../components/RegisterVisitor";
import Unverified from "../../components/Unverified";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { currentUser, userIsAdmin } = useAuth();

  return (
    <>
      {currentUser && <Header />}
      <div className="flex flex-col justify-start max-h-screen px-20 py-10">
        {currentUser && !userIsAdmin && <Unverified />}
      </div>
      {currentUser && userIsAdmin && <RegisterVisitor />}
    </>
  );
}
