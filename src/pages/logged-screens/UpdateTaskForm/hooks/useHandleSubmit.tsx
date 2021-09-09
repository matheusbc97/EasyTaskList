import useUpdateTask from '@/hooks/useUpdateTask';
import {Task} from '@shared/models';
import getDateByDateAndTime from '@/shared/utils/getDateByDateAndTime';

import {FormObject} from '@/templates/TaskForm';

interface Params {
  task: Task;
}

const useHandleSubmit = ({task}: Params) => {
  const updateNewTask = useUpdateTask();

  const handleUpdateFormSubmit = async (form: FormObject) => {
    const updatedTask = {
      id: task.id,
      title: form.title,
      description: form.description,
      category: form.category,
      date: getDateByDateAndTime(form.date, form.time),
    };

    updateNewTask(updatedTask);

    return;
  };

  return handleUpdateFormSubmit;
};

export default useHandleSubmit;
