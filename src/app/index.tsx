import { FC, useEffect } from "react";
import { TodoWidget } from "../widgets/todo";
import { useTheme } from "../shared/lib/hooks";
import "./styles/index.css";

export const App: FC = () => {
  const { theme } = useTheme();

  // Применяем тему при загрузке приложения
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <main className="app">
      <TodoWidget />
    </main>
  );
};
