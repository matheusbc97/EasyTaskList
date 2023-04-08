import React, {useRef, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import formatDate from '@/modules/shared/utils/formatDate';
import {useTranslation} from '@/modules/shared/hooks';
import {FormControl} from '@/modules/shared/models';

import TextInput from './EnhancedInput';

interface DateInputProps {
  control: FormControl;
  setTimeValue(value: string): void;
}

function TimeInput({control, setTimeValue}: DateInputProps) {
  const {translation} = useTranslation();
  const timePickerRef = useRef<any>(null);
  const [timePickerIsVisible, setTimePickerIsVisible] = useState(false);

  return (
    <>
      <TextInput
        control={control}
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
          setTimeValue(String(time));
          setTimePickerIsVisible(false);
        }}
        is24Hour
        onCancel={() => setTimePickerIsVisible(false)}
      />
    </>
  );
}

export default TimeInput;
