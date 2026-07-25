import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "../models/type";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskByIdAsync } from "../services/taskApi";

export function TaskDetailPage() {
  // Lấy parameter từ URL xuống
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // In a real application, you would fetch the task details based on the ID
  const {
    data: task = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskByIdAsync(Number(id)),
  });

  const navigateToList = () => navigate("/");

  if (isLoading) return <p>Đang tải thông tin task...</p>;
  if (isError) return <p>Load data failed: {(error as Error).message}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <button onClick={() => navigateToList()}>Quay lại danh sách</button>
      <h1>Task Detail</h1>
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Status:</strong> {task.completed ? "Completed" : "Active"}
      </p>
    </div>
  );
}
