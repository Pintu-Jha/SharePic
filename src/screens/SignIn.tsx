// src/screens/SignIn.tsx
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoginMutation } from '@api/sharePicApi';
import Styles from '@config/Styles';

const SignIn = () => {
  const navigation = useNavigation();
  const [localEmail, setLocalEmail] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const handleSignIn = async () => {
    if (!localEmail || !localPassword) {
      Alert.alert('Missing Fields', 'Please fill in both email and password.');
      return;
    }
    try {
      const result: any = await login({ email: localEmail, password: localPassword }).unwrap();
      if (result && result.token) {
        await AsyncStorage.setItem('jwt', result.token);
        // Optionally navigate after successful sign-in
        // navigation.navigate('Home' as never);
      } else {
        Alert.alert('Sign In Failed', 'No token received.');
      }
    } catch (error: any) {
      console.error('SignIn Error:', error);
      Alert.alert('Sign In Failed', error?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <View style={Styles.flexContainer}>
      <View style={Styles.authHeaderTextContainer}>
        <Text style={Styles.authHeaderText}>Welcome Back</Text>
        <Text style={Styles.authSubText}>Sign in to access your account</Text>
      </View>

      <View style={Styles.authInputContainer}>
        <View>
          <Ionicons
            name="mail-outline"
            color="#AEAEAE"
            size={20}
            style={Styles.authInputIcon}
          />
          <TextInput
            style={Styles.authTextInput}
            placeholder="Enter your email"
            placeholderTextColor="#AEAEAE"
            onChangeText={setLocalEmail}
            value={localEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View>
          <Ionicons
            name="lock-closed-outline"
            color="#AEAEAE"
            size={20}
            style={Styles.authInputIcon}
          />
          <TextInput
            style={Styles.authTextInput}
            placeholder="Enter your password"
            placeholderTextColor="#AEAEAE"
            onChangeText={setLocalPassword}
            value={localPassword}
            secureTextEntry
          />
        </View>

        <View style={Styles.authButtonContainer}>
          <TouchableOpacity
            style={[Styles.authButtonStyle, isLoading && { opacity: 0.6 }]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={Styles.authButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={Styles.authNewMemberContainer}>
          <Text style={Styles.authSubText}>Are you a new member?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
            <Text style={Styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
