"use client";

import { useMemo, useState } from "react";
import {
  calculateCompoundInterest,
  type CompoundFrequency,
  type CompoundInterestInput,
  type CompoundInterestResult,
} from "@/lib/compound-interest";

const DEFAULTS = {
  principal: "10000",
  monthlyContribution: "200",
  annualRate: "7",
  years: "20",
  compoundFrequency: "monthly" as CompoundFrequency,
  inflationRate: "3",
};

const FREQUENCY_OPTIONS: { label: string; value: CompoundFrequency }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Annually", value: "annually" },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return "$0";
  return currencyFormatter.format(value);
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
}

function Field({ id, label, value, onChange, prefix, suffix, min, max }: FieldProps) {
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
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${prefix ? "pl-7" : ""} ${suffix ? "pr-10" : ""}`}
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

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(DEFAULTS.principal);
  const [monthlyContribution, setMonthlyContribution] = useState(
    DEFAULTS.monthlyContribution,
  );
  const [annualRate, setAnnualRate] = useState(DEFAULTS.annualRate);
  const [years, setYears] = useState(DEFAULTS.years);
  const [compoundFrequency, setCompoundFrequency] = useState<CompoundFrequency>(
    DEFAULTS.compoundFrequency,
  );
  const [inflationRate, setInflationRate] = useState(DEFAULTS.inflationRate);
  const [showSchedule, setShowSchedule] = useState(false);

  const parsed: CompoundInterestInput = useMemo(
    () => ({
      principal: Number(principal) || 0,
      monthlyContribution: Number(monthlyContribution) || 0,
      annualRate: Number(annualRate) || 0,
      years: parseInt(years, 10) || 0,
      compoundFrequency,
      inflationRate: Number(inflationRate) || 0,
    }),
    [
      principal,
      monthlyContribution,
      annualRate,
      years,
      compoundFrequency,
      inflationRate,
    ],
  );

  let result: CompoundInterestResult | null = null;
  let error: string | null = null;
  try {
    result = calculateCompoundInterest(parsed);
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

  const showRealValue = parsed.inflationRate > 0;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">
          Investment details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="principal"
            label="Initial deposit"
            value={principal}
            onChange={setPrincipal}
            prefix="$"
            min={0}
          />
          <Field
            id="monthly-contribution"
            label="Monthly contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            prefix="$"
            min={0}
          />
          <Field
            id="annual-rate"
            label="Annual interest rate"
            value={annualRate}
            onChange={setAnnualRate}
            suffix="%"
            min={0}
            max={100}
          />
          <Field
            id="years"
            label="Years to grow"
            value={years}
            onChange={setYears}
            suffix="yrs"
            min={1}
            max={50}
          />
          <div>
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Compound frequency
            </span>
            <div className="flex flex-wrap gap-2">
              {FREQUENCY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCompoundFrequency(opt.value)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    compoundFrequency === opt.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <Field
            id="inflation-rate"
            label="Inflation rate (set 0 to ignore)"
            value={inflationRate}
            onChange={setInflationRate}
            suffix="%"
            min={0}
            max={50}
          />
        </div>
      </div>

      <section
        role="region"
        aria-label="Final balance"
        className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-sm"
      >
        <p className="text-sm uppercase tracking-wide opacity-90">
          Future balance
        </p>
        <p className="mt-1 text-5xl font-bold">
          {formatCurrency(result.finalBalance)}
        </p>
        {showRealValue ? (
          <p className="mt-1 text-sm opacity-90">
            ≈ {formatCurrency(result.realValue)} in today&apos;s dollars
            (after {parsed.inflationRate}% inflation)
          </p>
        ) : null}
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="opacity-75">Total contributions</dt>
            <dd className="font-medium">
              {formatCurrency(result.totalContributions)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">Interest earned</dt>
            <dd className="font-medium">
              {formatCurrency(result.totalInterest)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">From principal</dt>
            <dd className="font-medium">
              {percentFormatter.format(result.principalRatio)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">From interest</dt>
            <dd className="font-medium">
              {percentFormatter.format(result.interestRatio)}
            </dd>
          </div>
        </dl>
      </section>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">
          How your money grows
        </h2>
        <p className="text-sm text-zinc-600">
          Out of {formatCurrency(result.finalBalance)} after {parsed.years}{" "}
          years, you contribute {formatCurrency(result.totalContributions)} and
          compound interest adds {formatCurrency(result.totalInterest)}.
        </p>
        <div
          className="mt-4 flex h-8 w-full overflow-hidden rounded-lg border border-zinc-200"
          role="img"
          aria-label={`Principal ${percentFormatter.format(result.principalRatio)}, interest ${percentFormatter.format(result.interestRatio)}`}
        >
          <div
            className="bg-blue-600"
            style={{ width: `${result.principalRatio * 100}%` }}
            title={`Principal ${percentFormatter.format(result.principalRatio)}`}
          />
          <div
            className="bg-emerald-500"
            style={{ width: `${result.interestRatio * 100}%` }}
            title={`Interest ${percentFormatter.format(result.interestRatio)}`}
          />
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs text-zinc-600">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm bg-blue-600" />
            Principal
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm bg-emerald-500" />
            Interest
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <button
          type="button"
          onClick={() => setShowSchedule((v) => !v)}
          className="flex w-full items-center justify-between text-left"
          aria-expanded={showSchedule}
        >
          <h2 className="text-lg font-semibold text-zinc-900">
            Year-by-year schedule
          </h2>
          <span className="text-sm text-blue-600">
            {showSchedule ? "Hide" : "Show"}
          </span>
        </button>
        {showSchedule ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
                  <th className="py-2 pr-3">Year</th>
                  <th className="py-2 pr-3 text-right">Contributions</th>
                  <th className="py-2 pr-3 text-right">Interest</th>
                  <th className="py-2 pr-3 text-right">End balance</th>
                  {showRealValue ? (
                    <th className="py-2 pl-3 text-right">In today&apos;s $</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr
                    key={row.year}
                    className="border-b border-zinc-100 last:border-0"
                  >
                    <td className="py-2 pr-3 font-medium text-zinc-700">
                      {row.year}
                    </td>
                    <td className="py-2 pr-3 text-right text-zinc-600">
                      {formatCurrency(row.contributions)}
                    </td>
                    <td className="py-2 pr-3 text-right text-emerald-700">
                      {formatCurrency(row.interest)}
                    </td>
                    <td className="py-2 pr-3 text-right font-semibold text-zinc-900">
                      {formatCurrency(row.endBalance)}
                    </td>
                    {showRealValue ? (
                      <td className="py-2 pl-3 text-right text-zinc-600">
                        {formatCurrency(row.realValue)}
                      </td>
                    ) : null}
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
