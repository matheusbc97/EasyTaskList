import {useNavigation} from '@react-navigation/native';

import {FormObject} from '@/modules/shared/templates/forms/CategoryForm';
import {dbUpdateCategory} from '@/database';
import {QUERY_KEYS} from '@/modules/shared/constants/queryKeys';
import {useQueryClient, useMutation} from 'react-query';

const useHandleSubmit = (categoryId: string) => {
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const mutation = useMutation(dbUpdateCategory, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(QUERY_KEYS.CATEGORIES);
      navigation.goBack();
    },
    onError: () => {},
  });

  const handleFormSubmit = (form: FormObject) => {
    mutation.mutate({
      categoryId,
      ...form,
    });
  };

  return handleFormSubmit;
};

export default useHandleSubmit;
