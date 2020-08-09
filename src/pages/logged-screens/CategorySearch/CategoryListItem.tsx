import React from 'react';
import {RectButton} from 'react-native-gesture-handler';

import {Text} from '@shared/components';
import {Category} from '@shared/models';

interface Props {
  category: Category;
  onPress(category: Category): void;
}

const CategoryListItem: React.FC<Props> = ({category, onPress}) => {
  return (
    <RectButton
      style={{paddingVertical: 5, paddingHorizontal: 10}}
      onPress={() => onPress(category)}>
      <Text type="title-medium">{category.name}</Text>
    </RectButton>
  );
};

export default CategoryListItem;
