import React from 'react';
import {StyleSheet, TextStyle, ViewStyle, View} from 'react-native';

import {useAppTheme} from '@/modules/shared/hooks';

import Button from './Button';
import Text from '../Text';

export interface RoundedButtonProps {
  text?: string | null;
  onPress?(): void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  inverted?: boolean;
  disabled?: boolean;
  testID?: string;
  center?: boolean;
}

const RoundedButton = ({
  text,
  onPress,
  style,
  textStyle,
  inverted,
  disabled = false,
  center = false,
  testID,
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
        {
          alignSelf: center ? 'center' : undefined,
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
