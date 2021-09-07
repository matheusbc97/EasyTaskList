import {Task} from '@shared/models';
import convertMillisecondsToDate from '@shared/utils/convertMillisecondsToDate';

import {FormObject} from '../templates/TaskForm';

const getInitialData = (task: Task | null | undefined) => {
  if (!task) {
    return undefined;
  }

  const _initialData: FormObject = {
    title: task.title,
    category: task.category!,
    date: convertMillisecondsToDate(task.date).toString(),
    time: convertMillisecondsToDate(task.date).toString(),
    description: task.description,
  };

  return _initialData;
};

export default getInitialData;
