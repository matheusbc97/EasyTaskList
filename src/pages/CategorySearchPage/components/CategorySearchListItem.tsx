import React from 'react';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import {Text} from '@/shared/components';
import {Category} from '@/shared/models';
import categoryIconNames from '@/assets/categoryIconNames';
import LinearGradient from 'react-native-linear-gradient';
import categoryColors from '@/assets/categoryColors';

interface Props {
  category: Category;
  onPress(category: Category): void;
}

const ButtonContainer = styled(RectButton)`
  padding: 7px 10px;
  flex-direction: row;
  align-items: center;
`;

const IconBackground = styled(LinearGradient)`
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 5px;
`;

const CategorySearchListItem: React.FC<Props> = ({category, onPress}) => {
  return (
    <ButtonContainer onPress={() => onPress(category)}>
      <IconBackground
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[
          categoryColors[category.colorIndex].color1,
          categoryColors[category.colorIndex].color2,
        ]}>
        <FontAwesomeIcon
          name={categoryIconNames[category.iconIndex]}
          size={35}
          color="#fff"
          style={{opacity: 0.5}}
        />
      </IconBackground>
      <Text type="title-big" style={{marginLeft: 15}}>
        {category.name}
      </Text>
    </ButtonContainer>
  );
};

export default CategorySearchListItem;
