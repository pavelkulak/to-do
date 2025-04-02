import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;

    if (savedTheme) {
      return savedTheme;
    }

    // Проверяем предпочтения системы
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    // По умолчанию используем светлую тему
    return "light";
  });

  useEffect(() => {
    // Сохраняем тему в localStorage
    localStorage.setItem("theme", theme);

    // Обновляем data-theme атрибут на documentElement (html тег)
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
