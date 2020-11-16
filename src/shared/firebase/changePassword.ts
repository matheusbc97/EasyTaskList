import auth from '@react-native-firebase/auth';

export const changeUserPassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  try {
    const user = auth().currentUser;

    if (!user || !user.email) {
      throw new Error('Usuário não encontrado');
    }

    await user.reauthenticateWithCredential(
      auth.EmailAuthProvider.credential(user.email, currentPassword),
    );

    await user.updatePassword(newPassword);
  } catch (error) {
    throw new Error(error);
  }
};
