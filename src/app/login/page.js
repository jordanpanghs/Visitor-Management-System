"use client";

import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if there is no authenticated user, redirect to login page
    if (currentUser) {
      router.back();
    } else if (currentUser && typeof window !== "undefined") {
      router.push("/");
    }
  });

  return (
    <>
      <div className="justify-center items-center min-h-screen">
        {!currentUser && <Login />}
      </div>
    </>
  );
}
