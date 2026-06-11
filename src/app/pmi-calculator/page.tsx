import type { Metadata } from "next";
import { PmiCalculator } from "@/components/PmiCalculator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loancalc-eta.vercel.app";

export const metadata: Metadata = {
  title: "PMI Calculator — Monthly Mortgage Insurance Cost | LoanCalc",
  description:
    "Calculate your monthly Private Mortgage Insurance (PMI) cost and when PMI will auto-cancel. PMI is required when your down payment is under 20%. Free, no signup.",
  keywords: [
    "PMI calculator",
    "mortgage insurance calculator",
    "PMI removal",
    "when does PMI cancel",
    "PMI rate by credit score",
  ],
  alternates: { canonical: `${SITE_URL}/pmi-calculator` },
  openGraph: {
    title: "PMI Calculator — Monthly Mortgage Insurance Cost",
    description:
      "See your monthly PMI cost and when PMI will auto-cancel at 22% equity.",
    url: `${SITE_URL}/pmi-calculator`,
    siteName: "LoanCalc",
    type: "website",
  },
};

export default function PmiPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          PMI Calculator
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          Calculate your monthly Private Mortgage Insurance (PMI) cost and
          find out when it will automatically cancel.
        </p>
      </header>

      <PmiCalculator />

      <section className="mt-12 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">
          What is PMI?
        </h2>
        <div className="mt-4 space-y-3 text-zinc-700">
          <p>
            <strong>Private Mortgage Insurance (PMI)</strong> is insurance for
            the lender, not you. It&apos;s required on conventional loans when
            your down payment is under 20%. PMI typically costs 0.3%–1.5% of
            the original loan amount per year, depending on your credit score,
            loan-to-value ratio, and loan type.
          </p>
          <p>
            The good news: PMI isn&apos;t permanent. Under the federal
            Homeowners Protection Act (HPA), your lender must automatically
            cancel PMI once your loan balance reaches 78% of the original
            purchase price. You can also request cancellation at 80% (20%
            equity).
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">PMI FAQ</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium text-zinc-900">
              What is a good PMI rate?
            </h3>
            <p className="mt-1 text-zinc-700">
              <strong>0.3%–0.5%</strong> annual is excellent (760+ credit,
              15%–19% down). <strong>0.5%–0.9%</strong> is typical (700–759
              credit). <strong>1.0%–1.5%</strong> is common for lower credit
              or low down payment. Your lender quotes the exact rate based on
              your profile.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              How do I remove PMI early?
            </h3>
            <p className="mt-1 text-zinc-700">
              Two paths: (1) Wait for auto-cancellation at 78% LTV based on
              original purchase price; (2) Request cancellation at 80% LTV
              based on either original price or current appraised value (your
              choice — the lower LTV applies). You&apos;ll typically need a
              new appraisal ($400–$600) to confirm value.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              PMI vs FHA MIP — what&apos;s the difference?
            </h3>
            <p className="mt-1 text-zinc-700">
              PMI is for <strong>conventional loans</strong> and is cancellable.
              MIP is for <strong>FHA loans</strong> and (for most loans after
              2013) stays for the life of the loan if down payment is under
              10%. Conventional PMI is usually the cheaper option if you can
              qualify.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              Can I avoid PMI without 20% down?
            </h3>
            <p className="mt-1 text-zinc-700">
              Yes — three options: (1) <strong>Piggyback loan</strong>: 80%
              first mortgage + 10% second mortgage + 10% down; (2){" "}
              <strong>Lender-paid PMI (LPMI)</strong>: you pay a slightly
              higher rate (~0.25%–0.5% more) and the lender covers the PMI;
              (3) <strong>VA loan</strong>: 0% down with no PMI for eligible
              veterans.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}