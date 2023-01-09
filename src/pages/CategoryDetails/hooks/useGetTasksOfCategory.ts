import {useEffect} from 'react';

import useFetchTasks from '@/hooks/useFetchTasks';
import useTasksOfCategory from '@/hooks/useTasksOfCategory';

export function useGetTasksOfCategory(categoryId: string) {
  const {tasks, tasksFetchState} = useTasksOfCategory(categoryId);
  const fetchTasks = useFetchTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    tasksFetchState,
    fetchTasks,
  };
}
