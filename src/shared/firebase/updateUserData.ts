import firestore from '@react-native-firebase/firestore';

interface Data {
  [key: string]: any;
}

export async function updateUserData(path: string, data: Data) {
  try {
    const docRef = firestore().doc(path);

    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new Error('O usuário não existe');
    }

    await docRef.update(data);

    return;
  } catch (error) {
    throw new Error(error);
  }
}
