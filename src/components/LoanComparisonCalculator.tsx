"use client";

import { useMemo, useState } from "react";
import { compareLoanTerms } from "@/lib/loan-comparison";

const DEFAULTS = {
  principal: "400000",
  annualRate: "6.5",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function LoanComparisonCalculator() {
  const [principal, setPrincipal] = useState(DEFAULTS.principal);
  const [annualRate, setAnnualRate] = useState(DEFAULTS.annualRate);

  const parsed = useMemo(
    () => ({
      principal: Number(principal) || 0,
      annualRate: Number(annualRate) || 0,
    }),
    [principal, annualRate],
  );

  let result;
  let error: string | null = null;
  try {
    result = compareLoanTerms(parsed.principal, parsed.annualRate);
  } catch (e) {
    error = e instanceof Error ? e.message : "Invalid input";
  }

  if (error) {
    return (
      <div
        className="rounded-lg border border-red-200 bg-red-50 p-4"
        role="alert"
      >
        <p className="font-medium text-red-900">Please fix your inputs:</p>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }
  if (!result) return null;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">Loan details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="principal" className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Loan amount
            </span>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                $
              </span>
              <input
                id="principal"
                type="number"
                step="any"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white pl-7 pr-3 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </label>
          <label htmlFor="rate" className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Interest rate
            </span>
            <div className="relative">
              <input
                id="rate"
                type="number"
                step="0.125"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 pr-12 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                %
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            15-year
          </p>
          <p className="mt-1 text-4xl font-bold text-zinc-900">
            {formatCurrency(result.payment15)}
            <span className="text-base font-normal text-zinc-500">/mo</span>
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-600">Total interest</dt>
              <dd className="font-medium text-zinc-900">
                {formatCurrency(result.totalInterest15)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-600">Total paid</dt>
              <dd className="font-medium text-zinc-900">
                {formatCurrency(parsed.principal + result.totalInterest15)}
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            30-year
          </p>
          <p className="mt-1 text-4xl font-bold text-zinc-900">
            {formatCurrency(result.payment30)}
            <span className="text-base font-normal text-zinc-500">/mo</span>
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-600">Total interest</dt>
              <dd className="font-medium text-zinc-900">
                {formatCurrency(result.totalInterest30)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-600">Total paid</dt>
              <dd className="font-medium text-zinc-900">
                {formatCurrency(parsed.principal + result.totalInterest30)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">
          The trade-off
        </h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-zinc-100 pb-2">
            <dt className="text-zinc-700">Extra monthly cost of 15-year</dt>
            <dd className="font-semibold text-zinc-900">
              +{formatCurrency(result.monthlySavingsWith30)}
            </dd>
          </div>
          <div className="flex justify-between border-b border-zinc-100 pb-2">
            <dt className="text-zinc-700">
              Total interest you save with 15-year
            </dt>
            <dd className="font-semibold text-emerald-600">
              {formatCurrency(result.totalInterestSavingsWith15)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-700">Years earlier you own it free</dt>
            <dd className="font-semibold text-zinc-900">15 years</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}