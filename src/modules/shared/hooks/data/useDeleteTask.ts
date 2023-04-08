import {useMutation, useQueryClient} from 'react-query';
import {QUERY_KEYS} from '@/modules/shared/constants/queryKeys';
import {dbDeleteTask} from '@/database';

export function useDeleteTask(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(dbDeleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TASKS);
      onSuccess?.();
    },
    onError: () => {},
  });

  const deleteTask = async (taskId: string) => {
    mutation.mutate(taskId);
  };

  return deleteTask;
}
