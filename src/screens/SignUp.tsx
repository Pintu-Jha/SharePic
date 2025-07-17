import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRegisterMutation } from '@api/sharePicApi';
import Styles from '@config/Styles';


const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading }] = useRegisterMutation();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }
    const formData = new FormData();
    // Split name into first and last for backend
    const [fName, ...rest] = name.split(' ');
    const lName = rest.join(' ');
    formData.append('fName', fName);
    formData.append('lName', lName);
    formData.append('email', email);
    formData.append('password', password);
    try {
      const result: any = await register(formData).unwrap();
      if (result && result._id) {
        Alert.alert('Registration Successful', 'You can now sign in.');
        navigation.navigate('SignIn');
      } else {
        Alert.alert('Registration Failed', 'No user created.');
      }
    } catch (error: any) {
      console.error('SignUp Error:', error);
      Alert.alert('Sign Up Failed', error?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={Styles.flexContainer}>
      <View style={Styles.authHeaderTextContainer}>
        <Text style={Styles.authHeaderText}>Get Started</Text>
        <Text style={Styles.authSubText}>create your account</Text>
      </View>

      <View style={Styles.authInputContainer}>
        <View>
          <View>
            <Ionicons
              name="person-outline"
              color={'#AEAEAE'}
              size={20}
              style={Styles.authInputIcon}
            />
            <TextInput
              style={Styles.authTextInput}
              placeholder={'Enter your name'}
              placeholderTextColor={'#AEAEAE'}
              onChangeText={setName}
              value={name}
            />
          </View>

          <View>
            <Ionicons
              name="mail-outline"
              color={'#AEAEAE'}
              size={20}
              style={Styles.authInputIcon}
            />
            <TextInput
              style={Styles.authTextInput}
              placeholder={'Enter your e-mail'}
              placeholderTextColor={'#AEAEAE'}
              onChangeText={setEmail}
              value={email}
            />
          </View>

          <View>
            <Ionicons
              name="lock-closed-outline"
              color={'#AEAEAE'}
              size={20}
              style={Styles.authInputIcon}
            />
            <TextInput
              style={Styles.authTextInput}
              placeholder={'Enter your password'}
              placeholderTextColor={'#AEAEAE'}
              onChangeText={setPassword}
              value={password}
              textContentType="password"
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={Styles.authButtonContainer}>
          <TouchableOpacity style={[Styles.authButtonStyle, isLoading && { opacity: 0.6 }]} onPress={handleSignUp} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={Styles.authButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={Styles.authNewMemberContainer}>
          <Text style={Styles.authSubText}>Do you already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={Styles.signUpText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
