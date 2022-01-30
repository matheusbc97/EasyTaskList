import React, {PropsWithChildren} from 'react';
import {ViewProps, StyleSheet, SafeAreaView} from 'react-native';

interface Props extends ViewProps, PropsWithChildren<any> {}

const ScreenWrapper = ({children, style, testID}: Props) => {
  return (
    <SafeAreaView style={[styles.container, style]} testID={testID}>{children}</SafeAreaView>
  );
};
export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fffafa'},
});
