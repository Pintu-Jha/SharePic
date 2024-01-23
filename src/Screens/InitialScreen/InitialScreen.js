import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import navigationString from '../../Navigations/navigationString';
import store from '../../Redux/store';
import {saveUserData} from '../../Redux/reducers/auth';
import WapperContainer from '../../Components/WapperContainer';
import imagePath from '../../Constants/imagePath';
import strings from '../../Constants/lang';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import BottonComp from '../../Components/BottonComp';
import {spacing} from '../../styles/spacing';
import {textScale} from '../../styles/responsiveStyles';
import TextComp from '../../Components/TextComp';
import {useSelector} from 'react-redux';
import ModalComp from '../../Components/ModalComp';
import LeftTextRightImage from '../../Components/LeftTextRightImage';
import {ChangeLang, ChangeTheme} from '../../Redux/reducers/appSettings';
import {langData} from '../../Constants/langtheme/langData';
import {themeData} from '../../Constants/langtheme/themeData';
import RNRestart from 'react-native-restart';
import {changeLanguage, changeTheme} from '../../Redux/actions/appSettings';
const {dispatch} = store;
const InitialScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);

  const {selectedTheme, lang} = useSelector(state => state?.appSetting);

  const onLogin = () => {
    dispatch(saveUserData({isLogin: true}));
  };

  const privacyPolicy = (type = 1) => {
    if (type == 1) {
      navigation.navigate(navigationString.WEBVIEW, {type});
    } else {
      navigation.navigate(navigationString.WEBVIEW, {type});
    }
  };

  const onPressLang = lang => {
    changeLanguage(lang);
    RNRestart.restart();
  };
  const onPressTheme = theme => {
    setIsVisible(false);
    changeTheme(theme);
  };

  return (
    <WapperContainer>
      <View
        style={{alignItems: 'center', padding: spacing.PADDING_16, flex: 1}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsVisible(true)}
          style={{
            ...styles.circularStyle,
            backgroundColor:
              selectedTheme == 'dark' ? colors.whiteColor : colors.gray2,
          }}>
          <Text
            style={{
              ...styles.textStyle,
              color:
                selectedTheme == 'dark' ? colors.blackColor : colors.whiteColor,
              textAlign: 'left',
            }}>
            {lang}
          </Text>
        </TouchableOpacity>

        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <Image source={imagePath.icLogo} style={styles.logoStyle} />
        </View>

        <View style={{flex: 0.7, justifyContent: 'flex-end'}}>
          <TextComp
            style={{marginVertical: spacing.MARGIN_50}}
            text={strings.BY_CLICKING_LOG_IN}>
            <Text
              style={{color: colors.blueColor, fontFamily: fontFamily.Bold}}
              onPress={() => privacyPolicy(1)}>
              {strings.TERMS}
            </Text>
            .{strings.LEARN_HOW_WE_PRCOESS}
            <Text
              style={{color: colors.blueColor, fontFamily: fontFamily.Bold}}
              onPress={() => privacyPolicy(2)}>
              {strings.PRIVACY_POLICY}
            </Text>
          </TextComp>

          <BottonComp
            text={strings.LOG_IN_WITH_PHONE_NUMBER}
            onPress={() => navigation.navigate(navigationString.LOGIN)}
          />
          <TextComp
            text={strings.OR}
            style={{marginVertical: spacing.MARGIN_16, alignSelf: 'center'}}
          />
          <BottonComp
            text={strings.LOG_IN_WITH_GOOGLE}
            textStyle={{color: colors.blackColor}}
            style={{
              backgroundColor:
                selectedTheme == 'dark' ? colors.whiteColor : colors.gray4,
            }}
            leftImg={imagePath.icGoogle}
          />
          <BottonComp
            text={strings.LOG_IN_WITH_FACEBOOK}
            textStyle={{color: colors.blackColor}}
            style={{
              backgroundColor:
                selectedTheme == 'dark' ? colors.whiteColor : colors.gray4,
              marginVertical: spacing.MARGIN_16,
            }}
            leftImg={imagePath.icFacebook}
          />
          <BottonComp
            text={strings.LOG_IN_WITH_APPLE}
            textStyle={{color: colors.blackColor}}
            style={{
              backgroundColor:
                selectedTheme == 'dark' ? colors.whiteColor : colors.gray4,
            }}
            leftImg={imagePath.icApple}
          />
          <TextComp
            style={{
              fontFamily: fontFamily.Medium,
              marginVertical: spacing.MARGIN_16,
              alignSelf: 'center',
            }}
            text={strings.NEW_HERE}>
            <Text
              style={{
                color: colors.blueColor,
                fontFamily: fontFamily.semiBold,
              }}
              onPress={() => navigation.navigate(navigationString.SIGNUP)}>
              {strings.SIGN_UP}
            </Text>
          </TextComp>
        </View>
      </View>
      <ModalComp
        isVisible={isVisible}
        style={{justifyContent: 'flex-end', margin: 0}}
        onBackdropPress={() => setIsVisible(false)}>
        <View style={styles.modalStyle}>
          <Text style={styles.headingStyle}>{strings.CHOOSE_LANGUAGE}</Text>
          {langData.map((val, i) => {
            return (
              <LeftTextRightImage
                key={String(i)}
                text={val.title}
                isSelected={lang == val.code}
                onPress={() => onPressLang(val.code)}
              />
            );
          })}
          <Text style={{...styles.headingStyle, marginTop: spacing.MARGIN_16}}>
            {strings.CHOOSE_LANGUAGE}
          </Text>
          {themeData.map((val, i) => {
            return (
              <LeftTextRightImage
                key={String(i)}
                text={val.title}
                isSelected={val.code == selectedTheme}
                onPress={() => onPressTheme(val.code)}
              />
            );
          })}
        </View>
      </ModalComp>
    </WapperContainer>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  logoStyle: {
    width: spacing.WIDTH_196,
    height: spacing.HEIGHT_196,
    borderRadius: spacing.RADIUS_196 / 2,
  },
  textStyle: {
    fontFamily: fontFamily.semiBold,
    color: colors.whiteColor,
    textAlign: 'center',
    fontSize: textScale(12),
    textTransform: 'capitalize',
  },
  circularStyle: {
    height: spacing.HEIGHT_40,
    width: spacing.WIDTH_40,
    borderRadius: spacing.RADIUS_20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  langHeadingStyle: {
    fontFamily: fontFamily.semiBold,
    color: colors.blackColor,
    fontSize: textScale(14),
    textTransform: 'capitalize',
    marginBottom: spacing.MARGIN_16,
  },
  langTextStyle: {
    fontFamily: fontFamily.semiBold,
    color: colors.blackColor,
    fontSize: textScale(12),
    textTransform: 'capitalize',
    marginVertical: spacing.MARGIN_8,
  },
  modalStyle: {
    backgroundColor: colors.whiteColor,
    minHeight: spacing.FULL_HEIGHT / 4,
    borderTopRightRadius: spacing.RADIUS_10,
    borderTopLeftRadius: spacing.RADIUS_10,
    padding: spacing.PADDING_16,
  },
  headingStyle: {
    fontFamily: fontFamily.semiBold,
    color: colors.blackColor,
    fontSize: textScale(16),
    textTransform: 'capitalize',
    marginBottom: spacing.MARGIN_12,
  },
});
