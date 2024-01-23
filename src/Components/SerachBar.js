//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import { useSelector } from 'react-redux';
import { spacing } from '../styles/spacing';
import { textScale } from '../styles/responsiveStyles';

// create a component
const SerachBar = ({
    value = '',
    onChangeText,
    placeholder = '',
    isSearch = false,
    inputStyle = {},
    textStyle = {},
    placeholderTextColor = colors.whiteColorOpacity70,
    ...props
}) => {

    const { lang,selectedTheme } = useSelector(state => state?.appSetting)


    return (
        <View style={{
            ...styles.inputStyle,
            ...inputStyle,
            
        }}>
            <TextInput 
            style={{
                ...styles.textStyle,
                ...textStyle,
                // textAlign: lang == 'ar'? 'right': 'left'
            }}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}

            {...props}
            />
            {!!isSearch? <ActivityIndicator color={colors.redColor} />:null}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    inputStyle: {
     height:spacing.HEIGHT_52,
     borderRadius:spacing.RADIUS_8,
     flexDirection:'row',
     justifyContent:'space-between',
     paddingHorizontal:spacing.PADDING_16,
     alignItems:'center',
     backgroundColor: colors.gray2,
     marginBottom:spacing.MARGIN_16
    },
    textStyle:{
        fontSize:textScale(14),
        fontFamily:fontFamily.regular,
        flex:1,
        color: colors.whiteColor
    }
});

//make this component available to the app
export default SerachBar;
