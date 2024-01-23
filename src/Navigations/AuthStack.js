import React from 'react';
import navigationString from './navigationString';
import * as Screens from '../Screens';

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationString.INITIAL_SCREEN}
        component={Screens.InitialScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.LOGIN}
        component={Screens.Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.SIGNUP}
        component={Screens.Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.OTP_VERIFICATION}
        component={Screens.OtpVerification}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name={navigationString.WEBVIEW}
        component={Screens.WebView}
        options={{headerShown: false}}
      />
    </>
  );
}
