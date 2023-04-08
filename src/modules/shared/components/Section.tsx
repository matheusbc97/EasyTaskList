import React, {PropsWithChildren} from 'react';
import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';

import {shadow} from '@/modules/shared/styles';

import Text from './Text';
import {TEST_IDS} from '../constants/testIds';

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

interface SectionProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

function Section({
  title,
  children,
  style,
  contentStyle,
}: PropsWithChildren<SectionProps>) {
  return (
    <View style={[{marginTop: 30}, style]} testID={TEST_IDS.SECTION_CONTAINER}>
      {!!title && (
        <Text type="title-medium" style={styles.title}>
          {title}
        </Text>
      )}
      <View
        testID={TEST_IDS.SECTION_CONTENT_CONTAINER}
        style={[styles.contentWrapper, contentStyle]}>
        {children}
      </View>
    </View>
  );
}

export default Section;
