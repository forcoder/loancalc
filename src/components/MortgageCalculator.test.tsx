import { describe, it, expect } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MortgageCalculator } from "./MortgageCalculator";

describe("MortgageCalculator", () => {
  it("renders monthly payment result on mount with default values", () => {
    render(<MortgageCalculator />);
    const resultRegion = screen.getByRole("region", { name: /monthly payment/i });
    expect(resultRegion).toBeInTheDocument();
    expect(within(resultRegion).getByText(/\$2,528/)).toBeInTheDocument();
  });

  it("updates monthly payment when principal changes", async () => {
    const user = userEvent.setup();
    render(<MortgageCalculator />);
    const principalInput = screen.getByLabelText(/loan amount/i);
    await user.clear(principalInput);
    await user.type(principalInput, "500000");
    const resultRegion = screen.getByRole("region", { name: /monthly payment/i });
    expect(within(resultRegion).getByText(/\$3,160/)).toBeInTheDocument();
  });

  it("updates monthly payment when interest rate changes", async () => {
    const user = userEvent.setup();
    render(<MortgageCalculator />);
    const rateInput = screen.getByLabelText(/interest rate/i);
    await user.clear(rateInput);
    await user.type(rateInput, "5.0");
    const resultRegion = screen.getByRole("region", { name: /monthly payment/i });
    expect(within(resultRegion).getByText(/\$2,147/)).toBeInTheDocument();
  });

  it("updates monthly payment when term years changes", () => {
    render(<MortgageCalculator />);
    const termInput = screen.getByLabelText(/loan term/i);
    fireEvent.change(termInput, { target: { value: "15" } });
    const resultRegion = screen.getByRole("region", { name: /monthly payment/i });
    expect(within(resultRegion).getByText(/\$3,484/)).toBeInTheDocument();
  });

  it("handles 0% APR without crashing (division-by-zero edge case)", async () => {
    const user = userEvent.setup();
    render(<MortgageCalculator />);
    const rateInput = screen.getByLabelText(/interest rate/i);
    await user.clear(rateInput);
    await user.type(rateInput, "0");
    const resultRegion = screen.getByRole("region", { name: /monthly payment/i });
    expect(within(resultRegion).getByText(/\$1,111/)).toBeInTheDocument();
  });

  it("shows validation error when principal is negative", async () => {
    const user = userEvent.setup();
    render(<MortgageCalculator />);
    const principalInput = screen.getByLabelText(/loan amount/i);
    await user.clear(principalInput);
    await user.type(principalInput, "-100");
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/principal/i);
  });

  it("shows validation error when term years is zero", async () => {
    const user = userEvent.setup();
    render(<MortgageCalculator />);
    const termInput = screen.getByLabelText(/loan term/i);
    await user.clear(termInput);
    await user.type(termInput, "0");
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/term/i);
  });

  it("formats monthly payment as USD currency", () => {
    render(<MortgageCalculator />);
    const resultRegion = screen.getByRole("region", { name: /monthly payment/i });
    expect(resultRegion).toHaveTextContent("$2,528");
    expect(resultRegion).toHaveTextContent("/mo");
  });

  it("toggles amortization table visibility on button click", async () => {
    const user = userEvent.setup();
    render(<MortgageCalculator />);
    const toggleButton = screen.getByRole("button", { name: /amortization/i });
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    await user.click(toggleButton);
    expect(screen.getByRole("table")).toBeInTheDocument();
    await user.click(toggleButton);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("amortization table displays a row for each month of the term", async () => {
    const user = userEvent.setup();
    render(<MortgageCalculator />);
    await user.click(screen.getByRole("button", { name: /amortization/i }));
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(361);
  });
});
