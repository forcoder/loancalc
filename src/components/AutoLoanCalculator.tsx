"use client";

import { useMemo, useState } from "react";
import {
  calculateAutoLoan,
  type AutoLoanInput,
  type AutoLoanResult,
} from "@/lib/auto-loan";

const DEFAULTS = {
  vehiclePrice: "35000",
  downPayment: "5000",
  apr: "6.5",
  termYears: "5",
};

const TERM_PRESETS = [
  { label: "3 years", value: "3" },
  { label: "4 years", value: "4" },
  { label: "5 years", value: "5" },
  { label: "6 years", value: "6" },
  { label: "7 years", value: "7" },
];

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

export function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(DEFAULTS.vehiclePrice);
  const [downPayment, setDownPayment] = useState(DEFAULTS.downPayment);
  const [apr, setApr] = useState(DEFAULTS.apr);
  const [termYears, setTermYears] = useState(DEFAULTS.termYears);

  const parsed: AutoLoanInput = useMemo(
    () => ({
      vehiclePrice: Number(vehiclePrice) || 0,
      downPayment: Number(downPayment) || 0,
      apr: Number(apr) || 0,
      termYears: parseInt(termYears, 10) || 0,
    }),
    [vehiclePrice, downPayment, apr, termYears],
  );

  let result: AutoLoanResult | null = null;
  let error: string | null = null;
  try {
    result = calculateAutoLoan(parsed);
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
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">
          Loan details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="vehicle-price"
            label="Vehicle price"
            value={vehiclePrice}
            onChange={setVehiclePrice}
            prefix="$"
          />
          <Field
            id="down-payment"
            label="Down payment"
            value={downPayment}
            onChange={setDownPayment}
            prefix="$"
          />
          <Field
            id="apr"
            label="Interest rate (APR)"
            value={apr}
            onChange={setApr}
            suffix="%"
          />
          <div>
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Loan term
            </span>
            <div className="flex flex-wrap gap-2">
              {TERM_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setTermYears(preset.value)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    termYears === preset.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
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
            <dt className="opacity-75">Loan amount</dt>
            <dd className="font-medium">{formatCurrency(result.loanAmount)}</dd>
          </div>
          <div>
            <dt className="opacity-75">Total interest</dt>
            <dd className="font-medium">
              {formatCurrency(result.totalInterest)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">Total paid back</dt>
            <dd className="font-medium">{formatCurrency(result.totalCost)}</dd>
          </div>
          <div>
            <dt className="opacity-75">Loan term</dt>
            <dd className="font-medium">{parsed.termYears} years</dd>
          </div>
        </dl>
      </section>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">
          True cost of the vehicle
        </h2>
        <p className="text-sm text-zinc-600">
          The sticker price is just the start. The total amount you&apos;ll
          spend includes the loan interest.
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-zinc-600">Vehicle price</dt>
            <dd className="mt-1 text-xl font-semibold text-zinc-900">
              {formatCurrency(parsed.vehiclePrice)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">+ Interest paid</dt>
            <dd className="mt-1 text-xl font-semibold text-zinc-900">
              {formatCurrency(result.totalInterest)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">= True cost</dt>
            <dd className="mt-1 text-xl font-semibold text-blue-700">
              {formatCurrency(result.totalLoanAmount)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}