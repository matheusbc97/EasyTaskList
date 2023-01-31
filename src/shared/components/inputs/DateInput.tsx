import {useRef, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {useTranslation} from '@/shared/hooks';
import formatDate from '@/shared/utils/formatDate';
import {FormControl} from '@/shared/models';

import TextInput from './EnhancedInput';

interface DateInputProps {
  control: FormControl;
  setDateValue(value: string): void;
}

function DateInput({control, setDateValue}: DateInputProps) {
  const {translation} = useTranslation();
  const datePickerRef = useRef<any>(null);
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);

  return (
    <>
      <TextInput
        control={control}
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
          setDateValue(String(date));
          setDatePickerIsVisible(false);
        }}
        onCancel={() => setDatePickerIsVisible(false)}
      />
    </>
  );
}

export default DateInput;
