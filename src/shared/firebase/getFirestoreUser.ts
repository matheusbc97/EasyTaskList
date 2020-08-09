import firestore from '@react-native-firebase/firestore';
import {UserBeforeIsLoggedDTO} from '@shared/models/UserBeforeIsLoggedDTO';
import {User} from '@shared/models';

export async function getFirestoreUser(
  uid: string,
  email: string,
): Promise<
  | {user: UserBeforeIsLoggedDTO; isOnFirestore: false}
  | {user: User; isOnFirestore: true}
> {
  try {
    const userRef = firestore().doc(`users/${uid}`);

    const response = await userRef.get();

    let user: UserBeforeIsLoggedDTO = {
      uid,
      email,
    };

    const userData = response.data();

    Object.assign(user, {
      avatar: userData?.avatar,
      image: userData?.image,
      name: userData?.name,
      theme: userData?.theme,
    });

    if ((!user.avatar && !user.image) || !user.name || !user.theme) {
      return {
        user: user as UserBeforeIsLoggedDTO,
        isOnFirestore: false,
      };
    }

    return {
      user: user as User,
      isOnFirestore: true,
    };
  } catch (error) {
    throw new Error(error);
  }
}
