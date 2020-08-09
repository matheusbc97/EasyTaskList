import firestore from '@react-native-firebase/firestore';
import {Task} from '@shared/models';

export const createUserTask = async (userUid: string, category: Task) => {
  try {
    await firestore().collection(`users/${userUid}/tasks`).add(category);

    return;
  } catch (error) {
    throw new Error(error);
  }
};
