import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';

import {Text} from '@shared/components';

import styles from '../styles';

interface HomeSection {
  title: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const HomeSection: React.FC<HomeSection> = ({
  title,
  children,
  style,
  contentStyle,
}) => {
  return (
    <View style={style}>
      <Text type="title-medium" style={styles.title}>
        {title}
      </Text>
      <View style={[styles.contentWrapper, contentStyle]}>{children}</View>
    </View>
  );
};

export default HomeSection;
