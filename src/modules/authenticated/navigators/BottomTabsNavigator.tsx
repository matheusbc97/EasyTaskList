import React from 'react';
//import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {BottomNavigatorStackParams} from '../../core/navigation/types';
//import {selectAppTheme} from '../store/configs';

import HomePage from '@/modules/authenticated/pages/HomePage';
import TaskListPage from '@/modules/authenticated/pages/TaskListPage';
import MorePage from '@/modules/authenticated/pages/MorePage';
import CategoryListPage from '@/modules/authenticated/pages/CategoryListPage';

import BottomTabs from '../../core/navigation/components/BottomTabs';

import {useTranslation} from '@/modules/shared/hooks';

const Tab = createBottomTabNavigator<BottomNavigatorStackParams>();

export function BottomTabsNavigator() {
  const {translation} = useTranslation();
  //const appTheme = useSelector(selectAppTheme);

  return (
    <Tab.Navigator
      tabBar={props => <BottomTabs {...props} />}
      screenOptions={{
        headerShown: false,

        /*activeBackgroundColor: appTheme.primaryColor,
        inactiveBackgroundColor: appTheme.primaryColor,
        inactiveTintColor: appTheme.dark
          ? lighten(0.3, appTheme.primaryColor)
          : shade(0.5, appTheme.primaryColor),
        activeTintColor: '#FAFAFA',*/
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          title: translation('HOME'),
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TaskList"
        component={TaskListPage}
        options={{
          title: translation('TASKS'),
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="tasks" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CategoryList"
        component={CategoryListPage}
        options={{
          title: translation('CATEGORIES'),
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="folder" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MorePage}
        options={{
          title: translation('MORE'),
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="bars" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
