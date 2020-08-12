import firestore from '@react-native-firebase/firestore';

interface CreateCategoryOnFirebaseDTO {
  title: string;
  description: string;
  date: string;
  categoryRef: string;
}

export const createUserTask = async (
  userUid: string,
  category: CreateCategoryOnFirebaseDTO,
) => {
  try {
    const response = await firestore()
      .collection(`users/${userUid}/tasks`)
      .add(category);

    return response.id;
  } catch (error) {
    throw new Error(error);
  }
};
