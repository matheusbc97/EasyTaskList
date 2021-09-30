import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export async function deleteTaskById(taskId: string) {
  try {
    const authUser = auth().currentUser;

    if (!authUser) {
      throw new Error('Usuário não autenticado');
    }

    await firestore().doc(`users/${authUser.uid}/tasks/${taskId}`).delete();
  } catch (error) {
    throw new Error(error);
  }
}
