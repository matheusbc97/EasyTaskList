import React, {forwardRef, useImperativeHandle, ForwardedRef} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import categoryIconNames from '@/assets/categoryIconNames';
import {Text, UnformInput as TextInput} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';
import {showToast} from '@/shared/components/Toast';
import ChooseCategoryColorModal from '@/shared/components/modals/ChooseCategoryColorModal';
import ChooseCategoryIconModal from '@/shared/components/modals/ChooseCategoryIconModal';
import CategoryColorBox from '@/shared/components/CategoryColorBox';
import {FormProps, FormHandles} from '@/shared/models';

import {
  ColorAndIconContainer,
  SelectColorOrIconButton,
  SelectIconContainer,
} from './styles';
import useModalState from './hooks/useModalState';

export interface FormObject {
  name: string;
  colorIndex: number;
  iconIndex: number;
}

interface UnFormObject {
  name: string;
}

export interface CategoryFormHandles extends FormHandles {}

interface CategoryFormProps extends FormProps<FormObject> {}

function CategoryForm(
  {initialValues: initialValuesProp, onSubmitSuccess}: CategoryFormProps,
  ref: ForwardedRef<FormHandles>,
) {
  const {translation} = useTranslation();

  const {control, handleSubmit} = useForm({
    defaultValues: initialValuesProp,
  });

  const {value: colorIndex, ...colorModalMethods} = useModalState(
    initialValuesProp?.iconIndex ?? -1,
  );

  const {value: iconIndex, ...iconModalMethods} = useModalState(
    initialValuesProp?.iconIndex ?? -1,
  );

  const onSubmit = (form: UnFormObject) => {
    if (colorIndex === -1) {
      showToast({
        text: translation('REQUIRED_COLOR'),
      });
      return;
    }

    if (iconIndex === -1) {
      showToast({
        text: translation('REQUIRED_ICON'),
      });
      return;
    }

    onSubmitSuccess?.({
      name: form.name,
      colorIndex,
      iconIndex,
    });
  };

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(form => {
      const formObject: UnFormObject = {
        name: form.name!,
      };

      onSubmit(formObject);
    }),
  }));

  return (
    <>
      <View>
        <TextInput control={control} name="name" label={translation('NAME')} />
        <ColorAndIconContainer>
          <SelectColorOrIconButton onPress={colorModalMethods.open}>
            <CategoryColorBox colorIndex={colorIndex} />
            <Text type="title" primaryColor style={{marginTop: 5}}>
              {translation('SELECT_COLOR')}
            </Text>
          </SelectColorOrIconButton>
          <SelectColorOrIconButton onPress={iconModalMethods.open}>
            <SelectIconContainer>
              {iconIndex !== -1 && (
                <FontAwesome5Icon
                  name={categoryIconNames[iconIndex]}
                  size={27}
                />
              )}
            </SelectIconContainer>
            <Text type="title" primaryColor style={{marginTop: 5}}>
              {translation('SELECT_ICON')}
            </Text>
          </SelectColorOrIconButton>
        </ColorAndIconContainer>
      </View>
      <ChooseCategoryColorModal
        onBackButtonPress={colorModalMethods.close}
        isVisible={colorModalMethods.isVisible}
        onColorPress={colorModalMethods.setValue}
      />

      <ChooseCategoryIconModal
        onBackButtonPress={iconModalMethods.close}
        isVisible={iconModalMethods.isVisible}
        onIconPress={iconModalMethods.setValue}
      />
    </>
  );
}

export default forwardRef(CategoryForm);
