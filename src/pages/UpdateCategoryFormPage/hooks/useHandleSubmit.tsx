import {useNavigation} from '@react-navigation/native';
import {Category} from '@shared/models';
import {useDispatch} from 'react-redux';

import {FormObject} from '@/shared/templates/forms/CategoryForm';
import {updateCategory} from '@store/categories';

const useHandleSubmit = (category: Category) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleFormSubmit = (form: FormObject) => {
    dispatch(
      updateCategory({
        id: category.id,
        changes: {
          colorIndex: form.colorIndex,
          name: form.name,
          iconIndex: form.iconIndex,
        },
      }),
    );

    navigation.goBack();
  };

  return handleFormSubmit;
};

export default useHandleSubmit;
