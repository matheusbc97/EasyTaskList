import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export interface FirebaseTaskDTO {
  id: string;
  title: string;
  description: string;
  date: number;
  categoryId: string;
  done: boolean;
}

export async function getUserTasks(): Promise<FirebaseTaskDTO[]> {
  try {
    const authUser = auth().currentUser;

    if (!authUser) {
      throw new Error('Usuário não autenticado');
    }

    const tasksCollection = await firestore()
      .collection(`users/${authUser.uid}/tasks`)
      .orderBy('date')
      .get();

    const tasks = tasksCollection.docs.map((taskDoc) => {
      const {categoryRef, date, ...rest} = taskDoc.data();

      return {
        id: taskDoc.id,
        categoryId: categoryRef.id,
        date: date.toMillis(),
        ...rest,
      } as FirebaseTaskDTO;
    });

    return tasks;
  } catch (error) {
    throw new Error(error);
  }
}
