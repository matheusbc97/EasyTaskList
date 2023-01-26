import {TEST_IDS} from '@/shared/constants/testIds';
import {SafeAreaView, Text, Button, View} from 'react-native';

interface ErrorPageProps {
  restartApp(): void;
}

function ErrorPage({restartApp}: ErrorPageProps) {
  return (
    <SafeAreaView testID={TEST_IDS.ERROR_PAGE_CONTAINER} style={{flex: 1}}>
      <View style={{flex: 1, padding: 20}}>
        <Text style={{fontSize: 18}}>Ops, something went wrong</Text>
      </View>

      <Button
        testID={TEST_IDS.RELOAD_APP_BUTTON}
        title="Reiniciar App"
        color={'red'}
        onPress={restartApp}
      />
    </SafeAreaView>
  );
}

export default ErrorPage;
