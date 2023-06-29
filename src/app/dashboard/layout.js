"use client";

import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
    </section>
  );
}
