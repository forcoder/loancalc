import type { Metadata } from "next";
import { LoanComparisonCalculator } from "@/components/LoanComparisonCalculator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loancalc-eta.vercel.app";

export const metadata: Metadata = {
  title: "15-Year vs 30-Year Mortgage Calculator | LoanCalc",
  description:
    "See the monthly payment and total interest difference between a 15-year and 30-year mortgage side by side. Find out if the extra monthly cost of a 15-year loan is worth the lifetime interest savings.",
  keywords: [
    "15 vs 30 year mortgage",
    "15 year vs 30 year mortgage calculator",
    "should I choose a 15 year mortgage",
    "30 year vs 15 year mortgage",
  ],
  alternates: { canonical: `${SITE_URL}/15-vs-30-year-mortgage` },
  openGraph: {
    title: "15-Year vs 30-Year Mortgage Calculator",
    description:
      "Compare 15-year and 30-year mortgages side by side: monthly payment, total interest, and total cost.",
    url: `${SITE_URL}/15-vs-30-year-mortgage`,
    siteName: "LoanCalc",
    type: "website",
  },
};

export default function FifteenVsThirtyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          15-Year vs 30-Year Mortgage
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          See the real cost difference between a 15-year and 30-year mortgage
          and decide which makes sense for you.
        </p>
      </header>

      <LoanComparisonCalculator />

      <section className="mt-12 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">
          15-year vs 30-year: which is better?
        </h2>
        <div className="mt-4 space-y-4 text-zinc-700">
          <p>
            A <strong>15-year mortgage</strong> has higher monthly payments but
            saves substantial interest over the loan life and builds equity
            twice as fast. A <strong>30-year mortgage</strong> offers lower
            monthly payments and more flexibility, at the cost of paying much
            more in interest.
          </p>
          <p>
            As a rough rule: if you can comfortably afford the 15-year payment
            without sacrificing other financial goals (retirement, emergency
            fund, kids&apos; college), the 15-year typically wins. If you need
            cash flow flexibility or plan to move within 5–7 years, the 30-year
            is usually the right call.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">FAQ</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium text-zinc-900">
              Are 15-year mortgage rates lower than 30-year rates?
            </h3>
            <p className="mt-1 text-zinc-700">
              Yes. Lenders typically price 15-year rates 0.5%–0.75% below
              30-year rates because shorter-term loans carry less interest-rate
              risk. Combined with the shorter amortization, the interest
              savings are dramatic.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              Can I make extra payments on a 30-year to simulate a 15-year?
            </h3>
            <p className="mt-1 text-zinc-700">
              Yes, but the 30-year rate is higher, so you still pay more
              interest even if you pay it off in 15 years. If your goal is to
              pay off in 15 years, the dedicated 15-year loan saves more.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">
              When does a 30-year make more sense?
            </h3>
            <p className="mt-1 text-zinc-700">
              When you&apos;re early in your career with rising income, when you
              plan to relocate within 5–7 years, when you have other high-yield
              debt (student loans at 7%+), or when you want to invest the
              monthly savings in tax-advantaged retirement accounts.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}