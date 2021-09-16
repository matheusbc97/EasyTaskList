import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import {AppTheme, AppThemeName} from '@shared/models';

import * as themes from '@assets/themes';

interface ThemeBoxProps {
  theme: AppThemeName;
  selected?: boolean;
  onPress?(arg0: AppTheme): void;
}

const ThemeBox: React.FC<ThemeBoxProps> = ({theme, onPress}) => {
  const appTheme = themes[theme];

  return (
    <TouchableRipple onPress={() => onPress && onPress(appTheme)}>
      <View style={styles.container}>
        <View style={[styles.half, {backgroundColor: appTheme.primaryColor}]} />
        <View
          style={[styles.half, {backgroundColor: appTheme.secondaryColor}]}
        />
      </View>
    </TouchableRipple>
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
