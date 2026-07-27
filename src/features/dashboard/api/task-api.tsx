import type { TaskItem } from '../types/TaskItem';

let mockTasks: TaskItem[] = [
  { id: 1, title: 'Learn React Core', completed: true, priority: 'High' },
  { id: 2, title: 'Learn React Router', completed: true, priority: 'Low' },
  {
    id: 3,
    title: 'Master TanStack Query',
    completed: false,
    priority: 'Middle',
  },
];

export const fetchTasksAsync = async (): Promise<TaskItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [...mockTasks];
};

export const fetchTaskByIdAsync = async (id: number): Promise<TaskItem> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const task = mockTasks.find((t) => t.id == id);
  if (task == null) throw new Error('Not found Task');
  return task;
};

export const addTaskAsync = async (title: string): Promise<TaskItem> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const newTask: TaskItem = { id: Date.now(), title: title, completed: false };
  mockTasks.push(newTask);
  return newTask;
};

export const removeTaskAsync = async (id: number): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  mockTasks = mockTasks.filter((t) => t.id != id);
  return true;
};
