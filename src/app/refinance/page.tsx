import type { Metadata } from "next";
import { RefinanceCalculator } from "@/components/RefinanceCalculator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loancalc-eta.vercel.app";

export const metadata: Metadata = {
  title: "Refinance Calculator — Should You Refinance? | LoanCalc",
  description:
    "Calculate monthly savings, break-even point, and lifetime interest savings from refinancing your mortgage. Free, no signup, includes a side-by-side comparison of your current vs new loan.",
  keywords: [
    "refinance calculator",
    "mortgage refinance",
    "should I refinance",
    "refinance break even",
    "monthly savings refinance",
  ],
  alternates: { canonical: `${SITE_URL}/refinance` },
  openGraph: {
    title: "Refinance Calculator — Should You Refinance?",
    description:
      "See your monthly savings, break-even point, and lifetime interest savings from refinancing.",
    url: `${SITE_URL}/refinance`,
    siteName: "LoanCalc",
    type: "website",
  },
};

export default function RefinancePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Refinance Calculator
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          Should you refinance? See your monthly savings, break-even point, and
          lifetime interest reduction in one view.
        </p>
      </header>

      <RefinanceCalculator />

      <section className="mt-12 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">
          How to use this refinance calculator
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-zinc-700">
          <li>
            Enter your <strong>current loan balance</strong>, interest rate, and
            years remaining on your existing mortgage.
          </li>
          <li>
            Enter the <strong>new rate</strong> you&apos;ve been quoted, the
            term you&apos;d refinance into, and your estimated{" "}
            <strong>closing costs</strong>.
          </li>
          <li>
            Read the <strong>monthly savings</strong>,{" "}
            <strong>break-even point</strong>, and lifetime savings to decide if
            refinancing makes sense.
          </li>
        </ol>
        <p className="mt-4 text-sm text-zinc-600">
          The break-even point is the number of months of monthly savings needed
          to recover closing costs. If you plan to move before break-even, the
          refinance likely doesn&apos;t pay off.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">
          Refinance FAQ
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium text-zinc-900">
              What is a good break-even period?
            </h3>
            <p className="mt-1 text-zinc-700">
              Under 24 months is generally considered good. 24–36 months is
              acceptable. Over 48 months is risky — you may not recoup closing
              costs before moving or refinancing again.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              Should I refinance into a shorter term?
            </h3>
            <p className="mt-1 text-zinc-700">
              If rates are similar to your current rate, shortening the term
              (e.g., 30→15) builds equity faster and saves substantial
              interest, but raises the monthly payment. If rates dropped
              meaningfully, refinancing into the same or longer term reduces the
              monthly payment.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              What counts as closing costs?
            </h3>
            <p className="mt-1 text-zinc-700">
              Typical refinance closing costs run 2%–5% of the loan balance:
              origination fee (0.5%–1%), appraisal ($400–$700), title insurance,
              recording fees, and sometimes points. Your Loan Estimate (LE)
              shows the exact total within 3 business days of application.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}