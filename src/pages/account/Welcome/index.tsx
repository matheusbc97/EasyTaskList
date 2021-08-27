import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Text, ScreenWrapper, RoundedButton} from '@shared/components';
import {welcomeBackground} from '@assets/images';
import {UnauthenticatedStackParams} from '@navigation/types';
import {useTranslation} from '@/shared/hooks';

import styles from './styles';

type WelcomeNavigationProp = StackNavigationProp<
  UnauthenticatedStackParams,
  'Welcome'
>;
interface Props {
  navigation: WelcomeNavigationProp;
}

const Welcome = ({navigation}: Props) => {
  const {translation} = useTranslation();

  return (
    <ScreenWrapper style={styles.screen}>
      <ImageBackground
        source={welcomeBackground}
        imageStyle={styles.imageBackgroundImage}
        style={styles.imageBackground}>
        <Text style={[styles.textColor, styles.appName]}>
          {translation('EASY_TASK_LIST')}
        </Text>
        <View style={styles.body}>
          <Text type="title-big" style={[styles.textColor]}>
            {translation('WELCOME')}
          </Text>
          <Text type="subtitle" style={[styles.textColor, styles.subtitle]}>
            {translation('ENTER_WITH_YOUR_ACCOUNT')}
          </Text>
          <View style={styles.separator} />
        </View>
        <View style={styles.actionsContainer}>
          <RoundedButton
            onPress={() => navigation.navigate('Login')}
            text={translation('LOG_IN').toUpperCase()}
            style={styles.button}
            textStyle={styles.buttonText}
          />
          <Text style={[styles.textColor, styles.notHaveAccountText]}>
            {translation('QUESTION_DO_NOT_HAVE_AN_ACCOUNT')}{' '}
            {translation('REGISTER_BELOW')}
          </Text>
          <RoundedButton
            onPress={() => navigation.navigate('RegisterForm')}
            text={translation('CREATE_ACCOUNT').toUpperCase()}
            style={styles.buttonInverted}
            textStyle={styles.buttonInvertedText}
          />
        </View>
      </ImageBackground>
    </ScreenWrapper>
  );
};

export default Welcome;
