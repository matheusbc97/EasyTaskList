import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import {ScreenWrapper, Text} from '@shared/components';
import {setIsLogged} from '@store/configs';
import {resetUser} from '@store/account/user';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthenticatedStackParams} from '@navigation/types';

import OptionButton from './OptionButton';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'ChangeNameForm'>;
  route: RouteProp<AuthenticatedStackParams, 'ChangeNameForm'>;
}

export default function More({navigation}: Props) {
  const dispatch = useDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(resetUser());
    dispatch(setIsLogged(false));
  }, [dispatch]);

  return (
    <ScreenWrapper>
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        <Text type="title-big">Mais Opções</Text>
      </View>
      {/* <OptionButton
        title="Estatísticas"
        iconName="chart-bar"
        type="FontAwesome5"
      />*/}
      {/* <OptionButton title="Notificações" iconName="bell" /> */}
      <OptionButton
        title="Alterar Avatar"
        iconName="user-tie"
        type="FontAwesome5"
        onPress={() => navigation.navigate('ChangeAvatar')}
      />
      <OptionButton
        title="Alterar Nome"
        iconName="pencil"
        onPress={() => navigation.navigate('ChangeNameForm')}
      />
      <OptionButton
        title="Alterar Tema"
        iconName="palette"
        type="FontAwesome5"
        onPress={() => navigation.navigate('ChangeThemeForm')}
      />
      <OptionButton
        title="Alterar Senha"
        iconName="key"
        type="FontAwesome5"
        onPress={() => navigation.navigate('ChangePasswordForm')}
      />
      {/* <OptionButton title="Avalie-nos" iconName="star" />*/}
      {/* <OptionButton title="Sobre" iconName="info-circle" type="FontAwesome5" /> */}
      <OptionButton title="Sair" iconName="sign-out" onPress={handleSignOut} />
    </ScreenWrapper>
  );
}
