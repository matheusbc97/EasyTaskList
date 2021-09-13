import {useNavigation} from '@react-navigation/native';
import {Category} from '@shared/models';
import {createCategory} from '@store/categories';
import {useDispatch} from 'react-redux';

import {FormObject} from '@/templates/forms/CategoryForm';

const useHandleSubmit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleFormSubmit = (form: FormObject) => {
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
  };

  return handleFormSubmit;
};

export default useHandleSubmit;
