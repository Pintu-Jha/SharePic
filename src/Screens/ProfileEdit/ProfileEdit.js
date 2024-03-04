//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import WrapperContainer from '../../Components/WapperContainer';
import FastImageComp from '../../Components/FastImageComp';
import { useSelector } from 'react-redux';
import colors from '../../styles/colors';
import navigationStrings from '../../Navigations/navigationString';
import HeaderComp from '../../Components/HeaderComp';
import TextInputComp from '../../Components/TextImputComp';
import MultiTextInput from '../../Components/MultiTextInput';
import ButtonComp from '../../Components/BottonComp';
import ModalComp from '../../Components/ModalComp';
import { spacing } from '../../styles/spacing';
import imagePath from '../../Constants/imagePath';
import strings from '../../Constants/lang';
import { logout } from '../../Redux/actions/auth';


// create a component
const ProfileEdit = ({ navigation }) => {
    const { selectedTheme } = useSelector(state => state?.appSetting)

    const isDark = selectedTheme == 'dark'

    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [bio, setBio] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [secureText, setSecureText] = useState(true)
    const [showPassModal, setShowPassModal] = useState(false)
   

    const onSave = () => {
        alert("dfdf")
    }
  
    // console.log('dfdsf',logout);

    return (
        <WrapperContainer>
            <View style={{ flex: 1, padding: spacing.PADDING_16 }}>
                <HeaderComp
                    leftText={strings.EDIT_PROFILE}
                    rightText={strings.SAVE}
                    onPressRight={onSave}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ alignSelf: 'center' }}>
                    <FastImageComp
                        url='https://www.nautiljon.com/images/perso/00/48/gojo_satoru_19784.webp'
                        imageStyle={{
                            borderRadius: spacing.RADIUS_50,

                        }}
                    />
                    <Image style={{
                        position: 'absolute',
                        bottom: 4,
                        right: 0,
                    }} source={imagePath.icEdit} />
                </TouchableOpacity>

                <View style={{ marginTop: spacing.MARGIN_24 }}>

                    <TextInputComp
                        value={userName}
                        placeholder={strings.USERNAME}
                        onChangeText={(value) => setUserName(value)}
                    />

                    <TextInputComp
                        value={fullName}
                        placeholder={strings.FULL_NAME}
                        onChangeText={(value) => setFullName(value)}
                    />

                    <MultiTextInput
                        value={bio}
                        placeholder={strings.BIO}
                        onChangeText={(value) => setBio(value)}
                        multiline={true}
                    />

                    <ButtonComp
                        text={strings.CHANGE_PASSWORD}
                        onPress={() => setShowPassModal(true)}
                        style={{
                            backgroundColor: 'transparent',
                            borderWidth: 0.5,
                            borderColor: isDark ? colors.whiteColor : colors.blackColor
                        }}
                    />
                    <ButtonComp
                        text={strings.ADD_LINKS}
                        onPress={() => navigation.navigate(navigationStrings.LINKS)}
                        style={{
                            backgroundColor: 'transparent',
                            borderWidth: 0.5,
                            borderColor: isDark ? colors.whiteColor : colors.blackColor,
                            marginTop: spacing.MARGIN_16
                        }}
                    />
                     

                </View>

                <ModalComp
                    key={'1'}
                    isVisible={showPassModal}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    avoidKeyboard
                    onBackdropPress={() => setShowPassModal(false)}

                >
                    <View style={{
                        ...styles.modalStyle,
                        backgroundColor: isDark ? colors.whiteColorOpacity20 : colors.whiteColor,
                    }}>


                        <TextInputComp
                            value={password}
                            placeholder={strings.ENTER_OLD_PASSWORD}
                            onChangeText={(value) => setPassword(value)}
                            secureTextEntry={secureText}
                            secureText={secureText ? strings.SHOW : strings.HIDE}
                            onPressSecure={() => setSecureText(!secureText)}
                        />
                        <TextInputComp
                            value={confirmPassword}
                            placeholder={strings.CONFIRM_PASSWORD}
                            onChangeText={(value) => setConfirmPassword(value)}
                            secureTextEntry={secureText}
                            secureText={secureText ? strings.SHOW : strings.HIDE}
                            onPressSecure={() => setSecureText(!secureText)}
                        />
                        <ButtonComp
                            text={strings.CHANGE_PASSWORD}

                        />
                    </View>

                </ModalComp>

            </View>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    boxView: {
        padding: spacing.PADDING_12,
        borderRadius: spacing.RADIUS_8

    },
    imgStyle: {
        width: spacing.FULL_WIDTH / 3,
        height: spacing.FULL_HEIGHT / 3,
        borderWidth: 0.5,
    },
    modalStyle: {
        padding: spacing.PADDING_16,
        borderTopLeftRadius: spacing.RADIUS_8,
        borderTopRightRadius: spacing.RADIUS_8
    }
});

//make this component available to the app
export default ProfileEdit;
