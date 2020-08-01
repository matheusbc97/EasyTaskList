import React, {
  useMemo,
  useCallback,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  Animated,
} from 'react-native';

interface TextInputProps extends RNTextInputProps {
  label: string;
}

const TextInput = (
  {label, value, onChangeText, ...rest}: TextInputProps,
  ref: any,
) => {
  const [labelLeftOffset, setLabelLeftOffset] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const labelIsOnTop = useMemo(() => new Animated.Value(value ? 1 : 0), []);
  const inputRef = useRef<RNTextInput>(null);

  useImperativeHandle(ref, () => ({
    focus: inputRef.current?.focus,
    blur: inputRef.current?.blur,
    clear: inputRef.current?.clear,
    isFocused: inputRef.current?.isFocused,
    setNativeProps: inputRef.current?.setNativeProps,
    state: inputRef.current?.state,
    context: inputRef.current?.context,
  }));

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
        ref={inputRef}
        style={styles.input}
        onFocus={() => {
          if (!inputRef.current?.isValueNotEmpty) {
            animation(true);
          }
        }}
        onBlur={() => {
          if (!inputRef.current?.isValueNotEmpty) {
            animation(false);
          }
        }}
        onChangeText={(text) => {
          if ((!text || text.length === 1) && inputRef.current) {
            inputRef.current.isValueNotEmpty = Boolean(text);
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
