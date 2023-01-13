import {useQuery} from 'react-query';

import {QUERY_KEYS} from '@/shared/constants/queryKeys';
import {dbQueryTasks} from '@/database';

export function useQueryTasks() {
  const {
    data: tasks,
    refetch: refetchTasks,
    isError,
    isLoading,
  } = useQuery(QUERY_KEYS.TASKS, dbQueryTasks);

  return {
    tasks: tasks ?? [],
    refetchTasks,
    hasError: isError,
    isLoading,
  };
}
