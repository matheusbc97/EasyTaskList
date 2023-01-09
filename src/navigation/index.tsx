import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useSelector} from 'react-redux';

import {selectIsLogged} from '@/store/configs';

import AuthenticatedStackNavigator from './navigators/AuthenticatedStackNavigator';
import UnauthenticatedStackNavigator from './navigators/UnauthenticatedStackNavigator';

const AppNavigator = () => {
  const isLogged = useSelector(selectIsLogged);

  return (
    <NavigationContainer>
      {isLogged ? (
        <AuthenticatedStackNavigator />
      ) : (
        <UnauthenticatedStackNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
