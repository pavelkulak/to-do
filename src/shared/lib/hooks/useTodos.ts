import { useState, useEffect } from "react";
import { Todo, TodoFilter } from "../../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodoText.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return {
    todos,
    filteredTodos,
    newTodoText,
    filter,
    activeTodosCount,
    setNewTodoText,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setTodos,
  };
};
