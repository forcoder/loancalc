import { calculateMortgage, type MortgageInput } from "./mortgage";

export interface AutoLoanInput {
  vehiclePrice: number;
  downPayment: number;
  apr: number;
  termYears: number;
}

export interface AutoLoanResult {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  monthlyBreakdown: {
    principalAndInterest: number;
    total: number;
  };
  totalLoanAmount: number;
}

function assertValid(input: AutoLoanInput): void {
  if (!Number.isFinite(input.vehiclePrice) || input.vehiclePrice < 0) {
    throw new Error(`Invalid vehiclePrice: ${input.vehiclePrice}.`);
  }
  if (!Number.isFinite(input.downPayment) || input.downPayment < 0) {
    throw new Error(`Invalid downPayment: ${input.downPayment}.`);
  }
  if (input.downPayment > input.vehiclePrice) {
    throw new Error(
      `Down payment (${input.downPayment}) cannot exceed vehicle price (${input.vehiclePrice}).`,
    );
  }
  if (
    !Number.isFinite(input.apr) ||
    input.apr < 0 ||
    input.apr > 100
  ) {
    throw new Error(`Invalid apr: ${input.apr}.`);
  }
  if (!Number.isInteger(input.termYears) || input.termYears <= 0) {
    throw new Error(
      `Invalid termYears: ${input.termYears}. Must be a positive integer.`,
    );
  }
}

export function calculateAutoLoan(input: AutoLoanInput): AutoLoanResult {
  assertValid(input);

  const loanAmount = input.vehiclePrice - input.downPayment;

  if (loanAmount === 0) {
    return {
      loanAmount: 0,
      monthlyPayment: 0,
      totalInterest: 0,
      totalCost: 0,
      monthlyBreakdown: { principalAndInterest: 0, total: 0 },
      totalLoanAmount: input.vehiclePrice,
    };
  }

  const mortgageInput: MortgageInput = {
    principal: loanAmount,
    annualRate: input.apr,
    termYears: input.termYears,
  };
  const result = calculateMortgage(mortgageInput);

  return {
    loanAmount,
    monthlyPayment: result.monthlyPayment,
    totalInterest: result.totalInterest,
    totalCost: result.totalPayment,
    monthlyBreakdown: {
      principalAndInterest: result.monthlyPayment,
      total: result.monthlyPayment,
    },
    totalLoanAmount: input.vehiclePrice + result.totalInterest,
  };
}