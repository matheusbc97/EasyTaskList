import React from 'react';

import {FlatListWithFetchIndicator, CategoryListItem} from '@shared/components';
import {useTranslation} from '@shared/hooks';
import {Category, FetchState} from '@/shared/models';

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
