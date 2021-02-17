import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
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

import Login from '@pages/account/Login';
import Home from '@pages/logged-screens/Home';
import Welcome from '@pages/account/Welcome';
import RegisterForm from '@pages/account/RegisterForm';
import TaskList from '@pages/logged-screens/TaskList';
import ChooseUserConfigurations from '@pages/account/ChooseUserConfigurations';
import More from '@pages/logged-screens/More';
//import Statistics from '@pages/logged-screens/Statistics';
//import Calendar from '@pages/logged-screens/Calendar';
import CategorySearch from '@pages/logged-screens/CategorySearch';
import CategoryList from '@pages/logged-screens/CategoryList';
import CategoryForm from '@pages/logged-screens/CategoryForm';
import CategoryDetails from '@pages/logged-screens/CategoryDetails';
import ChangeNameForm from '@pages/logged-screens/ChangeNameForm';
import ChangeThemeForm from '@pages/logged-screens/ChangeThemeForm';
import ChangeAvatar from '@pages/logged-screens/ChangeAvatar';
import ChangePasswordForm from '@pages/logged-screens/ChangePasswordForm';
import ForgotPasswordForm from '@pages/account/ForgotPasswordForm';
import PrivacyPolicy from '@pages/account/PrivacyPolicy';
import About from '@pages/logged-screens/About';

import BottonTabNavigator from './BottonTabNavigator';
import TaskForm from '@pages/logged-screens/TaskForm';
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
      {/*<Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          title: 'Calendário',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="calendar" size={22} color={color} />
          ),
        }}
      />*/}
      <Tab.Screen
        name="CategoryList"
        component={CategoryList}
        options={{
          title: 'Categorias',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="folder" size={22} color={color} />
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
          <AuthenticatedStack.Screen
            name="TaskForm"
            component={TaskForm}
            initialParams={{}}
          />
          <AuthenticatedStack.Screen
            name="CategorySearch"
            component={CategorySearch}
          />
          <AuthenticatedStack.Screen name="About" component={About} />
          <AuthenticatedStack.Screen
            name="CategoryForm"
            component={CategoryForm}
            initialParams={{}}
          />
          <AuthenticatedStack.Screen
            name="CategoryDetails"
            component={CategoryDetails}
          />
          <AuthenticatedStack.Screen
            name="ChangeNameForm"
            component={ChangeNameForm}
          />
          <AuthenticatedStack.Screen
            name="ChangeThemeForm"
            component={ChangeThemeForm}
          />
          <AuthenticatedStack.Screen
            name="ChangeAvatar"
            component={ChangeAvatar}
          />
          <AuthenticatedStack.Screen
            name="ChangePasswordForm"
            component={ChangePasswordForm}
          />
        </AuthenticatedStack.Navigator>
      ) : (
        <UnauthenticatedStack.Navigator headerMode="none">
          <UnauthenticatedStack.Screen name="Welcome" component={Welcome} />
          <UnauthenticatedStack.Screen name="Login" component={Login} />
          <UnauthenticatedStack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
          />
          <UnauthenticatedStack.Screen
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            name="RegisterForm"
            component={RegisterForm}
          />
          <UnauthenticatedStack.Screen
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            name="ChooseUserConfigurations"
            component={ChooseUserConfigurations}
          />
          <UnauthenticatedStack.Screen
            name="ForgotPasswordForm"
            component={ForgotPasswordForm}
          />
        </UnauthenticatedStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
