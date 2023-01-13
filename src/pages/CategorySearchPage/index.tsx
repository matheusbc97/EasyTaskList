import React, {useState, useCallback, useRef} from 'react';
import {TextInput} from 'react-native';
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

import CategorySearchListItem from './components/CategorySearchListItem';
import {SearchInput, SearchList} from './styles';
import {useQueryCategories} from '../../shared/hooks/useGetCategories';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategorySearch'>;
  route: RouteProp<AuthenticatedStackParams, 'CategorySearch'>;
}

const CategorySearchPage: React.FC<Props> = ({navigation, route}) => {
  const [search, setSearch] = useState('');

  const inputRef = useRef<TextInput>(null);

  const {onCategoryChange} = route.params;

  const {categories, refetchCategories, hasError, isLoading} =
    useQueryCategories();

  const handleChosenCategory = (chosenCategory: Category) => {
    onCategoryChange(chosenCategory);
    navigation.pop();
  };

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
          onRefresh={refetchCategories}
          emptyListText="Nenhuma Categoria Encontrada"
          hasError={hasError}
          isLoading={isLoading}
          keyExtractor={(category: Category) => category.id}
          data={categories}
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
