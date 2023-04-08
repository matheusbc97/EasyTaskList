import {useMemo} from 'react';

import {Category} from '@/modules/shared/models';
import categoryColors from '@/assets/categoryColors';

export const useCategoryColor = (category: Category | undefined) =>
  useMemo(
    () =>
      category?.colorIndex
        ? categoryColors[category?.colorIndex].color1
        : categoryColors[0].color1,
    [category],
  );
