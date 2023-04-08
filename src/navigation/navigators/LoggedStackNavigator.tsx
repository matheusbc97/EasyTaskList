import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import CategorySearchPage from '@/pages/authenticated/CategorySearchPage';
import CategoryDetailsPage from '@/pages/authenticated/CategoryDetailsPage';
import ChangeNameFormPage from '@/pages/authenticated/ChangeNameFormPage';
import ChangeThemeFormPage from '@/pages/authenticated/ChangeThemeFormPage';
import ChangeAvatarPage from '@/pages/authenticated/ChangeAvatarPage';
import AboutPage from '@/pages/authenticated/AboutPage';
import CreateTaskFormPage from '@/pages/authenticated/CreateTaskFormPage';
import UpdateTaskFormPage from '@/pages/authenticated/UpdateTaskFormPage';
import CreateCategoryForm from '@/pages/authenticated/CreateCategoryFormPage';
import UpdateCategoryFormPage from '@/pages/authenticated/UpdateCategoryFormPage';
import TaskDetails from '@/pages/authenticated/TaskDetailsPage';

import {AuthenticatedStackParams} from '../types';
import {BottomTabsNavigator} from './BottomTabsNavigator';
import TimerPage from '@/pages/authenticated/TimerPage';
import StopwatchPage from '@/pages/authenticated/StopwatchPage';
import StorybookPage from '@/pages/authenticated/StorybookPage';

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
      <AuthenticatedStack.Screen name="Storybook" component={StorybookPage} />
    </AuthenticatedStack.Navigator>
  );
}

export default AuthenticatedStackNavigator;
