import { calculateMortgage, type MortgageInput } from "./mortgage";

export interface RefinanceInput {
  currentBalance: number;
  currentRate: number;
  yearsRemaining: number;
  newRate: number;
  newTermYears: number;
  closingCosts: number;
}

export interface RefinanceResult {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  totalSavingsOverLife: number;
  breakEvenMonths: number;
  totalInterestCurrent: number;
  totalInterestNew: number;
  currentAmortizationLength: number;
  newAmortizationLength: number;
}

function assertValid(input: RefinanceInput): void {
  const positive = {
    currentBalance: input.currentBalance,
    yearsRemaining: input.yearsRemaining,
    newTermYears: input.newTermYears,
    closingCosts: input.closingCosts,
  };
  for (const [k, v] of Object.entries(positive)) {
    if (!Number.isFinite(v) || v < 0) {
      throw new Error(`Invalid ${k}: ${v}. Must be >= 0.`);
    }
  }
  if (
    !Number.isFinite(input.currentRate) ||
    input.currentRate < 0 ||
    input.currentRate > 100
  ) {
    throw new Error(`Invalid currentRate: ${input.currentRate}.`);
  }
  if (
    !Number.isFinite(input.newRate) ||
    input.newRate < 0 ||
    input.newRate > 100
  ) {
    throw new Error(`Invalid newRate: ${input.newRate}.`);
  }
  if (input.yearsRemaining > 0 && !Number.isInteger(input.yearsRemaining)) {
    throw new Error(
      `Invalid yearsRemaining: ${input.yearsRemaining}. Must be a positive integer.`,
    );
  }
  if (input.newTermYears > 0 && !Number.isInteger(input.newTermYears)) {
    throw new Error(
      `Invalid newTermYears: ${input.newTermYears}. Must be a positive integer.`,
    );
  }
}

export function calculateRefinance(input: RefinanceInput): RefinanceResult {
  assertValid(input);

  const current: MortgageInput = {
    principal: input.currentBalance,
    annualRate: input.currentRate,
    termYears: input.yearsRemaining,
  };
  const next: MortgageInput = {
    principal: input.currentBalance,
    annualRate: input.newRate,
    termYears: input.newTermYears,
  };

  const currentResult = calculateMortgage(current);
  const newResult = calculateMortgage(next);

  const monthlySavings = currentResult.monthlyPayment - newResult.monthlyPayment;
  const interestDelta = currentResult.totalInterest - newResult.totalInterest;
  const totalSavingsOverLife = interestDelta - input.closingCosts;
  const breakEvenMonths =
    monthlySavings > 0
      ? Math.ceil(input.closingCosts / monthlySavings)
      : Infinity;

  return {
    currentMonthlyPayment: currentResult.monthlyPayment,
    newMonthlyPayment: newResult.monthlyPayment,
    monthlySavings,
    totalSavingsOverLife,
    breakEvenMonths,
    totalInterestCurrent: currentResult.totalInterest,
    totalInterestNew: newResult.totalInterest,
    currentAmortizationLength: input.yearsRemaining,
    newAmortizationLength: input.newTermYears,
  };
}