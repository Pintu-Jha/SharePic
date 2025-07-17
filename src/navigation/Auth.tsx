import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '@screens/SignIn';
import SignUp from '@screens/SignUp';

const stack = createStackNavigator();
const Auth = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name={'SignIn'}
        component={SignIn}
        options={{headerShown: false}}
      />
      <stack.Screen
        name={'SignUp'}
        component={SignUp}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
};

export default Auth;
