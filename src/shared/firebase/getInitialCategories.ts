import firestore from '@react-native-firebase/firestore';
import {Category} from '@shared/models';

export async function getInitialCategories() {
  const querySnapshot = await firestore().collection('initialCategories').get();

  const categories = querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Category[];

  return categories;
}
