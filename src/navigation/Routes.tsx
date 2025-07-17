// src/navigation/Routes.tsx
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from './Auth';
import Tabs from './Tabs';
import EditProfileScreen from '@screens/EditProfileScreen';
import EditPostScreen from '@screens/EditPostScreen';

const Stack = createStackNavigator();

function Routes() {
  // TODO: Replace with actual authentication logic (e.g., from Redux or AsyncStorage)
  const user = true; // Placeholder: always authenticated
  const initializing = false;

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
