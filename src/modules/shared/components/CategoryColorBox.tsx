import React from 'react';
import {View, StyleSheet} from 'react-native';

import categoryColors from '@/assets/categoryColors';
import LinearGradient from 'react-native-linear-gradient';
import {TEST_IDS} from '../constants/testIds';

interface CategoryColorBoxProps {
  colorIndex: number;
}

const CategoryColorBox: React.FC<CategoryColorBoxProps> = ({colorIndex}) => {
  if (colorIndex === -1) {
    return (
      <View
        testID={TEST_IDS.CATEGORY_COLOR_BOX_TRANSPARENT_VIEW}
        style={[
          styles.container,
          {
            backgroundColor: 'transparent',
          },
        ]}
      />
    );
  }

  return (
    <LinearGradient
      testID={TEST_IDS.CATEGORY_COLOR_BOX_LINEAR_GRADIENT}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[
        categoryColors[colorIndex].color1,
        categoryColors[colorIndex].color2,
      ]}
    />
  );
};

export default CategoryColorBox;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 2,
  },
});
