import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {
  UnauthenticatedStackParams,
  RootStackParams,
  HomeStackParams,
} from './types';
import colors from '../assets/colors';
import {selectUser} from '../store/account/user';

import Login from '../pages/account/Login';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';
import RegisterForm from '../pages/RegisterForm';

const UnauthenticatedStack = createStackNavigator<UnauthenticatedStackParams>();
const RootStack = createStackNavigator<RootStackParams>();
const HomeStack = createStackNavigator<HomeStackParams>();

const headerStyle = {
  headerStyle: {
    backgroundColor: colors.red2,
  },
  headerTintColor: 'white',
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          ...headerStyle,
          title: 'Início',
        }}
        component={Home}
        name="Home"
      />
    </HomeStack.Navigator>
  );
};

const App = () => {
  const user = useSelector(selectUser);

  return (
    <NavigationContainer>
      {user ? (
        <HomeStack.Navigator>
          <HomeStack.Screen
            options={{
              ...headerStyle,
              title: 'Início',
            }}
            component={Home}
            name="Home"
          />
        </HomeStack.Navigator>
      ) : (
        <UnauthenticatedStack.Navigator>
          <UnauthenticatedStack.Screen
            options={{
              headerShown: false,
            }}
            name="Welcome"
            component={Welcome}
          />
          <UnauthenticatedStack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
          <UnauthenticatedStack.Screen
            options={{
              headerShown: false,
            }}
            name="RegisterForm"
            component={RegisterForm}
          />
        </UnauthenticatedStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
