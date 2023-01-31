import React, {
  useMemo,
  useCallback,
  useState,
  useRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  Animated,
  TextStyle,
  StyleProp,
  View,
  Platform,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Button from '../buttons/Button';
import {useAppTheme} from '@/shared/hooks';
import {TEST_IDS} from '@/shared/constants/testIds';

const AnimatedFontAwesomeIcon =
  Animated.createAnimatedComponent(FontAwesomeIcon);

interface TextInputProps extends RNTextInputProps {
  label: string;
  inputStyle?: StyleProp<TextStyle>;
  error?: boolean;
  button?: boolean;
  onPress?(): void;
  inputRef?: any;
}

export const textInputErrorColor = '#d50000';
export const textInputNoErrorColor = '#57d491';

const TextInput = (
  {
    label,
    onChangeText,
    onBlur,
    onFocus,
    style,
    error,
    button = false,
    onPress,
    inputRef,
    value,
    ...rest
  }: TextInputProps,
  ref: any,
) => {
  const appTheme = useAppTheme();
  const [labelLeftOffset, setLabelLeftOffset] = useState(0);

  const defaultValue = useRef(value).current;

  const labelIsOnTop = useMemo(
    () => new Animated.Value(value ? 1 : 0),
    [value],
  );

  const isFocused = useMemo(() => new Animated.Value(1), []);

  const textRef = useRef<{isValueNotEmpty: boolean}>({
    isValueNotEmpty: Boolean(value),
  });

  const labelTop = labelIsOnTop.interpolate({
    inputRange: [0, 1],
    outputRange: [9, -10],
  });

  const labelLeft = labelIsOnTop.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -labelLeftOffset],
  });

  const borderColor = isFocused.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      textInputErrorColor,
      appTheme.primaryColor,
      textInputNoErrorColor,
    ],
  });

  const scale = labelIsOnTop.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const animation = useCallback(
    (toTop: boolean) =>
      Animated.timing(labelIsOnTop, {
        toValue: toTop ? 1 : 0,
        duration: 120,
        useNativeDriver: false,
      }).start(),
    [labelIsOnTop],
  );

  useImperativeHandle(ref, () => ({
    setNativeProps(props: any) {
      animation(true);
      inputRef?.current.setNativeProps(props);
    },
  }));

  const borderColorAnimation = useCallback(
    (toValue: number) =>
      Animated.timing(isFocused, {
        toValue,
        duration: 120,
        useNativeDriver: false,
      }).start(),
    [isFocused],
  );

  useEffect(() => {
    if (labelLeftOffset !== 0) {
      error ? borderColorAnimation(2) : borderColorAnimation(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, borderColorAnimation]);

  return (
    <Button disabled={!button} onPress={onPress}>
      <Animated.View
        testID={TEST_IDS.TEST_INPUT_CONTAINER_VIEW}
        style={[styles.container, {borderColor}]}>
        <Animated.View
          style={[
            styles.textContainer,
            {
              top: labelTop,
              left: labelLeft,
            },
          ]}>
          <Animated.Text
            testID={TEST_IDS.TEXT_INPUT_LABEL}
            onLayout={(event: any) => {
              var {width} = event.nativeEvent.layout;
              if (labelLeftOffset === 0) {
                setLabelLeftOffset(width * 0.1);
              }
            }}
            style={[
              styles.text,
              {
                transform: [{scale}],
                color: borderColor,
                backgroundColor: appTheme.aboveBackground,
              },
            ]}>
            {label}
          </Animated.Text>
        </Animated.View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RNTextInput
            testID={TEST_IDS.TEXT_INPUT_BASE}
            pointerEvents={button ? 'none' : 'auto'}
            editable={!button}
            defaultValue={defaultValue}
            ref={inputRef}
            style={[styles.input, style]}
            returnKeyType="next"
            value={value}
            onFocus={e => {
              if (!textRef.current.isValueNotEmpty) {
                animation(true);
              }
              !error && borderColorAnimation(0);

              onFocus?.(e);
            }}
            onBlur={e => {
              !textRef.current.isValueNotEmpty && animation(false);

              !error && borderColorAnimation(1);

              onBlur?.(e);
            }}
            onChangeText={text => {
              if ((!text || text.length === 1) && textRef.current) {
                textRef.current.isValueNotEmpty = Boolean(text);
              }
              onChangeText?.(text);
            }}
            {...rest}
          />
          {button && (
            <AnimatedFontAwesomeIcon
              testID={TEST_IDS.TEXT_INPUT_ICON}
              name="search"
              size={20}
              style={{paddingHorizontal: 15, color: borderColor}}
            />
          )}
        </View>
      </Animated.View>
    </Button>
  );
};

export default forwardRef(TextInput);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    marginVertical: 0,
    marginHorizontal: 5,
    borderRadius: 25,
  },
  input: {
    paddingHorizontal: 30,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    flexGrow: 1,
    color: '#303030',
  },
  text: {
    flexShrink: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 3,
    fontSize: 14,
  },
  textContainer: {
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: 30,
  },
});
