import React, {PropsWithChildren} from 'react';
import {TouchableOpacityProps, StyleSheet, ViewStyle, View} from 'react-native';
import {TEST_IDS} from '../constants/testIds';

interface Props extends PropsWithChildren<any>, TouchableOpacityProps {
  style?: ViewStyle | ViewStyle[];
}

const Shadow = ({children, style = {}, ...rest}: Props) => {
  return (
    <View testID={TEST_IDS.SHADOW} style={[styles.shadow, style]} {...rest}>
      {children}
    </View>
  );
};

export default Shadow;

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
    borderRadius: 2,
    zIndex: 3,
  },
});
