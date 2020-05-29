import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import {AppTheme} from '../../library/models/AppTheme';

interface ThemeBoxProps {
  theme: AppTheme;
  selected?: boolean;
  onPress(): void;
}

const ThemeBox: React.FC<ThemeBoxProps> = ({theme, onPress}) => (
  <TouchableRipple onPress={onPress}>
    <View style={styles.container}>
      <View style={[styles.half, {backgroundColor: theme.primaryColor}]} />
      <View style={[styles.half, {backgroundColor: theme.secondaryColor}]} />
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
