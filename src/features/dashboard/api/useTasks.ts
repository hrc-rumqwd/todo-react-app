import {
  TaskItemsQueryKey,
  type TaskItem,
  type TaskStatus,
} from '../types/TaskItem';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../services/http-client';
import type { PaginationResult } from '../../../services/types/result';
import { buildQueryString } from '../../../services/internal/query-string-builder';
import type { FilterTypes } from '../components/task-filter';
import { IdentitySessionQueryKey } from '../../auth/types/identity-query-keys';

async function fetchTasks(
  pageIndex: number,
  pageSize: number,
  status: TaskStatus[]
): Promise<PaginationResult<TaskItem>> {
  try {
    const queryString = buildQueryString({ pageIndex, pageSize, status });

    const response = await httpClient.get<PaginationResult<TaskItem>>(
      `/api/v1/TaskItems?${queryString}`
    );
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const useTasks = (filterType: FilterTypes) => {
  return useQuery({
    queryKey: [TaskItemsQueryKey, filterType, IdentitySessionQueryKey],
    queryFn: () => fetchTasks(1, 10, handleStatus(filterType)),
  });
};

const handleStatus = (type: FilterTypes) => {
  switch (type) {
    case 'active':
      return ['InProgress', 'New', 'Pending'] as TaskStatus[];
    case 'completed':
      return ['Done'] as TaskStatus[];
    case 'all':
    default:
      return [];
  }
};
