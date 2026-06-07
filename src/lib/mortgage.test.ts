import { describe, it, expect } from "vitest";
import { calculateMortgage } from "./mortgage";

const TOLERANCE = 0.01;

describe("calculateMortgage", () => {
  describe("standard scenarios (happy paths)", () => {
    it("computes 30-year fixed at 6.5% APR on $400,000", () => {
      const result = calculateMortgage({
        principal: 400_000,
        annualRate: 6.5,
        termYears: 30,
      });
      expect(result.monthlyPayment).toBeCloseTo(2528.27, TOLERANCE);
    });

    it("computes 15-year fixed at 5.75% APR on $400,000", () => {
      const result = calculateMortgage({
        principal: 400_000,
        annualRate: 5.75,
        termYears: 15,
      });
      expect(result.monthlyPayment).toBeCloseTo(3321.64, TOLERANCE);
    });

    it("computes 30-year at 6.0% APR on $500,000", () => {
      const result = calculateMortgage({
        principal: 500_000,
        annualRate: 6.0,
        termYears: 30,
      });
      expect(result.monthlyPayment).toBeCloseTo(2997.75, TOLERANCE);
    });

    it("handles jumbo loan: $1M at 7.0% for 30 years", () => {
      const result = calculateMortgage({
        principal: 1_000_000,
        annualRate: 7.0,
        termYears: 30,
      });
      expect(result.monthlyPayment).toBeCloseTo(6653.02, TOLERANCE);
    });

    it("handles small loan: $100k at 5.0% for 30 years", () => {
      const result = calculateMortgage({
        principal: 100_000,
        annualRate: 5.0,
        termYears: 30,
      });
      expect(result.monthlyPayment).toBeCloseTo(536.82, TOLERANCE);
    });
  });

  describe("edge cases", () => {
    it("handles 0% APR without division-by-zero (limit formula M = P / n)", () => {
      const result = calculateMortgage({
        principal: 120_000,
        annualRate: 0,
        termYears: 30,
      });
      expect(result.monthlyPayment).toBeCloseTo(120_000 / 360, TOLERANCE);
      expect(result.totalInterest).toBe(0);
    });

    it("handles $1 principal without numerical collapse", () => {
      const result = calculateMortgage({
        principal: 1,
        annualRate: 5,
        termYears: 30,
      });
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(Number.isFinite(result.monthlyPayment)).toBe(true);
    });

    it("produces amortization table whose length equals the term in months", () => {
      const result = calculateMortgage({
        principal: 300_000,
        annualRate: 6.0,
        termYears: 30,
      });
      expect(result.amortization).toHaveLength(360);
    });

    it("amortization table shrinks balance to ~0 at the final row", () => {
      const result = calculateMortgage({
        principal: 300_000,
        annualRate: 6.0,
        termYears: 30,
      });
      const lastRow = result.amortization[result.amortization.length - 1];
      expect(lastRow.balance).toBeCloseTo(0, 0);
    });

    it("totalPayment equals monthlyPayment x termMonths", () => {
      const result = calculateMortgage({
        principal: 250_000,
        annualRate: 4.5,
        termYears: 30,
      });
      expect(result.totalPayment).toBeCloseTo(
        result.monthlyPayment * 360,
        TOLERANCE,
      );
    });

    it("totalInterest equals totalPayment minus principal", () => {
      const result = calculateMortgage({
        principal: 250_000,
        annualRate: 4.5,
        termYears: 30,
      });
      expect(result.totalInterest).toBeCloseTo(
        result.totalPayment - 250_000,
        TOLERANCE,
      );
    });

    it("amortization principal + interest per row equals monthly payment", () => {
      const result = calculateMortgage({
        principal: 400_000,
        annualRate: 6.0,
        termYears: 30,
      });
      for (const row of result.amortization) {
        expect(row.principal + row.interest).toBeCloseTo(
          result.monthlyPayment,
          1,
        );
      }
    });

    it("breakdown aggregates extras (tax/insurance/HOA/PMI) into total monthly", () => {
      const result = calculateMortgage(
        {
          principal: 500_000,
          annualRate: 6.0,
          termYears: 30,
        },
        {
          propertyTax: 250,
          insurance: 100,
          hoa: 50,
          pmi: 80,
        },
      );
      const expected = result.monthlyPayment + 250 + 100 + 50 + 80;
      expect(result.monthlyBreakdown.total).toBeCloseTo(expected, TOLERANCE);
    });

    it("omitting extras yields breakdown.total === monthlyPayment", () => {
      const result = calculateMortgage({
        principal: 300_000,
        annualRate: 5.0,
        termYears: 30,
      });
      expect(result.monthlyBreakdown.total).toBeCloseTo(
        result.monthlyPayment,
        TOLERANCE,
      );
    });
  });

  describe("input validation (error cases)", () => {
    it("throws on negative principal", () => {
      expect(() =>
        calculateMortgage({ principal: -100, annualRate: 5, termYears: 30 }),
      ).toThrow(/principal/i);
    });

    it("throws on negative annual rate", () => {
      expect(() =>
        calculateMortgage({ principal: 100_000, annualRate: -1, termYears: 30 }),
      ).toThrow(/rate/i);
    });

    it("throws on zero term years", () => {
      expect(() =>
        calculateMortgage({ principal: 100_000, annualRate: 5, termYears: 0 }),
      ).toThrow(/term/i);
    });

    it("throws on negative term years", () => {
      expect(() =>
        calculateMortgage({ principal: 100_000, annualRate: 5, termYears: -5 }),
      ).toThrow(/term/i);
    });

    it("throws on NaN principal", () => {
      expect(() =>
        calculateMortgage({
          principal: Number.NaN,
          annualRate: 5,
          termYears: 30,
        }),
      ).toThrow();
    });

    it("throws on Infinity principal", () => {
      expect(() =>
        calculateMortgage({
          principal: Number.POSITIVE_INFINITY,
          annualRate: 5,
          termYears: 30,
        }),
      ).toThrow();
    });

    it("throws on non-integer term years", () => {
      expect(() =>
        calculateMortgage({
          principal: 100_000,
          annualRate: 5,
          termYears: 30.5,
        }),
      ).toThrow(/term/i);
    });
  });
});
