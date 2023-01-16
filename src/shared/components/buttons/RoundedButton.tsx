import React from 'react';
import {StyleSheet, TextStyle, ViewStyle, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import useAppTheme from '@/shared/hooks/useAppTheme';

import Button from './Button';
import Text from '../Text';

export interface RoundedButtonProps {
  text?: string | null;
  onPress?(): void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  inverted?: boolean;
  icon?: string | null;
  disabled?: boolean;
  testID?: string;
}

const RoundedButton = ({
  text,
  onPress,
  style,
  textStyle,
  inverted,
  icon,
  disabled = false,
  testID
}: RoundedButtonProps) => {
  const appTheme = useAppTheme();

  return (
    <Button
      testID={testID}
      disabled={disabled}
      style={[
        styles.container,
        inverted
          ? {
              ...styles.invertedContainer,
              borderColor: appTheme.primaryColor,
            }
          : {
              ...styles.normalContainer,
              backgroundColor: appTheme.secondaryColor,
            },
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
            style={
              inverted
                ? [styles.invertedText, {color: appTheme.primaryColor}]
                : styles.text
            }
          />
        )}
        {Boolean(text) && (
          <Text
            style={[
              inverted
                ? {...styles.invertedText, color: appTheme.primaryColor}
                : styles.text,
              textStyle,
            ]}>
            {text}
          </Text>
        )}
      </View>
    </Button>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  invertedContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    width: 198,
    height: 33,
  },
  normalContainer: {
    width: 200,
    height: 35,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  invertedText: {
    fontSize: 16,
  },
});
