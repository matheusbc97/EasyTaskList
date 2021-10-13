import {useMemo} from 'react';

import {Category} from '@/shared/models';
import categoryColors from '@/assets/categoryColors';

const useCategoryColor = (category: Category | undefined) =>
  useMemo(
    () =>
      category?.colorIndex
        ? categoryColors[category?.colorIndex].color1
        : categoryColors[0].color1,
    [category],
  );

export default useCategoryColor;
