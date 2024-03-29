import React from 'react';
import {View, StyleSheet} from 'react-native';

import {AppTheme, AppThemeName} from '@/modules/shared/models';
import Button from './buttons/Button';
import * as themes from '@/assets/themes';
import {TEST_IDS} from '../constants/testIds';

interface ThemeBoxProps {
  theme: AppThemeName;
  selected?: boolean;
  onPress?(arg0: AppTheme): void;
  testID?: string;
}

const ThemeBox: React.FC<ThemeBoxProps> = ({theme, onPress, testID}) => {
  const appTheme = themes[theme];

  return (
    <Button testID={testID} onPress={() => onPress?.(appTheme)}>
      <View style={styles.container}>
        <View
          testID={TEST_IDS.THEME_BOX_VIEW_PRIMARY_COLOR}
          style={[styles.half, {backgroundColor: appTheme.primaryColor}]}
        />
        <View
          testID={TEST_IDS.THEME_BOX_VIEW_SECONDARY_COLOR}
          style={[styles.half, {backgroundColor: appTheme.secondaryColor}]}
        />
      </View>
    </Button>
  );
};

export default ThemeBox;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 5,
  },
  half: {
    flex: 1,
  },
});
