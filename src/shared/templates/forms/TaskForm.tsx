import React, {useRef, forwardRef} from 'react';

import {Form} from '@unform/mobile';

import {
  DateInput,
  TimeInput,
  CategoryInput,
  DescriptionInput,
  TitleInput,
} from '@/shared/components';
import {useValidateField, useFormHandles} from '@/shared/hooks';
import {Category} from '@/shared/models';
import {validateAll} from '@/shared/utils/validations';

import {FunctionalFormComponent, FormProps, FormHandles} from '@/shared/models';

interface UnFormObject {
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
}

export interface FormObject {
  title: string;
  description?: string;
  date: string;
  time: string;
  category: Category;
}

export interface TaskFormHandles extends FormHandles {}
interface TaskFormProps extends FormProps<FormObject> {}

const TaskFormTemplate: FunctionalFormComponent<TaskFormProps> = (
  {onSubmitSuccess, initialValues: initialValuesProp},
  ref,
) => {
  const formRef = useFormHandles(ref);

  let chosenCategory: Category | null | undefined = useRef(
    initialValuesProp?.category,
  ).current;

  const onCategoryChange = (category: Category) => {
    if (category) {
      formRef.current?.setFieldValue('category', category.name);
    }

    chosenCategory = category;
  };

  const initialValues = useRef({
    ...initialValuesProp,
    category: initialValuesProp?.category?.name,
  }).current;

  const validateField = useValidateField(formRef);

  const handleFormSubmit = (form: UnFormObject) => {
    const [formErrors, isValid] = validateAll(form);

    if (!isValid) {
      formRef.current?.setErrors(formErrors);
      return;
    }

    if (!chosenCategory) {
      return;
    }

    const formObject: FormObject = {
      ...form,
      category: chosenCategory,
    };

    onSubmitSuccess && onSubmitSuccess(formObject);
  };

  return (
    <Form onSubmit={handleFormSubmit} ref={formRef} initialData={initialValues}>
      <TitleInput
        validateField={validateField}
        onSubmitEditing={() =>
          formRef.current?.getFieldRef('description').focus()
        }
      />

      <DescriptionInput />

      <DateInput />

      <TimeInput />

      <CategoryInput onCategoryChange={onCategoryChange} />
    </Form>
  );
};

export default forwardRef(TaskFormTemplate);
