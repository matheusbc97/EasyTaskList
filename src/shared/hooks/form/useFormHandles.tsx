import {useImperativeHandle, ForwardedRef, useRef} from 'react';
import {FormHandles as UnFormHandles} from '@unform/core';
import {FormHandles} from '@/shared/models';

export const useFormHandles = (ref: ForwardedRef<FormHandles>) => {
  const formRef = useRef<UnFormHandles>(null);

  useImperativeHandle(
    ref,
    () => ({
      submitForm: () => {
        formRef.current?.submitForm();
      },
    }),
    [formRef],
  );

  return formRef;
};
