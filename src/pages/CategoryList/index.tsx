import React, {useMemo, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {categoryListSelectors} from '@store/categories';
import {
  ScreenWrapper,
  CategoryListItem,
  FloatingActionButton,
} from '@shared/components';

import {AuthenticatedStackParams} from '@navigation/types';

type CategoryListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: CategoryListNavigationProp;
}

const rows = 3;

const CategoryList: React.FC<Props> = ({navigation}) => {
  const lsCategories = useSelector(categoryListSelectors.selectAll);

  const array = useMemo(
    () => [...Array(Math.ceil(lsCategories.length / rows)).keys()],
    [lsCategories],
  );

  const getCategoriesBoard = useCallback(
    ({index: i}) => {
      const lsCategoryListItems = [];

      for (let j = 0; j < rows; j++) {
        const indice = i * rows + j;
        if (indice > lsCategories.length - 1) {
          lsCategoryListItems.push(
            <View style={{width: 115}} key={indice + 'empty'} />,
          );

          continue;
        }

        const category = lsCategories[i * 3 + j];

        lsCategoryListItems.push(
          <CategoryListItem
            key={category.id}
            category={category}
            onPress={() => navigation.navigate('CategoryDetails', {category})}
          />,
        );
      }

      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {lsCategoryListItems}
        </View>
      );
    },
    [lsCategories, navigation],
  );

  return (
    <ScreenWrapper>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={array}
        style={{paddingHorizontal: 5}}
        contentContainerStyle={{paddingBottom: 80}}
        renderItem={getCategoriesBoard}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate('CreateCategoryForm')}
      />
    </ScreenWrapper>
  );
};

export default CategoryList;
