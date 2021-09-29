import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';

import Text from './Text';

import styles from '../../pages/logged-screens/Home/styles';

interface Section {
  title?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const Section: React.FC<Section> = ({title, children, style, contentStyle}) => {
  return (
    <View style={[{marginTop: 30}, style]}>
      {!!title && (
        <Text type="title-medium" style={styles.title}>
          {title}
        </Text>
      )}
      <View style={[styles.contentWrapper, contentStyle]}>{children}</View>
    </View>
  );
};

export default Section;
