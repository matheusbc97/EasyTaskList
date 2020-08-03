import React, {useEffect, useCallback, useRef, useImperativeHandle, forwardRef} from 'react';
import {View, TextInputProps, StyleSheet, ViewStyle} from 'react-native';
import {useField} from '@unform/core';
import TextInput from './TextInput';

import {Text} from '.';
import useOnChangeText from '../hooks/useOnChangeText';
import {ValidateField} from '../models/ValidateField';
import useMaskedOnChangeText from '../hooks/useMaskedOnChangeText';

interface InputValueReference {
  value: string;
}

interface Props extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  validateField?: ValidateField;
  name: string;
  mask?(value: string, oldValue: string): string;
  disabled?: boolean;
  mode?: 'flat' | 'outlined';
  button?: boolean;
  onPress?(): void;
}

const FloatingLabelIpnput = ({
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
}: Props, ref: any) => {
  const inputElementRef = useRef<any>(null);
  const customTextInputRef = useRef<any>(null)

  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    inputValueRef.current.value = defaultValue;
  }, [defaultValue]);

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputElementRef.current.focus();
      },
      setValue(value: string) {
        customTextInputRef.current.setNativeProps({text: value});
      }
    }),
    [],
  );

  useEffect(() => {
    const registerFieldObject: any = {
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      clearValue(ref: any) {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
      setValue(ref: any, value: string) {
        inputElementRef.current.setNativeProps({text: value});
        inputValueRef.current.value = value;
      },
      getValue(ref: any) {
        return ref.value;
      },
    };

    registerField(registerFieldObject);
  }, [fieldName, registerField]);

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
          if (inputValueRef.current) {
            inputValueRef.current.value = text;
          }
          mask ? _maskedOnChangeText(text) : _onChangeText(text);
          onChangeText && onChangeText(text);
        }}
        onBlur={handleBlur}
        {...rest}
        style={
          [{
            flex: 1,
          }, style
        ]}
      />
      <View style={styles.errorWrapper}>
        {Boolean(error) && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};

export default forwardRef(FloatingLabelIpnput);

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
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
