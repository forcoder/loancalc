import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { getAllStateSlugs, getStateBySlug, type StateFaq } from "@/lib/states";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loancalc.app";

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};
  const title = `${state.name} Mortgage Calculator (${new Date().getFullYear()}) | LoanCalc`;
  const description = `Calculate your monthly mortgage payment in ${state.name}. Includes ${state.name} property tax (~${(state.propertyTaxRate * 100).toFixed(1)}%), insurance, and a full amortization schedule. Free, no signup.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${state.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${state.slug}`,
      type: "website",
    },
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildFaqJsonLd(faqs: StateFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export default async function StatePage({ params }: PageProps) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const monthlyPropertyTax =
    (state.medianHomePrice * state.propertyTaxRate) / 12;
  const estimatedInsurance = state.medianHomePrice * 0.0035 / 12;
  const faqJsonLd = buildFaqJsonLd(state.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <nav className="mb-4 text-sm text-zinc-600">
            <Link href="/" className="hover:text-blue-600 hover:underline">
              Mortgage Calculator
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900">{state.name}</span>
          </nav>

          <header className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {state.name} Mortgage Calculator
            </h1>
            <p className="mt-2 text-lg text-zinc-600">
              Estimate your monthly mortgage payment in {state.name} with
              state-specific property tax, insurance, and a full amortization
              schedule.
            </p>
          </header>

          <section className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Property tax
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {(state.propertyTaxRate * 100).toFixed(2)}%
              </p>
              <p className="text-xs text-zinc-500">
                ≈ {formatCurrency(monthlyPropertyTax)}/mo on median home
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Median home price
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {formatCurrency(state.medianHomePrice)}
              </p>
              <p className="text-xs text-zinc-500">
                80% LTV ≈ {formatCurrency(state.defaultPrincipal)} loan
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                State income tax
              </p>
              <p className="mt-1 text-base font-semibold text-zinc-900">
                {state.stateIncomeTaxNote}
              </p>
              <p className="text-xs text-zinc-500">
                Major cities: {state.topCities.slice(0, 3).join(", ")}
              </p>
            </div>
          </section>

          <MortgageCalculator />

          <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <strong>Estimates only.</strong> Property tax rates and median home
            prices shown are 2024–2025 estimates for {state.name} and may not
            reflect your specific county, school district, or homestead
            exemption. Insurance estimate ≈ 0.35% of home value annually.
            Confirm final terms with your lender.
          </p>

          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900">
              {state.name} mortgage FAQs
            </h2>
            <div className="space-y-3">
              {state.faqs.map((f) => (
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
