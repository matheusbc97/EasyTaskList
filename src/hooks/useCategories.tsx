import {useSelector} from 'react-redux';

import {
  categoryListSelectors,
  selectCategoriesFetchState,
} from '@store/categories';

const useCategories = () => {
  const lsCategories = useSelector(categoryListSelectors.selectAll);
  const lsCategoriesFetchState = useSelector(selectCategoriesFetchState);

  return {
    lsCategories,
    lsCategoriesFetchState,
  };
};

export default useCategories;
