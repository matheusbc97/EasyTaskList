import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Category} from '@shared/models';

export async function getUserCategories() {
  const authUser = auth().currentUser;

  if (!authUser) {
    throw new Error('O usuário precisa estar autenticado');
  }

  const querySnapshot = await firestore()
    .collection(`users/${authUser.uid}/categories`)
    .get();

  const categories = querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Category[];

  return categories;
}
