import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import categoryColors from '../../../assets/categoryColors';
import {Text} from '../../../library/components';

import styles from './styles';

interface Props {
  colorIndex?: number;
}

const CategoryListItem: React.FC<Props> = ({colorIndex = 3}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[
        categoryColors[colorIndex].color1,
        categoryColors[colorIndex].color2,
      ]}
      style={styles.cartegoryListItem}>
      <FontAwesomeIcon
        name="users"
        size={80}
        color="#fff"
        style={{opacity: 0.2, marginBottom: 10}}
      />
      <Text
        type="title-medium"
        style={{padding: 10, color: '#FFF', position: 'absolute', bottom: 0}}>
        Atividades Fisícas
      </Text>
    </LinearGradient>
  );
};

export default memo(CategoryListItem);
