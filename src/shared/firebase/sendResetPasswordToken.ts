import auth from '@react-native-firebase/auth';

export const sendResetPasswordToken = async (email: string): Promise<void> => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (error) {
    throw new Error(error);
  }
};
