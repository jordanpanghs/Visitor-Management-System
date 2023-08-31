"use client";

import Header from "../../components/Header";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return <section className="min-h-screen">{children}</section>;
}
