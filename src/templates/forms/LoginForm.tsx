import React, {useRef, forwardRef} from 'react';
import styled from 'styled-components/native';
import {Form} from '@unform/mobile';

import {useValidateField, useFormHandles, useTranslation} from '@/shared/hooks';
import {validateAll} from '@/shared/utils/validations';
import {FunctionalFormComponent, FormProps} from '@/shared/models';
import TextInput from '@/shared/components/inputs/InputWithLeftIcon';

interface UnFormObject {
  email: string;
  password: string;
}

export interface FormObject {
  email: string;
  password: string;
}

interface LoginFormProps extends FormProps<FormObject> {}

export const LoginForm = styled(Form)`
  width: 100%;
`;

const LoginFormTemplate: FunctionalFormComponent<LoginFormProps> = (
  {onSubmitSuccess, initialValues: initialValuesProp},
  ref,
) => {
  const {translation} = useTranslation();
  const formRef = useFormHandles(ref);
  const initialValues = useRef(initialValuesProp).current;

  const validateField = useValidateField(formRef);

  const handleFormSubmit = (form: UnFormObject) => {
    const [formErrors, isValid] = validateAll(form);

    if (!isValid) {
      formRef.current?.setErrors(formErrors);
      return;
    }

    const formObject: FormObject = {
      email: form.email,
      password: form.password,
    };

    onSubmitSuccess && onSubmitSuccess(formObject);
  };

  return (
    <LoginForm
      ref={formRef}
      onSubmit={handleFormSubmit}
      initialData={initialValues}>
      <TextInput
        iconName="user"
        name="email"
        placeholder={translation('EMAIL')}
        textContentType="emailAddress"
        autoCompleteType="email"
        validateField={validateField}
        onSubmitEditing={() => formRef.current?.getFieldRef('password').focus()}
        autoCapitalize="none"
        returnKeyType="next"
      />
      <TextInput
        iconName="lock"
        name="password"
        placeholder={translation('PASSWORD')}
        textContentType="password"
        validateField={validateField}
        secureTextEntry
        autoCapitalize="none"
        onSubmitEditing={() => formRef.current?.submitForm()}
        returnKeyType="send"
      />
    </LoginForm>
  );
};

export default forwardRef(LoginFormTemplate);
