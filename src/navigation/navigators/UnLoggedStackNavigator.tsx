import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import WelcomePage from '@/pages/WelcomePage';
import ChooseUserConfigurationsPage from '@/pages/ChooseUserConfigurationsPage';

type UnauthenticatedStackParams = {
  Home: undefined;
  ChooseUserConfigurations: undefined;
  Welcome: undefined;
};

const UnauthenticatedStack = createStackNavigator<UnauthenticatedStackParams>();

const App = () => {
  return (
    <UnauthenticatedStack.Navigator>
      <UnauthenticatedStack.Screen name="Welcome" component={WelcomePage} />
      <UnauthenticatedStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="ChooseUserConfigurations"
        component={ChooseUserConfigurationsPage}
      />
    </UnauthenticatedStack.Navigator>
  );
};

export default App;
