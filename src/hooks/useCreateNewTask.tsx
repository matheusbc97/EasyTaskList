import {useDispatch} from 'react-redux';

import {createTask, CreateTaskDTO} from '@store/tasks';

const useCreateNewTask = (onCreatedTaskCallback?: () => void) => {
  const dispatch = useDispatch();

  const createNewTask = async (newTask: CreateTaskDTO) => {
    const action = await dispatch(createTask(newTask));

    if (action.payload) {
      onCreatedTaskCallback && onCreatedTaskCallback();
    }
  };

  return createNewTask;
};

export default useCreateNewTask;
