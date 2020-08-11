import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Task} from '@shared/models';

export async function getUserTasks(): Promise<Task[]> {
  try {
    const authUser = auth().currentUser;

    if (!authUser) {
      throw new Error('Usuário não autenticado');
    }

    const tasksCollection = await firestore()
      .collection(`users/${authUser.uid}/tasks`)
      .get();

    return tasksCollection.docs.map((taskDoc) => taskDoc.data() as Task);
  } catch (error) {
    throw new Error(error);
  }
}
