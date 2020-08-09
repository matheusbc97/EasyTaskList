import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserBeforeIsLoggedDTO} from '@shared/models/UserBeforeIsLoggedDTO';

export const createUserProfileDocument = async (
  email: string,
  password: string,
): Promise<UserBeforeIsLoggedDTO> => {
  try {
    const {user} = await auth().createUserWithEmailAndPassword(email, password);

    if (!user) {
      throw new Error('Usuário já criado');
    }

    const userRef = firestore().doc(`users/${user.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      // const createdAt = new Date();

      await userRef.set({
        email,
        //createdAt,
      });
    }

    return {
      email,
      uid: user.uid,
    };
  } catch (error) {
    throw new Error(error);
  }
};
