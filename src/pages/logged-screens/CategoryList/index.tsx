import React, {useMemo} from 'react';
import {FlatList, View} from 'react-native';

import {useSelector} from 'react-redux';

import {categoryListSelectors} from '@store/categories';
import {
  ScreenWrapper,
  CategoryListItem,
  FloatingActionButton,
} from '@shared/components';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthenticatedStackParams} from '@navigation/types';
import {map} from 'lodash';

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

  return (
    <ScreenWrapper>
      <FlatList
        data={array}
        style={{paddingHorizontal: 5}}
        renderItem={({index: i}) => {
          const lsCategoryListItems = [];

          for (let j = 0; j < rows; j++) {
            if (i * rows + j > lsCategories.length - 1) {
              lsCategoryListItems.push(<View style={{width: 100}} />);

              continue;
            }

            const category = lsCategories[i * 3 + j];

            lsCategoryListItems.push(
              <CategoryListItem
                category={category}
                onPress={() => navigation.navigate('CategoryForm', {category})}
              />,
            );
          }

          return (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {lsCategoryListItems}
            </View>
          );
        }}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate('CategoryForm')}
      />
    </ScreenWrapper>
  );
};

export default CategoryList;
