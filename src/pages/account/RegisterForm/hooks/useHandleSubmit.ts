import {RefObject} from 'react';
import {showToast} from '@shared/components/Toast';
import {validateAll} from '@shared/utils/validations';
import useRegisterUser from '../../../../hooks/useRegisterUser';

import {FormDetails} from '../types';
import {FormHandles} from '@unform/core';

interface Params {
  formRef: RefObject<FormHandles>;
  onRegisteredUser: () => void;
  privacyPolicyIsChecked: boolean;
}

const useHandleSubmit = ({
  formRef,
  onRegisteredUser,
  privacyPolicyIsChecked,
}: Params) => {
  const registerUser = useRegisterUser();

  const handleSubmit = async (form: FormDetails) => {
    const [formErrors, isValid] = validateAll(form);

    formRef.current?.setErrors(formErrors);

    if (!privacyPolicyIsChecked) {
      showToast({
        text: 'É necessário aceitar os termos de privacidade',
        type: 'danger',
        remain: true,
      });
      return;
    }

    if (isValid) {
      const {email, newPassword: password} = form;

      await registerUser({
        email,
        password,
      });

      onRegisteredUser();
    }
  };

  return handleSubmit;
};

export default useHandleSubmit;
