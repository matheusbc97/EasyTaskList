import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {selectAppTheme} from '@/store/configs';
import {Button} from '@/modules/shared/components';

interface Props extends BottomTabBarProps {}

export default function BottonTabNavigator({
  navigation,
  state,
  activeTintColor,
  inactiveTintColor,
  descriptors,
}: Props) {
  const appTheme = useSelector(selectAppTheme);
  const TabsDescriptorsKeys = Object.keys(descriptors);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: appTheme.primaryColor,
        },
      ]}>
      {state.routeNames.map((routeName, index) => {
        const focused = index === state.index;
        const descriptorOptions =
          descriptors[TabsDescriptorsKeys[index]].options;

        let color = '#FAFAFA';

        if (focused && activeTintColor) {
          color = activeTintColor;
        } else if (!focused && inactiveTintColor) {
          color = inactiveTintColor;
        }

        return (
          <Button
            key={`botton-button-${index}`}
            style={styles.button}
            onPress={() => navigation.navigate(routeName)}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {descriptorOptions.tabBarIcon &&
                descriptorOptions.tabBarIcon({
                  focused,
                  color,
                  size: 28,
                })}
              <Text
                style={[
                  styles.text,
                  {
                    color: focused ? activeTintColor : inactiveTintColor,
                  },
                ]}>
                {descriptorOptions.title}
              </Text>
            </View>
          </Button>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,

    flexDirection: 'row',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    elevation: 3,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#fafafa',
    fontSize: 12,
  },
});
