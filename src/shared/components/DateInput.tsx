import formatDate from '@shared/utils/fomatDate';
import React, {useRef, useState} from 'react';
import TextInput from './UnformInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useTranslation} from '@shared/hooks';

function DateInput() {
  const {translation} = useTranslation();
  const datePickerRef = useRef<any>(null);
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);

  return (
    <>
      <TextInput
        ref={datePickerRef}
        mask={value => formatDate(value)}
        name="date"
        label={translation('DATE')}
        button
        onPress={() => setDatePickerIsVisible(true)}
      />
      <DateTimePickerModal
        isVisible={datePickerIsVisible}
        mode="date"
        onConfirm={date => {
          datePickerRef.current?.setValue(String(date));
          setDatePickerIsVisible(false);
        }}
        onCancel={() => setDatePickerIsVisible(false)}
      />
    </>
  );
}

export default DateInput;
