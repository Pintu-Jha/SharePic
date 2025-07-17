// src/screens/SignIn.tsx
import React, { useContext, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Styles from '../config/Styles';
import { UserContext } from '../context/UserContext';

const SignIn = () => {
  const navigation = useNavigation();
  const userContext = useContext(UserContext);

  const [localEmail, setLocalEmail] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!userContext) {
    console.error('UserContext not found. Ensure SignIn is wrapped in UserProvider.');
    return (
      <Text style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>
        Application Error: UserContext not found.
      </Text>
    );
  }

  const { signIn } = userContext;

  const handleSignIn = async () => {
    if (!localEmail || !localPassword) {
      Alert.alert('Missing Fields', 'Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signIn(localEmail, localPassword);
      // Optionally navigate after successful sign-in
      // navigation.navigate('Home' as never); 
    } catch (error: any) {
      console.error('SignIn Error:', error);
      Alert.alert('Sign In Failed', error?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
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
            style={[Styles.authButtonStyle, loading && { opacity: 0.6 }]}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
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
