import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import CategorySearchPage from '@/modules/authenticated/pages/CategorySearchPage';
import CategoryDetailsPage from '@/modules/authenticated/pages/CategoryDetailsPage';
import ChangeNameFormPage from '@/modules/authenticated/pages/ChangeNameFormPage';
import ChangeThemeFormPage from '@/modules/authenticated/pages/ChangeThemeFormPage';
import ChangeAvatarPage from '@/modules/authenticated/pages/ChangeAvatarPage';
import AboutPage from '@/modules/authenticated/pages/AboutPage';
import CreateTaskFormPage from '@/modules/authenticated/pages/CreateTaskFormPage';
import UpdateTaskFormPage from '@/modules/authenticated/pages/UpdateTaskFormPage';
import CreateCategoryForm from '@/modules/authenticated/pages/CreateCategoryFormPage';
import UpdateCategoryFormPage from '@/modules/authenticated/pages/UpdateCategoryFormPage';
import TaskDetails from '@/modules/authenticated/pages/TaskDetailsPage';

import {AuthenticatedStackParams} from '../../core/navigation/types';
import {BottomTabsNavigator} from './BottomTabsNavigator';
import TimerPage from '@/modules/authenticated/pages/TimerPage';
import StopwatchPage from '@/modules/authenticated/pages/StopwatchPage';
import StorybookPage from '@/modules/authenticated/pages/StorybookPage';

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
