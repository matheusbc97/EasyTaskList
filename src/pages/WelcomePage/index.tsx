import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Text, ScreenWrapper, RoundedButton} from '@/shared/components';
import {welcomeBackground} from '@/assets/images';
import {AuthenticatedStackParams} from '@/navigation/types';
import {useTranslation} from '@/shared/hooks';

import styles from './styles';

type WelcomeNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'Welcome'
>;
interface Props {
  navigation: WelcomeNavigationProp;
}

function WelcomePage({navigation}: Props) {
  const {translation} = useTranslation();

  return (
    <ScreenWrapper style={styles.screen} testID="WelcomeScreenWrapper">
      <ImageBackground
        source={welcomeBackground}
        imageStyle={styles.imageBackgroundImage}
        style={styles.imageBackground}>
        <Text style={[styles.textColor, styles.appName]}>
          {translation('EASY_TASK_LIST')}
        </Text>
        <View style={styles.body}>
          <Text type="title-big" style={styles.textColor}>
            {translation('WELCOME')}
          </Text>
          <Text type="subtitle" style={[styles.textColor, styles.subtitle]}>
            {translation('WELCOME_INSTRUCTIONS')}
          </Text>
          <View style={styles.separator} />
        </View>
        <View style={styles.actionsContainer}>
          <RoundedButton
            testID="CreateNewUserButton"
            onPress={() => navigation.navigate('ChooseUserConfigurations')}
            text={translation('CREATE_NEW_USER').toUpperCase()}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </ImageBackground>
    </ScreenWrapper>
  );
}

export default WelcomePage;
