import {useQuery} from 'react-query';
import {QUERY_KEYS} from '@/shared/constants/queryKeys';
import {fetchCategories} from '@/database/functions/dbFetchCategories';

export function useGetCategories() {
  const {data: categories} = useQuery(QUERY_KEYS.CATEGORIES, fetchCategories);

  return {categories};
}
