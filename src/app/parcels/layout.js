"use client";

import { AuthProvider } from "../context/AuthContext";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <AuthProvider>{children}</AuthProvider>
    </section>
  );
}
