import {Task} from '@/shared/models';
import {FormObject} from '@/shared/templates/forms/TaskForm';

const getInitialData = (task: Task) => {
  const _initialData: FormObject = {
    title: task.title,
    category: task.category!,
    date: task.date,
    time: task.date,
    description: task.description,
  };

  return _initialData;
};

export default getInitialData;
