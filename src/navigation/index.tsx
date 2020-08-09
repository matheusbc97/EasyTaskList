import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {lighten, shade} from 'polished';

import {LoadingIndicator} from '@shared/components';
import {
  UnauthenticatedStackParams,
  BottomNavigatorStackParams,
  AuthenticatedStackParams,
} from './types';
import {selectIsLogged, selectAppTheme} from '../store/configs';

import Login from '../pages/account/Login';
import Home from '../pages/logged-screens/Home';
import Welcome from '../pages/account/Welcome';
import RegisterForm from '../pages/account/RegisterForm';
import TaskList from '../pages/logged-screens/TaskList';
import ChooseUserConfigurations from '../pages/account/ChooseUserConfigurations';
import More from '../pages/logged-screens/More';
import Statistics from '../pages/logged-screens/Statistics';
import Calendar from '../pages/logged-screens/Calendar';
import CategorySearch from '../pages/logged-screens/CategorySearch';

import BottonTabNavigator from './BottonTabNavigator';
import TaskForm from '../pages/logged-screens/TaskForm';
import {verifyIfUserIsLogged} from '@store/account/user/thunkActions';

const Tab = createBottomTabNavigator<BottomNavigatorStackParams>();

function MyTabs() {
  const appTheme = useSelector(selectAppTheme);

  return (
    <Tab.Navigator
      tabBar={(props) => <BottonTabNavigator {...props} />}
      tabBarOptions={{
        activeBackgroundColor: appTheme.primaryColor,
        inactiveBackgroundColor: appTheme.primaryColor,
        inactiveTintColor: appTheme.dark
          ? lighten(0.3, appTheme.primaryColor)
          : shade(0.5, appTheme.primaryColor),
        activeTintColor: '#FAFAFA',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Início',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TaskList"
        component={TaskList}
        options={{
          title: 'Tarefas',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="tasks" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          title: 'Calendário',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="calendar" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          title: 'Estatísticas',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="chart-bar" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          title: 'Mais',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="bars" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const UnauthenticatedStack = createStackNavigator<UnauthenticatedStackParams>();
const AuthenticatedStack = createStackNavigator<AuthenticatedStackParams>();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const isLogged = useSelector(selectIsLogged);

  useEffect(() => {
    dispatch(verifyIfUserIsLogged()).then(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      {isLogged ? (
        <AuthenticatedStack.Navigator headerMode="none">
          <AuthenticatedStack.Screen
            name="BottomNavigation"
            component={MyTabs}
          />
          <AuthenticatedStack.Screen name="TaskForm" component={TaskForm} />
          <AuthenticatedStack.Screen
            name="CategorySearch"
            component={CategorySearch}
          />
        </AuthenticatedStack.Navigator>
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
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            name="RegisterForm"
            component={RegisterForm}
          />
          <UnauthenticatedStack.Screen
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            name="ChooseUserConfigurations"
            component={ChooseUserConfigurations}
          />
        </UnauthenticatedStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
