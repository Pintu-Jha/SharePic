import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const userData = useSelector(state=>state.auth.userData)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {true? MainStack(Stack) : AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
