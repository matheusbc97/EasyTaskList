import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import Welcome from '@/pages/Welcome';
import ChooseUserConfigurations from '@pages/ChooseUserConfigurations';

type UnauthenticatedStackParams = {
  Home: undefined;
  ChooseUserConfigurations: undefined;
  Welcome: undefined;
};

const UnauthenticatedStack = createStackNavigator<UnauthenticatedStackParams>();

const App = () => {
  return (
    <UnauthenticatedStack.Navigator>
      <UnauthenticatedStack.Screen name="Welcome" component={Welcome} />
      <UnauthenticatedStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="ChooseUserConfigurations"
        component={ChooseUserConfigurations}
      />
    </UnauthenticatedStack.Navigator>
  );
};

export default App;
