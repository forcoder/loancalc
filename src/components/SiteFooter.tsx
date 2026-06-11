import Link from "next/link";

interface SiteLink {
  href: string;
  label: string;
}

const TOOL_LINKS: SiteLink[] = [
  { href: "/", label: "Mortgage Calculator" },
  { href: "/refinance", label: "Refinance Calculator" },
  { href: "/auto-loan", label: "Auto Loan Calculator" },
  { href: "/fha-loan-calculator", label: "FHA Loan Calculator" },
  { href: "/pmi-calculator", label: "PMI Calculator" },
  { href: "/15-vs-30-year-mortgage", label: "15 vs 30 Year Mortgage" },
];

interface NavSectionProps {
  title: string;
  links: SiteLink[];
}

function NavSection({ title, links }: NavSectionProps) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        {title}
      </h2>
      <ul className="space-y-1.5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-zinc-700 transition hover:text-blue-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ stateLinks = [] }: { stateLinks?: SiteLink[] }) {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <NavSection title="Calculators" links={TOOL_LINKS} />
          {stateLinks.length > 0 ? (
            <NavSection title="By state" links={stateLinks} />
          ) : null}
        </div>
        <p className="mt-8 text-xs text-zinc-500">
          LoanCalc — free mortgage, refinance, and loan calculators. Estimates
          only. Not financial advice. Verify all numbers with your lender
          before committing.
        </p>
      </div>
    </footer>
  );
}