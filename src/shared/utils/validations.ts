import {FormHandles} from '@unform/core';
import {RefObject} from 'react';

export function validateField(
  fieldName: string,
  value: string,
  formRef?: RefObject<FormHandles>,
) {
  switch (fieldName) {
    case 'name':
      if (!value) {
        return emptyText('nome');
      }

      return null;
    case 'password':
      if (!value) {
        return 'Campo Obrigatório';
      }

      return null;
    case 'newPassword':
      if (!value) {
        return 'Campo Obrigatório';
      } else {
        if (
          formRef?.current?.getFieldValue('confirmPassword') &&
          formRef.current.getFieldValue('confirmPassword') !== value
        ) {
          return 'As senhas não coincidem';
        } else {
          if (
            formRef?.current?.getFieldError('confirmPassword') ===
            'As senhas não coincidem'
          ) {
            formRef?.current?.setFieldError('confirmPassword', '');
          }
        }
      }

      return null;
    case 'confirmNewPassword':
      if (!value) {
        return 'Campo Obrigatório';
      } else {
        if (
          formRef?.current?.getFieldValue('newPassword') &&
          formRef.current?.getFieldValue('newPassword') !== value
        ) {
          return 'As senhas não coincidem';
        } else {
          if (
            formRef?.current?.getFieldError('newPassword') ===
            'As senhas não coincidem'
          ) {
            formRef?.current?.setFieldError('newPassword', '');
          }
        }
      }

      return null;
    case 'email':
      if (!value) {
        return 'Campo Email obrigatório.';
      }

      if (!validateEmail(value)) {
        return 'Email inválido';
      }

      return null;
    case 'date':
      if (!value) {
        return 'Campo Obrigatório';
      }

      return null;

    case 'address.cep':
      if (!value) {
        return 'Campo Obrigatório';
      }

      return null;
    case 'address.street':
      if (!value) {
        return 'Campo Obrigatório';
      }

      return null;
    default:
      return null;
  }
}

export function validateAll(
  form: any,
  notValidate = [],
  _recursiveKey?: string | null | undefined,
): [object, boolean] {
  let formErrors: any = {};
  let formIsValid = true;

  Object.keys(form).map((key) => {
    if (typeof form[key] === 'object') {
      let recursiveKey = _recursiveKey ? `${key}.${_recursiveKey}` : key;

      formErrors = {
        ...formErrors,
        ...validateAll(form[key], notValidate, recursiveKey),
      };
    } else {
      const newKey = _recursiveKey ? `${_recursiveKey}.${key}` : key;

      if (!notValidate.find((fieldName) => fieldName === newKey)) {
        const error = validateField(newKey, form[key]);

        if (formIsValid && error) {
          formIsValid = false;
        }

        formErrors[newKey] = error;
      }
    }
  });

  return [formErrors, formIsValid];
}

function validateEmail(email: string) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function emptyText(value = '') {
  return `Campo ${value} obrigatório`;
}
