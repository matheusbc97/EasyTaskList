import firestore from '@react-native-firebase/firestore';
import {AboutItem} from '@shared/models';

export async function getAboutItemsFromDatabase() {
  const querySnapshot = await firestore().collection('about').get();

  const aboutItems = querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as AboutItem[];

  return aboutItems;
}
