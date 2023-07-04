"use client";

import Header from "../components/Header";
import Home from "../components/Home";
import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser && <Header />}
      {currentUser && <Home />}
    </>
  );
}
