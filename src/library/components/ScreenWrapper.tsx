import React, {PropsWithChildren} from 'react';
import {View, ViewProps, StyleSheet} from 'react-native';

interface Props extends ViewProps, PropsWithChildren<any> {}

const ScreenWrapper = ({children, style}: Props) => {
  return <View style={[styles.container, style]}>{children}</View>;
};
export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fffafa'},
});
