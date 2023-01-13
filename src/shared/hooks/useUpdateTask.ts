import {useMutation, useQueryClient} from 'react-query';
import {QUERY_KEYS} from '@/shared/constants/queryKeys';
import {dbUpdateTask, DbUpdateTaskParams} from '@/database';

export function useUpdateTask(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(dbUpdateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TASKS);
      onSuccess?.();
    },
    onError: () => {},
  });

  const updateTask = async (updates: DbUpdateTaskParams) => {
    mutation.mutate(updates);
  };

  return updateTask;
}
