import { FC } from "react";
import { useTheme } from "../../lib/hooks";
import styles from "./ThemeToggle.module.css";

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={
        theme === "light" ? "Включить темную тему" : "Включить светлую тему"
      }
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};
