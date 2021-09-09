import {RefObject} from 'react';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '@shared/components/Toast';
import {useTranslation} from '@shared/hooks';
import {Category} from '@shared/models';
import {validateAll} from '@shared/utils/validations';
import {createCategory, updateCategory} from '@store/categories';
import {FormHandles} from '@unform/core';
import {useDispatch} from 'react-redux';

import {FormObject} from '../types';

interface HandleFormSubmitParams {
  form: FormObject;
  selectedColorIndex: number;
  iconIndex: number;
}

interface UseHandleSubmitParams {
  formRef: RefObject<FormHandles>;
  category?: Category;
}

const useHandleSubmit = ({formRef, category}: UseHandleSubmitParams) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {translation} = useTranslation();

  const handleFormSubmit = ({
    form,
    iconIndex,
    selectedColorIndex,
  }: HandleFormSubmitParams) => {
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

    if (!category) {
      const newCategory: Omit<Category, 'id'> = {
        colorIndex: selectedColorIndex,
        name: form.name,
        iconIndex: iconIndex,
      };

      dispatch(createCategory(newCategory)).then(action => {
        if (action.payload) {
          navigation.goBack();
        }
      });

      return;
    }

    const updatedCategory: Category = {
      id: category.id,
      colorIndex: selectedColorIndex,
      name: form.name,
      iconIndex: iconIndex,
    };

    dispatch(updateCategory(updatedCategory)).then(action => {
      if (action.payload) {
        navigation.goBack();
      }
    });
  };

  return handleFormSubmit;
};

export default useHandleSubmit;
