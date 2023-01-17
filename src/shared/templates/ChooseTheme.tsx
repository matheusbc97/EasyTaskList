import {ThemeBox} from '@/shared/components';
import {AppTheme} from '@/shared/models';
import React from 'react';
import {View, ViewStyle} from 'react-native';

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
          testID="ThemeBox-BLUE_GREEN"
          theme="BLUE_GREEN"
          onPress={onThemePress}
        />
        <ThemeBox
          testID="ThemeBox-BLUE_RED"
          theme="BLUE_RED"
          onPress={onThemePress}
        />
      </View>
    </View>
  );
}

export default ChooseTheme;
