export type CompoundFrequency = "annually" | "quarterly" | "monthly";

export interface CompoundInterestInput {
  principal: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  compoundFrequency: CompoundFrequency;
  inflationRate: number;
}

export interface YearlySnapshot {
  year: number;
  startBalance: number;
  contributions: number;
  interest: number;
  endBalance: number;
  realValue: number;
}

export interface CompoundInterestResult {
  finalBalance: number;
  realValue: number;
  totalContributions: number;
  totalInterest: number;
  principalRatio: number;
  interestRatio: number;
  schedule: YearlySnapshot[];
}

const MAX_YEARS = 50;

function assertValid(input: CompoundInterestInput): void {
  if (!Number.isFinite(input.principal) || input.principal < 0) {
    throw new Error(`Invalid principal: ${input.principal}. Must be >= 0.`);
  }
  if (
    !Number.isFinite(input.monthlyContribution) ||
    input.monthlyContribution < 0
  ) {
    throw new Error(
      `Invalid monthlyContribution: ${input.monthlyContribution}. Must be >= 0.`,
    );
  }
  if (
    !Number.isFinite(input.annualRate) ||
    input.annualRate < 0 ||
    input.annualRate > 100
  ) {
    throw new Error(
      `Invalid annualRate: ${input.annualRate}. Must be between 0 and 100.`,
    );
  }
  if (
    !Number.isInteger(input.years) ||
    input.years <= 0 ||
    input.years > MAX_YEARS
  ) {
    throw new Error(
      `Invalid years: ${input.years}. Must be a positive integer up to ${MAX_YEARS}.`,
    );
  }
  if (
    !Number.isFinite(input.inflationRate) ||
    input.inflationRate < 0 ||
    input.inflationRate > 50
  ) {
    throw new Error(
      `Invalid inflationRate: ${input.inflationRate}. Must be between 0 and 50.`,
    );
  }
  const validFrequencies: CompoundFrequency[] = [
    "annually",
    "quarterly",
    "monthly",
  ];
  if (!validFrequencies.includes(input.compoundFrequency)) {
    throw new Error(
      `Invalid compoundFrequency: ${input.compoundFrequency}.`,
    );
  }
}

function compoundingMonthsPerYear(freq: CompoundFrequency): number {
  if (freq === "monthly") return 12;
  if (freq === "quarterly") return 4;
  return 1;
}

export function calculateCompoundInterest(
  input: CompoundInterestInput,
): CompoundInterestResult {
  assertValid(input);

  const periodsPerYear = compoundingMonthsPerYear(input.compoundFrequency);
  const monthlyRate = input.annualRate / 100 / periodsPerYear;
  const totalMonths = input.years * 12;
  const monthsBetweenCompounds = 12 / periodsPerYear;

  const schedule: YearlySnapshot[] = [];
  let balance = input.principal;
  let yearContributions = 0;
  let yearInterest = 0;
  const monthlyInflation = input.inflationRate / 100 / 12;
  const monthlyContribution = input.monthlyContribution;

  for (let m = 1; m <= totalMonths; m++) {
    const yearStart = m === 1 ? balance : balance;
    balance += monthlyContribution;
    yearContributions += monthlyContribution;

    const isCompoundMonth =
      m % monthsBetweenCompounds === 0 || m === totalMonths;
    if (isCompoundMonth && monthlyRate > 0) {
      const interest = balance * monthlyRate;
      balance += interest;
      yearInterest += interest;
    }

    if (m % 12 === 0 || m === totalMonths) {
      const yearsElapsed = Math.ceil(m / 12);
      const realValue =
        monthlyInflation > 0
          ? balance / Math.pow(1 + monthlyInflation, m)
          : balance;
      schedule.push({
        year: yearsElapsed,
        startBalance: yearStart,
        contributions: yearContributions,
        interest: yearInterest,
        endBalance: balance,
        realValue,
      });
      yearContributions = 0;
      yearInterest = 0;
    }
  }

  const totalContributions = input.principal + input.monthlyContribution * 12 * input.years;
  const totalInterest = balance - totalContributions;
  const finalRealValue =
    monthlyInflation > 0
      ? balance / Math.pow(1 + monthlyInflation, totalMonths)
      : balance;

  return {
    finalBalance: balance,
    realValue: finalRealValue,
    totalContributions,
    totalInterest: Math.max(0, totalInterest),
    principalRatio:
      totalContributions > 0 ? totalContributions / balance : 0,
    interestRatio:
      totalContributions > 0 ? Math.max(0, totalInterest) / balance : 0,
    schedule,
  };
}
