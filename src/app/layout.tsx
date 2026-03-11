import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import SmartHeader from "@/components/SmartHeader";
import Footer from "@/components/Footer";
import InstagramFloat from "@/components/InstagramFloat";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VGC — Vanamali Greenscape Creations",
  description:
    "Bringing landscapes to life with 3D modeling, custom hardscaping, softscaping, and 20+ years of maintenance excellence in Kakinada, AP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <SmartHeader />
        <main>{children}</main>
        <Footer />
        <InstagramFloat />
      </body>
    </html>
  );
}

