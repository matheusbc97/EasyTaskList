import React from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ScreenWrapper, Text, NavigateButton} from '@/shared/components';
import {AuthenticatedStackParams} from '@/navigation/types';
import {useTranslation} from '@/shared/hooks';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'BottomNavigation'>;
  route: RouteProp<AuthenticatedStackParams, 'BottomNavigation'>;
}

export default function MorePage({navigation}: Props) {
  const {translation} = useTranslation();

  return (
    <ScreenWrapper>
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        <Text type="title-big">{translation('MORE_OPTIONS')}</Text>
      </View>
      <NavigateButton
        title={translation('CHANGE_AVATAR')}
        iconName="user-tie"
        type="FontAwesome5"
        onPress={() => navigation.navigate('ChangeAvatar')}
      />
      <NavigateButton
        title={translation('CHANGE_NAME')}
        iconName="pencil"
        onPress={() => navigation.navigate('ChangeNameForm')}
      />
      <NavigateButton
        title={translation('CHANGE_THEME')}
        iconName="palette"
        type="FontAwesome5"
        onPress={() => navigation.navigate('ChangeThemeForm')}
      />
      <NavigateButton
        title={translation('ABOUT')}
        iconName="info-circle"
        type="FontAwesome5"
        onPress={() => navigation.navigate('About')}
      />
    </ScreenWrapper>
  );
}
