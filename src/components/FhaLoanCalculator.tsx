"use client";

import { useMemo, useState } from "react";
import {
  calculateMortgage,
  type MortgageInput,
  type ExtraMonthly,
} from "@/lib/mortgage";

const DEFAULTS = {
  homePrice: "350000",
  downPaymentPercent: "3.5",
  interestRate: "6.5",
  termYears: "30",
};

const FHA_MIP_RATE = 0.0055;
const FHA_UPFRONT_MIP = 0.0175;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function FhaLoanCalculator() {
  const [homePrice, setHomePrice] = useState(DEFAULTS.homePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(
    DEFAULTS.downPaymentPercent,
  );
  const [interestRate, setInterestRate] = useState(DEFAULTS.interestRate);
  const [termYears, setTermYears] = useState(DEFAULTS.termYears);

  const parsed = useMemo(() => {
    const price = Number(homePrice) || 0;
    const downPct = Number(downPaymentPercent) || 0;
    const downPayment = (price * downPct) / 100;
    const loanAmount = price - downPayment;
    const upfrontMIP = loanAmount * FHA_UPFRONT_MIP;
    const baseLoan = loanAmount + upfrontMIP;
    const annualMIP = baseLoan * FHA_MIP_RATE;
    const monthlyMIP = annualMIP / 12;

    const input: MortgageInput = {
      principal: baseLoan,
      annualRate: Number(interestRate) || 0,
      termYears: parseInt(termYears, 10) || 30,
    };
    const extra: ExtraMonthly = {
      pmi: monthlyMIP,
    };
    const result = calculateMortgage(input, extra);
    return {
      price,
      downPayment,
      loanAmount,
      upfrontMIP,
      monthlyMIP,
      annualMIP,
      result,
    };
  }, [homePrice, downPaymentPercent, interestRate, termYears]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">FHA loan</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="fha-price" className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Home price
            </span>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                $
              </span>
              <input
                id="fha-price"
                type="number"
                step="any"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white pl-7 pr-3 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </label>
          <label htmlFor="fha-down" className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Down payment (%)
            </span>
            <div className="relative">
              <input
                id="fha-down"
                type="number"
                step="0.5"
                min="3.5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 pr-12 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                %
              </span>
            </div>
            <span className="mt-1 block text-xs text-zinc-500">
              FHA minimum is 3.5% with 580+ credit score (10% with 500–579).
            </span>
          </label>
          <label htmlFor="fha-rate" className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Interest rate
            </span>
            <div className="relative">
              <input
                id="fha-rate"
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
          <label htmlFor="fha-term" className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">
              Loan term
            </span>
            <div className="relative">
              <input
                id="fha-term"
                type="number"
                step="1"
                value={termYears}
                onChange={(e) => setTermYears(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 pr-16 py-2 text-base text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                years
              </span>
            </div>
          </label>
        </div>
      </div>

      <section
        role="region"
        aria-label="Monthly payment"
        className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-sm"
      >
        <p className="text-sm uppercase tracking-wide opacity-90">
          Monthly payment (PITI)
        </p>
        <p className="mt-1 text-5xl font-bold">
          {formatCurrency(parsed.result.monthlyBreakdown.total)}
          <span className="text-2xl font-normal opacity-75">/mo</span>
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="opacity-75">Principal &amp; interest</dt>
            <dd className="font-medium">
              {formatCurrency(parsed.result.monthlyBreakdown.principalAndInterest)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">FHA MIP (monthly)</dt>
            <dd className="font-medium">
              {formatCurrency(parsed.monthlyMIP)}
            </dd>
          </div>
          <div>
            <dt className="opacity-75">Base loan amount</dt>
            <dd className="font-medium">{formatCurrency(parsed.loanAmount)}</dd>
          </div>
          <div>
            <dt className="opacity-75">Upfront MIP (1.75%)</dt>
            <dd className="font-medium">
              {formatCurrency(parsed.upfrontMIP)}
            </dd>
          </div>
        </dl>
      </section>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">
          FHA loan breakdown
        </h2>
        <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-zinc-600">Home price</dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-900">
              {formatCurrency(parsed.price)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">
              Down payment ({DEFAULTS.downPaymentPercent}%)
            </dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-900">
              {formatCurrency(parsed.downPayment)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">Loan amount (after down)</dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-900">
              {formatCurrency(parsed.loanAmount)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">Total MIP over loan life</dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-900">
              {formatCurrency(
                parsed.monthlyMIP * parsed.result.amortization.length,
              )}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">Total interest paid</dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-900">
              {formatCurrency(parsed.result.totalInterest)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">Total cost of loan</dt>
            <dd className="mt-1 text-lg font-semibold text-blue-700">
              {formatCurrency(parsed.result.totalCost)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}