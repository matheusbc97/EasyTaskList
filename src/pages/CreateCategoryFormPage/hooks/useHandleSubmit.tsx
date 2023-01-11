import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';

import {FormObject} from '@/shared/templates/forms/CategoryForm';
import {QUERY_KEYS} from '@/shared/constants/queryKeys';
import {dbCreateCategory} from '@/database';

const useHandleSubmit = () => {
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const mutation = useMutation(dbCreateCategory, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(QUERY_KEYS.CATEGORIES);
      navigation.goBack();
    },
    onError: () => {},
  });

  const handleFormSubmit = (form: FormObject) => {
    mutation.mutate(form);
  };

  return handleFormSubmit;
};

export default useHandleSubmit;
