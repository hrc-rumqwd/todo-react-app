import { useEffect, useState } from "react";
import "./App.css";
import type { Task } from "./models/type";
import { TaskItem } from "./components/TaskItem";
import { TaskFilter } from "./components/TaskFilter";
import { TaskForm } from "./components/TaskForm";

// Concept: App component is the root component of the application
// State changed -> React re-render the components automatically (UI = f(state))
function App() {
  // State contains Task list
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setTasks([
        { id: 1, title: "Learn React", completed: false },
        { id: 2, title: "Learn TypeScript", completed: true },
        { id: 3, title: "Build a Todo App", completed: false },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(), // Tạo ID tạm
      title,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  });

  // Xử lý toggle hoàn thành
  const handleToggle = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Xử lý xóa task
  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Task Manager Dashboard</h1>
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      <TaskForm onAddTask={handleAddTask} />
      <div>
        {isLoading ? (
          <p>Đang tải danh sách công việc...</p>
        ) : filteredTasks.length === 0 ? (
          <p>Không có công việc nào.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
