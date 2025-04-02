import { FC } from "react";
import { TodoInput } from "../../../features/todo-add";
import { TodoList } from "../../../features/todo-list";
import { TodoFilter } from "../../../features/todo-filter";
import { ThemeToggle } from "../../../shared/ui";
import { useTodos } from "../../../shared/lib/hooks";
import styles from "./TodoWidget.module.css";

export const TodoWidget: FC = () => {
  const {
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
  } = useTodos();

  const hasCompletedTodos = activeTodosCount < filteredTodos.length;
  const taskCountText =
    activeTodosCount > 0
      ? `Осталось задач: ${activeTodosCount}`
      : "Все задачи выполнены!";

  return (
    <div className={styles.todoContainer}>
      <header className={styles.headerContainer}>
        <h1 className={styles.todoTitle}>Список задач</h1>
        <ThemeToggle />
      </header>

      <TodoInput
        value={newTodoText}
        onChange={setNewTodoText}
        onAdd={addTodo}
      />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <footer className={styles.todoFooter}>
        <span className={styles.todoCount}>{taskCountText}</span>

        <TodoFilter filter={filter} onChange={setFilter} />

        <button
          className={styles.clearCompleted}
          onClick={clearCompleted}
          disabled={!hasCompletedTodos}
        >
          Очистить выполненные
        </button>
      </footer>
    </div>
  );
};
