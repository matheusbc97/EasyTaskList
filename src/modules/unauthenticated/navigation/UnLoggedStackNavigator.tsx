import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import WelcomePage from '@/modules/unauthenticated/pages/WelcomePage';
import ChooseUserConfigurationsPage from '@/modules/unauthenticated/pages/ChooseUserConfigurationsPage';
import {UserPreppingProvider} from '../pages/ChooseUserConfigurationsPage/store';

type UnauthenticatedStackParams = {
  Home: undefined;
  ChooseUserConfigurations: undefined;
  Welcome: undefined;
};

const UnauthenticatedStack = createStackNavigator<UnauthenticatedStackParams>();

function App() {
  return (
    <UserPreppingProvider>
      <UnauthenticatedStack.Navigator screenOptions={{headerShown: false}}>
        <UnauthenticatedStack.Screen name="Welcome" component={WelcomePage} />
        <UnauthenticatedStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="ChooseUserConfigurations"
          component={ChooseUserConfigurationsPage}
        />
      </UnauthenticatedStack.Navigator>
    </UserPreppingProvider>
  );
}

export default App;
