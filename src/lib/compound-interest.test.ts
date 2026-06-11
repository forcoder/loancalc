import { describe, it, expect } from "vitest";
import { calculateCompoundInterest } from "./compound-interest";

describe("calculateCompoundInterest", () => {
  it("computes final balance with principal, no monthly contribution, 5% annual for 10 years", () => {
    const result = calculateCompoundInterest({
      principal: 10_000,
      monthlyContribution: 0,
      annualRate: 5,
      years: 10,
      compoundFrequency: "annually",
      inflationRate: 0,
    });
    expect(result.finalBalance).toBeCloseTo(16_288.95, 0);
    expect(result.totalContributions).toBe(10_000);
    expect(result.totalInterest).toBeCloseTo(6_288.95, 0);
  });

  it("monthly contributions grow much faster than one-time principal over 30 years", () => {
    const withMonthly = calculateCompoundInterest({
      principal: 10_000,
      monthlyContribution: 500,
      annualRate: 7,
      years: 30,
      compoundFrequency: "monthly",
      inflationRate: 0,
    });
    const oneTime = calculateCompoundInterest({
      principal: 10_000,
      monthlyContribution: 0,
      annualRate: 7,
      years: 30,
      compoundFrequency: "monthly",
      inflationRate: 0,
    });
    expect(withMonthly.finalBalance).toBeGreaterThan(oneTime.finalBalance * 4);
    expect(withMonthly.totalContributions).toBe(10_000 + 500 * 12 * 30);
  });

  it("monthly compounding yields slightly more than annual compounding for same rate/term", () => {
    const monthly = calculateCompoundInterest({
      principal: 10_000,
      monthlyContribution: 100,
      annualRate: 6,
      years: 20,
      compoundFrequency: "monthly",
      inflationRate: 0,
    });
    const annual = calculateCompoundInterest({
      principal: 10_000,
      monthlyContribution: 100,
      annualRate: 6,
      years: 20,
      compoundFrequency: "annually",
      inflationRate: 0,
    });
    expect(monthly.finalBalance).toBeGreaterThan(annual.finalBalance);
  });

  it("returns zero interest at 0% rate, balance equals total contributions", () => {
    const result = calculateCompoundInterest({
      principal: 5_000,
      monthlyContribution: 200,
      annualRate: 0,
      years: 5,
      compoundFrequency: "monthly",
      inflationRate: 0,
    });
    expect(result.finalBalance).toBeCloseTo(5_000 + 200 * 12 * 5, 2);
    expect(result.totalInterest).toBeCloseTo(0, 2);
  });

  it("handles 0 monthly contribution (principal only) without error", () => {
    const result = calculateCompoundInterest({
      principal: 1_000,
      monthlyContribution: 0,
      annualRate: 8,
      years: 3,
      compoundFrequency: "quarterly",
      inflationRate: 0,
    });
    expect(result.totalContributions).toBe(1_000);
    expect(result.finalBalance).toBeGreaterThan(1_000);
  });

  it("real value is lower than nominal when inflation > 0", () => {
    const result = calculateCompoundInterest({
      principal: 10_000,
      monthlyContribution: 200,
      annualRate: 6,
      years: 20,
      compoundFrequency: "monthly",
      inflationRate: 3,
    });
    expect(result.realValue).toBeLessThan(result.finalBalance);
    expect(result.realValue).toBeGreaterThan(0);
  });

  it("real value equals nominal when inflation = 0", () => {
    const result = calculateCompoundInterest({
      principal: 10_000,
      monthlyContribution: 200,
      annualRate: 6,
      years: 20,
      compoundFrequency: "monthly",
      inflationRate: 0,
    });
    expect(result.realValue).toBeCloseTo(result.finalBalance, 2);
  });

  it("schedule has one entry per year, last entry matches finalBalance", () => {
    const result = calculateCompoundInterest({
      principal: 1_000,
      monthlyContribution: 50,
      annualRate: 5,
      years: 5,
      compoundFrequency: "monthly",
      inflationRate: 0,
    });
    expect(result.schedule).toHaveLength(5);
    expect(result.schedule[4].year).toBe(5);
    expect(result.schedule[4].endBalance).toBeCloseTo(result.finalBalance, 2);
  });

  it("principal + interest ratios sum to ~1.0", () => {
    const result = calculateCompoundInterest({
      principal: 5_000,
      monthlyContribution: 100,
      annualRate: 5,
      years: 10,
      compoundFrequency: "monthly",
      inflationRate: 0,
    });
    expect(result.principalRatio + result.interestRatio).toBeCloseTo(1, 2);
  });

  it("handles 50-year horizon (max boundary)", () => {
    const result = calculateCompoundInterest({
      principal: 0,
      monthlyContribution: 100,
      annualRate: 7,
      years: 50,
      compoundFrequency: "monthly",
      inflationRate: 0,
    });
    expect(result.schedule).toHaveLength(50);
    expect(result.finalBalance).toBeGreaterThan(100 * 12 * 50);
  });

  it("throws on negative principal", () => {
    expect(() =>
      calculateCompoundInterest({
        principal: -1,
        monthlyContribution: 0,
        annualRate: 5,
        years: 10,
        compoundFrequency: "annually",
        inflationRate: 0,
      }),
    ).toThrow(/principal/);
  });

  it("throws on annualRate > 100", () => {
    expect(() =>
      calculateCompoundInterest({
        principal: 1_000,
        monthlyContribution: 0,
        annualRate: 150,
        years: 10,
        compoundFrequency: "annually",
        inflationRate: 0,
      }),
    ).toThrow(/annualRate/);
  });

  it("throws on years = 0 or negative", () => {
    expect(() =>
      calculateCompoundInterest({
        principal: 1_000,
        monthlyContribution: 0,
        annualRate: 5,
        years: 0,
        compoundFrequency: "annually",
        inflationRate: 0,
      }),
    ).toThrow(/years/);
  });

  it("throws on years > 50", () => {
    expect(() =>
      calculateCompoundInterest({
        principal: 1_000,
        monthlyContribution: 0,
        annualRate: 5,
        years: 51,
        compoundFrequency: "annually",
        inflationRate: 0,
      }),
    ).toThrow(/years/);
  });
});
