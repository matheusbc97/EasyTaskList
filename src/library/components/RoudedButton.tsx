import React, {forwardRef} from 'react';
import {StyleSheet, TextStyle, ViewStyle, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Text from './Text';

interface Props {
  text?: string | null;
  onPress?(): void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  inverted: boolean;
  icon?: string | null;
}

const RoudedButton = ({
  text,
  onPress,
  style,
  textStyle,
  inverted,
  icon,
}: Props) => {
  return (
    <TouchableRipple
      style={[
        styles.container,
        inverted ? styles.invertedContainer : styles.normalContainer,
        style,
      ]}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {Boolean(icon) && (
          <Icon
            name="check"
            style={inverted ? styles.invertedText : styles.text}
          />
        )}
        {Boolean(text) && (
          <Text
            style={[inverted ? styles.invertedText : styles.text, textStyle]}>
            {text}
          </Text>
        )}
      </View>
    </TouchableRipple>
  );
};

export default forwardRef(RoudedButton);

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  invertedContainer: {
    backgroundColor: '#FFF',
    borderColor: '#2dc4c2',
    borderWidth: 1,
    width: 198,
    height: 33,
  },
  normalContainer: {
    backgroundColor: '#2dc4c2',
    width: 200,
    height: 35,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  invertedText: {
    color: '#2dc4c2',
    fontSize: 16,
  },
});
