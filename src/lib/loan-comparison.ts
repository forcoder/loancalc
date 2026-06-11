import { calculateMortgage } from "./mortgage";

export interface LoanTermComparison {
  termYears15: number;
  termYears30: number;
  payment15: number;
  payment30: number;
  totalInterest15: number;
  totalInterest30: number;
  monthlySavingsWith30: number;
  totalInterestSavingsWith15: number;
}

export function compareLoanTerms(
  principal: number,
  annualRate: number,
): LoanTermComparison {
  if (!Number.isFinite(principal) || principal < 0) {
    throw new Error(`Invalid principal: ${principal}.`);
  }
  if (!Number.isFinite(annualRate) || annualRate < 0) {
    throw new Error(`Invalid annualRate: ${annualRate}.`);
  }

  const r15 = calculateMortgage({
    principal,
    annualRate,
    termYears: 15,
  });
  const r30 = calculateMortgage({
    principal,
    annualRate,
    termYears: 30,
  });

  return {
    termYears15: 15,
    termYears30: 30,
    payment15: r15.monthlyPayment,
    payment30: r30.monthlyPayment,
    totalInterest15: r15.totalInterest,
    totalInterest30: r30.totalInterest,
    monthlySavingsWith30: r15.monthlyPayment - r30.monthlyPayment,
    totalInterestSavingsWith15: r30.totalInterest - r15.totalInterest,
  };
}