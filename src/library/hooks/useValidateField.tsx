import {useCallback} from 'react';
import {RefObject} from 'react';
import {FormHandles} from '@unform/core';
import {validateField} from '../utils/validations';

const useValidateField = (
  formRef: RefObject<FormHandles>,
): ((fieldName: string, value?: string, previousErrorText?: string) => void) =>
  useCallback(
    (fieldName, value, previousErrorText) => {
      const _value =
        value || value === ''
          ? value
          : formRef.current?.getFieldValue(fieldName);
      const error: string | null = validateField(fieldName, _value, formRef);

      if (
        (error && (!previousErrorText || previousErrorText !== error)) ||
        previousErrorText
      ) {
        formRef.current?.setFieldError(fieldName, error!);
      }
    },
    [formRef],
  );
export default useValidateField;
