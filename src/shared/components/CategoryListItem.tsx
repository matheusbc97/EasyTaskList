import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import categoryColors from '@assets/categoryColors';
import {Text} from '@shared/components';
import {Category} from '@shared/models';
import {TouchableOpacity} from 'react-native-gesture-handler';
import categoryIconNames from '@assets/categoryIconNames';

interface Props {
  category: Category;
  onPress(): void;
}

const CategoryListItem: React.FC<Props> = ({category, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 105,
        width: 105,
        marginHorizontal: 5,
        marginVertical: 10,
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[
          categoryColors[category.colorIndex].color1,
          categoryColors[category.colorIndex].color2,
        ]}
        style={{
          //backgroundColor: '#34cbb6',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          borderRadius: 10,
        }}>
        <FontAwesomeIcon
          name={categoryIconNames[category.iconIndex]}
          size={62}
          color="#fff"
          style={{opacity: 0.3, marginBottom: 10}}
        />
        <Text
          type="title-medium"
          style={{padding: 5, color: '#FFF', position: 'absolute', bottom: 0}}>
          {category.name}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default memo(CategoryListItem);
