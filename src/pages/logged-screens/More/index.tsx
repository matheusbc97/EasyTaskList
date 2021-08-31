import React from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ScreenWrapper, Text} from '@shared/components';
import {AuthenticatedStackParams} from '@navigation/types';
import {useTranslation} from '@/shared/hooks';
import useSignOut from '@/hooks/useSignOut';

import OptionButton from './OptionButton';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'ChangeNameForm'>;
  route: RouteProp<AuthenticatedStackParams, 'ChangeNameForm'>;
}

export default function More({navigation}: Props) {
  const {translation} = useTranslation();
  const signOut = useSignOut();

  return (
    <ScreenWrapper>
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        <Text type="title-big">{translation('MORE_OPTIONS')}</Text>
      </View>
      <OptionButton
        title={translation('CHANGE_AVATAR')}
        iconName="user-tie"
        type="FontAwesome5"
        onPress={() => navigation.navigate('ChangeAvatar')}
      />
      <OptionButton
        title={translation('CHANGE_NAME')}
        iconName="pencil"
        onPress={() => navigation.navigate('ChangeNameForm')}
      />
      <OptionButton
        title={translation('CHANGE_THEME')}
        iconName="palette"
        type="FontAwesome5"
        onPress={() => navigation.navigate('ChangeThemeForm')}
      />
      <OptionButton
        title={translation('CHANGE_PASSWORD')}
        iconName="key"
        type="FontAwesome5"
        onPress={() => navigation.navigate('ChangePasswordForm')}
      />
      <OptionButton
        title={translation('ABOUT')}
        iconName="info-circle"
        type="FontAwesome5"
        onPress={() => navigation.navigate('About')}
      />
      <OptionButton
        title={translation('LOG_OUT')}
        iconName="sign-out"
        onPress={signOut}
      />
    </ScreenWrapper>
  );
}
