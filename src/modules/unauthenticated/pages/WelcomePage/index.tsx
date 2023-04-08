import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Text, ScreenWrapper, RoundedButton} from '@/modules/shared/components';
import {welcomeBackground} from '@/assets/images';
import {AuthenticatedStackParams} from '@/modules/core/navigation/types';
import {useTranslation} from '@/modules/shared/hooks';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

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
    <ScreenWrapper
      style={styles.screen}
      testID={TEST_IDS.WELCOME_SCREEN_WRAPPER}>
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
            testID={TEST_IDS.CREATE_NEW_USER_BUTTON}
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
