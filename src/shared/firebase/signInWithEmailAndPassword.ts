import auth from '@react-native-firebase/auth';

import {getFirestoreUser} from './getFirestoreUser';

export const signInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const {user: authUser} = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    return await getFirestoreUser(authUser.uid, email);
  } catch (error) {
    throw new Error(error);
  }
};
