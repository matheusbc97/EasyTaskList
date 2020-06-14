import React, {PropsWithChildren} from 'react';
import {ViewProps, StyleSheet, SafeAreaView} from 'react-native';

interface Props extends ViewProps, PropsWithChildren<any> {}

const ScreenWrapper = ({children, style}: Props) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};
export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fffafa'},
});
