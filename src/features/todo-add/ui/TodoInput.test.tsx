// @ts-nocheck
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoInput } from "./TodoInput";

describe("TodoInput component", () => {
  const mockOnChange = jest.fn();
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input field and button", () => {
    render(<TodoInput value="" onChange={mockOnChange} onAdd={mockOnAdd} />);

    expect(
      screen.getByPlaceholderText("Что нужно сделать?")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /добавить/i })
    ).toBeInTheDocument();
  });

  it("calls onChange when typing in the input field", () => {
    render(<TodoInput value="" onChange={mockOnChange} onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Что нужно сделать?");
    fireEvent.change(input, { target: { value: "Новая задача" } });

    expect(mockOnChange).toHaveBeenCalledWith("Новая задача");
  });

  it("calls onAdd when clicking the button", () => {
    render(
      <TodoInput
        value="Новая задача"
        onChange={mockOnChange}
        onAdd={mockOnAdd}
      />
    );

    const button = screen.getByRole("button", { name: /добавить/i });
    fireEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  it("calls onAdd when pressing Enter in the input field", () => {
    render(
      <TodoInput
        value="Новая задача"
        onChange={mockOnChange}
        onAdd={mockOnAdd}
      />
    );

    const input = screen.getByPlaceholderText("Что нужно сделать?");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  it("disables the button when the input is empty", () => {
    render(<TodoInput value="" onChange={mockOnChange} onAdd={mockOnAdd} />);

    const button = screen.getByRole("button", { name: /добавить/i });
    expect(button).toBeDisabled();
  });

  it("enables the button when the input has text", () => {
    render(
      <TodoInput
        value="Новая задача"
        onChange={mockOnChange}
        onAdd={mockOnAdd}
      />
    );

    const button = screen.getByRole("button", { name: /добавить/i });
    expect(button).not.toBeDisabled();
  });
});
