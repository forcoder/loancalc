"use client";

import { useMemo, useState } from "react";
import {
  calculateRefinance,
  type RefinanceInput,
  type RefinanceResult,
} from "@/lib/refinance";

const DEFAULTS = {
  currentBalance: "300000",
  currentRate: "7.0",
  yearsRemaining: "28",
  newRate: "5.5",
  newTermYears: "30",
  closingCosts: "5000",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
}

function Field({ id, label, value, onChange, prefix, suffix }: FieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700">
        {label}
      </span>
      <div className="relative flex items-center">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 text-zinc-500">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="number"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${prefix ? "pl-7" : ""} ${suffix ? "pr-14" : ""}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 text-sm text-zinc-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

export function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState(DEFAULTS.currentBalance);
  const [currentRate, setCurrentRate] = useState(DEFAULTS.currentRate);
  const [yearsRemaining, setYearsRemaining] = useState(DEFAULTS.yearsRemaining);
  const [newRate, setNewRate] = useState(DEFAULTS.newRate);
  const [newTermYears, setNewTermYears] = useState(DEFAULTS.newTermYears);
  const [closingCosts, setClosingCosts] = useState(DEFAULTS.closingCosts);

  const parsed: RefinanceInput = useMemo(
    () => ({
      currentBalance: Number(currentBalance) || 0,
      currentRate: Number(currentRate) || 0,
      yearsRemaining: parseInt(yearsRemaining, 10) || 0,
      newRate: Number(newRate) || 0,
      newTermYears: parseInt(newTermYears, 10) || 0,
      closingCosts: Number(closingCosts) || 0,
    }),
    [
      currentBalance,
      currentRate,
      yearsRemaining,
      newRate,
      newTermYears,
      closingCosts,
    ],
  );

  let result: RefinanceResult | null = null;
  let error: string | null = null;
  try {
    result = calculateRefinance(parsed);
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

  const savingsPositive = result.monthlySavings > 0;
  const breakEvenLabel =
    !isFinite(result.breakEvenMonths) || result.breakEvenMonths <= 0
      ? "—"
      : result.breakEvenMonths === 1
        ? "1 month"
        : `${result.breakEvenMonths} months`;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">
          Current loan
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            id="current-balance"
            label="Current balance"
            value={currentBalance}
            onChange={setCurrentBalance}
            prefix="$"
          />
          <Field
            id="current-rate"
            label="Current rate"
            value={currentRate}
            onChange={setCurrentRate}
            suffix="%"
          />
          <Field
            id="years-remaining"
            label="Years remaining"
            value={yearsRemaining}
            onChange={setYearsRemaining}
            suffix="years"
          />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">New loan</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            id="new-rate"
            label="New rate"
            value={newRate}
            onChange={setNewRate}
            suffix="%"
          />
          <Field
            id="new-term"
            label="New term"
            value={newTermYears}
            onChange={setNewTermYears}
            suffix="years"
          />
          <Field
            id="closing-costs"
            label="Closing costs"
            value={closingCosts}
            onChange={setClosingCosts}
            prefix="$"
          />
        </div>
      </div>

      <section
        role="region"
        aria-label="Refinance savings"
        className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-sm"
      >
        <p className="text-sm uppercase tracking-wide opacity-90">
          Monthly savings
        </p>
        <p className="mt-1 text-5xl font-bold">
          {formatCurrency(Math.abs(result.monthlySavings))}
          <span className="text-2xl font-normal opacity-75">/mo</span>
        </p>
        <p className="mt-1 text-sm opacity-90">
          {savingsPositive
            ? "You save this amount each month after refinancing."
            : "Your payment would increase by this amount — refinancing may not be worth it."}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="opacity-75">Old payment</dt>
            <dd className="font-medium">
              {formatCurrency(result.currentMonthlyPayment)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">New payment</dt>
            <dd className="font-medium">
              {formatCurrency(result.newMonthlyPayment)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">Break-even</dt>
            <dd className="font-medium">{breakEvenLabel}</dd>
          </div>
          <div>
            <dt className="opacity-75">Lifetime savings</dt>
            <dd
              className={`font-medium ${result.totalSavingsOverLife < 0 ? "text-red-200" : ""}`}
            >
              {formatCurrency(result.totalSavingsOverLife)}
            </dd>
          </div>
        </dl>
      </section>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">
          Side-by-side comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-zinc-600">
                <th className="py-2 pr-2">Metric</th>
                <th className="py-2 pr-2">Current</th>
                <th className="py-2 pr-2">New</th>
                <th className="py-2 pr-2">Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="py-2 pr-2">Monthly payment</td>
                <td className="py-2 pr-2">
                  {formatCurrency(result.currentMonthlyPayment)}
                </td>
                <td className="py-2 pr-2">
                  {formatCurrency(result.newMonthlyPayment)}
                </td>
                <td
                  className={`py-2 pr-2 font-medium ${savingsPositive ? "text-emerald-600" : "text-red-600"}`}
                >
                  {savingsPositive ? "−" : "+"}
                  {formatCurrency(Math.abs(result.monthlySavings))}
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-2 pr-2">Total interest</td>
                <td className="py-2 pr-2">
                  {formatCurrency(result.totalInterestCurrent)}
                </td>
                <td className="py-2 pr-2">
                  {formatCurrency(result.totalInterestNew)}
                </td>
                <td className="py-2 pr-2 font-medium text-emerald-600">
                  −{formatCurrency(
                    result.totalInterestCurrent - result.totalInterestNew,
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-2">Loan length</td>
                <td className="py-2 pr-2">
                  {result.currentAmortizationLength} years
                </td>
                <td className="py-2 pr-2">
                  {result.newAmortizationLength} years
                </td>
                <td className="py-2 pr-2">
                  {result.newAmortizationLength - result.currentAmortizationLength >=
                  0
                    ? `+${result.newAmortizationLength - result.currentAmortizationLength}`
                    : result.newAmortizationLength -
                        result.currentAmortizationLength}{" "}
                  years
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}