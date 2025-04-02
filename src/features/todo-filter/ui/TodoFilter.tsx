import { FC } from "react";
import { TodoFilter as FilterType } from "../../../shared/types/todo";
import styles from "./TodoFilter.module.css";

interface TodoFilterProps {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
}

export const TodoFilter: FC<TodoFilterProps> = ({ filter, onChange }) => {
  return (
    <div className={styles.todoFilter}>
      <button
        className={`${styles.filterButton} ${
          filter === "all" ? styles.active : ""
        }`}
        onClick={() => onChange("all")}
      >
        Все
      </button>
      <button
        className={`${styles.filterButton} ${
          filter === "active" ? styles.active : ""
        }`}
        onClick={() => onChange("active")}
      >
        Активные
      </button>
      <button
        className={`${styles.filterButton} ${
          filter === "completed" ? styles.active : ""
        }`}
        onClick={() => onChange("completed")}
      >
        Выполненные
      </button>
    </div>
  );
};
