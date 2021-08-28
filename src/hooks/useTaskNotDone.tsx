import {useSelector} from 'react-redux';

import {selectTasksNotDone, selectTasksFetchState} from '@store/tasks';

const useTaskNotDone = () => {
  const tasksNotDone = useSelector(selectTasksNotDone);
  const tasksFetchState = useSelector(selectTasksFetchState);

  return {
    tasksNotDone,
    tasksFetchState,
  };
};

export default useTaskNotDone;
