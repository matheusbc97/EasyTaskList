import React from 'react';
import {FlatList} from 'react-native';

import {useSelector} from 'react-redux';

import {categoryListSelectors} from '@store/categories';
import {
  ScreenWrapper,
  CategoryListItem,
  FloatingActionButton,
} from '@shared/components';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthenticatedStackParams} from '@navigation/types';

type CategoryListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: CategoryListNavigationProp;
}

const CategoryList: React.FC<Props> = ({navigation}) => {
  const lsCategories = useSelector(categoryListSelectors.selectAll);

  return (
    <ScreenWrapper>
      <FlatList
        horizontal
        data={lsCategories}
        renderItem={({item: category}) => (
          <CategoryListItem category={category} />
        )}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate('CategoryForm')}
      />
    </ScreenWrapper>
  );
};

export default CategoryList;
