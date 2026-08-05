import type { TaskItem } from '../types/TaskItem';
import { httpClient } from '../../../services/http-client';

export async function fetchTaskDetail(id: number): Promise<TaskItem> {
  const response = await httpClient.get<TaskItem>(`/api/v1/TaskItems/${id}`);
  return response;
}
