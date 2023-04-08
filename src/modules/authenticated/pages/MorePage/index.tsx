import React from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ScreenWrapper, Text, NavigateButton} from '@/modules/shared/components';
import {AuthenticatedStackParams} from '@/modules/core/navigation/types';
import {useTranslation} from '@/modules/shared/hooks';
import {useDispatch} from 'react-redux';
import {setIsLogged} from '@/store/configs';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'BottomNavigation'>;
  route: RouteProp<AuthenticatedStackParams, 'BottomNavigation'>;
}

export default function MorePage({navigation}: Props) {
  const {translation} = useTranslation();
  const dispatch = useDispatch();

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
        title={translation('STOPWATCH')}
        iconName="stopwatch"
        type="FontAwesome5"
        onPress={() => navigation.navigate('Stopwatch')}
      />
      <NavigateButton
        title={translation('TIMER')}
        iconName="clock"
        type="FontAwesome5"
        onPress={() => navigation.navigate('Timer')}
      />
      <NavigateButton
        title={translation('TIMER')}
        iconName="book"
        type="FontAwesome5"
        onPress={() => navigation.navigate('Storybook')}
      />
      <NavigateButton
        title={translation('ABOUT')}
        iconName="info-circle"
        type="FontAwesome5"
        onPress={() => navigation.navigate('About')}
      />
      <NavigateButton
        title={translation('LOG_OUT')}
        iconName="sign-out"
        type="FontAwesome"
        onPress={() => dispatch(setIsLogged(false))}
      />
    </ScreenWrapper>
  );
}
