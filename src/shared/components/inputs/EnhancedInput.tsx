import {forwardRef, useImperativeHandle, useRef} from 'react';
import {View, TextInputProps, StyleSheet, ViewStyle} from 'react-native';
import {Controller} from 'react-hook-form';

import {FormControl} from '@/shared/models';
import {validateField} from '@/shared/utils/validations';

import TextInput from './TextInput';
import Text from '../Text';
import {TEST_IDS} from '@/shared/constants/testIds';

export interface AppTextInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  mask?(value: string): string;
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

const EnhancedInput = (
  {containerStyle, name, mask, control, ...rest}: UnformInputProps,
  ref: any,
) => {
  const inputElementRef = useRef<any>(null);

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
    <View
      testID={TEST_IDS.ENHANCED_INPUT_CONTAINER}
      style={[styles.container, containerStyle]}>
      <Controller
        control={control}
        rules={{
          required: true,
          validate: value => validateField(name, value),
        }}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TextInput
              error={Boolean(error?.type)}
              onBlur={onBlur}
              onChangeText={onChange}
              value={mask ? mask(value) : value}
              {...rest}
            />
            <View style={styles.errorWrapper}>
              {Boolean(error) && (
                <Text
                  testID={TEST_IDS.ENHANCED_INPUT_ERROR}
                  style={styles.error}>
                  {error?.message}
                </Text>
              )}
            </View>
          </>
        )}
        name={name}
      />
    </View>
  );
};

export default forwardRef(EnhancedInput);

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
