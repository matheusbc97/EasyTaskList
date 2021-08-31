import {useSelector} from 'react-redux';

import {tasksListSelectors, selectTasksFetchState} from '@store/tasks';

const useTasks = () => {
  const tasks = useSelector(tasksListSelectors.selectAll);
  const tasksFetchState = useSelector(selectTasksFetchState);

  return {
    tasks,
    tasksFetchState,
  };
};

export default useTasks;
