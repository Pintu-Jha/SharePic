import React from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextValue {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
}

export const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  initializing: true,
});
