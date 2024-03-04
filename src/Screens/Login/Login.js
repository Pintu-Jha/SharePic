import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import WapperContainer from '../../Components/WapperContainer';
import {spacing} from '../../styles/spacing';
import strings from '../../Constants/lang';
import TextImputComp from '../../Components/TextImputComp';
import {textScale} from '../../styles/responsiveStyles';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import BottonComp from '../../Components/BottonComp';
import HeaderComp from '../../Components/HeaderComp';
import {useSelector} from 'react-redux';
import TextComp from '../../Components/TextComp';
import {showError} from '../../Utills/HelperFunctions';
import validator from '../../Utills/validations';
import { userLogin } from '../../Redux/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const checkUser = useSelector(state => state?.auth?.isUserLoggedIn)
 

  const isValidData = () => {
    const error = validator({
      email,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onPressLogin = async() => {
    const checkValid = isValidData();
    const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
    if (checkValid && user.email === email  ) {
      // console.log(user.email);
     userLogin(checkUser)
    }
  }
  };

  return (
    <WapperContainer>
      <HeaderComp />

      <KeyboardAvoidingView
        style={{flex: 1, padding: spacing.PADDING_16}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.8}}>
              <TextComp
                text={strings.WELCOME_BACK}
                style={styles.headerStyle}
              />
              <TextComp
                text={strings.WE_ARE_HAPPY_TO_SEE}
                style={styles.descStyle}
              />
              <TextImputComp
                value={email}
                placeholder={strings.EMAIL}
                onChangeText={value => setEmail(value)}
              />
              <TextImputComp
                value={password}
                placeholder={strings.PASSWORD}
                onChangeText={value => setPassword(value)}
                secureTextEntry={secureText}
                secureText={secureText ? strings?.SHOW : strings?.HIDE}
                onPressSecure={() => setSecureText(!secureText)}
              />

              <Text
                style={{
                  ...styles.descStyle,
                  alignSelf: 'flex-end',
                  fontFamily: fontFamily.semiBold,
                  color: colors.blueColor,
                }}>
                {strings.FORGOT_PASSWORD}?
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                marginBottom: spacing.MARGIN_20,
              }}>
              <BottonComp text={strings.LOGIN} onPress={onPressLogin} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </WapperContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(24),
    fontFamily: fontFamily.Medium,
  },
  descStyle: {
    fontSize: textScale(12),
    fontFamily: fontFamily.regular,
    marginTop: spacing.MARGIN_12,
    marginBottom: spacing.MARGIN_50,
  },
});
