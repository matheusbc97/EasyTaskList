import auth from '@react-native-firebase/auth';

import {getFirestoreUser} from './getFirestoreUser';

export async function getCurrentUser() {
  const authUser = auth().currentUser;

  if (!authUser || !authUser?.email) {
    return null;
  }

  return await getFirestoreUser(authUser.uid, authUser.email);
}
