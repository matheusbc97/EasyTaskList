import React, {useMemo} from 'react';
import {View} from 'react-native';

import {
  Text,
  ScreenWrapper,
  CategoryListItem,
  Header,
} from '@shared/components';
import {AuthenticatedStackParams} from '@navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategoryDetails'>;
  route: RouteProp<AuthenticatedStackParams, 'CategoryDetails'>;
}

const CategoryDetails: React.FC<Props> = ({route}) => {
  const category = useMemo(() => route.params.category, [
    route.params.category,
  ]);

  return (
    <ScreenWrapper style={{marginHorizontal: 5}}>
      <Header title={category.name} />
    </ScreenWrapper>
  );
};

export default CategoryDetails;
