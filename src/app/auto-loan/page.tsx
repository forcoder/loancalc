import type { Metadata } from "next";
import { AutoLoanCalculator } from "@/components/AutoLoanCalculator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loancalc-eta.vercel.app";

export const metadata: Metadata = {
  title: "Auto Loan Calculator — Monthly Car Payment | LoanCalc",
  description:
    "Calculate your monthly car payment, total interest, and true cost of a vehicle. Compare 3, 4, 5, 6, and 7-year auto loan terms. Free, no signup.",
  keywords: [
    "auto loan calculator",
    "car loan calculator",
    "car payment calculator",
    "vehicle loan",
    "monthly car payment",
  ],
  alternates: { canonical: `${SITE_URL}/auto-loan` },
  openGraph: {
    title: "Auto Loan Calculator — Monthly Car Payment",
    description:
      "Calculate monthly car payment, total interest, and true vehicle cost.",
    url: `${SITE_URL}/auto-loan`,
    siteName: "LoanCalc",
    type: "website",
  },
};

export default function AutoLoanPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Auto Loan Calculator
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          See your monthly car payment, total interest, and the true cost of
          financing a vehicle.
        </p>
      </header>

      <AutoLoanCalculator />

      <section className="mt-12 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">
          How to use this auto loan calculator
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-zinc-700">
          <li>
            Enter the <strong>vehicle price</strong> and your planned{" "}
            <strong>down payment</strong>.
          </li>
          <li>
            Enter the <strong>APR</strong> from your lender (used cars often run
            higher APRs than new).
          </li>
          <li>
            Pick a <strong>loan term</strong> — 3 to 7 years are the most common
            auto loan lengths.
          </li>
        </ol>
      </section>

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">
          Auto loan FAQ
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium text-zinc-900">
              What is a good APR for an auto loan?
            </h3>
            <p className="mt-1 text-zinc-700">
              For new cars from a credit union or bank: 5%–7% APR for borrowers
              with good credit. For used cars: 6%–10%. Subprime borrowers
              (credit below 620) may see 12%–20% APR. Always check your credit
              score before shopping and pre-qualify with multiple lenders.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              Should I choose a longer or shorter auto loan term?
            </h3>
            <p className="mt-1 text-zinc-700">
              Shorter terms (3–4 years) save substantial interest and build
              equity faster. Longer terms (6–7 years) lower the monthly payment
              but you&apos;ll pay more total interest and risk being underwater
              (owing more than the car is worth) for the first 2–3 years.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              How much should I put down on a car?
            </h3>
            <p className="mt-1 text-zinc-700">
              20% down is the standard recommendation for new cars, 10% for used
              cars. A larger down payment reduces the loan amount, monthly
              payment, and total interest, and helps avoid being underwater
              immediately after driving off the lot.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}