import {useDispatch} from 'react-redux';

import {
  updateTask as updateTaskAction,
  UpdateTaskDTO,
} from '@store/tasks/thunkActions';

const useUpdateTask = (onUpdateTaskCallback?: () => void) => {
  const dispatch = useDispatch();

  const updateTask = async (task: UpdateTaskDTO) => {
    const action = await dispatch(updateTaskAction(task));

    if (action.payload) {
      onUpdateTaskCallback && onUpdateTaskCallback();
    }
  };

  return updateTask;
};

export default useUpdateTask;
