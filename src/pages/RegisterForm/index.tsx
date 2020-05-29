import React, {useRef, useState, useMemo, useEffect} from 'react';
import {View, Animated, Image, ScrollView, ImageBackground} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import LinearGradient from 'react-native-linear-gradient';
import {Checkbox, TouchableRipple} from 'react-native-paper';
import {useDimensions} from '@react-native-community/hooks';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';

import TextInput from './UnformInput';
import useValidateField from '../../library/hooks/useValidateField';
import {ScreenWrapper, RoudedButton, Text} from '../../library/components';
import {
  GEAR,
  PERSON_SEATED,
  GRAPH,
  CHECKED,
  PIZZA_GRAPH,
  ADVANCE_BTN,
} from '../../assets/images';
import {UnauthenticatedStackParams} from '../../navigation/types';

import styles from './styles';

type ChooseUserConfigurationsNavigationProp = StackNavigationProp<
  UnauthenticatedStackParams,
  'ChooseUserConfigurations'
>;

interface Props {
  navigation: ChooseUserConfigurationsNavigationProp;
}

const RegisterForm: React.FC<Props> = ({navigation}) => {
  const formRef = useRef<FormHandles>(null);
  const validateField = useValidateField(formRef);
  const [privacyPolicyIsChecked, setPrivacyPolicyIsChecked] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const width = useDimensions().window.width;
  const backgroundWidth = useMemo(() => new Animated.Value(width + 80), [
    width,
  ]);

  const confirmButtonWidth = useMemo(() => new Animated.Value(200), []);
  const avanceButtonRight = useMemo(() => new Animated.Value(-100), []);

  const AnimatedLinearGradient = useMemo(
    () => Animated.createAnimatedComponent(LinearGradient),
    [],
  );

  useEffect(() => {
    Animated.timing(backgroundWidth, {
      toValue: 0,
      useNativeDriver: false,
      duration: 350,
      delay: 350,
    }).start();
  }, [backgroundWidth]);

  useEffect(() => {
    if (isConfirmed) {
      Animated.timing(confirmButtonWidth, {
        toValue: 33,
        useNativeDriver: false,
        duration: 350,
      }).start(() =>
        Animated.spring(avanceButtonRight, {
          toValue: 40,
          useNativeDriver: false,
          bounciness: 14,
        }).start(),
      );
    }
  }, [isConfirmed, confirmButtonWidth, avanceButtonRight]);

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <AnimatedLinearGradient
          style={[styles.background, {right: backgroundWidth}]}
          colors={['#66F6A9', '#1FB7C8']}>
          <View style={[styles.container]}>
            <Image
              source={PERSON_SEATED}
              style={{alignSelf: 'center', zIndex: 4}}
            />
            <Image source={CHECKED} style={styles.checkedImage} />
            <Image source={PIZZA_GRAPH} style={styles.pizzaGraphImage} />

            <View style={styles.content}>
              <Text type="title" style={styles.title}>
                Crie Sua Conta de Usuário
              </Text>
              <View style={styles.formWrapper}>
                <Form
                  ref={formRef}
                  onSubmit={(form) => {
                    console.log('form', form);
                  }}>
                  <TextInput
                    label="Nome"
                    name="name"
                    validateField={validateField}
                  />
                  <TextInput
                    label="Email"
                    name="email"
                    validateField={validateField}
                  />
                  <TextInput
                    label="Senha"
                    name="newPassword"
                    validateField={validateField}
                  />
                  <TextInput
                    label="Confirmar Senha"
                    name="confirmPassword"
                    validateField={validateField}
                  />
                </Form>
              </View>
              <View style={styles.checkBoxItem}>
                <Checkbox
                  status={privacyPolicyIsChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setPrivacyPolicyIsChecked(!privacyPolicyIsChecked);
                  }}
                />
                <Text style={styles.checkBoxText}>
                  Li e concordo com a política de privacidade
                </Text>
              </View>
              <View style={styles.footer}>
                <Animated.View style={{width: confirmButtonWidth}}>
                  <RoudedButton
                    style={{width: '100%'}}
                    text={isConfirmed ? '' : 'CONFIRMAR'}
                    inverted
                    icon={isConfirmed ? 'check' : ''}
                    onPress={() => setIsConfirmed(true)}
                  />
                </Animated.View>
                <Text style={styles.alreadyHaveAccountText}>
                  Já possui uma conta? Conecte-se aqui.
                </Text>
              </View>
            </View>
          </View>
          <Image source={GEAR} style={styles.gearImage} />
          <Image source={GRAPH} style={styles.graphImage} />
          <Animated.View
            style={{
              position: 'absolute',
              bottom: -20,
              right: avanceButtonRight,
            }}>
            <TouchableRipple
              onPress={() => navigation.navigate('ChooseUserConfigurations')}>
              <ImageBackground
                source={ADVANCE_BTN}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 150,
                  height: 150,
                  paddingTop: 52,
                }}>
                <Text type="title" style={{paddingLeft: 20, color: '#1fb7c8'}}>
                  AVANÇAR
                </Text>
                <MaterialIcon
                  name="keyboard-arrow-right"
                  size={40}
                  style={{marginLeft: -8, color: '#1fb7c8'}}
                />
              </ImageBackground>
            </TouchableRipple>
          </Animated.View>
        </AnimatedLinearGradient>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default RegisterForm;
