import type { Task } from "../models/type";

let mockTasks: Task[] = [
  { id: 1, title: "Learn React Core", completed: true },
  { id: 2, title: "Learn React Router", completed: true },
  { id: 3, title: "Master TanStack Query", completed: false },
];

export const fetchTasksAsync = async (): Promise<Task[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [...mockTasks];
};

export const fetchTaskByIdAsync = async (id: number): Promise<Task> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const task = mockTasks.find((t) => t.id == id);
  if (task == null) throw new Error("Not found Task");
  return task;
};

export const addTaskAsync = async (title: string): Promise<Task> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const newTask: Task = { id: Date.now(), title: title, completed: false };
  mockTasks.push(newTask);
  return newTask;
};
