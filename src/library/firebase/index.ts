import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const createUserProfileDocument = async () => {
  const email = 'matheus4@teste.com';

  const {user} = await auth().signInWithEmailAndPassword(email, '123456');
  //console.log('users', user);
  //const {user} = await auth().createUserWithEmailAndPassword(email, '123456');

  if (!user) {
    return;
  }

  const userRef = firestore().doc(`users/${user.uid}`);
  //console.log('userRef', user);

  const snapshot = await userRef.get();

  console.log('snapshot', snapshot.exists);

  if (!snapshot.exists) {
    const createdAt = new Date();
    console.log('kkk', createdAt);

    try {
      await userRef.set({
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return true;
};
