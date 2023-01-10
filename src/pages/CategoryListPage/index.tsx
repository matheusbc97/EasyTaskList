import React from 'react';
import {FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  ScreenWrapper,
  CategoryListItem,
  FloatingActionButton,
} from '@/shared/components';
import {AuthenticatedStackParams} from '@/navigation/types';

import {useGetCategories} from './hooks/useGetCategories';
import {doesListItemNeedsMoreMargin} from '@/shared/utils/doesListItemNeedsMoreMargin';

type CategoryListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: CategoryListNavigationProp;
}

function CategoryListPage({navigation}: Props) {
  const {categories} = useGetCategories();

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
              marginRight: doesListItemNeedsMoreMargin(index, categories.length)
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
