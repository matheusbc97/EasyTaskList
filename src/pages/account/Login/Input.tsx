import React, {useRef, useEffect} from 'react';
import {Text, TextInput, TextInputProps, StyleSheet} from 'react-native';
import {useField} from '@unform/core';
import styled from 'styled-components/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import useOnChangeText from '@shared/hooks/useOnChangeText';
import {ValidateField} from '@shared/models';
import useMaskedOnChangeText from '@shared/hooks/useMaskedOnChangeText';

interface Props extends TextInputProps {
  name: string;
  validateField?: ValidateField;
  mask?(value: string, oldValue: string): string;
  iconName: string;
}

const InputContainer = styled.View`
  margin: 5px 5px;
  justify-content: center;
`;

const LoginInput = styled(TextInput)`
  border-width: 1px;
  border: #e63a5a;
  color: #e63a5a;
  padding: 5px 25px 5px 55px;
  margin: 5px 0;
  border-radius: 30px;
`;

const IconContainer = styled.View`
  width: 48px;
  height: 48px;
  background-color: #e63a5a;
  position: absolute;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  top: 2px;
`;

function Input({name = '', validateField, mask, iconName, ...rest}: Props) {
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
    <InputContainer>
      <IconContainer>
        <FontAwesome5Icon name={iconName} size={22} color="#FAFAFA" />
      </IconContainer>

      <LoginInput
        placeholderTextColor="#e63a5a"
        ref={inputRef}
        defaultValue={defaultValue}
        onBlur={() => (validateField ? validateField(fieldName) : null)}
        onChangeText={mask ? _maskedOnChangeText : _onChangeText}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </InputContainer>
  );
}

export default Input;

const styles = StyleSheet.create({
  error: {color: 'red', marginLeft: 30},
});
