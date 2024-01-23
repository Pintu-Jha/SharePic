import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import * as Screens from '../Screens';

import navigationStrings from './navigationString';
import Colors from '../styles/colors';
import imagePath from '../Constants/imagePath';

const BottomTab = createBottomTabNavigator();

const TabRoutes = props => {
  return (
    <BottomTab.Navigator
      tabBar={tabsProps => (
        <>
          <BottomTabBar {...tabsProps} />
        </>
      )}
      initialRouteName={navigationStrings.HOME}
      screenOptions={{
        headerShown: false,
        style: styles.customBottomtabsStyle,
        tabBarActiveTintColor: Colors.blackColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: Colors.themeColor},
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name={navigationStrings.HOME}
        component={Screens.Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused ? Colors.redColor : Colors.whiteColor,
                }}
                source={imagePath.firstInActiveIcon}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={navigationStrings.SEARCH}
        component={Screens.Search}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused ? Colors.redColor : Colors.whiteColor,
                }}
                source={imagePath.secondInActiveIcon}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={navigationStrings.CREATE_POST}
        component={Screens.CreatePost}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused ? Colors.redColor : Colors.whiteColor,
                }}
                source={imagePath.thirdActiveIcon}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={navigationStrings.NOTIFICATION}
        component={Screens.Notification}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused ? Colors.redColor : Colors.whiteColor,
                }}
                source={imagePath.fourthActiveIcon}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={navigationStrings.PROFILE}
        component={Screens.Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused ? Colors.redColor : Colors.whiteColor,
                }}
                source={imagePath.fifthActiveIcon}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  customBottomtabsStyle: {
    //height: moderateScale(60)
    backgroundColor: 'red',
  },
});

export default TabRoutes;
