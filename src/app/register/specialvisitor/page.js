"use client";

import Header from "../../components/Header";
import RegisterSpecialVisitor from "../../components/RegisterSpecialVisitor";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser && <Header />}
      {currentUser && <RegisterSpecialVisitor />}
    </>
  );
}
