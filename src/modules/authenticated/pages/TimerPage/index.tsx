import {useRef, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {PickerIOS} from '@react-native-picker/picker';

import {Header, RoundedButton, Timer, TimerHandles} from '@/modules/shared/components';
import {useTranslation} from '@/modules/shared/hooks';
import {AuthenticateStackPageProps} from '@/modules/shared/types/AuthenticateStackPageProps';

const pickerItems = Array.from({length: 60}, (_, index) => {
  const value = index + 1;
  return (
    <PickerIOS.Item
      key={value}
      label={value.toString().padStart(2, '0')}
      value={value}
    />
  );
});

export default function TimerPage({
  navigation,
}: AuthenticateStackPageProps<'Timer'>) {
  const {translation} = useTranslation();

  const [pickerValue, setPickerValue] = useState(3);

  const timerRef = useRef<TimerHandles>(null);

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const startTimer = () => {
    setIsTimerRunning(true);
    timerRef.current?.startTimer();
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    timerRef.current?.stopTimer();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title={translation('TIMER')}
        onBackPress={() => navigation.navigate('BottomNavigation')}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <PickerIOS
          selectedValue={pickerValue}
          style={{width: 90}}
          onValueChange={itemValue =>
            setPickerValue(itemValue.valueOf() as number)
          }>
          {pickerItems}
        </PickerIOS>
        <Timer ref={timerRef} />
      </View>
      <RoundedButton
        center
        text={
          isTimerRunning
            ? translation('STOP_TIMER')
            : translation('START_TIMER')
        }
        onPress={isTimerRunning ? stopTimer : startTimer}
      />
    </SafeAreaView>
  );
}
