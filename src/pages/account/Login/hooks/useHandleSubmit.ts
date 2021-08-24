import {RefObject} from 'react';
import {FormHandles} from '@unform/core';

import useLogIn from '../../../../hooks/useLogIn';
import {validateAll} from '@shared/utils/validations';
import {FormDetails} from '../types';

const useHandleSubmit = (
  formRef: RefObject<FormHandles>,
  userWhithoutConfigurationsCallback: () => void,
) => {
  const {logIn} = useLogIn();

  const handleSubmit = async (form: FormDetails) => {
    const [formErrors, isValid] = validateAll(form);

    if (!isValid) {
      formRef.current?.setErrors(formErrors);
      return;
    }

    try {
      const isLogged = await logIn(form.email, form.password);

      if (!isLogged) {
        userWhithoutConfigurationsCallback();
      }
    } catch (error) {}
  };

  return handleSubmit;
};

export default useHandleSubmit;
