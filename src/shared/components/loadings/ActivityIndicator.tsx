import {TEST_IDS} from '@/shared/constants/testIds';
import React from 'react';
import {ActivityIndicator as RNActivityIndicator} from 'react-native';

interface Props {
  size?: number;
  color?: string;
}

const ActivityIndicator = ({size = 40, color = '#a1001a'}: Props) => {
  return (
    <RNActivityIndicator
      testID={TEST_IDS.ACTIVITY_INDICATOR_BASE}
      color={color}
      size={size}
    />
  );
};

export default ActivityIndicator;
