import React, {useState} from 'react';
import {View} from 'react-native';
import {Form} from '@unform/mobile';
import {useSelector} from 'react-redux';
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

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'TaskForm'>;
}

const TaskForm: React.FC<Props> = ({navigation}) => {
  const appTheme = useSelector(selectAppTheme);
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [timePickerIsVisible, setTimePickerIsVisible] = useState(false);

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
            <Form onSubmit={() => {}}>
              <TextInput name="name" label="Nome" />
              <TextInput name="name" label="Descrição" />
              <TextInput
                name="date"
                label="Data"
                button
                onPress={() => setDatePickerIsVisible(true)}
              />
              <TextInput
                name="hour"
                label="Horário"
                button
                onPress={() => setTimePickerIsVisible(true)}
              />
              <TextInput
                name="category"
                label="Categoria"
                button
                onPress={() => {}}
              />
            </Form>
            <View style={styles.footer}>
              <RoudedButton
                text="Voltar"
                inverted
                style={styles.backButton}
                onPress={() => navigation.pop()}
              />
              <RoudedButton text="Salvar" style={styles.saveButton} />
            </View>
          </View>
        </View>
      </AnimatedBackground>
      <DateTimePickerModal
        isVisible={datePickerIsVisible}
        mode="date"
        onConfirm={(date) => {
          console.log('selected date', date);
          setDatePickerIsVisible(false);
        }}
        onCancel={() => setDatePickerIsVisible(false)}
      />
      <DateTimePickerModal
        isVisible={timePickerIsVisible}
        mode="time"
        onConfirm={(time) => {
          console.log('selected time', time);
          setTimePickerIsVisible(false);
        }}
        onCancel={() => setTimePickerIsVisible(false)}
      />
    </ScreenWrapper>
  );
};

export default TaskForm;
