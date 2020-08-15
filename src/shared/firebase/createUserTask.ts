import firestore from '@react-native-firebase/firestore';

interface CreateTaskOnFirebaseDTO {
  title: string;
  description: string;
  date: string;
  categoryRef: string;
  done: boolean;
}

export const createUserTask = async (
  userUid: string,
  category: CreateTaskOnFirebaseDTO,
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
