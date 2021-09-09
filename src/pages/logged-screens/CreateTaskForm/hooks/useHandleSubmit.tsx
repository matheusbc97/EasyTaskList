import useCreateNewTask from '@/hooks/useCreateNewTask';

import {FormObject} from '@/templates/TaskForm';

import getDateByDateAndTime from '@/shared/utils/getDateByDateAndTime';

const useHandleSubmit = () => {
  const createNewTask = useCreateNewTask();

  const handleCreateFormSubmit = async (form: FormObject) => {
    const newTask = {
      title: form.title,
      category: form.category,
      date: getDateByDateAndTime(form.date, form.time),
      description: form.description,
    };

    createNewTask(newTask);
    return;
  };

  return handleCreateFormSubmit;
};

export default useHandleSubmit;
