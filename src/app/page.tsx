import type { Metadata } from "next";
import { MortgageCalculator } from "@/components/MortgageCalculator";

export const metadata: Metadata = {
  title: {
    default: "LoanCalc — Free Mortgage & Loan Calculator",
    template: "%s | LoanCalc",
  },
  description:
    "Calculate your monthly mortgage payment with taxes, insurance, and PMI. Free, fast, and accurate. Includes a full amortization schedule.",
  keywords: [
    "mortgage calculator",
    "loan calculator",
    "amortization schedule",
    "monthly payment",
    "home loan",
  ],
  openGraph: {
    title: "LoanCalc — Free Mortgage & Loan Calculator",
    description:
      "Calculate your monthly mortgage payment with taxes, insurance, and PMI. Includes a full amortization schedule.",
    type: "website",
    siteName: "LoanCalc",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoanCalc — Free Mortgage & Loan Calculator",
    description:
      "Calculate your monthly mortgage payment with taxes, insurance, and PMI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Mortgage Calculator
          </h1>
          <p className="mt-2 text-lg text-zinc-600">
            Estimate your monthly payment with principal, interest, taxes,
            insurance, and HOA. See a full amortization schedule.
          </p>
        </header>

        <MortgageCalculator />

        <section className="mt-12 rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">
            How this calculator works
          </h2>
          <p className="mb-3">
            This calculator uses the standard amortization formula:
          </p>
          <p className="mb-3 rounded-md bg-zinc-100 p-3 font-mono text-xs sm:text-sm">
            M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> − 1]
          </p>
          <p>
            Where <strong>P</strong> is the loan principal, <strong>r</strong>{" "}
            is the monthly interest rate, and <strong>n</strong> is the total
            number of monthly payments. Estimates are for planning only —
            confirm final terms with your lender.
          </p>
        </section>

        <footer className="mt-12 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} LoanCalc. Estimates only — not
            financial advice.
          </p>
        </footer>
      </div>
    </main>
  );
}
