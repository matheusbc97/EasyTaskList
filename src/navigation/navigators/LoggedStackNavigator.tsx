import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import CategorySearchPage from '@/pages/CategorySearchPage';
import CategoryDetailsPage from '@/pages/CategoryDetailsPage';
import ChangeNameFormPage from '@/pages/ChangeNameFormPage';
import ChangeThemeFormPage from '@/pages/ChangeThemeFormPage';
import ChangeAvatarPage from '@/pages/ChangeAvatarPage';
import AboutPage from '@/pages/AboutPage';
import CreateTaskFormPage from '@/pages/CreateTaskFormPage';
import UpdateTaskFormPage from '@/pages/UpdateTaskFormPage';
import CreateCategoryForm from '@/pages/CreateCategoryFormPage';
import UpdateCategoryFormPage from '@/pages/UpdateCategoryFormPage';
import TaskDetails from '@/pages/TaskDetailsPage';

import {AuthenticatedStackParams} from '../types';
import {BottomTabsNavigator} from './BottomTabsNavigator';
import TimerPage from '@/pages/TimerPage';
import StopwatchPage from '@/pages/StopwatchPage';

const AuthenticatedStack = createStackNavigator<AuthenticatedStackParams>();

function AuthenticatedStackNavigator() {
  return (
    <AuthenticatedStack.Navigator screenOptions={{headerShown: false}}>
      <AuthenticatedStack.Screen
        name="BottomNavigation"
        component={BottomTabsNavigator}
      />
      <AuthenticatedStack.Screen
        name="CreateTaskForm"
        component={CreateTaskFormPage}
      />
      <AuthenticatedStack.Screen
        name="UpdateTaskForm"
        component={UpdateTaskFormPage}
        initialParams={{}}
      />
      <AuthenticatedStack.Screen
        name="CategorySearch"
        component={CategorySearchPage}
      />
      <AuthenticatedStack.Screen name="About" component={AboutPage} />
      <AuthenticatedStack.Screen
        name="CreateCategoryForm"
        component={CreateCategoryForm}
      />
      <AuthenticatedStack.Screen
        name="UpdateCategoryForm"
        component={UpdateCategoryFormPage}
      />
      <AuthenticatedStack.Screen
        name="CategoryDetails"
        component={CategoryDetailsPage}
      />
      <AuthenticatedStack.Screen
        name="ChangeNameForm"
        component={ChangeNameFormPage}
      />
      <AuthenticatedStack.Screen
        name="ChangeThemeForm"
        component={ChangeThemeFormPage}
      />
      <AuthenticatedStack.Screen
        name="ChangeAvatar"
        component={ChangeAvatarPage}
      />
      <AuthenticatedStack.Screen name="TaskDetails" component={TaskDetails} />
      <AuthenticatedStack.Screen name="Timer" component={TimerPage} />
      <AuthenticatedStack.Screen name="Stopwatch" component={StopwatchPage} />
    </AuthenticatedStack.Navigator>
  );
}

export default AuthenticatedStackNavigator;
