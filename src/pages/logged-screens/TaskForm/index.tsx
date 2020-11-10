import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
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
  RoundedButton,
  AnimatedBackground,
  Text,
} from '@shared/components';

import styles from './styles';
import {RouteProp} from '@react-navigation/native';
import {createTask} from '@store/tasks';
import {useFormatDate} from '@shared/hooks';
import {updateTask} from '@store/tasks/thunkActions';

interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
}

interface Props {
  route: RouteProp<AuthenticatedStackParams, 'TaskForm'>;
  navigation: StackNavigationProp<AuthenticatedStackParams, 'TaskForm'>;
}

const TaskForm: React.FC<Props> = ({navigation, route}) => {
  const {chosenCategory, task} = route.params;

  const initialData = useMemo<undefined | FormData>(() => {
    if (!task) {
      return undefined;
    }

    const _initialData: FormData = {
      title: task.title,
      category: task.category!.name,
      date: task.date,
      time: task.date,
      description: task.description,
    };

    return _initialData;
  }, [task]);

  const formRef = useRef<FormHandles>(null);
  const datePickerRef = useRef<any>(null);
  const timePickerRef = useRef<any>(null);
  const categorySearchPickerRef = useRef<any>(null);

  const dispatch = useDispatch();

  const appTheme = useSelector(selectAppTheme);
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [timePickerIsVisible, setTimePickerIsVisible] = useState(false);

  const formatDate = useFormatDate();

  const getDateByDateAndTime = useCallback((date: string, time: string) => {
    const formTime = new Date(time);
    const formDate = new Date(date);

    return new Date(
      formDate.getFullYear(),
      formDate.getMonth(),
      formDate.getDate(),
      formTime.getHours(),
      formTime.getMinutes(),
    ).toString();
  }, []);

  const handleFormSubmit = useCallback(
    (form: FormData) => {
      if (!task) {
        if (!chosenCategory) {
          return;
        }

        const newTask = {
          title: form.title,
          category: chosenCategory,
          date: getDateByDateAndTime(form.date, form.time),
          description: form.description,
        };

        dispatch(createTask(newTask)).then((action) => {
          if (action.payload) {
            navigation.pop();
          }
        });

        return;
      }

      const updatedTask = {
        id: task.id,
        title: form.title,
        description: form.description,
        category: chosenCategory ? chosenCategory : task.category!,
        date: getDateByDateAndTime(form.date, form.time),
      };

      dispatch(updateTask(updatedTask)).then((action) => {
        if (action.payload) {
          navigation.pop();
        }
      });

      return;
    },
    [chosenCategory, dispatch, navigation, task, getDateByDateAndTime],
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
                  {!task ? 'Criar Tarefa' : 'Editar Tarefa'}
                </Text>
              </View>
            </View>
            <Form
              onSubmit={handleFormSubmit}
              ref={formRef}
              initialData={initialData}>
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
                mask={(value) => formatDate(value)}
                name="date"
                label="Data"
                button
                onPress={() => setDatePickerIsVisible(true)}
              />
              <TextInput
                ref={timePickerRef}
                name="time"
                label="Horário"
                mask={(value) => formatDate(value, 'time')}
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
              <RoundedButton
                text="Voltar"
                inverted
                style={styles.backButton}
                onPress={() => navigation.pop()}
              />
              <RoundedButton
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
        is24Hour
        onCancel={() => setTimePickerIsVisible(false)}
      />
    </ScreenWrapper>
  );
};

export default TaskForm;
