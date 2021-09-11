import React, {useImperativeHandle, useRef, useState, forwardRef} from 'react';
import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import categoryIconNames from '@/assets/categoryIconNames';
import {Text, UnformInput as TextInput} from '@/shared/components';
import {useTranslation, useValidateField} from '@/shared/hooks';
import {validateAll} from '@/shared/utils/validations';
import {showToast} from '@/shared/components/Toast';
import ChooseCategoryColorModal from '@/shared/components/ChooseCategoryColorModal';
import ChooseCategoryIconModal from '@/shared/components/ChooseCategoryIconModal';
import CategoryColorBox from '@/shared/components/CategoryColorBox';

const ColorAndIconContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const SelectColorOrIconButton = styled(RectButton)`
  align-items: center;
  padding-bottom: 10px;
  margin: 0 15px;
`;

const SelectIconContainer = styled.View`
  width: 60px;
  height: 60px;
  border-width: 2px;
  border-color: #e0e0e0;
  border-radius: 5px;
  margin: 0 15px;
  align-items: center;
  justify-content: center;
`;

export interface FormObject {
  name: string;
  colorIndex: number;
  iconIndex: number;
}

interface UnFormObject {
  name: string;
}

export interface CategoryFormHandles {
  submitForm: () => void;
}

interface CategoryFormProps {
  initialValues?: Partial<FormObject>;
  onSubmitSuccess: (form: FormObject) => void;
}

const CategoryForm: React.ForwardRefRenderFunction<
  CategoryFormHandles,
  CategoryFormProps
> = ({initialValues: initialValuesProp, onSubmitSuccess}, ref) => {
  const formRef = useRef<FormHandles>(null);
  const {translation} = useTranslation();
  const validateField = useValidateField(formRef);
  const [selectedColorIndex, setSelectedColorIndex] = useState(
    initialValuesProp?.colorIndex ?? -1,
  );
  const [iconIndex, setIconIndex] = useState(
    initialValuesProp?.iconIndex ?? -1,
  );

  useImperativeHandle(
    ref,
    () => ({
      submitForm: () => {
        formRef.current?.submitForm();
      },
    }),
    [formRef],
  );

  const initialValues = useRef<Partial<UnFormObject>>({
    name: initialValuesProp?.name,
  }).current;

  const [categoryIconModalIsVisible, setCategoryIconModalIsVisible] = useState(
    false,
  );

  const [
    categoryColorModalIsVisible,
    setCategoryColorModalIsVisible,
  ] = useState(false);

  const onSubmit = (form: UnFormObject) => {
    const [formErrors, isValid] = validateAll(form);

    if (!isValid) {
      formRef.current?.setErrors(formErrors);
      return;
    }

    if (selectedColorIndex === -1) {
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

    onSubmitSuccess({
      name: form.name,
      colorIndex: selectedColorIndex,
      iconIndex: iconIndex,
    });
  };

  return (
    <>
      <Form onSubmit={onSubmit} ref={formRef} initialData={initialValues}>
        <TextInput
          name="name"
          label={translation('NAME')}
          validateField={validateField}
        />
        <ColorAndIconContainer>
          <SelectColorOrIconButton
            onPress={() => setCategoryColorModalIsVisible(true)}>
            <CategoryColorBox colorIndex={selectedColorIndex} />
            <Text type="title" primaryColor style={{marginTop: 5}}>
              {translation('SELECT_COLOR')}
            </Text>
          </SelectColorOrIconButton>
          <SelectColorOrIconButton
            onPress={() => setCategoryIconModalIsVisible(true)}>
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
      </Form>
      <ChooseCategoryColorModal
        onColorPress={colorIndex => {
          setSelectedColorIndex(colorIndex);
          setCategoryColorModalIsVisible(false);
        }}
        isVisible={categoryColorModalIsVisible}
        onBackButtonPress={() => setCategoryColorModalIsVisible(false)}
      />

      <ChooseCategoryIconModal
        onBackButtonPress={() => setCategoryIconModalIsVisible(false)}
        isVisible={categoryIconModalIsVisible}
        onIconPress={iconIndex => {
          setIconIndex(iconIndex);
          setCategoryIconModalIsVisible(false);
        }}
      />
    </>
  );
};

export default forwardRef(CategoryForm);
