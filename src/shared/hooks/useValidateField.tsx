import {useCallback} from 'react';
import {RefObject} from 'react';
import {FormHandles} from '@unform/core';

import {ValidateField} from '@/shared/models';
import {validateField} from '../utils/validations';

export const useValidateField = (
  formRef: RefObject<FormHandles>,
): ValidateField =>
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
