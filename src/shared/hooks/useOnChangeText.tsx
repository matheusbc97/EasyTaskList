import {useCallback, MutableRefObject} from 'react';
import _ from 'lodash';
import {ValidateField} from '../models/ValidateField';

const useOnChangeText = (
  inputRef: MutableRefObject<any>,
  fieldName: string,
  error: string | undefined,
  validateField?: ValidateField,
): ((text: string) => void) => {
  // eslint-disable-next-line no-spaced-func
  const debbouncedValidateField = useCallback<
    (text: string) => void | undefined
  >(
    _.debounce(
      (text) => validateField && validateField(fieldName, text, error),
      750,
    ),
    [validateField],
  );

  const onChangeText = useCallback(
    (text) => {
      if (validateField) {
        error
          ? validateField(fieldName, text, error)
          : debbouncedValidateField(text);
      }

      if (inputRef.current) {
        inputRef.current.value = text;
      }
    },
    [validateField, error, fieldName, inputRef, debbouncedValidateField],
  );

  return onChangeText;
};

export default useOnChangeText;
