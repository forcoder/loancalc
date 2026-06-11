import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CompoundInterestCalculator } from "./CompoundInterestCalculator";

describe("CompoundInterestCalculator", () => {
  it("renders the investment details form with default fields", () => {
    render(<CompoundInterestCalculator />);
    expect(screen.getByLabelText(/initial deposit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly contribution/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/years to grow/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/inflation rate/i)).toBeInTheDocument();
  });

  it("renders the future balance result on initial render", () => {
    render(<CompoundInterestCalculator />);
    expect(screen.getByText(/future balance/i)).toBeInTheDocument();
    expect(screen.getByText(/total contributions/i)).toBeInTheDocument();
    expect(screen.getByText(/interest earned/i)).toBeInTheDocument();
  });

  it("shows real-value subtitle when inflation > 0 (default 3%)", () => {
    render(<CompoundInterestCalculator />);
    expect(screen.getByText(/in today's dollars/i)).toBeInTheDocument();
  });

  it("renders compound frequency toggle buttons", () => {
    render(<CompoundInterestCalculator />);
    expect(screen.getByRole("button", { name: /monthly/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /quarterly/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /annually/i }),
    ).toBeInTheDocument();
  });
});
