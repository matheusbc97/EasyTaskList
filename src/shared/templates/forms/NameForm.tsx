import {forwardRef, useImperativeHandle} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';

import {NameInput} from '@/shared/components';

export interface NameFormObject {
  name: string;
}

interface NameFormProps {
  onSubmitSuccess: (form: any) => void;
  initialValues?: Partial<NameFormObject>;
}

function NameFormTemplate(
  {onSubmitSuccess, initialValues: initialValuesProp}: NameFormProps,
  ref: any,
) {
  const {control, handleSubmit} = useForm({
    defaultValues: initialValuesProp,
  });

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(form => {
      const formObject: NameFormObject = {
        name: form.name!,
      };

      onSubmitSuccess(formObject);
    }),
  }));

  return (
    <View>
      <NameInput control={control} />
    </View>
  );
}

export default forwardRef(NameFormTemplate);
