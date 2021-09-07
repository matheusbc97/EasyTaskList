import useCreateNewTask from '@/hooks/useCreateNewTask';
import useUpdateTask from '@/hooks/useUpdateTask';
import {Task} from '@shared/models';

import {FormObject, TaskFormHandles} from '../templates/TaskForm';
import {RefObject} from 'react';

const getDateByDateAndTime = (date: string, time: string) => {
  const formTime = new Date(time);
  const formDate = new Date(date);

  return new Date(
    formDate.getFullYear(),
    formDate.getMonth(),
    formDate.getDate(),
    formTime.getHours(),
    formTime.getMinutes(),
  );
};

interface Params {
  task: Task | null | undefined;
  formRef: RefObject<TaskFormHandles>;
}

const useHandleSubmit = ({task}: Params) => {
  const createNewTask = useCreateNewTask();
  const updateNewTask = useUpdateTask();

  const handleUpdateFormSubmit = async (form: FormObject, _task: Task) => {
    const updatedTask = {
      id: _task.id,
      title: form.title,
      description: form.description,
      category: form.category,
      date: getDateByDateAndTime(form.date, form.time),
    };

    updateNewTask(updatedTask);

    return;
  };

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

  const handleFormSubmit = async (form: FormObject) => {
    if (!task) {
      handleCreateFormSubmit(form);

      return;
    }

    handleUpdateFormSubmit(form, task);

    return;
  };

  return handleFormSubmit;
};

export default useHandleSubmit;
