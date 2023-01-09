import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {AuthenticatedStackParams} from '../types';

import CategorySearch from '@/pages/CategorySearch';
import CategoryDetails from '@/pages/CategoryDetails';
import ChangeNameForm from '@/pages/ChangeNameForm';
import ChangeThemeForm from '@/pages/ChangeThemeForm';
import ChangeAvatar from '@/pages/ChangeAvatar';
import About from '@pages/About';
import CreateTaskForm from '@/pages/CreateTaskForm';
import UpdateTaskForm from '@/pages/UpdateTaskForm';
import CreateCategoryForm from '@/pages/CreateCategoryForm';
import UpdateCategoryForm from '@/pages/UpdateCategoryForm';
import TaskDetails from '@/pages/TaskDetails';
import {BottomTabsNavigator} from './BottomTabsNavigator';

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
        component={CreateTaskForm}
      />
      <AuthenticatedStack.Screen
        name="UpdateTaskForm"
        component={UpdateTaskForm}
        initialParams={{}}
      />
      <AuthenticatedStack.Screen
        name="CategorySearch"
        component={CategorySearch}
      />
      <AuthenticatedStack.Screen name="About" component={About} />
      <AuthenticatedStack.Screen
        name="CreateCategoryForm"
        component={CreateCategoryForm}
      />
      <AuthenticatedStack.Screen
        name="UpdateCategoryForm"
        component={UpdateCategoryForm}
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
      <AuthenticatedStack.Screen name="ChangeAvatar" component={ChangeAvatar} />
      <AuthenticatedStack.Screen name="TaskDetails" component={TaskDetails} />
    </AuthenticatedStack.Navigator>
  );
}

export default AuthenticatedStackNavigator;
