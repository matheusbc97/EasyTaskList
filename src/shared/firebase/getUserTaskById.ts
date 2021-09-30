import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {Task, Category} from '@shared/models';

export async function getUserTaskById(taskId: string) {
  try {
    const authUser = auth().currentUser;

    if (!authUser) {
      throw new Error('Usuário não autenticado');
    }

    const response = await firestore()
      .doc(`users/${authUser.uid}/tasks/${taskId}`)
      .get();

    const {categoryRef, date, ...rest} = response.data() as any;

    const categoryResponse = await categoryRef.get();

    const category = categoryResponse.data() as Category;

    const task: Task = {
      id: taskId,
      category,
      date: date.toMillis(),
      ...rest,
    };

    console.log('taskData', task);

    return task;
  } catch (error) {
    throw new Error(error);
  }
}
