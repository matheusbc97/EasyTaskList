import React from 'react';
import {View, ViewStyle} from 'react-native';

import {ThemeBox} from '@/modules/shared/components';
import {AppTheme} from '@/modules/shared/models';

import {TEST_IDS} from '../constants/testIds';

interface ChooseThemeProps {
  onThemePress: (theme: AppTheme) => void;
  style?: ViewStyle;
}

function ChooseTheme({onThemePress, style}: ChooseThemeProps) {
  return (
    <View
      style={[
        {
          width: 140,
        },
        style,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <ThemeBox
          testID={TEST_IDS.THEME_BOX('BLUE_GREEN')}
          theme="BLUE_GREEN"
          onPress={onThemePress}
        />
        <ThemeBox
          testID={TEST_IDS.THEME_BOX('BLUE_RED')}
          theme="BLUE_RED"
          onPress={onThemePress}
        />
      </View>
    </View>
  );
}

export default ChooseTheme;
