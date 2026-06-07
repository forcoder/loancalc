"use client";

import { useMemo, useState } from "react";
import {
  calculateMortgage,
  type MortgageInput,
  type MortgageResult,
} from "@/lib/mortgage";

const DEFAULTS: Record<string, string> = {
  principal: "400000",
  annualRate: "6.5",
  termYears: "30",
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
  step?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  step,
}: FieldProps) {
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
          step={step ?? "any"}
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

export function MortgageCalculator() {
  const [principal, setPrincipal] = useState(DEFAULTS.principal);
  const [annualRate, setAnnualRate] = useState(DEFAULTS.annualRate);
  const [termYears, setTermYears] = useState(DEFAULTS.termYears);
  const [showAmortization, setShowAmortization] = useState(false);

  const parsed: MortgageInput = useMemo(
    () => ({
      principal: Number(principal) || 0,
      annualRate: Number(annualRate) || 0,
      termYears: parseInt(termYears, 10) || 0,
    }),
    [principal, annualRate, termYears],
  );

  let result: MortgageResult | null = null;
  let error: string | null = null;
  try {
    result = calculateMortgage(parsed);
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
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            id="principal"
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            prefix="$"
          />
          <Field
            id="rate"
            label="Interest rate"
            value={annualRate}
            onChange={setAnnualRate}
            suffix="%"
            step="0.125"
          />
          <Field
            id="term"
            label="Loan term"
            value={termYears}
            onChange={setTermYears}
            suffix="years"
          />
        </div>
      </div>

      <section
        role="region"
        aria-label="Monthly payment"
        className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-sm"
      >
        <p className="text-sm uppercase tracking-wide opacity-90">
          Monthly payment
        </p>
        <p className="mt-1 text-5xl font-bold">
          {formatCurrency(result.monthlyPayment)}
          <span className="text-2xl font-normal opacity-75">/mo</span>
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="opacity-75">Loan principal</dt>
            <dd className="font-medium">{formatCurrency(parsed.principal)}</dd>
          </div>
          <div>
            <dt className="opacity-75">Total interest</dt>
            <dd className="font-medium">
              {formatCurrency(result.totalInterest)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">Total cost</dt>
            <dd className="font-medium">
              {formatCurrency(result.totalPayment)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">Payoff</dt>
            <dd className="font-medium">{parsed.termYears} years</dd>
          </div>
        </dl>
      </section>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <button
          type="button"
          onClick={() => setShowAmortization((s) => !s)}
          className="flex w-full items-center justify-between text-left"
          aria-expanded={showAmortization}
        >
          <span className="text-lg font-semibold text-zinc-900">
            Amortization schedule
          </span>
          <span className="text-sm text-blue-600">
            {showAmortization ? "Hide" : "Show"}
          </span>
        </button>
        {showAmortization ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-zinc-600">
                  <th className="py-2 pr-2">Month</th>
                  <th className="py-2 pr-2">Principal</th>
                  <th className="py-2 pr-2">Interest</th>
                  <th className="py-2 pr-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.amortization.map((row) => (
                  <tr key={row.month} className="border-b border-zinc-100">
                    <td className="py-1 pr-2">{row.month}</td>
                    <td className="py-1 pr-2">
                      {formatCurrency(row.principal)}
                    </td>
                    <td className="py-1 pr-2">
                      {formatCurrency(row.interest)}
                    </td>
                    <td className="py-1 pr-2">
                      {formatCurrency(row.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
