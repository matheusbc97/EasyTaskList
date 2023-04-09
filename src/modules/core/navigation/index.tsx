import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {selectIsLogged} from '@/store/configs';

import LoggedStackNavigator from '../../authenticated/navigators/LoggedStackNavigator';
import UnLoggedStackNavigator from '../../unauthenticated/navigation/UnLoggedStackNavigator';
import LoadInitialDataPage from '@/modules/shared/pages/LoadInitialDataPage';

const AppNavigator = () => {
  const isLogged = useSelector(selectIsLogged);

  return (
    <NavigationContainer>
      {isLogged === null && <LoadInitialDataPage />}
      {isLogged && <LoggedStackNavigator />}
      {isLogged === false && <UnLoggedStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
