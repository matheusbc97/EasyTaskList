import {useSelector} from 'react-redux';

import {selectTasksFetchState, selectTaskOfCategory} from '@store/tasks';

const useTasksOfCategory = (categoryId: string) => {
  const tasks = useSelector(selectTaskOfCategory(categoryId));
  const tasksFetchState = useSelector(selectTasksFetchState);

  return {
    tasks,
    tasksFetchState,
  };
};

export default useTasksOfCategory;
