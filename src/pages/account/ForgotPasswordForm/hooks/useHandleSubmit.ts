import {RefObject} from 'react';
import {useNavigation} from '@react-navigation/native';

import {handleErrorMessage} from '@shared/utils/errorHandler';
import {validateAll} from '@shared/utils/validations';
import {sendResetPasswordToken} from '@shared/firebase';
import {loaderHandler} from '@shared/components/LoadingHandler';
import {showToast} from '@shared/components/Toast';
import {FormHandles} from '@unform/core';

import {FormDetails, ForgotPasswordFormNavigation} from '../types';

const useHandleSubmit = (formRef: RefObject<FormHandles>) => {
  const navigation = useNavigation<ForgotPasswordFormNavigation>();

  const handleSubmit = async (form: FormDetails) => {
    const [formErrors, isValid] = validateAll(form);

    formRef.current?.setErrors(formErrors);

    if (isValid) {
      try {
        loaderHandler.showLoader();
        await sendResetPasswordToken(form.email);
        loaderHandler.hideLoader();
        showToast({
          text: 'Email enviado com sucesso',
          type: 'success',
          buttonLabel: 'Voltar ao login',
          buttonOnPress: () => navigation.navigate('Login'),
          remain: true,
        });
      } catch (error) {
        loaderHandler.hideLoader();
        handleErrorMessage(error);
      }
      return;
    }
  };

  return handleSubmit;
};

export default useHandleSubmit;
