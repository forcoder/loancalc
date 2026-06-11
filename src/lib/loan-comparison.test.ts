import { describe, it, expect } from "vitest";
import { compareLoanTerms } from "./loan-comparison";

describe("compareLoanTerms", () => {
  it("30-year has lower monthly payment than 15-year at same rate", () => {
    const result = compareLoanTerms(300_000, 6.5);
    expect(result.payment30).toBeLessThan(result.payment15);
    expect(result.monthlySavingsWith30).toBeGreaterThan(0);
  });

  it("30-year has higher total interest than 15-year at same rate", () => {
    const result = compareLoanTerms(300_000, 6.5);
    expect(result.totalInterest30).toBeGreaterThan(result.totalInterest15);
    expect(result.totalInterestSavingsWith15).toBeGreaterThan(0);
  });

  it("works at 0% rate (both payments = principal/months)", () => {
    const result = compareLoanTerms(180_000, 0);
    expect(result.payment15).toBeCloseTo(180_000 / 180, 2);
    expect(result.payment30).toBeCloseTo(180_000 / 360, 2);
    expect(result.totalInterest15).toBeCloseTo(0, 2);
    expect(result.totalInterest30).toBeCloseTo(0, 2);
  });

  it("throws on negative principal", () => {
    expect(() => compareLoanTerms(-100, 5)).toThrow(/principal/);
  });

  it("throws on negative rate", () => {
    expect(() => compareLoanTerms(100_000, -1)).toThrow(/annualRate/);
  });

  it("handles zero principal", () => {
    const result = compareLoanTerms(0, 5);
    expect(result.payment15).toBe(0);
    expect(result.payment30).toBe(0);
    expect(result.totalInterestSavingsWith15).toBe(0);
  });
});