import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Text, ScreenWrapper, RoudedButton} from '@shared/components';
import {welcomeBackground} from '@assets/images';
import {UnauthenticatedStackParams} from '@navigation/types';

import styles from './styles';

type WelcomeNavigationProp = StackNavigationProp<
  UnauthenticatedStackParams,
  'Welcome'
>;
interface Props {
  navigation: WelcomeNavigationProp;
}

const Welcome = ({navigation}: Props) => {
  return (
    <ScreenWrapper style={styles.screen}>
      <ImageBackground
        source={welcomeBackground}
        imageStyle={styles.imageBackgroundImage}
        style={styles.imageBackground}>
        <Text style={[styles.textColor, styles.appName]}>MinhaAgenda</Text>
        <View style={styles.body}>
          <Text type="title-big" style={[styles.textColor]}>
            Seja Bem Vindo!
          </Text>
          <Text type="subtitle" style={[styles.textColor, styles.subtitle]}>
            Entre com a sua conta para acessar o aplicativo
          </Text>
          <View style={styles.separator} />
        </View>
        <View style={styles.actionsContainer}>
          <RoudedButton
            onPress={() => navigation.navigate('Login')}
            text="ENTRAR"
            style={styles.button}
            textStyle={styles.buttonText}
          />
          <Text style={[styles.textColor, styles.notHaveAccountText]}>
            Não Possui conta? Registre-se abaixo,
          </Text>
          <RoudedButton
            onPress={() => navigation.navigate('RegisterForm')}
            text="CRIAR CONTA"
            style={styles.buttonInverted}
            textStyle={styles.buttonInvertedText}
          />
        </View>
      </ImageBackground>
    </ScreenWrapper>
  );
};

export default Welcome;
