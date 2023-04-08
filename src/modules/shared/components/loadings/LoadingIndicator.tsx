import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

import ActivityIndicator from './ActivityIndicator';

interface Props {
  containerStyle?: ViewStyle;
  size?: number;
  color?: string;
}

const LoadingIndicator = ({containerStyle, size, color}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});
