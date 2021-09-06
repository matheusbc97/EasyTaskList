import React from 'react';
import {View} from 'react-native';

import {AnimatedBackground} from '@shared/components';

import styles from '../styles';

const TaskFormWrapper: React.FC = ({children}) => {
  return (
    <AnimatedBackground>
      <View style={styles.container}>
        <View style={styles.content}>{children}</View>
      </View>
    </AnimatedBackground>
  );
};

export default TaskFormWrapper;
