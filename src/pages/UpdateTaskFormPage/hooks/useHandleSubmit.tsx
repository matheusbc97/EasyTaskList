import {useNavigation} from '@react-navigation/native';

import getDateByDateAndTime from '@/shared/utils/getDateByDateAndTime';
import {FormObject} from '@/shared/templates/forms/TaskForm';
import {Task} from '@/shared/models';

import {UpdateTaskFormNavigation} from '../types';
import {updateTask} from '@store/tasks';
import {useDispatch} from 'react-redux';

const useHandleSubmit = (taskId: string) => {
  const navigation = useNavigation<UpdateTaskFormNavigation>();
  const dispatch = useDispatch();

  const handleUpdateFormSubmit = async (form: FormObject) => {
    const changes: Omit<Task, 'done' | 'id'> = {
      title: form.title,
      description: form.description,
      category: form.category,
      date: getDateByDateAndTime(form.date, form.time).toISOString(),
    };

    dispatch(updateTask({id: taskId, changes}));

    navigation.goBack();
  };

  return handleUpdateFormSubmit;
};

export default useHandleSubmit;
