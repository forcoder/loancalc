import { describe, it, expect } from "vitest";
import { calculateAutoLoan } from "./auto-loan";

describe("calculateAutoLoan", () => {
  it("computes monthly payment from principal, APR, term", () => {
    const result = calculateAutoLoan({
      vehiclePrice: 35_000,
      downPayment: 5_000,
      apr: 6.5,
      termYears: 5,
    });
    expect(result.loanAmount).toBe(30_000);
    expect(result.monthlyPayment).toBeGreaterThan(580);
    expect(result.monthlyPayment).toBeLessThan(600);
  });

  it("subtracts down payment from vehicle price for loan amount", () => {
    const result = calculateAutoLoan({
      vehiclePrice: 40_000,
      downPayment: 10_000,
      apr: 5.0,
      termYears: 5,
    });
    expect(result.loanAmount).toBe(30_000);
  });

  it("returns zero monthly payment when loan amount is zero (full down payment)", () => {
    const result = calculateAutoLoan({
      vehiclePrice: 20_000,
      downPayment: 20_000,
      apr: 7.0,
      termYears: 5,
    });
    expect(result.loanAmount).toBe(0);
    expect(result.monthlyPayment).toBe(0);
    expect(result.totalInterest).toBe(0);
  });

  it("returns zero total interest at 0% APR", () => {
    const result = calculateAutoLoan({
      vehiclePrice: 25_000,
      downPayment: 5_000,
      apr: 0,
      termYears: 4,
    });
    expect(result.totalInterest).toBe(0);
    expect(result.monthlyPayment).toBeCloseTo(20_000 / 48, 2);
  });

  it("totalCost equals loan amount + total interest", () => {
    const result = calculateAutoLoan({
      vehiclePrice: 30_000,
      downPayment: 5_000,
      apr: 6.0,
      termYears: 5,
    });
    expect(result.totalCost).toBeCloseTo(
      result.loanAmount + result.totalInterest,
      2,
    );
  });

  it("totalLoanAmount equals vehicle price + total interest", () => {
    const result = calculateAutoLoan({
      vehiclePrice: 30_000,
      downPayment: 5_000,
      apr: 6.0,
      termYears: 5,
    });
    expect(result.totalLoanAmount).toBeCloseTo(
      30_000 + result.totalInterest,
      2,
    );
  });

  it("longer term produces lower monthly payment but higher total interest", () => {
    const short = calculateAutoLoan({
      vehiclePrice: 30_000,
      downPayment: 0,
      apr: 7.0,
      termYears: 3,
    });
    const long = calculateAutoLoan({
      vehiclePrice: 30_000,
      downPayment: 0,
      apr: 7.0,
      termYears: 7,
    });
    expect(long.monthlyPayment).toBeLessThan(short.monthlyPayment);
    expect(long.totalInterest).toBeGreaterThan(short.totalInterest);
  });

  it("throws when down payment exceeds vehicle price", () => {
    expect(() =>
      calculateAutoLoan({
        vehiclePrice: 20_000,
        downPayment: 25_000,
        apr: 5,
        termYears: 5,
      }),
    ).toThrow(/down payment/i);
  });

  it("throws on negative vehicle price", () => {
    expect(() =>
      calculateAutoLoan({
        vehiclePrice: -1,
        downPayment: 0,
        apr: 5,
        termYears: 5,
      }),
    ).toThrow(/vehiclePrice/);
  });

  it("throws on non-integer term years", () => {
    expect(() =>
      calculateAutoLoan({
        vehiclePrice: 30_000,
        downPayment: 0,
        apr: 5,
        termYears: 5.5,
      }),
    ).toThrow(/termYears/);
  });
});