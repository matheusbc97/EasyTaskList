import {useQuery} from 'react-query';

import {dbGetTasksNotDone} from '@/database/functions/dbGetTasksNotDone';
import {QUERY_KEYS} from '@/shared/constants/queryKeys';

export function useTaskNotDone() {
  const {
    data,
    refetch: refetchTasksNotDone,
    isError,
    isLoading,
  } = useQuery(
    [QUERY_KEYS.TASKS, QUERY_KEYS.TASKS_NOT_DONE],
    dbGetTasksNotDone,
  );

  return {
    tasksNotDone: data ?? [],
    refetchTasksNotDone,
    hasError: isError,
    isLoading,
  };
}
