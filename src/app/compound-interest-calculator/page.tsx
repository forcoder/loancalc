import type { Metadata } from "next";
import { CompoundInterestCalculator } from "@/components/CompoundInterestCalculator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loancalc-eta.vercel.app";

export const metadata: Metadata = {
  title: "Compound Interest Calculator with Monthly Contributions | LoanCalc",
  description:
    "See how your savings and investments grow with compound interest, monthly contributions, and inflation adjustment. Free calculator with year-by-year schedule. No signup.",
  keywords: [
    "compound interest calculator",
    "compound interest calculator with monthly contributions",
    "compound interest calculator with inflation",
    "savings growth calculator",
    "investment growth calculator",
  ],
  alternates: { canonical: `${SITE_URL}/compound-interest-calculator` },
  openGraph: {
    title: "Compound Interest Calculator with Monthly Contributions",
    description:
      "Calculate compound interest with monthly contributions and inflation adjustment. Includes year-by-year growth schedule.",
    url: `${SITE_URL}/compound-interest-calculator`,
    siteName: "LoanCalc",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How does compound interest work?",
    answer:
      "Compound interest earns interest on both your original principal and the interest already accumulated. Over time, growth accelerates because each period's interest is calculated on a larger balance. The standard formula is A = P(1 + r/n)^(nt), where P is principal, r is the annual rate, n is the number of compounding periods per year, and t is time in years.",
  },
  {
    question:
      "How much difference do monthly contributions make to compound growth?",
    answer:
      "Monthly contributions typically dwarf the impact of the compounding frequency itself. Adding $200/month for 30 years at 7% returns roughly $227,000, of which about $155,000 is contributed and $72,000 is compound interest. Skipping the monthly contributions and only investing the initial $10,000 would yield only about $76,000 over the same period — less than a third.",
  },
  {
    question: "How does inflation affect my real returns?",
    answer:
      "Inflation erodes purchasing power. If your savings grow at 6% annually but inflation runs at 3%, your real return is closer to 3% — about half the headline rate. Over 20+ years the gap becomes dramatic: $100,000 nominal in 20 years at 3% inflation has the purchasing power of about $55,000 in today's dollars.",
  },
  {
    question: "What is the difference between monthly, quarterly, and annual compounding?",
    answer:
      "With the same nominal rate, more frequent compounding produces slightly higher returns. For example, $10,000 at 6% for 20 years yields about $33,102 with annual compounding and $33,196 with monthly compounding — a difference of less than 1%. The rate itself matters far more than the compounding frequency.",
  },
  {
    question: "Is this calculator the same as a ROI or investment return calculator?",
    answer:
      "It is a forward-looking projection tool. It assumes a fixed annual return, which is an oversimplification for real markets where returns vary year to year. Use it for planning and intuition, not as a guarantee. For variable-return scenarios, run multiple scenarios with different assumed rates to bracket the outcome.",
  },
  {
    question: "Is this compound interest calculator free?",
    answer:
      "Yes. LoanCalc is completely free, requires no signup, and runs entirely in your browser. Your inputs never leave your device.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LoanCalc Compound Interest Calculator",
  url: `${SITE_URL}/compound-interest-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free compound interest calculator with monthly contributions, inflation adjustment, and a year-by-year growth schedule.",
};

export default function CompoundInterestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Compound Interest Calculator
          </h1>
          <p className="mt-3 text-lg text-zinc-600">
            See how your savings and investments grow with monthly
            contributions, compound frequency, and inflation adjustment.
          </p>
        </header>

        <CompoundInterestCalculator />

        <section className="mt-12 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900">
            How to use this compound interest calculator
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-zinc-700">
            <li>
              Enter your <strong>initial deposit</strong> (or 0 if you are
              starting from scratch) and the <strong>monthly contribution</strong>{" "}
              you plan to add.
            </li>
            <li>
              Enter the <strong>annual interest rate</strong> you expect to
              earn. Long-run stock-market averages are 7%–10% nominal; savings
              accounts and CDs are typically lower.
            </li>
            <li>
              Pick a <strong>time horizon</strong> in years and a{" "}
              <strong>compound frequency</strong> (monthly, quarterly, or
              annually). The difference between frequencies is small compared
              to the difference between starting early and starting late.
            </li>
            <li>
              Optionally set an <strong>inflation rate</strong> to see the real
              (today&apos;s dollars) value of your future balance.
            </li>
          </ol>
        </section>

        <section className="mt-12 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900">
            The compound interest formula
          </h2>
          <div className="mt-3 space-y-3 text-zinc-700">
            <p>
              The standard compound interest formula for a one-time deposit is:
            </p>
            <p className="rounded-md bg-zinc-100 p-3 font-mono text-xs sm:text-sm">
              A = P × (1 + r/n)<sup>nt</sup>
            </p>
            <p>
              Where <strong>P</strong> is the principal, <strong>r</strong> is
              the annual rate (decimal), <strong>n</strong> is the number of
              compounding periods per year, and <strong>t</strong> is the time
              in years.
            </p>
            <p>
              For a regular monthly contribution <strong>PMT</strong>, the
              future value of the contributions is:
            </p>
            <p className="rounded-md bg-zinc-100 p-3 font-mono text-xs sm:text-sm">
              FV = PMT × [((1 + r/n)<sup>nt</sup> − 1) / (r/n)]
            </p>
            <p>
              This calculator uses a month-by-month simulation so monthly
              contributions and arbitrary compound frequencies combine
              correctly.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm open:shadow-md"
              >
                <summary className="cursor-pointer text-base font-semibold text-zinc-900 marker:hidden">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
