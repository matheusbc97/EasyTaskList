import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import {AppThemeName} from '@shared/models';

import * as themes from '@assets/themes';

interface ThemeBoxProps {
  theme: AppThemeName;
  selected?: boolean;
  onPress?(arg0: AppThemeName): void;
}

const ThemeBox: React.FC<ThemeBoxProps> = ({theme, onPress}) => (
  <TouchableRipple onPress={() => onPress && onPress(theme)}>
    <View style={styles.container}>
      <View
        style={[styles.half, {backgroundColor: themes[theme].primaryColor}]}
      />
      <View
        style={[styles.half, {backgroundColor: themes[theme].secondaryColor}]}
      />
    </View>
  </TouchableRipple>
);

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
