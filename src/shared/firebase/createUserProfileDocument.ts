import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserBeforeIsLoggedDTO} from '@shared/models/UserBeforeIsLoggedDTO';
import {getInitialCategories} from './getInitialCategories';
import {Category} from '@shared/models';

export const createUserProfileDocument = async (
  email: string,
  password: string,
): Promise<{user: UserBeforeIsLoggedDTO; categories: Category[]}> => {
  try {
    const {user} = await auth().createUserWithEmailAndPassword(email, password);

    if (!user) {
      throw new Error('Usuário já criado');
    }

    const userRef = firestore().doc(`users/${user.uid}`);

    const snapshot = await userRef.get();

    let initialCategories: Category[] = [];

    if (!snapshot.exists) {
      // const createdAt = new Date();

      initialCategories = await getInitialCategories();

      await userRef.set({
        email,
      });

      const promises = initialCategories.map((category) =>
        firestore().collection(`users/${user.uid}/categories`).add(category),
      );

      await Promise.all(promises);
    }

    return {
      user: {
        email,
        uid: user.uid,
      },
      categories: initialCategories,
    };
  } catch (error) {
    throw new Error(error);
  }
};
