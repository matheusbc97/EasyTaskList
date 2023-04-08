import {useQuery} from 'react-query';
import {QUERY_KEYS} from '@/modules/shared/constants/queryKeys';
import {dbQueryCategories} from '@/database';

export function useQueryCategories() {
  const {
    data,
    refetch,
    isError: hasError,
    isLoading,
  } = useQuery(QUERY_KEYS.CATEGORIES, dbQueryCategories);

  return {
    categories: data ?? [],
    refetchCategories: refetch,
    hasError,
    isLoading,
  };
}
