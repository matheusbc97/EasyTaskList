import formatDate from '@/shared/utils/fomatDate';
import React, {useRef, useState} from 'react';
import TextInput from './UnformInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useTranslation} from '@/shared/hooks';

function TimeInput() {
  const {translation} = useTranslation();
  const timePickerRef = useRef<any>(null);
  const [timePickerIsVisible, setTimePickerIsVisible] = useState(false);

  return (
    <>
      <TextInput
        ref={timePickerRef}
        name="time"
        label={translation('HOUR')}
        mask={value => formatDate(value, 'time')}
        button
        onPress={() => setTimePickerIsVisible(true)}
      />

      <DateTimePickerModal
        isVisible={timePickerIsVisible}
        mode="time"
        onConfirm={time => {
          timePickerRef.current?.setValue(String(time));
          setTimePickerIsVisible(false);
        }}
        is24Hour
        onCancel={() => setTimePickerIsVisible(false)}
      />
    </>
  );
}

export default TimeInput;
