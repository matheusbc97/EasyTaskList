import React, {
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {View, TextInputProps, StyleSheet, ViewStyle} from 'react-native';
import {useField} from '@unform/core';
import TextInput from './TextInput';

import {Text} from '..';
import useOnChangeText from '../../hooks/useOnChangeText';
import {ValidateField} from '../../models/ValidateField';
import useMaskedOnChangeText from '../../hooks/useMaskedOnChangeText';

export interface AppTextInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  validateField?: ValidateField;
  mask?(value: string, oldValue: string): string;
  disabled?: boolean;
  mode?: 'flat' | 'outlined';
  button?: boolean;
  onPress?(): void;
  name?: string;
}

export interface UnformInputProps extends AppTextInputProps {
  name: string;
}

const FloatingLabelInput = (
  {
    label = '',
    containerStyle,
    style,
    name,
    validateField,
    onChangeText,
    mask,
    button = false,
    onPress,
    ...rest
  }: UnformInputProps,
  ref: any,
) => {
  const customTextInputRef = useRef<any>(null);

  const {fieldName, registerField, defaultValue = '', error} = useField(name);
  const inputElementRef = useRef<any>({value: defaultValue});

  useEffect(() => {
    if (defaultValue) {
      const nativeProps: any = {};

      if (mask) {
        nativeProps.text = mask(defaultValue, '');
      } else {
        nativeProps.text = defaultValue;
      }

      customTextInputRef.current.setNativeProps(nativeProps);

      inputElementRef.current.value = defaultValue;
    }
  }, [defaultValue, mask]);

  const _onChangeText = useOnChangeText(
    inputElementRef,
    fieldName,
    error,
    validateField,
  );

  const _maskedOnChangeText = useMaskedOnChangeText(
    mask!,
    inputElementRef,
    _onChangeText,
  );

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputElementRef.current.focus();
      },
      setValue(value: string) {
        const nativeProps: any = {};

        if (mask) {
          nativeProps.text = mask(value, inputElementRef.current.value);
        } else {
          nativeProps.text = value;
        }

        customTextInputRef.current.setNativeProps(nativeProps);

        inputElementRef.current.value = value;
      },
    }),
    [mask],
  );

  useEffect(() => {
    const registerFieldObject: any = {
      name: fieldName,
      ref: inputElementRef.current,
      path: 'value',
      clearValue() {
        inputElementRef.current.value = '';
        inputElementRef.current.clear();
      },
      setValue(_: any, value: string) {
        customTextInputRef.current.setNativeProps({text: value});
        inputElementRef.current.value = value;
      },
    };

    registerField(registerFieldObject);
  }, [fieldName, registerField]);

  const handleBlur = useCallback(() => {
    if (validateField) {
      return validateField(fieldName);
    }

    return;
  }, [validateField, fieldName]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        onPress={onPress}
        button={button}
        label={label}
        error={Boolean(error)}
        ref={customTextInputRef}
        inputRef={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={(text: string) => {
          if (inputElementRef.current) {
            inputElementRef.current.value = text;
          }
          mask ? _maskedOnChangeText(text) : _onChangeText(text);
          onChangeText && onChangeText(text);
        }}
        onBlur={handleBlur}
        {...rest}
        style={style}
      />
      <View style={styles.errorWrapper}>
        {Boolean(error) && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};

export default forwardRef(FloatingLabelInput);

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  errorWrapper: {
    height: 23,
  },
  error: {
    color: 'red',
    alignSelf: 'flex-end',
    marginRight: 26,
  },
});
