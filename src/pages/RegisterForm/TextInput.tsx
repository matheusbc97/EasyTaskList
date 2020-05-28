import React, {useMemo, useCallback, useState, useRef, forwardRef} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  Animated,
  TextStyle,
  StyleProp,
} from 'react-native';

interface TextInputProps extends RNTextInputProps {
  label: string;
  inputRef?: any;
  inputStyle?: StyleProp<TextStyle>;
}

const TextInput = ({
  label,
  onChangeText,
  onBlur,
  onFocus,
  inputRef,
  style,
  defaultValue,
  ...rest
}: TextInputProps) => {
  const [labelLeftOffset, setLabelLeftOffset] = useState(0);

  const labelIsOnTop = useMemo(() => new Animated.Value(defaultValue ? 1 : 0), [
    defaultValue,
  ]);
  const textRef = useRef<{isValueNotEmpty: boolean}>({isValueNotEmpty: false});

  const labelTop = labelIsOnTop.interpolate({
    inputRange: [0, 1],
    outputRange: [15, -10],
  });

  const labelLeft = labelIsOnTop.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -labelLeftOffset],
  });

  const borderColor = labelIsOnTop.interpolate({
    inputRange: [0, 1],
    outputRange: ['#bdbdbd', '#03a9f4'],
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

          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          if (!textRef.current.isValueNotEmpty) {
            animation(false);
          }

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
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 25,
  },
  input: {
    paddingHorizontal: 30,
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
