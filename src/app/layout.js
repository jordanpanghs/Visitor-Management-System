import "./globals.css";
import { Inter } from "next/font/google";
import LoginAuthentication from "./components/LoginAuthentication";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Visitor Management System",
  description: "By Jordan Pang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LoginAuthentication />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
