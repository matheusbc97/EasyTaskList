import React, {useRef, forwardRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';

import {
  EmailInput,
  NewPasswordInput,
  ConfirmNewPasswordInput,
  CheckInputWithButtonText,
} from '@shared/components';
import {useValidateField, useFormHandles} from '@shared/hooks';
import {validateAll} from '@shared/utils/validations';
import {FunctionalFormComponent, FormProps} from '@/shared/models';
import {showToast} from '@shared/components/Toast';
import {useTranslation} from '@/shared/hooks';

interface UnFormObject {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface FormObject {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface RegisterFormProps extends FormProps<FormObject> {}

const RegisterFormTemplate: FunctionalFormComponent<RegisterFormProps> = (
  {onSubmitSuccess, initialValues: initialValuesProp},
  ref,
) => {
  const formRef = useFormHandles(ref);

  const {translation} = useTranslation();
  const [privacyPolicyIsChecked, setPrivacyPolicyIsChecked] = useState(false);

  const initialValues = useRef(initialValuesProp).current;

  const navigation = useNavigation();

  const validateField = useValidateField(formRef);

  const handleFormSubmit = (form: UnFormObject) => {
    const [formErrors, isValid] = validateAll(form);

    if (!privacyPolicyIsChecked) {
      showToast({
        text: 'É necessário aceitar os termos de privacidade',
        type: 'danger',
        remain: true,
      });
    }

    if (!isValid) {
      formRef.current?.setErrors(formErrors);
      return;
    }

    const formObject: FormObject = {
      ...form,
    };

    onSubmitSuccess && onSubmitSuccess(formObject);
  };

  const focusInput = (name: string) => () =>
    formRef.current?.getFieldRef(name).focus();

  return (
    <Form
      ref={formRef}
      onSubmit={handleFormSubmit}
      initialData={initialValues}
      style={{width: '100%'}}>
      <EmailInput
        validateField={validateField}
        onSubmitEditing={focusInput('newPassword')}
      />
      <NewPasswordInput
        validateField={validateField}
        onSubmitEditing={focusInput('confirmNewPassword')}
      />
      <ConfirmNewPasswordInput validateField={validateField} />

      <CheckInputWithButtonText
        value={privacyPolicyIsChecked}
        onChange={value => setPrivacyPolicyIsChecked(value)}
        text={translation('I_READ_AND_I_AGREE_WITH_THE')}
        textInEvidence={translation('PRIVACY_POLICY')}
        onTextInEvidencePress={() => navigation.navigate('PrivacyPolicy')}
      />
    </Form>
  );
};

export default forwardRef(RegisterFormTemplate);
