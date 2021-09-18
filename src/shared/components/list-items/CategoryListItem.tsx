import React, {memo, useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import categoryColors from '@assets/categoryColors';
import {Text, Button} from '@shared/components';
import {Category} from '@shared/models';
import categoryIconNames from '@assets/categoryIconNames';
import {ViewStyle} from 'react-native';

interface Props {
  category: Category;
  onPress(): void;
  size?: number;
  noName?: boolean;
  style?: ViewStyle;
}

const CategoryListItem: React.FC<Props> = ({
  category,
  onPress,
  size = 105,
  noName = false,
  style,
}) => {
  const iconSize = useMemo(() => size * 0.6, [size]);

  return (
    <Button
      onPress={onPress}
      style={[
        {
          height: size,
          width: size,
          marginHorizontal: 5,
          marginVertical: 10,
        },
        style,
      ]}>
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
          size={iconSize}
          color="#fff"
          style={{opacity: 0.3, marginBottom: noName ? 0 : 10}}
        />
        {!noName && (
          <Text
            type="title-medium"
            style={{
              padding: 5,
              color: '#FFF',
              position: 'absolute',
              bottom: 0,
            }}>
            {category.name}
          </Text>
        )}
      </LinearGradient>
    </Button>
  );
};

export default memo(CategoryListItem);
