import React, {useState, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import formatDate from '@shared/utils/fomatDate';
import {
  ScreenWrapper,
  UnformInput as TextInput,
  RoundedButton,
  AnimatedBackground,
  Text,
} from '@shared/components';
import {useValidateField, useAppTheme, useTranslation} from '@shared/hooks';

import useHandleSubmit from './hooks/useHandleSubmit';
import getInitialData from './utils/getInitialData';
import styles from './styles';
import {Props} from './types';

const Wrapper: React.FC = ({children}) => {
  return (
    <AnimatedBackground>
      <View style={styles.container}>
        <View style={styles.content}>{children}</View>
      </View>
    </AnimatedBackground>
  );
};

const TaskForm: React.FC<Props> = ({navigation, route}) => {
  const {chosenCategory, task} = route.params ?? {
    chosenCategory: null,
    task: null,
  };

  const initialData = getInitialData(task);

  const formRef = useRef<FormHandles>(null);
  const datePickerRef = useRef<any>(null);
  const timePickerRef = useRef<any>(null);
  const categorySearchPickerRef = useRef<any>(null);

  const {translation} = useTranslation();
  const appTheme = useAppTheme();

  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [timePickerIsVisible, setTimePickerIsVisible] = useState(false);

  const validateField = useValidateField(formRef);

  const handleFormSubmit = useHandleSubmit({formRef, chosenCategory, task});

  useEffect(() => {
    if (chosenCategory) {
      categorySearchPickerRef.current?.setValue(chosenCategory.name);
    }
  }, [chosenCategory]);

  return (
    <ScreenWrapper>
      <Wrapper>
        <Text
          type="title-big"
          style={[
            {
              color: appTheme.primaryColor,
            },
            styles.title,
          ]}>
          {!task ? translation('CREATE_TASK') : translation('EDIT_TASK')}
        </Text>
        <Form
          onSubmit={handleFormSubmit}
          ref={formRef}
          initialData={initialData}>
          <TextInput
            name="title"
            label={translation('TITLE')}
            validateField={validateField}
            onSubmitEditing={() =>
              formRef.current?.getFieldRef('description').focus()
            }
          />
          <TextInput name="description" label={translation('DESCRIPTION')} />
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
          <TextInput
            ref={timePickerRef}
            name="time"
            label={translation('HOUR')}
            mask={value => formatDate(value, 'time')}
            button
            onPress={() => setTimePickerIsVisible(true)}
          />
          <TextInput
            ref={categorySearchPickerRef}
            name="category"
            label={translation('CATEGORY')}
            button
            onPress={() => navigation.navigate('CategorySearch')}
          />
        </Form>
        <View style={styles.footer}>
          <RoundedButton
            text={translation('GO_BACK')}
            inverted
            style={styles.backButton}
            onPress={() => navigation.pop()}
          />
          <RoundedButton
            text={translation('SAVE')}
            style={styles.saveButton}
            onPress={() => formRef.current?.submitForm()}
          />
        </View>
      </Wrapper>

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
    </ScreenWrapper>
  );
};

export default TaskForm;
