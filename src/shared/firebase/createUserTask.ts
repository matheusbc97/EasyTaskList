import firestore from '@react-native-firebase/firestore';
import {Task} from '@shared/models';

export const createUserTask = async (
  userUid: string,
  category: Omit<Task, 'id'>,
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
