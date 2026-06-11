import type { Metadata } from "next";
import { MortgageCalculator } from "@/components/MortgageCalculator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loancalc-eta.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Free Mortgage Calculator with Taxes & Amortization | LoanCalc",
    template: "%s | LoanCalc",
  },
  description:
    "Calculate your monthly mortgage payment including principal, interest, property taxes, insurance, HOA, and PMI. See a full amortization schedule. Free, no signup.",
  keywords: [
    "mortgage calculator",
    "monthly payment calculator",
    "loan amortization",
    "PMI calculator",
    "30 year fixed mortgage",
    "15 year fixed mortgage",
    "home loan calculator",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Free Mortgage Calculator with Taxes & Amortization",
    description:
      "Calculate monthly mortgage payment with taxes, insurance, HOA, and PMI. Full amortization schedule included.",
    type: "website",
    url: SITE_URL,
    siteName: "LoanCalc",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Mortgage Calculator with Taxes & Amortization",
    description:
      "Calculate monthly mortgage payment with taxes, insurance, HOA, and PMI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const FAQS = [
  {
    question: "How is my monthly mortgage payment calculated?",
    answer:
      "We use the standard amortization formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1], where P is the loan principal, r is the monthly interest rate (annual rate divided by 12), and n is the total number of monthly payments.",
  },
  {
    question: "What does a monthly mortgage payment include?",
    answer:
      "A complete monthly payment (often called PITI) covers Principal, Interest, property Taxes, and homeowners Insurance. Condos and planned communities may also include HOA fees. If your down payment is below 20%, lenders typically require Private Mortgage Insurance (PMI).",
  },
  {
    question: "What is PMI and when is it required?",
    answer:
      "Private Mortgage Insurance (PMI) protects the lender if you default. It is usually required when your down payment is less than 20% of the home's value. PMI typically costs 0.5% to 1.5% of the loan annually, and can usually be removed once you reach 22% equity.",
  },
  {
    question: "Should I choose a 30-year or 15-year mortgage?",
    answer:
      "A 30-year fixed mortgage has lower monthly payments but higher total interest. A 15-year fixed has higher monthly payments but builds equity faster and saves substantially on interest. Choose based on your monthly budget and long-term financial goals.",
  },
  {
    question: "What's the difference between interest rate and APR?",
    answer:
      "The interest rate is the cost to borrow the principal. The Annual Percentage Rate (APR) includes the interest rate plus other charges like origination fees, discount points, and mortgage insurance. APR gives a fuller picture of the loan's true yearly cost.",
  },
  {
    question: "How accurate is this mortgage calculator?",
    answer:
      "This calculator uses the exact formula lenders use. The output matches what your lender will quote, assuming you enter the same loan amount, rate, term, taxes, insurance, and HOA. Actual loan offers may include additional fees not modeled here.",
  },
  {
    question: "Are property taxes and insurance included?",
    answer:
      "This calculator can include estimated monthly property taxes, homeowners insurance, HOA fees, and PMI. Toggle the optional fields to see how they affect your total monthly payment.",
  },
  {
    question: "Is this mortgage calculator free to use?",
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
  name: "LoanCalc Mortgage Calculator",
  url: SITE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free mortgage calculator with taxes, insurance, HOA, PMI, and full amortization schedule.",
};

export default function HomePage() {
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

          <footer className="mt-12 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500">
            <p>
              © {new Date().getFullYear()} LoanCalc. Estimates only — not
              financial advice.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
