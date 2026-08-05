import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskItemsQueryKey, type TaskItem } from '../types/TaskItem';
import { httpClient } from '../../../services/http-client';
import { ToastService } from '../../../services/toast-service';

async function updateTask(task: TaskItem): Promise<number> {
  const response = await httpClient.patch<TaskItem, { id: number }>(
    `/api/v1/TaskItems/${task.id}`,
    task
  );
  return response.id;
}

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TaskItemsQueryKey] });
      ToastService.showSuccess('Update task successfully!');
    },
  });
};
