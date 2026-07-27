export interface TaskItem {
  id: number;
  title: string;
  description?: string | null;
  status?: TaskStatus;
  completed: boolean;
  priority?: TaskPriority;
}

export type TaskStatus = 'New' | 'In Progress' | 'Pending' | 'Done';

export type TaskPriority = 'Low' | 'Middle' | 'High';
