import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {ScreenWrapper, Text} from '@shared/components';
import {selectAppTheme} from '@store/configs';

interface OptionsProps {
  title: string;
  iconName: string;
}

const Option: React.FC<OptionsProps> = ({title, iconName}) => {
  const appTheme = useSelector(selectAppTheme);

  return (
    <View
      style={{
        paddingVertical: 5,
        backgroundColor: appTheme.aboveBackground,
        elevation: 3,
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 10,
      }}>
      <FontAwesomeIcon
        color={appTheme.textColor}
        name={iconName}
        size={18}
        style={{paddingHorizontal: 5}}
      />
      <Text style={{marginHorizontal: 10, flex: 1}}>{title}</Text>
      <MaterialIcon name="keyboard-arrow-right" size={30} />
    </View>
  );
};

export default function More() {
  return (
    <ScreenWrapper>
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        <Text type="title-big">Mais Opções</Text>
      </View>
      <Option title="Notificações" iconName="bell" />
      <Option title="Alterar foto de perfil" iconName="camera" />
      <Option title="Alterar Nome" iconName="pencil" />
      <Option title="Avalie-nos" iconName="star" />
      <Option title="Sobre" iconName="info-circle" />
      <Option title="Sair" iconName="sign-out" />
    </ScreenWrapper>
  );
}
