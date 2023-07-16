"use client";

import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";

export default function AlprLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <AuthProvider>{children}</AuthProvider>
    </section>
  );
}
