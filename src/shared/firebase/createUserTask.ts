import firestore from '@react-native-firebase/firestore';

interface CreateTaskOnFirebaseDTO {
  title: string;
  description: string;
  date: string;
  categoryId: string;
  done: boolean;
}

export const createUserTask = async (
  userUid: string,
  {categoryId, ...rest}: CreateTaskOnFirebaseDTO,
) => {
  try {
    const response = await firestore()
      .collection(`users/${userUid}/tasks`)
      .add({
        categoryRef: firestore().doc(
          `users/${userUid}/categories/${categoryId}`,
        ),
        ...rest,
      });

    return response.id;
  } catch (error) {
    throw new Error(error);
  }
};
