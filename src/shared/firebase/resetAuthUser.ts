import auth from '@react-native-firebase/auth';

export const resetAuthUser = async () => {
  try {
    await auth().signOut();
    return;
  } catch (error) {
    throw error;
  }
};
