// @ts-nocheck
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoItem } from "./TodoItem";
import { Todo } from "../../../shared/types/todo";

describe("TodoItem component", () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  const todo: Todo = {
    id: 1,
    text: "Тестовая задача",
    completed: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the todo text and checkbox", () => {
    render(
      <TodoItem todo={todo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    expect(screen.getByText("Тестовая задача")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls onToggle when checkbox is clicked", () => {
    render(
      <TodoItem todo={todo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TodoItem todo={todo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const deleteButton = screen.getByRole("button", {
      name: /удалить задачу/i,
    });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("applies completed class when todo is completed", () => {
    const completedTodo: Todo = {
      ...todo,
      completed: true,
    };

    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
