import {useNavigation} from '@react-navigation/native';
import {Category} from '@shared/models';
import {createCategory, updateCategory} from '@store/categories';
import {useDispatch} from 'react-redux';

import {FormObject} from '@/templates/CategoryForm';

const useHandleSubmit = (category?: Category) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleFormSubmit = (form: FormObject) => {
    if (!category) {
      const newCategory: Omit<Category, 'id'> = {
        colorIndex: form.colorIndex,
        name: form.name,
        iconIndex: form.iconIndex,
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
      colorIndex: form.colorIndex,
      name: form.name,
      iconIndex: form.iconIndex,
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
