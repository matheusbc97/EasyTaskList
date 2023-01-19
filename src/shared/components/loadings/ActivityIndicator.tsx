import React from 'react';
import {ActivityIndicator as RNActivityIndicator} from 'react-native';

interface Props {
  size?: number;
  color?: string;
}

const ActivityIndicator = ({size = 40, color = '#a1001a'}: Props) => {
  return (
    <RNActivityIndicator
      testID="loading-indicator-base"
      color={color}
      size={size}
    />
  );
};

export default ActivityIndicator;
