import React, {
  useMemo,
  useCallback,
  useState,
  useRef,
  forwardRef,
  useEffect,
} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  Animated,
  TextStyle,
  StyleProp,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectAppTheme} from '../../store/configs';

interface TextInputProps extends RNTextInputProps {
  label: string;
  inputRef?: any;
  inputStyle?: StyleProp<TextStyle>;
  error: boolean;
}

const TextInput = ({
  label,
  onChangeText,
  onBlur,
  onFocus,
  inputRef,
  style,
  defaultValue,
  error,
  ...rest
}: TextInputProps) => {
  const appTheme = useSelector(selectAppTheme);
  const [labelLeftOffset, setLabelLeftOffset] = useState(0);

  const labelIsOnTop = useMemo(() => new Animated.Value(defaultValue ? 1 : 0), [
    defaultValue,
  ]);

  const isFocused = useMemo(() => new Animated.Value(1), []);

  const textRef = useRef<{isValueNotEmpty: boolean}>({
    isValueNotEmpty: Boolean(defaultValue),
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
    outputRange: ['#57d491', appTheme.primaryColor, '#d50000'],
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
    <Animated.View style={[styles.container, {borderColor: borderColor}]}>
      <Animated.View
        style={[
          styles.textContainer,
          {
            top: labelTop,
            left: labelLeft,
          },
        ]}>
        <Animated.Text
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
      <RNTextInput
        defaultValue={defaultValue}
        ref={inputRef}
        style={[styles.input, style]}
        onFocus={(e) => {
          if (!textRef.current.isValueNotEmpty) {
            animation(true);
          }
          !error && borderColorAnimation(0);

          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          !textRef.current.isValueNotEmpty && animation(false);

          !error && borderColorAnimation(1);

          onBlur && onBlur(e);
        }}
        onChangeText={(text) => {
          if ((!text || text.length === 1) && textRef.current) {
            textRef.current.isValueNotEmpty = Boolean(text);
          }
          onChangeText && onChangeText(text);
        }}
        {...rest}
      />
    </Animated.View>
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
    paddingVertical: 5,
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
