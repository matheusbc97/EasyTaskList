import React, {useRef, useEffect} from 'react';
import {Text, TextInput, View, TextInputProps, StyleSheet} from 'react-native';
import {useField} from '@unform/core';

import useOnChangeText from '@shared/hooks/useOnChangeText';
import {ValidateField} from '@shared/models';
import useMaskedOnChangeText from '@shared/hooks/useMaskedOnChangeText';

interface Props extends TextInputProps {
  name: string;
  validateField?: ValidateField;
  mask?(value: string, oldValue: string): string;
}

function Input({name = '', validateField, mask, ...rest}: Props) {
  const inputRef = useRef<any>(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    const registerFieldObject: any = {
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref: any) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref: any, value: string) {
        ref.setNativeProps({text: value});
        inputRef.current.value = value;
      },
      getValue(ref: any) {
        return ref.value;
      },
    };

    registerField(registerFieldObject);
  }, [fieldName, registerField]);

  const _onChangeText = useOnChangeText(
    inputRef,
    fieldName,
    error,
    validateField,
  );

  const _maskedOnChangeText = useMaskedOnChangeText(
    mask!,
    inputRef,
    _onChangeText,
  );

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        defaultValue={defaultValue}
        style={styles.input}
        onBlur={() => (validateField ? validateField(fieldName) : null)}
        onChangeText={mask ? _maskedOnChangeText : _onChangeText}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#bdbdbd',
    paddingBottom: 7,
  },
  error: {color: 'red'},
});
