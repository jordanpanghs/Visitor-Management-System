"use client";

import Header from "../../components/Header";
import RegisterAccount from "../../components/RegisterAccount";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser && <Header />}
      {currentUser && <RegisterAccount />}
    </>
  );
}
