import React from 'react';
import {FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  ScreenWrapper,
  CategoryListItem,
  FloatingActionButton,
} from '@/modules/shared/components';
import {AuthenticatedStackParams} from '@/modules/core/navigation/types';

import {useQueryCategories} from '../../../shared/hooks/data/useGetCategories';
import {doesListItemNeedsMoreMargin} from '@/modules/shared/utils/doesListItemNeedsMoreMargin';

type CategoryListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: CategoryListNavigationProp;
}

function CategoryListPage({navigation}: Props) {
  const {categories} = useQueryCategories();

  return (
    <ScreenWrapper>
      <FlatList
        keyExtractor={item => item.id}
        data={categories}
        numColumns={3}
        style={{paddingHorizontal: 5}}
        contentContainerStyle={{paddingBottom: 80}}
        renderItem={({item: category, index}) => (
          <CategoryListItem
            style={{
              flex: 0.3333,
              marginRight: doesListItemNeedsMoreMargin({
                arrayLength: categories.length,
                index,
                columns: 3,
              })
                ? 20
                : undefined,
            }}
            key={category.id}
            category={category}
            onPress={() => navigation.navigate('CategoryDetails', {category})}
          />
        )}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate('CreateCategoryForm')}
      />
    </ScreenWrapper>
  );
}

export default CategoryListPage;
