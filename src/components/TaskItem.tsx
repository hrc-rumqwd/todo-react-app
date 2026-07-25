import type { Task } from "../models/type";

// Concept: Component receives props (read-only) and render UI
interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>Xóa</button>
    </div>
  );
}
