import {useMutation, useQueryClient} from 'react-query';

import {FormObject} from '@/modules/shared/templates/forms/CategoryForm';
import {QUERY_KEYS} from '@/modules/shared/constants/queryKeys';
import {dbCreateCategory} from '@/database';

interface UseCreateCategoryProps {
  onSuccess?: () => void;
}

export function useCreateCategory({onSuccess}: UseCreateCategoryProps = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation(dbCreateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CATEGORIES);
      onSuccess?.();
    },
    onError: () => {},
  });

  const createCategory = (form: FormObject) => {
    mutation.mutate(form);
  };

  return createCategory;
}
