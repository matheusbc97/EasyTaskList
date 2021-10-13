import {useNavigation} from '@react-navigation/native';

import {FormObject} from '@/templates/forms/TaskForm';
import useCreateNewTask from '@/hooks/useCreateNewTask';
import getDateByDateAndTime from '@/shared/utils/getDateByDateAndTime';

import {CreateTaskFormNavigationProp} from '../types';
import {CreateTaskDTO} from '@/store/tasks';

const useHandleSubmit = () => {
  const createNewTask = useCreateNewTask();
  const navigation = useNavigation<CreateTaskFormNavigationProp>();

  const handleCreateFormSubmit = async (form: FormObject) => {
    const newTask: CreateTaskDTO = {
      title: form.title,
      category: form.category,
      date: getDateByDateAndTime(form.date, form.time),
      description: form.description,
    };

    await createNewTask(newTask);

    navigation.goBack();
  };

  return handleCreateFormSubmit;
};

export default useHandleSubmit;
