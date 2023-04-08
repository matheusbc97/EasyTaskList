import React from 'react';

import {Section} from '@/modules/shared/components';
import {useQueryCategories, useTranslation} from '@/modules/shared/hooks';
import CategoriesList from './components/CategoriesList';
import {AuthenticateStackNavigationProp} from '@/modules/shared/types/AuthenticateStackPageProps';
import {useNavigation} from '@react-navigation/native';

function CategoryListSection() {
  const {translation} = useTranslation();
  const navigation =
    useNavigation<AuthenticateStackNavigationProp<'BottomNavigation'>>();

  const {categories, hasError, isLoading} = useQueryCategories();

  return (
    <Section title={translation('CATEGORIES')} contentStyle={{height: 143}}>
      <CategoriesList
        lsCategories={categories}
        lsCategoriesFetchState={{hasError, isLoading}}
        onCategoryPress={category =>
          navigation.navigate('CategoryDetails', {category})
        }
      />
    </Section>
  );
}

export default CategoryListSection;
