import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllStates } from "@/lib/states";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://loancalc-eta.vercel.app"),
  title: {
    default: "LoanCalc — Free Mortgage & Loan Calculator",
    template: "%s | LoanCalc",
  },
  description:
    "Free mortgage and loan calculator with taxes, insurance, HOA, and PMI. Includes a complete amortization schedule.",
  applicationName: "LoanCalc",
  authors: [{ name: "LoanCalc" }],
  creator: "LoanCalc",
  publisher: "LoanCalc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stateLinks = getAllStates().map((s) => ({
    href: `/${s.slug}`,
    label: `${s.name} Mortgage Calculator`,
  }));
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 text-zinc-900 font-sans">
        {children}
        <SiteFooter stateLinks={stateLinks} />
        <Analytics />
      </body>
    </html>
  );
}
