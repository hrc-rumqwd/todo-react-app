import { useEffect, useState } from "react";
import { TaskItem } from "./TaskItem";
import { TaskFilter } from "./TaskFilter";
import { TaskForm } from "./TaskForm";
import { useQuery } from "@tanstack/react-query";
import { fetchTasksAsync } from "../services/taskApi";

export function TaskListPage() {
  // State contains Task list
  //   const [tasks, setTasks] = useState<Task[]>([]);
  //   const [isLoading, setIsLoading] = useState<boolean>(true);
  //   const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  //   useEffect(() => {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setTasks([
  //         { id: 1, title: "Learn React", completed: false },
  //         { id: 2, title: "Learn TypeScript", completed: true },
  //         { id: 3, title: "Build a Todo App", completed: false },
  //       ]);
  //       setIsLoading(false);
  //     }, 1500);
  //   }, []);

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasksAsync,
  });

  if (isLoading) return <p>Đang tải dữ liệu từ TanStack Query...</p>;
  if (isError) return <p>Lỗi: {(error as Error).message}</p>;

  //   const filteredTasks = tasks.filter((task) => {
  //     switch (filter) {
  //       case "active":
  //         return !task.completed;
  //       case "completed":
  //         return task.completed;
  //       default:
  //         return true;
  //     }
  //   });

  // Xử lý toggle hoàn thành
  const handleToggle = (id: number) => {};

  // Xử lý xóa task
  const handleDelete = (id: number) => {};

  //   return (
  //     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
  //       <h1>Task Manager Dashboard</h1>
  //       <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
  //       <TaskForm onAddTask={handleAddTask} />
  //       <div>
  //         {isLoading ? (
  //           <p>Đang tải danh sách công việc...</p>
  //         ) : filteredTasks.length === 0 ? (
  //           <p>Không có công việc nào.</p>
  //         ) : (
  //           filteredTasks.map((task) => (
  //             <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
  //           ))
  //         )}
  //       </div>
  //     </div>
  //   );

  return (
    <div>
      <TaskForm />
      <h1>Danh sách Task {tasks.length}</h1>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onDelete={handleDelete} onToggle={handleToggle} />
      ))}
    </div>
  );
}
