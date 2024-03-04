import {StyleSheet, Text, View} from 'react-native';
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
import TextComp from '../../Components/TextComp';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import navigationString from '../../Navigations/navigationString';
import { userSignup } from '../../Redux/actions/auth';

const Signup = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);


  const onPressSignup = () => {
        userSignup({email,password,fullName,userName})
          navigation.navigate(navigationString.LOGIN);
  };

  return (
    <WapperContainer>
      <HeaderComp />
      <KeyboardAwareScrollView>
        <View style={{padding: spacing.PADDING_16}}>
          <View style={{}}>
            <TextComp
              text={strings.CREATE_NEW_ACCOUNT}
              style={styles.headerStyle}
            />
            <TextComp
              text={strings.CREATE_AN_ACCOUNT_SO_YOU_CAN_CONTINUE}
              style={styles.descStyle}
            />
            <TextImputComp
              value={userName}
              placeholder={strings.USERNAME}
              onChangeText={value => setUserName(value)}
            />
            <TextImputComp
              value={fullName}
              placeholder={strings.FULL_NAME}
              onChangeText={value => setFullName(value)}
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
            <TextImputComp
              value={confirmPassword}
              placeholder={strings.CONFIRM_PASSWORD}
              onChangeText={value => setConfirmPassword(value)}
              secureTextEntry={secureText}
              secureText={secureText ? strings?.SHOW : strings?.HIDE}
              onPressSecure={() => setSecureText(!secureText)}
            />
          </View>

          <BottonComp
            text={strings.SIGN_UP}
            style={{marginTop: spacing.MARGIN_30}}
            onPress={onPressSignup}
          />
        </View>
      </KeyboardAwareScrollView>
    </WapperContainer>
  );
};

export default Signup;

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(26),
    fontFamily: fontFamily.Medium,
  },
  descStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    marginTop: spacing.MARGIN_12,
    marginBottom: spacing.MARGIN_50,
  },
});
