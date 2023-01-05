import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';

import {FormObject} from '@/templates/forms/TaskForm';
import getDateByDateAndTime from '@/shared/utils/getDateByDateAndTime';

import {CreateTaskFormNavigationProp} from '../types';
import {addOneTask} from '@/store/tasks';
import {Task} from '@shared/models';
import {useDispatch} from 'react-redux';

const useHandleSubmit = () => {
  const navigation = useNavigation<CreateTaskFormNavigationProp>();
  const dispatch = useDispatch();

  const handleCreateFormSubmit = async (form: FormObject) => {
    const newTask: Task = {
      title: form.title,
      category: form.category,
      date: getDateByDateAndTime(form.date, form.time).toISOString(),
      description: form.description,
      done: false,
      id: String(uuid.v4()),
    };

    dispatch(addOneTask(newTask));

    navigation.goBack();
  };

  return handleCreateFormSubmit;
};

export default useHandleSubmit;
