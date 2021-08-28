import {useDispatch} from 'react-redux';

import {getTasks} from '@store/tasks';
import {useCallback} from 'react';

const useFetchTasks = () => {
  const dispatch = useDispatch();

  const fetchTasks = useCallback(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return fetchTasks;
};

export default useFetchTasks;
