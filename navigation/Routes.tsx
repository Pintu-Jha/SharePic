// src/navigation/Routes.tsx
import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/authContext';

import Auth from './Auth';
import Tabs from './Tabs';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditPostScreen from '../screens/EditPostScreen';

const Stack = createStackNavigator();

function Routes() {
  const context = useContext(AuthContext);

  if (!context) return null; 

  const { user, initializing } = context;

  if (initializing) {
    return (
      <ActivityIndicator
        color={'white'}
        style={{ flex: 1, alignSelf: 'center' }}
        size={24}
      />
    );
  }

  return (
    <>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="EditPost"
            component={EditPostScreen}
            options={{ headerShown: true, headerTitle: 'Edit' }}
          />
        </Stack.Navigator>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default Routes;
