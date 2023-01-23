import {forwardRef, useImperativeHandle, useRef} from 'react';
import {View, TextInputProps, StyleSheet, ViewStyle} from 'react-native';
import {Controller} from 'react-hook-form';

import {FormControl} from '@/shared/models';

import TextInput from './TextInput';
import Text from '../Text';
import {validateField} from '@/shared/utils/validations';

export interface AppTextInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  mask?(value: string, oldValue: string): string;
  disabled?: boolean;
  mode?: 'flat' | 'outlined';
  button?: boolean;
  onPress?(): void;
  name?: string;
  error?: string;
  control: FormControl;
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
    mask,
    button = false,
    onPress,
    defaultValue = '',
    control,
    ...rest
  }: UnformInputProps,
  ref: any,
) => {
  const inputElementRef = useRef<any>({value: defaultValue});

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputElementRef.current.focus();
      },
    }),
    [],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Controller
        control={control}
        rules={{
          required: false,
          validate: value => validateField(name, value),
        }}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TextInput
              onPress={onPress}
              button={button}
              label={label}
              error={Boolean(error?.type)}
              onBlur={onBlur}
              onChangeText={onChange}
              value={mask ? mask(value, '') : value}
              {...rest}
              style={style}
            />
            <View style={styles.errorWrapper}>
              {Boolean(error) && (
                <Text style={styles.error}>{error?.message}</Text>
              )}
            </View>
          </>
        )}
        name={name}
      />
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
