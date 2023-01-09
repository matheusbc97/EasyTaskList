import React from 'react';
import {FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  ScreenWrapper,
  CategoryListItem,
  FloatingActionButton,
} from '@shared/components';

import {AuthenticatedStackParams} from '@navigation/types';
import {useGetCategories} from './hooks/useGetCategories';

type CategoryListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: CategoryListNavigationProp;
}

const CategoryList: React.FC<Props> = ({navigation}) => {
  const {categories} = useGetCategories();

  return (
    <ScreenWrapper>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={categories}
        numColumns={3}
        style={{paddingHorizontal: 5}}
        contentContainerStyle={{paddingBottom: 80}}
        renderItem={({item: category}) => (
          <CategoryListItem
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
};

export default CategoryList;
