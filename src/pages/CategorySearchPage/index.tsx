import React, {useState, useEffect, useCallback, useRef} from 'react';
import {TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthenticatedStackParams} from '@/navigation/types';
import {
  ScreenWrapper,
  Header,
  Section,
  CreateNewCategoryButton,
  Separator,
} from '@/shared/components';
import {Category} from '@/shared/models';
import {
  selectCategoriesFetchState,
  getUserCategories,
  categoryListSelectors,
} from '@/store/categories';

import CategorySearchListItem from './components/CategorySearchListItem';
import {SearchInput, SearchList} from './styles';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategorySearch'>;
  route: RouteProp<AuthenticatedStackParams, 'CategorySearch'>;
}

const CategorySearchPage: React.FC<Props> = ({navigation, route}) => {
  const [search, setSearch] = useState('');
  const [lsCategories, setLsCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();

  const fetchState = useSelector(selectCategoriesFetchState);
  const categoryListRedux = useSelector(categoryListSelectors.selectAll);

  const inputRef = useRef<TextInput>(null);

  const {onCategoryChange} = route.params;

  useEffect(() => {
    dispatch(getUserCategories());
    setTimeout(() => inputRef.current?.focus());
  }, [dispatch]);

  useEffect(() => {
    const newCategoryList = categoryListRedux.filter(category =>
      new RegExp(search, 'i').test(category.name),
    );

    setLsCategories(newCategoryList);
  }, [search, categoryListRedux]);

  const handleChosenCategory = (chosenCategory: Category) => {
    onCategoryChange(chosenCategory);
    navigation.pop();
  };

  const handleRefresh = useCallback(
    () => dispatch(getUserCategories()),
    [dispatch],
  );

  const handleBackPress = useCallback(() => navigation.pop(), [navigation]);

  return (
    <ScreenWrapper>
      <Header title="Selecionar Categoria" onBackPress={handleBackPress} />

      <Section style={{flex: 1, marginTop: 10}} contentStyle={{flex: 1}}>
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
      </Section>
      <Separator style={{marginTop: 5, marginBottom: 5}} />
      <CreateNewCategoryButton />
    </ScreenWrapper>
  );
};

export default CategorySearchPage;