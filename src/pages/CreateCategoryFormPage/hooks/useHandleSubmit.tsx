import {useNavigation} from '@react-navigation/native';
import {Category} from '@shared/models';
import {createCategory} from '@store/categories';
import {useDispatch} from 'react-redux';

import {FormObject} from '@/shared/templates/forms/CategoryForm';
import {createId} from '@shared/utils/createId';
import {database} from '@/database';
import CategoryModel from '@/database/model/CategoryModel';

const useHandleSubmit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleFormSubmit = async (form: FormObject) => {
    const newCategory: Category = {
      id: createId(),
      colorIndex: form.colorIndex,
      name: form.name,
      iconIndex: form.iconIndex,
    };

    await database.write(async () => {
      await database.get<CategoryModel>('categories').create(data => {
        data.name = form.name;
        data.colorIndex = form.colorIndex;
        data.iconIndex = form.iconIndex;
      });
    });

    dispatch(createCategory(newCategory));
    navigation.goBack();
  };

  return handleFormSubmit;
};

export default useHandleSubmit;
