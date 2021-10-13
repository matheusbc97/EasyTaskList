import React from 'react';
import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';

import {shadow} from '@/shared/styles';

import Text from './Text';

const styles = StyleSheet.create({
  contentWrapper: {
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    ...shadow,
  },
  title: {marginHorizontal: 20},
});

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
