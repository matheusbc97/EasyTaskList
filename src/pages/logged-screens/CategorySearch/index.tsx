import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {StackNavigationProp} from '@react-navigation/stack';

import {AuthenticatedStackParams} from '@navigation/types';
import {ScreenWrapper, Header} from '@shared/components';
import {
  selectCategoriesFetchState,
  getUserCategories,
  categoryListSelectors,
} from '@store/categories';
import {Category} from '@shared/models';

import CategorySearchListItem from './CategorySearchListItem';

import {SearchInput, SearchList, Container} from './styles';
import {selectAppTheme} from '@store/configs';
import {TextInput} from 'react-native';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategorySearch'>;
}

const CategorySearch: React.FC<Props> = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [lsCategories, setLsCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();

  const fetchState = useSelector(selectCategoriesFetchState);
  const categoryListRedux = useSelector(categoryListSelectors.selectAll);
  const appTheme = useSelector(selectAppTheme);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    dispatch(getUserCategories());
    setTimeout(() => inputRef.current?.focus());
  }, [dispatch]);

  useEffect(() => {
    const newCategoryList = categoryListRedux.filter((category) =>
      new RegExp(search, 'i').test(category.name),
    );

    setLsCategories(newCategoryList);
  }, [search, categoryListRedux]);

  const handleChosenCategory = useCallback(
    (chosenCategory: Category) => {
      navigation.navigate('TaskForm', {chosenCategory});
    },
    [navigation],
  );

  const handleRefresh = useCallback(() => dispatch(getUserCategories()), [
    dispatch,
  ]);

  return (
    <ScreenWrapper>
      <Header title="Selecionar Categoria" />

      <Container backgroundColor={appTheme.aboveBackground}>
        <SearchInput
          ref={inputRef}
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar Categoria..."
        />
        <SearchList
          onRefresh={handleRefresh}
          emptyListText="Nenhuma Categoria Encontrada"
          hasError={fetchState.hasError}
          isLoading={fetchState.isLoading}
          keyExtractor={(category: Category) => category.id}
          data={lsCategories}
          renderItem={({item}) => (
            <CategorySearchListItem
              category={item as Category}
              onPress={handleChosenCategory}
            />
          )}
        />
      </Container>
    </ScreenWrapper>
  );
};

export default CategorySearch;
