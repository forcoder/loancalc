export interface MortgageInput {
  principal: number;
  annualRate: number;
  termYears: number;
}

export interface ExtraMonthly {
  propertyTax?: number;
  insurance?: number;
  hoa?: number;
  pmi?: number;
}

export interface MonthlyBreakdown {
  principalAndInterest: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  pmi: number;
  total: number;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  monthlyBreakdown: MonthlyBreakdown;
  totalPayment: number;
  totalInterest: number;
  totalCost: number;
  amortization: AmortizationRow[];
}

function assertValidInput(input: MortgageInput): void {
  const { principal, annualRate, termYears } = input;
  if (!Number.isFinite(principal) || principal < 0) {
    throw new Error(`Invalid principal: ${principal}. Must be >= 0.`);
  }
  if (!Number.isFinite(annualRate) || annualRate < 0) {
    throw new Error(`Invalid annualRate: ${annualRate}. Must be >= 0.`);
  }
  if (!Number.isInteger(termYears) || termYears <= 0) {
    throw new Error(
      `Invalid termYears: ${termYears}. Must be a positive integer.`,
    );
  }
}

function monthlyPrincipalAndInterest(
  principal: number,
  monthlyRate: number,
  termMonths: number,
): number {
  if (monthlyRate === 0) {
    return principal / termMonths;
  }
  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

function buildAmortization(
  principal: number,
  monthlyRate: number,
  termMonths: number,
  payment: number,
): AmortizationRow[] {
  const rows: AmortizationRow[] = [];
  let balance = principal;
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;

  for (let month = 1; month <= termMonths; month++) {
    const interest = balance * monthlyRate;
    let principalPaid = payment - interest;

    if (month === termMonths) {
      principalPaid = balance;
    }

    balance = Math.max(0, balance - principalPaid);
    cumulativeInterest += interest;
    cumulativePrincipal += principalPaid;

    rows.push({
      month,
      payment: month === termMonths ? principalPaid + interest : payment,
      principal: principalPaid,
      interest,
      balance,
      cumulativeInterest,
      cumulativePrincipal,
    });
  }

  return rows;
}

export function calculateMortgage(
  input: MortgageInput,
  extra: ExtraMonthly = {},
): MortgageResult {
  assertValidInput(input);

  const { principal, annualRate, termYears } = input;
  const monthlyRate = annualRate / 100 / 12;
  const termMonths = termYears * 12;

  const payment = monthlyPrincipalAndInterest(
    principal,
    monthlyRate,
    termMonths,
  );
  const amortization = buildAmortization(
    principal,
    monthlyRate,
    termMonths,
    payment,
  );

  const totalPayment = payment * termMonths;
  const totalInterest = totalPayment - principal;
  const propertyTax = extra.propertyTax ?? 0;
  const insurance = extra.insurance ?? 0;
  const hoa = extra.hoa ?? 0;
  const pmi = extra.pmi ?? 0;
  const monthlyExtras = propertyTax + insurance + hoa + pmi;
  const totalCost = totalPayment + monthlyExtras * termMonths;

  return {
    monthlyPayment: payment,
    monthlyBreakdown: {
      principalAndInterest: payment,
      propertyTax,
      insurance,
      hoa,
      pmi,
      total: payment + monthlyExtras,
    },
    totalPayment,
    totalInterest,
    totalCost,
    amortization,
  };
}
