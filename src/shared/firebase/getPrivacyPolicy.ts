import firestore from '@react-native-firebase/firestore';

export async function getPrivacyPolicy() {
  const privacyPolicyFirestore = await firestore()
    .doc('app_params/privacyPolicy')
    .get();

  const privacyPolicy = privacyPolicyFirestore.data()!.value as string;

  return privacyPolicy;
}
