import firestore from '@react-native-firebase/firestore';

interface UpdateTaskOnFirebaseDTO {
  id: string;
  title?: string;
  description?: string;
  date?: Date;
  categoryRef?: string;
  done?: boolean;
}

export const updateUserTask = async (
  userUid: string,
  {id, ...rest}: UpdateTaskOnFirebaseDTO,
) => {
  try {
    await firestore().doc(`users/${userUid}/tasks/${id}`).update(rest);

    return;
  } catch (error) {
    throw new Error(error);
  }
};
