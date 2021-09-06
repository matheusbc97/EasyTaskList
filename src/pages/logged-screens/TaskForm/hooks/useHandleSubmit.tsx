import {RefObject} from 'react';
import {FormHandles} from '@unform/core';

import {validateAll} from '@shared/utils/validations';
import useCreateNewTask from '@/hooks/useCreateNewTask';
import useUpdateTask from '@/hooks/useUpdateTask';
import {Category, Task} from '@shared/models';

import {FormObject} from '../types';

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
  formRef: RefObject<FormHandles>;
  chosenCategory: Category | null | undefined;
  task: Task | null | undefined;
}

const useHandleSubmit = ({formRef, chosenCategory, task}: Params) => {
  const createNewTask = useCreateNewTask();
  const updateNewTask = useUpdateTask();

  const handleFormSubmit = async (form: FormObject) => {
    const [formErrors, isValid] = validateAll(form);

    if (!isValid) {
      formRef.current?.setErrors(formErrors);
      return;
    }

    if (!task) {
      if (!chosenCategory) {
        return;
      }

      const newTask = {
        title: form.title,
        category: chosenCategory,
        date: getDateByDateAndTime(form.date, form.time),
        description: form.description,
      };

      createNewTask(newTask);
      return;
    }

    const updatedTask = {
      id: task.id,
      title: form.title,
      description: form.description,
      category: chosenCategory ? chosenCategory : task.category!,
      date: getDateByDateAndTime(form.date, form.time),
    };

    updateNewTask(updatedTask);

    return;
  };

  return handleFormSubmit;
};

export default useHandleSubmit;
