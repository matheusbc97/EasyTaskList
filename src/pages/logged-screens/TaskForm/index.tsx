import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useSelector, useDispatch} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {selectAppTheme} from '@store/configs';
import {AuthenticatedStackParams} from '@navigation/types';

import {
  ScreenWrapper,
  UnformInput as TextInput,
  RoudedButton,
  AnimatedBackground,
  Text,
} from '@shared/components';

import styles from './styles';
import {RouteProp} from '@react-navigation/native';
import {createTask} from '@store/tasks';

interface FormData {
  title: string;
  description: string;
  date: string;
  category: string;
}

interface Props {
  route: RouteProp<AuthenticatedStackParams, 'TaskForm'>;
  navigation: StackNavigationProp<AuthenticatedStackParams, 'TaskForm'>;
}

const TaskForm: React.FC<Props> = ({navigation, route}) => {
  const {chosenCategory} = route.params;
  const formRef = useRef<FormHandles>(null);
  const datePickerRef = useRef<any>(null);
  const timePickerRef = useRef<any>(null);
  const categorySearchPickerRef = useRef<any>(null);

  const dispatch = useDispatch();

  const appTheme = useSelector(selectAppTheme);
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [timePickerIsVisible, setTimePickerIsVisible] = useState(false);

  const handleFormSubmit = useCallback(
    (form: FormData) => {
      if (!chosenCategory) {
        return;
      }

      const newTask = {
        title: form.title,
        category: chosenCategory,
        date: form.date,
        description: form.description,
      };

      dispatch(createTask(newTask)).then((action) => {
        if (action.payload) {
          navigation.pop();
        }
      });
    },
    [chosenCategory, dispatch, navigation],
  );

  useEffect(() => {
    if (chosenCategory) {
      categorySearchPickerRef.current?.setValue(chosenCategory.name);
    }
  }, [chosenCategory]);

  return (
    <ScreenWrapper>
      <AnimatedBackground>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <MaterialIcon
                name="arrow-back"
                size={30}
                color={appTheme.primaryColor}
              />
              <View style={styles.titleWrapper}>
                <Text
                  type="title-big"
                  style={[
                    {
                      color: appTheme.primaryColor,
                    },
                    styles.title,
                  ]}>
                  Criar Tarefa
                </Text>
              </View>
            </View>
            <Form onSubmit={handleFormSubmit} ref={formRef}>
              <TextInput
                name="title"
                label="Título"
                onSubmitEditing={() =>
                  formRef.current?.getFieldRef('description').focus()
                }
              />
              <TextInput name="description" label="Descrição" />
              <TextInput
                ref={datePickerRef}
                name="date"
                label="Data"
                button
                onPress={() => setDatePickerIsVisible(true)}
              />
              <TextInput
                ref={timePickerRef}
                name="hour"
                label="Horário"
                button
                onPress={() => setTimePickerIsVisible(true)}
              />
              <TextInput
                ref={categorySearchPickerRef}
                name="category"
                label="Categoria"
                button
                onPress={() => navigation.navigate('CategorySearch')}
              />
            </Form>
            <View style={styles.footer}>
              <RoudedButton
                text="Voltar"
                inverted
                style={styles.backButton}
                onPress={() => navigation.pop()}
              />
              <RoudedButton
                text="Salvar"
                style={styles.saveButton}
                onPress={() => formRef.current?.submitForm()}
              />
            </View>
          </View>
        </View>
      </AnimatedBackground>
      <DateTimePickerModal
        isVisible={datePickerIsVisible}
        mode="date"
        onConfirm={(date) => {
          datePickerRef.current?.setValue(String(date));
          setDatePickerIsVisible(false);
        }}
        onCancel={() => setDatePickerIsVisible(false)}
      />
      <DateTimePickerModal
        isVisible={timePickerIsVisible}
        mode="time"
        onConfirm={(time) => {
          timePickerRef.current?.setValue(String(time));
          setTimePickerIsVisible(false);
        }}
        onCancel={() => setTimePickerIsVisible(false)}
      />
    </ScreenWrapper>
  );
};

export default TaskForm;
