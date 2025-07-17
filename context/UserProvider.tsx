import auth from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { UserContext, UserData } from './UserContext';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);

  const createAccount = async () => {
    const result = await auth().createUserWithEmailAndPassword(email, password);
    const uid = result.user.uid;
  
    const newUser: UserData = {
      fName: name,
      lName: '',
      email,
      createdAt: firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
      about: '',
      country: '',
      phone: '',
      userImg: null,
    };
  
    await firestore().collection('users').doc(uid).set(newUser);
    setUserData(newUser);
  };
  
  const signIn = async (email: string, password: string) => {
    await auth().signInWithEmailAndPassword(email, password);
  };

  const signOut = async () => {
    await auth().signOut();
    setUserData(null);
  };

  const getUser = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        getUser();
      } else {
        setUserData(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        email,
        password,
        name,
        setEmail,
        setPassword,
        setName,
        createAccount,
        signIn,
        signOut,
        getUser,
        userData,
        setUserData,
      }}>
      {children}
    </UserContext.Provider>
  );
};
