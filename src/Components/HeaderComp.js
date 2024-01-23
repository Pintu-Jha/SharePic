//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import colors from '../styles/colors';
import TextComp from './TextComp';
import fontFamily from '../styles/fontFamily';
import { spacing } from '../styles/spacing';
import { textScale } from '../styles/responsiveStyles';
import imagePath from '../Constants/imagePath';

// create a component
const HeaderComp = ({
    onPressLeft,
    leftText = '',
    isLeftImage = true,
    style={},
    rightTextStyle ={},
    rightText= '',
    onPressRight = () =>{}
}) => {
    const navigation = useNavigation()
    const { selectedTheme } = useSelector(state => state?.appSetting)



    return (
        <View style={{...styles.container, ...style}}>

            <View style={{flexDirection:'row',alignItems:'center'}}>
            {isLeftImage ?<TouchableOpacity
            style={{marginRight:spacing.MARGIN_16}}
                onPress={!!onPressLeft ? onPressLeft : () => navigation.goBack()}
            >
                <Image style={{ tintColor: selectedTheme == 'dark' ? colors.whiteColor : colors.blackColor }} source={imagePath.icBack} />
            </TouchableOpacity>:null}

            {!!leftText ? <TextComp style={styles.textStyle} text={leftText} /> : null}
            </View>

            {!!rightText ? 
            <TouchableOpacity
            onPress={onPressRight}
            >
                <TextComp style={{...styles.textStyle, ...rightTextStyle}}>{rightText}</TextComp>
            </TouchableOpacity>:null}

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: spacing.HEIGHT_42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal: spacing.PADDING_16
    },
    textStyle: {
        fontSize: textScale(16),
        fontFamily:fontFamily.Medium,
    

    }
});

//make this component available to the app
export default HeaderComp;
