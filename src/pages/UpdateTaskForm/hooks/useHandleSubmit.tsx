import {useNavigation} from '@react-navigation/native';

import useUpdateTask from '@/hooks/useUpdateTask';
import getDateByDateAndTime from '@/shared/utils/getDateByDateAndTime';
import {FormObject} from '@/templates/forms/TaskForm';
import {getUserTaskById} from '@/shared/firebase/getUserTaskById';
import {Task} from '@/shared/models';

import {UpdateTaskFormNavigation} from '../types';

const useHandleSubmit = (taskId: string, callback: (task: Task) => void) => {
  const updateNewTask = useUpdateTask();
  const navigation = useNavigation<UpdateTaskFormNavigation>();

  const handleUpdateFormSubmit = async (form: FormObject) => {
    await updateNewTask({
      id: taskId,
      title: form.title,
      description: form.description,
      category: form.category,
      date: getDateByDateAndTime(form.date, form.time),
    });

    const task = await getUserTaskById(taskId);

    navigation.goBack();
    callback(task);
  };

  return handleUpdateFormSubmit;
};

export default useHandleSubmit;
