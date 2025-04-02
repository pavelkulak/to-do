import { FC } from "react";
import { Todo } from "../../../shared/types/todo";
import { TodoItem } from "../../../entities/todo";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return <p className={styles.emptyList}>Нет задач</p>;
  }

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
