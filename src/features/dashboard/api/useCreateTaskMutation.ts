import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../services/api';
import { TaskItemsQueryKey, type TaskItem } from '../types/TaskItem';
import { ToastService } from '../../../services/toast-service';

async function createTask(task: TaskItem): Promise<number> {
  const response = await api.post<TaskItem, { id: number }>(
    '/api/v1/TaskItems',
    task
  );
  return response.id;
}

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TaskItemsQueryKey] });
      ToastService.showSuccess('Create task successfully!');
    },
  });
};
