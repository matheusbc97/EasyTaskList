import React from 'react';

import {
  FlatListWithFetchIndicator,
  CategoryListItem,
} from '@/modules/shared/components';
import {useTranslation} from '@/modules/shared/hooks';
import {Category, FetchState} from '@/modules/shared/models';

interface CategoriesListProps {
  lsCategories: Category[];
  lsCategoriesFetchState: FetchState;
  onCategoryPress: (category: Category) => void;
}

function CategoriesList({
  lsCategories,
  lsCategoriesFetchState,
  onCategoryPress,
}: CategoriesListProps) {
  const {translation} = useTranslation();

  return (
    <FlatListWithFetchIndicator
      emptyListText={translation('NO_CATEGORIES_FOUND')}
      hasError={lsCategoriesFetchState.hasError}
      isLoading={lsCategoriesFetchState.isLoading}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={lsCategories}
      keyExtractor={category => category.id}
      renderItem={({item: category}) => (
        <CategoryListItem
          category={category}
          onPress={() => onCategoryPress(category)}
        />
      )}
    />
  );
}

export default CategoriesList;
