import {useCallback} from 'react';
import {RefObject} from 'react';

import {ValidateField} from '@/shared/models';
import {validateField} from '../../utils/validations';

export const useValidateField = (formRef: RefObject<any>): ValidateField =>
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
