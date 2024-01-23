//import liraries
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import WrapperContainer from '../../Components/WapperContainer';
import { moderateScale, moderateScaleVertical, textScale } from '../../styles/responsiveStyles';
import strings from '../../Constants/lang';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import ButtonComp from '../../Components/BottonComp';
import HeaderComp from '../../Components/HeaderComp';
import TextComp from '../../Components/TextComp';
import OTPTextView from 'react-native-otp-textinput';
import { spacing } from '../../styles/spacing';

// create a component
const OtpVerification = ({ navigation }) => {

    const [timer, setTimer] = useState(59);


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (timer > 0) setTimer(timer - 1)
        }, 1000);
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [timer])

    const [otpInput, setOtpInput] = useState("");


    const input = useRef(null)

    const handleCellTextChange = async (text, i) => {

    };

    const onResendCode = () =>{
        setTimer(59)
    }


    return (
        <WrapperContainer>
            <HeaderComp />

            <KeyboardAvoidingView
                style={{ flex: 1, margin: spacing.MARGIN_16 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>

                        <View style={{ flex: 0.8 }}>

                            <TextComp style={styles.headerStyle} text={strings.ENTER_THE_FOUR_DIGIT + ` xyz@gmail.com`} />
                            <TextComp onPress={() => navigation.goBack()} style={styles.descStyle} text={strings.EDIT_MY_EMAIL} />

                            <OTPTextView
                                ref={input}
                                textInputStyle={styles.textInputContainer}
                                handleTextChange={setOtpInput}
                                handleCellTextChange={handleCellTextChange}
                                inputCount={4}
                                keyboardType="numeric"
                                autoFocus
                                tintColor={colors.whiteColor}
                                offTintColor={colors.whiteColorOpacity40}

                            />

                        </View>

                        <View style={{ flex: 0.2, justifyContent: 'flex-end', marginBottom: spacing.MARGIN_16 }} >
                            {timer > 0 ?
                                <TextComp style={{
                                    ...styles.descStyle,
                                    marginBottom: spacing.MARGIN_16,
                                    fontFamily: fontFamily.Medium,
                                }} text={strings.RESEND_CODE + ' In '} >

                                    <Text>{timer}</Text>

                                </TextComp>
                                :
                                <TextComp onPress={onResendCode} style={styles.resendCodeStyle} text={strings.RESEND_CODE} />
                            }

                            <ButtonComp
                                text={strings.LOGIN}
                                style={{marginBottom:spacing.MARGIN_30}}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    headerStyle: {
        fontSize: textScale(24),
        fontFamily: fontFamily.Medium,

    },
    descStyle: {
        fontSize: textScale(14),
        fontFamily: fontFamily.Medium,
        color: colors.blueColor,
        marginTop: spacing.MARGIN_8,
        marginBottom: spacing.MARGIN_50
    },
    textInputContainer: {
        backgroundColor: colors.gray2,
        borderBottomWidth: 0,
        borderRadius: 8,
        color: colors.whiteColor

    },
    resendCodeStyle: {
        fontSize: textScale(14),
        fontFamily: fontFamily.Medium,
        marginTop: spacing.MARGIN_8,
        marginBottom: spacing.MARGIN_16
    }
});

//make this component available to the app
export default OtpVerification;
