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
    await firestore()
      .doc(`users/${userUid}/tasks/${id}`)
      .update({
        categoryRef: firestore().doc(
          `users/${userUid}/categories/${categoryId}`,
        ),
        ...rest,
      });

    return;
  } catch (error) {
    throw new Error(error);
  }
};
