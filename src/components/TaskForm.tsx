import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === "") {
      alert("Vui lòng nhập tiêu đề task");
      return;
    }

    onAddTask(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "15px" }}>
      <input type="text" placeholder="Enter a new task..." value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit">Thêm</button>
    </form>
  );
}
