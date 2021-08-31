import React from 'react';
import {View} from 'react-native';

import {Text} from '@shared/components';

import styles from '../styles';

interface HomeSection {
  title: string;
}

const HomeSection: React.FC<HomeSection> = ({title, children}) => {
  return (
    <View>
      <Text type="title-medium" style={styles.title}>
        {title}
      </Text>
      <View style={styles.contentWrapper}>{children}</View>
    </View>
  );
};

export default HomeSection;
