"use client";

import Header from "../../components/Header";
import RegisterVisitor from "../../components/RegisterVisitor";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser && <Header />}
      {currentUser && <RegisterVisitor />}
    </>
  );
}
