import React, {useRef, forwardRef} from 'react';

import {Form} from '@unform/mobile';

import {NameInput} from '@/shared/components';
import {useValidateField, useFormHandles} from '@/shared/hooks';
import {validateAll} from '@/shared/utils/validations';

import {FunctionalFormComponent} from '@/shared/models';

interface UnFormObject {
  name: string;
}

export interface FormObject {
  name: string;
}

interface NameFormProps {
  onSubmitSuccess: (form: FormObject) => void;
  initialValues?: Partial<FormObject>;
}

const NameFormTemplate: FunctionalFormComponent<NameFormProps> = (
  {onSubmitSuccess, initialValues: initialValuesProp},
  ref,
) => {
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
      name: form.name,
    };

    onSubmitSuccess(formObject);
  };

  return (
    <Form
      onSubmit={handleFormSubmit}
      ref={formRef}
      initialData={initialValues}
      style={{width: '100%'}}>
      <NameInput validateField={validateField} />
    </Form>
  );
};

export default forwardRef(NameFormTemplate);
