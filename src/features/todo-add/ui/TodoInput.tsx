import { FC, KeyboardEvent } from "react";
import styles from "./TodoInput.module.css";

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export const TodoInput: FC<TodoInputProps> = ({ value, onChange, onAdd }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className={styles.todoInputContainer}>
      <input
        type="text"
        className={styles.todoInput}
        placeholder="Что нужно сделать?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Новая задача"
      />
      <button
        className={styles.addButton}
        onClick={onAdd}
        disabled={!value.trim()}
        aria-label="Добавить задачу"
      >
        Добавить
      </button>
    </div>
  );
};
