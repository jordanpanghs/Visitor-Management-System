"use client";

import { AuthProvider } from "../context/AuthContext";

export default function LoginLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <AuthProvider>{children}</AuthProvider>
    </section>
  );
}
