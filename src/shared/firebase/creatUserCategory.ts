import firestore from '@react-native-firebase/firestore';
import {Category} from '@shared/models';

export const createUserCategory = async (
  userUid: string,
  category: Omit<Category, 'id'>,
) => {
  try {
    const response = await firestore()
      .collection(`users/${userUid}/categories`)
      .add(category);

    return response.id;
  } catch (error) {
    throw new Error(error);
  }
};
