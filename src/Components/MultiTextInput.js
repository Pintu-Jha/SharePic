//import liraries
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import { useSelector } from 'react-redux';
import { spacing } from '../styles/spacing';
import { textScale } from '../styles/responsiveStyles';

// create a component
const MultiTextInput = ({
    value = '',
    onChangeText,
    placeholder = '',
    secureText = false,
    onPressSecure = () => { },
    inputStyle = {},
    textStyle = {},
    placeholderTextColor = colors.whiteColorOpacity70,
    ...props
}) => {

    const { lang } = useSelector(state => state?.appSetting)

    return (
        <View style={{
            ...styles.inputStyle,
            ...inputStyle,

        }}>
            <TextInput
                style={{
                    ...styles.textStyle,
                    ...textStyle,
                }}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}


                {...props}
            />
            {!!secureText ? <Text style={{ ...styles.textStyle, flex: 0 }} onPress={onPressSecure}>{secureText}</Text> : null}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    inputStyle: {
        minHeight: spacing.HEIGHT_80,
        maxHeight:spacing.HEIGHT_150,
        borderRadius: spacing.RADIUS_8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:spacing.PADDING_16,
        paddingVertical: spacing.PADDING_8,
        backgroundColor: colors.gray2,
        marginBottom: spacing.MARGIN_16
    },
    textStyle: {
        fontSize: textScale(14),
        fontFamily: fontFamily.regular,
        flex: 1,
        color: colors.whiteColor
    }
});

//make this component available to the app
export default MultiTextInput;
