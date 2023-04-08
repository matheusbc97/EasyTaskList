import React, {useRef, forwardRef, useImperativeHandle} from 'react';

import {useForm} from 'react-hook-form';
import {View} from 'react-native';

import {
  DateInput,
  TimeInput,
  CategoryInput,
  DescriptionInput,
  TitleInput,
} from '@/modules/shared/components';
import {Category} from '@/modules/shared/models';
import {FunctionalFormComponent, FormProps, FormHandles} from '@/modules/shared/models';

interface _FormObject {
  title: string;
  description?: string;
  date: string;
  time: string;
  categoryName: string;
}

export interface FormObject {
  title: string;
  description?: string;
  date: string;
  time: string;
  category: Category;
}

export interface TaskFormHandles extends FormHandles {}
interface TaskFormProps extends FormProps<FormObject> {
  initialValues: FormObject;
}

const TaskFormTemplate: FunctionalFormComponent<TaskFormProps> = (
  {onSubmitSuccess, initialValues: initialValuesProp},
  ref,
) => {
  const {control, handleSubmit, setValue, setFocus} = useForm<_FormObject>({
    defaultValues: {
      ...initialValuesProp,
      categoryName: initialValuesProp?.category.name ?? '',
    },
  });

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(form => {
      if (!chosenCategory) {
        return;
      }

      const formObject: FormObject = {
        ...form,
        category: chosenCategory,
      };

      onSubmitSuccess?.(formObject);
    }),
  }));

  let chosenCategory: Category | null | undefined = useRef(
    initialValuesProp?.category,
  ).current;

  const onCategoryChange = (category: Category) => {
    setValue('categoryName', category.name);

    chosenCategory = category;
  };

  return (
    <View>
      <TitleInput
        control={control}
        onSubmitEditing={() => setFocus('description')}
      />

      <DescriptionInput control={control} />

      <DateInput
        setDateValue={date => setValue('date', date)}
        control={control}
      />

      <TimeInput
        setTimeValue={time => setValue('time', time)}
        control={control}
      />

      <CategoryInput control={control} onCategoryChange={onCategoryChange} />
    </View>
  );
};

export default forwardRef(TaskFormTemplate);
