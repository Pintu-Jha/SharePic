import  React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useSelector } from 'react-redux';
import LoadingScreen from '../Components/Loader';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state=>state?.auth?.isUserLoggedIn)    
     setLoading(false)
  
  if (loading) {
    return <LoadingScreen />
  } 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn? MainStack(Stack) : AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
