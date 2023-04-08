import {useQueryClient, useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';

import {FormObject} from '@/modules/shared/templates/forms/TaskForm';
import getDateByDateAndTime from '@/modules/shared/utils/getDateByDateAndTime';
import {QUERY_KEYS} from '@/modules/shared/constants/queryKeys';
import {dbCreateTask} from '@/database';
import {handleErrorMessage} from '@/modules/shared/utils/errorHandler';

import {CreateTaskFormNavigationProp} from '../types';

const useHandleSubmit = () => {
  const navigation = useNavigation<CreateTaskFormNavigationProp>();
  const queryClient = useQueryClient();

  const mutation = useMutation(dbCreateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TASKS);
      navigation.goBack();
    },
    onError: error => {
      handleErrorMessage(error);
    },
  });

  const handleCreateFormSubmit = (form: FormObject) => {
    console.log('form', form);
    mutation.mutate({
      categoryId: form.category.id,
      date: getDateByDateAndTime(form.date, form.time).toISOString(),
      title: form.title,
      description: form.description,
    });
  };

  return handleCreateFormSubmit;
};

export default useHandleSubmit;
