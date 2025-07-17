import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import React from 'react';

export interface UserData extends FirebaseFirestoreTypes.DocumentData {
  fName: string;
  lName: string;
  email: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  about: string;
  country: string;
  phone: string;
  userImg: string | null;
}

export interface UserContextValue {
  email: string;
  password: string;
  name: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
  createAccount: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUser: () => Promise<void>;
  userData: UserData | null;
  setUserData: (user: UserData | null) => void;
}

export const UserContext = React.createContext<UserContextValue>({} as UserContextValue);
