import firestore from '@react-native-firebase/firestore';
import {Category} from '@shared/models';

export const updateUserCategory = async (
  userUid: string,
  {id, ...updates}: Category,
) => {
  try {
    await firestore().doc(`users/${userUid}/categories/${id}`).update(updates);

    return;
  } catch (error) {
    throw new Error(error);
  }
};
