/* import { render, fireEvent, screen } from "@testing-library/react";
import { Range } from "./Range";

describe("Range Component", () => {
  it("renders correctly", () => {
    render(<Range min={0} max={100} initialValues={[25, 75]} />);

    expect(screen.getByDisplayValue("25")).toBeInTheDocument();
    expect(screen.getByDisplayValue("75")).toBeInTheDocument();
  });

  it("updates values when input changes", () => {
    render(<Range min={0} max={100} initialValues={[25, 75]} />);

    const minInput = screen.getByDisplayValue("25");
    fireEvent.change(minInput, { target: { value: "30" } });

    const maxInput = screen.getByDisplayValue("75");
    fireEvent.change(maxInput, { target: { value: "70" } });

    expect(screen.getByDisplayValue("30")).toBeInTheDocument();
    expect(screen.getByDisplayValue("70")).toBeInTheDocument();
  });

  it("does not allow values outside min and max", () => {
    render(<Range min={0} max={100} initialValues={[25, 75]} />);

    const minInput = screen.getByDisplayValue("25");
    fireEvent.change(minInput, { target: { value: "-10" } });

    const maxInput = screen.getByDisplayValue("75");
    fireEvent.change(maxInput, { target: { value: "110" } });

    expect(screen.getByDisplayValue("0")).toBeInTheDocument(); // Clamped to min
    expect(screen.getByDisplayValue("100")).toBeInTheDocument(); // Clamped to max
  });
});
 */