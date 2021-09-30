import firestore from '@react-native-firebase/firestore';

interface UpdateTaskOnFirebaseDTO {
  id: string;
  title?: string;
  description?: string;
  date?: Date;
  categoryId?: string;
  done?: boolean;
}

export const updateUserTask = async (
  userUid: string,
  {id, categoryId, ...rest}: UpdateTaskOnFirebaseDTO,
) => {
  try {
    const updateObject: any = {
      ...rest,
    };

    if (categoryId) {
      updateObject.categoryRef = firestore().doc(
        `users/${userUid}/categories/${categoryId}`,
      );
    }

    await firestore().doc(`users/${userUid}/tasks/${id}`).update(updateObject);

    return;
  } catch (error) {
    throw new Error(error);
  }
};
