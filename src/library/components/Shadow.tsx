import React, {PropsWithChildren} from 'react';
import {TouchableOpacityProps, StyleSheet, ViewStyle, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

interface Props extends PropsWithChildren<any>, TouchableOpacityProps {
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const Shadow = ({
  children,
  style = {},
  contentContainerStyle = {},
  ...rest
}: Props) => {
  return (
    <TouchableRipple style={[styles.shadow, style]} {...rest}>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </TouchableRipple>
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
  },
  contentContainer: {
    flex: 1,
  },
});
