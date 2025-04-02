import { FC } from "react";
import { Todo } from "../../../shared/types/todo";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
    >
      <div className={styles.todoItemContent}>
        <input
          type="checkbox"
          className={styles.todoCheckbox}
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={styles.todoText}>{todo.text}</span>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
        aria-label="Удалить задачу"
      >
        ✕
      </button>
    </li>
  );
};
