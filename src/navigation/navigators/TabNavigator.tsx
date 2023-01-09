import React from 'react';
//import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {BottomNavigatorStackParams} from '../types';
//import {selectAppTheme} from '../store/configs';

import Home from '@/pages/Home';
import TaskList from '@/pages/TaskList';
import More from '@/pages/More';
import CategoryList from '@/pages/CategoryList';

import BottonTabNavigator from './BottonTabNavigator';

import {useTranslation} from '@/shared/hooks';

const Tab = createBottomTabNavigator<BottomNavigatorStackParams>();

export function TabNavigator() {
  const {translation} = useTranslation();
  //const appTheme = useSelector(selectAppTheme);

  return (
    <Tab.Navigator
      tabBar={props => <BottonTabNavigator {...props} />}
      screenOptions={
        {
          /*activeBackgroundColor: appTheme.primaryColor,
        inactiveBackgroundColor: appTheme.primaryColor,
        inactiveTintColor: appTheme.dark
          ? lighten(0.3, appTheme.primaryColor)
          : shade(0.5, appTheme.primaryColor),
        activeTintColor: '#FAFAFA',*/
        }
      }>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: translation('HOME'),
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TaskList"
        component={TaskList}
        options={{
          title: translation('TASKS'),
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
          title: translation('CATEGORIES'),
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name="folder" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
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
