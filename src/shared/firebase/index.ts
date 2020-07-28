import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {User} from '@shared/models';

export const createUserProfileDocument = async (
  email: string,
  password: string,
): Promise<User> => {
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

export const signInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const {user: authUser} = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    const userRef = firestore().doc(`users/${authUser.uid}`);

    const response = await userRef.get();

    let user: User = {
      uid: authUser.uid,
      email,
    };

    const userData = response.data() as Omit<User, 'uid'> | undefined;

    Object.assign(user, {
      avatar: userData?.avatar,
      image: userData?.image,
      name: userData?.name,
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
