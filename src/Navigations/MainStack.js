import React from 'react';
import navigationString from './navigationString';
import * as Screens from '../Screens';
import TabRoutes from './TabRoutes';

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationString.TAB_ROUTES}
        component={TabRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.PORFILE_EDIT}
        component={Screens.ProfileEdit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.LINKS}
        component={Screens.Links}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.ADD_POST}
        component={Screens.AddPost}
        options={{headerShown: false}}
      />
    </>
  );
}
