import {SafeAreaView, View} from 'react-native';

import {Header, RoundedButton, Text} from '@/modules/shared/components';
import {useTranslation, useTimer} from '@/modules/shared/hooks';
import {AuthenticateStackPageProps} from '@/modules/shared/types/AuthenticateStackPageProps';

export default function StopwatchPage({
  navigation,
}: AuthenticateStackPageProps<'Stopwatch'>) {
  const {translation} = useTranslation();
  const {seconds, minutes, isTimerRunning, startTimer, stopTimer} = useTimer();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title={translation('STOPWATCH')}
        onBackPress={() => navigation.navigate('BottomNavigation')}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text type="title-big">
          {minutes} : {seconds}
        </Text>
      </View>
      <RoundedButton
        center
        text={
          isTimerRunning
            ? translation('STOP_STOPWATCH')
            : translation('START_STOPWATCH')
        }
        onPress={isTimerRunning ? stopTimer : startTimer}
      />
    </SafeAreaView>
  );
}
