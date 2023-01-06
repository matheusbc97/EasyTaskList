import {useNavigation} from '@react-navigation/native';
import {Category} from '@shared/models';
import {createCategory} from '@store/categories';
import {useDispatch} from 'react-redux';

import {FormObject} from '@/templates/forms/CategoryForm';
import {createId} from '@shared/utils/createId';

const useHandleSubmit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleFormSubmit = (form: FormObject) => {
    const newCategory: Category = {
      id: createId(),
      colorIndex: form.colorIndex,
      name: form.name,
      iconIndex: form.iconIndex,
    };

    dispatch(createCategory(newCategory));
    navigation.goBack();
  };

  return handleFormSubmit;
};

export default useHandleSubmit;
