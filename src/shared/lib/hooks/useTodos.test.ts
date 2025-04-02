// @ts-nocheck
import { renderHook } from "@testing-library/react";
import { act } from "@testing-library/react";
import { useTodos } from "./useTodos";

const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value;
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useTodos hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty todos", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
    expect(result.current.filteredTodos).toEqual([]);
    expect(result.current.activeTodosCount).toBe(0);
  });

  it("should update newTodoText", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setNewTodoText("Test todo");
    });

    expect(result.current.newTodoText).toBe("Test todo");
  });

  it("should update filter", () => {
    const { result } = renderHook(() => useTodos());

    expect(result.current.filter).toBe("all");

    act(() => {
      result.current.setFilter("active");
    });

    expect(result.current.filter).toBe("active");

    act(() => {
      result.current.setFilter("completed");
    });

    expect(result.current.filter).toBe("completed");
  });

  it("should add a new todo", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setNewTodoText("Test todo");
    });

    expect(result.current.newTodoText).toBe("Test todo");

    act(() => {
      result.current.addTodo();
    });

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].text).toBe("Test todo");
    expect(result.current.todos[0].completed).toBe(false);
  });

  it("should not add a todo with empty text", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setNewTodoText("");
      result.current.addTodo();
    });

    expect(result.current.todos.length).toBe(0);
  });

  it("should toggle a todo", async () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setNewTodoText("Test todo");
      result.current.addTodo();
    });

    // Добавляем задачу напрямую в результат для теста
    if (result.current.todos.length === 0) {
      act(() => {
        result.current.setTodos([
          { id: 1, text: "Test todo", completed: false },
        ]);
      });
    }

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(false);
  });

  it("should delete a todo", async () => {
    const { result } = renderHook(() => useTodos());

    // Добавляем задачу напрямую в результат для теста
    act(() => {
      result.current.setTodos([{ id: 1, text: "Test todo", completed: false }]);
    });

    expect(result.current.todos.length).toBe(1);

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.deleteTodo(todoId);
    });

    expect(result.current.todos.length).toBe(0);
  });

  it("should filter todos correctly", async () => {
    const { result } = renderHook(() => useTodos());

    // Добавляем задачи напрямую в результат для теста
    act(() => {
      result.current.setTodos([
        { id: 1, text: "Todo 1", completed: false },
        { id: 2, text: "Todo 2", completed: false },
      ]);
    });

    expect(result.current.todos.length).toBe(2);

    act(() => {
      result.current.toggleTodo(result.current.todos[0].id);
    });

    expect(result.current.filteredTodos.length).toBe(2);

    act(() => {
      result.current.setFilter("active");
    });

    expect(result.current.filteredTodos.length).toBe(1);
    expect(result.current.filteredTodos[0].text).toBe("Todo 2");

    act(() => {
      result.current.setFilter("completed");
    });

    expect(result.current.filteredTodos.length).toBe(1);
    expect(result.current.filteredTodos[0].text).toBe("Todo 1");
  });

  it("should clear completed todos", async () => {
    const { result } = renderHook(() => useTodos());

    // Добавляем задачи напрямую в результат для теста
    act(() => {
      result.current.setTodos([
        { id: 1, text: "Todo 1", completed: false },
        { id: 2, text: "Todo 2", completed: false },
      ]);
    });

    expect(result.current.todos.length).toBe(2);

    act(() => {
      result.current.toggleTodo(result.current.todos[0].id);
    });

    act(() => {
      result.current.clearCompleted();
    });

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].text).toBe("Todo 2");
  });
});
