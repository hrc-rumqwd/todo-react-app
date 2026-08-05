export interface TaskItem {
  id?: number;
  title: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  authorName: string;
}

export type TaskStatus = 'New' | 'InProgress' | 'Pending' | 'Done';

export type TaskPriority = 'Low' | 'Medium' | 'High';

interface PriorityColor {
  priority: TaskPriority;
  color: string;
}

export const priorityColors: PriorityColor[] = [
  {
    priority: 'High',
    color: '#DC4C64',
  },
  {
    priority: 'Medium',
    color: '#E4A11B',
  },
  {
    priority: 'Low',
    color: '#14a44d',
  },
];

export const TaskItemsQueryKey = 'tasks';
