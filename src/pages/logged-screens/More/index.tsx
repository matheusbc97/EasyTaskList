import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import {ScreenWrapper, Text} from '@shared/components';
import {setIsLogged} from '@store/configs';
import {resetUser} from '@store/account/user';

import OptionButton from './OptionButton';

export default function More() {
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
      <OptionButton title="Alterar foto de perfil" iconName="camera" />
      <OptionButton title="Alterar Nome" iconName="pencil" />
      <OptionButton
        title="Alterar Tema"
        iconName="palette"
        type="FontAwesome5"
      />
      {/* <OptionButton title="Avalie-nos" iconName="star" />*/}
      {/* <OptionButton title="Sobre" iconName="info-circle" type="FontAwesome5" /> */}
      <OptionButton title="Sair" iconName="sign-out" onPress={handleSignOut} />
    </ScreenWrapper>
  );
}
