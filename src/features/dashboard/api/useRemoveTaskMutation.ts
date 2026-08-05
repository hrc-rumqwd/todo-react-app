import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../services/http-client';
import { TaskItemsQueryKey } from '../types/TaskItem';
import { ToastService } from '../../../services/toast-service';

async function removeTask(id: number): Promise<boolean> {
  const response = await httpClient.delete<boolean>(`/api/v1/TaskItems/${id}`);
  return response;
}

export const useRemoveTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TaskItemsQueryKey] });
      ToastService.showSuccess('Remove task successfully');
    },
  });
};
