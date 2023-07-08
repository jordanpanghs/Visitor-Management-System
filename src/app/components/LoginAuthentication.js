"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginAuthentication() {
  const router = useRouter();
  const currentUser = useAuth();

  useEffect(() => {
    // if there is no authenticated user, redirect to login page
    if (currentUser == null) {
      router.push("/login");
    }
  }, [currentUser]);
}
