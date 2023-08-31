"use client";

import "./globals.css";
import LoginAuthentication from "./components/LoginAuthentication";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "Visitor Management System",
  description: "By Jordan Pang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <LoginAuthentication />
      <body className="h-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
