import { describe, it, expect } from "vitest";
import { calculateRefinance } from "./refinance";

describe("calculateRefinance", () => {
  it("reduces monthly payment when new rate is lower", () => {
    const result = calculateRefinance({
      currentBalance: 300_000,
      currentRate: 7.0,
      yearsRemaining: 28,
      newRate: 5.5,
      newTermYears: 30,
      closingCosts: 5_000,
    });
    expect(result.newMonthlyPayment).toBeLessThan(result.currentMonthlyPayment);
    expect(result.monthlySavings).toBeGreaterThan(0);
  });

  it("reduces total interest when refinancing to lower rate at shorter term", () => {
    const result = calculateRefinance({
      currentBalance: 300_000,
      currentRate: 7.0,
      yearsRemaining: 28,
      newRate: 5.5,
      newTermYears: 15,
      closingCosts: 5_000,
    });
    expect(result.totalInterestNew).toBeLessThan(result.totalInterestCurrent);
  });

  it("computes break-even point: closing costs / monthly savings", () => {
    const result = calculateRefinance({
      currentBalance: 300_000,
      currentRate: 7.0,
      yearsRemaining: 28,
      newRate: 5.5,
      newTermYears: 30,
      closingCosts: 6_000,
    });
    const expected = Math.ceil(6_000 / result.monthlySavings);
    expect(result.breakEvenMonths).toBe(expected);
  });

  it("subtracts closing costs from total interest savings for net total savings", () => {
    const result = calculateRefinance({
      currentBalance: 300_000,
      currentRate: 7.0,
      yearsRemaining: 28,
      newRate: 5.5,
      newTermYears: 30,
      closingCosts: 10_000,
    });
    const interestDelta = result.totalInterestCurrent - result.totalInterestNew;
    expect(result.totalSavingsOverLife).toBeCloseTo(
      interestDelta - 10_000,
      2,
    );
  });

  it("returns negative monthly savings when new rate is higher", () => {
    const result = calculateRefinance({
      currentBalance: 300_000,
      currentRate: 5.5,
      yearsRemaining: 28,
      newRate: 7.0,
      newTermYears: 30,
      closingCosts: 5_000,
    });
    expect(result.monthlySavings).toBeLessThan(0);
  });

  it("treats 0% rates as valid (zero-interest refi edge case)", () => {
    const result = calculateRefinance({
      currentBalance: 100_000,
      currentRate: 6.0,
      yearsRemaining: 20,
      newRate: 0,
      newTermYears: 20,
      closingCosts: 0,
    });
    expect(result.newMonthlyPayment).toBeCloseTo(100_000 / 240, 2);
    expect(result.totalInterestNew).toBeCloseTo(0, 2);
  });

  it("throws on negative balance", () => {
    expect(() =>
      calculateRefinance({
        currentBalance: -1,
        currentRate: 5,
        yearsRemaining: 30,
        newRate: 4,
        newTermYears: 30,
        closingCosts: 0,
      }),
    ).toThrow(/currentBalance/);
  });

  it("throws on negative closing costs", () => {
    expect(() =>
      calculateRefinance({
        currentBalance: 100_000,
        currentRate: 5,
        yearsRemaining: 30,
        newRate: 4,
        newTermYears: 30,
        closingCosts: -100,
      }),
    ).toThrow(/closingCosts/);
  });

  it("throws on non-integer years remaining", () => {
    expect(() =>
      calculateRefinance({
        currentBalance: 100_000,
        currentRate: 5,
        yearsRemaining: 28.5,
        newRate: 4,
        newTermYears: 30,
        closingCosts: 0,
      }),
    ).toThrow(/yearsRemaining/);
  });

  it("throws on rate > 100%", () => {
    expect(() =>
      calculateRefinance({
        currentBalance: 100_000,
        currentRate: 150,
        yearsRemaining: 30,
        newRate: 4,
        newTermYears: 30,
        closingCosts: 0,
      }),
    ).toThrow(/currentRate/);
  });
});