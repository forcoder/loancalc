import type { Metadata } from "next";
import { FhaLoanCalculator } from "@/components/FhaLoanCalculator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loancalc-eta.vercel.app";

export const metadata: Metadata = {
  title: "FHA Loan Calculator (3.5% Down + MIP) | LoanCalc",
  description:
    "Calculate your monthly FHA loan payment with the mandatory Mortgage Insurance Premium (MIP). Includes 3.5% minimum down payment and upfront MIP rolled into the loan. Free, no signup.",
  keywords: [
    "FHA loan calculator",
    "FHA mortgage calculator",
    "FHA MIP calculator",
    "FHA 3.5 down",
    "FHA loan limits",
  ],
  alternates: { canonical: `${SITE_URL}/fha-loan-calculator` },
  openGraph: {
    title: "FHA Loan Calculator with MIP",
    description:
      "FHA loan payment including monthly MIP and upfront MIP rolled into the loan.",
    url: `${SITE_URL}/fha-loan-calculator`,
    siteName: "LoanCalc",
    type: "website",
  },
};

export default function FhaLoanPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          FHA Loan Calculator
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          Calculate your FHA loan payment including the required Mortgage
          Insurance Premium (MIP). With a 3.5% minimum down, FHA loans make
          homeownership accessible to buyers with lower credit scores.
        </p>
      </header>

      <FhaLoanCalculator />

      <section className="mt-12 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">
          What is an FHA loan?
        </h2>
        <div className="mt-4 space-y-3 text-zinc-700">
          <p>
            An FHA loan is a mortgage insured by the Federal Housing
            Administration. The insurance protects the lender (not the
            borrower), which is why FHA-approved lenders can offer loans with
            lower down payments, lower credit score requirements, and more
            flexible underwriting than conventional loans.
          </p>
          <p>
            The trade-off is the <strong>Mortgage Insurance Premium (MIP)</strong>,
            which has two parts: an <strong>upfront MIP</strong> of 1.75% of
            the base loan (usually rolled into the loan) and a{" "}
            <strong>monthly MIP</strong> of 0.55% annual / 0.046% monthly for
            most 30-year loans.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">FHA loan FAQ</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium text-zinc-900">
              What credit score do I need for an FHA loan?
            </h3>
            <p className="mt-1 text-zinc-700">
              <strong>580+</strong> qualifies for the 3.5% minimum down
              payment. <strong>500–579</strong> qualifies with 10% down. Below
              500 typically doesn&apos;t qualify. Many lenders overlay their
              own minimums (often 620+ in practice for best pricing).
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              What are the FHA loan limits?
            </h3>
            <p className="mt-1 text-zinc-700">
              For 2026, FHA loan limits range from ~$524,225 (low-cost areas)
              to ~$1,209,750 (high-cost areas like San Francisco, NYC). Limits
              are tied to median home prices by county and updated annually.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              Can I remove FHA MIP?
            </h3>
            <p className="mt-1 text-zinc-700">
              For loans originated after June 2013, MIP typically stays for
              the life of the loan if the down payment is under 10%. Refinancing
              into a conventional loan once you reach 20% equity is the
              standard way to drop MIP.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              FHA vs conventional: which is cheaper?
            </h3>
            <p className="mt-1 text-zinc-700">
              FHA is usually cheaper if you have less than 20% down or below
              740 credit. Conventional wins when you have 20%+ down and strong
              credit (740+), since you avoid both PMI and MIP. Run both
              calculators when comparing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}