"use client";

import { useMemo, useState } from "react";
import {
  calculateMortgage,
  type MortgageInput,
  type ExtraMonthly,
} from "@/lib/mortgage";

const DEFAULTS = {
  homePrice: "400000",
  downPaymentPercent: "10",
  interestRate: "6.5",
  termYears: "30",
  pmiRate: "0.5",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function PmiCalculator() {
  const [homePrice, setHomePrice] = useState(DEFAULTS.homePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(
    DEFAULTS.downPaymentPercent,
  );
  const [interestRate, setInterestRate] = useState(DEFAULTS.interestRate);
  const [termYears, setTermYears] = useState(DEFAULTS.termYears);
  const [pmiRate, setPmiRate] = useState(DEFAULTS.pmiRate);

  const parsed = useMemo(() => {
    const price = Number(homePrice) || 0;
    const downPct = Number(downPaymentPercent) || 0;
    const downPayment = (price * downPct) / 100;
    const loanAmount = price - downPayment;
    const annualPMI = loanAmount * (Number(pmiRate) || 0) * 0.01;
    const monthlyPMI = annualPMI / 12;

    const input: MortgageInput = {
      principal: loanAmount,
      annualRate: Number(interestRate) || 0,
      termYears: parseInt(termYears, 10) || 30,
    };
    const extra: ExtraMonthly = { pmi: monthlyPMI };
    const result = calculateMortgage(input, extra);

    const cancelThreshold = price * 0.22;
    let cancelMonth = 0;
    for (const row of result.amortization) {
      if (row.cumulativePrincipal >= loanAmount - (price - cancelThreshold)) {
        cancelMonth = row.month;
        break;
      }
    }

    return {
      price,
      downPayment,
      loanAmount,
      downPct,
      annualPMI,
      monthlyPMI,
      cancelMonth,
      result,
    };
  }, [homePrice, downPaymentPercent, interestRate, termYears, pmiRate]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">
          Loan with PMI
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="pmi-price" className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Home price
            </span>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                $
              </span>
              <input
                id="pmi-price"
                type="number"
                step="any"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white pl-7 pr-3 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </label>
          <label htmlFor="pmi-down" className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Down payment (%)
            </span>
            <div className="relative">
              <input
                id="pmi-down"
                type="number"
                step="0.5"
                max="20"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 pr-12 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                %
              </span>
            </div>
            <span className="mt-1 block text-xs text-zinc-500">
              PMI required when down &lt; 20%.
            </span>
          </label>
          <label htmlFor="pmi-rate" className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Interest rate
            </span>
            <div className="relative">
              <input
                id="pmi-rate"
                type="number"
                step="0.125"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 pr-12 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                %
              </span>
            </div>
          </label>
          <label htmlFor="pmi-pmi-rate" className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              PMI rate (annual)
            </span>
            <div className="relative">
              <input
                id="pmi-pmi-rate"
                type="number"
                step="0.05"
                value={pmiRate}
                onChange={(e) => setPmiRate(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 pr-12 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                %
              </span>
            </div>
            <span className="mt-1 block text-xs text-zinc-500">
              Typical: 0.3%–1.5% depending on credit / down payment.
            </span>
          </label>
        </div>
      </div>

      <section
        role="region"
        aria-label="Monthly payment"
        className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-sm"
      >
        <p className="text-sm uppercase tracking-wide opacity-90">
          Monthly payment (P&I + PMI)
        </p>
        <p className="mt-1 text-5xl font-bold">
          {formatCurrency(parsed.result.monthlyBreakdown.total)}
          <span className="text-2xl font-normal opacity-75">/mo</span>
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="opacity-75">P&amp;I only</dt>
            <dd className="font-medium">
              {formatCurrency(parsed.result.monthlyBreakdown.principalAndInterest)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">PMI (monthly)</dt>
            <dd className="font-medium">{formatCurrency(parsed.monthlyPMI)}</dd>
          </div>
          <div>
            <dt className="opacity-75">Down payment</dt>
            <dd className="font-medium">{formatCurrency(parsed.downPayment)}</dd>
          </div>
          <div>
            <dt className="opacity-75">Loan amount</dt>
            <dd className="font-medium">{formatCurrency(parsed.loanAmount)}</dd>
          </div>
        </dl>
      </section>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">
          PMI cost and cancellation
        </h2>
        <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-zinc-600">Annual PMI cost</dt>
            <dd className="mt-1 text-xl font-semibold text-zinc-900">
              {formatCurrency(parsed.annualPMI)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">
              Total PMI until 22% equity (auto-cancel)
            </dt>
            <dd className="mt-1 text-xl font-semibold text-zinc-900">
              {formatCurrency(parsed.monthlyPMI * parsed.cancelMonth)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">Estimated PMI duration</dt>
            <dd className="mt-1 text-xl font-semibold text-blue-700">
              {Math.floor(parsed.cancelMonth / 12)} years{" "}
              {parsed.cancelMonth % 12} months
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-zinc-500">
          Most lenders auto-cancel PMI once you reach 22% equity based on the
          original purchase price (per the federal Homeowners Protection Act).
          You can also request cancellation at 20% equity.
        </p>
      </div>
    </div>
  );
}