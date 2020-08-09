import React, {useState, useEffect, useCallback} from 'react';
import {TextInput, FlatList} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {StackNavigationProp} from '@react-navigation/stack';

import {AuthenticatedStackParams} from '@navigation/types';
import {ScreenWrapper, LoadingIndicator} from '@shared/components';
import {
  selectCategoriesFetchState,
  getUserCategories,
  categoryListSelectors,
} from '@store/categories';
import {Category} from '@shared/models';

import CategoryListItem from './CategoryListItem';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategorySearch'>;
}

const CategorySearch: React.FC<Props> = ({navigation}) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const fetchState = useSelector(selectCategoriesFetchState);
  const categories = useSelector(categoryListSelectors.selectAll);

  useEffect(() => {
    dispatch(getUserCategories());
  }, [dispatch]);

  const handleChosenCategory = useCallback(
    (chosenCategory: Category) => {
      navigation.navigate('TaskForm', {chosenCategory});
    },
    [navigation],
  );

  if (fetchState.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ScreenWrapper>
      <TextInput
        value={search}
        onChangeText={setSearch}
        style={{
          borderBottomColor: 'red',
          borderBottomWidth: 1,
        }}
      />
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <CategoryListItem category={item} onPress={handleChosenCategory} />
        )}
      />
    </ScreenWrapper>
  );
};

export default CategorySearch;
