import React, {useState} from 'react';
import {View} from 'react-native';
import {Form} from '@unform/mobile';
import {useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {selectAppTheme} from '../../../store/configs';

import {
  ScreenWrapper,
  UnformInput as TextInput,
  Header,
  RoudedButton,
} from '../../../library/components';

export default function TaskForm() {
  const appTheme = useSelector(selectAppTheme);
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [timePickerIsVisible, setTimePickerIsVisible] = useState(false);

  return (
    <ScreenWrapper style={{backgroundColor: 'transparent'}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: appTheme.secondaryColor}} />
        <View style={{flex: 1, backgroundColor: appTheme.primaryColor}} />
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        <Header
          title="Criar Tarefa"
          textStyle={
            {
              //color: appTheme.primaryColor,
            }
          }
          style={{
            marginHorizontal: 5,
          }}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              paddingVertical: 15,
              backgroundColor: '#FFF',
              marginHorizontal: 10,
              paddingHorizontal: 10,
              borderRadius: 30,
              elevation: 3,
            }}>
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
            <RoudedButton text="Salvar" style={{alignSelf: 'center'}} />
          </View>
        </View>
      </View>
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
}
