import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { spacing } from '../styles/spacing'
import { textScale } from '../styles/responsiveStyles'
import fontFamily from '../styles/fontFamily'
import colors from '../styles/colors'
import { useSelector } from 'react-redux'

const TextImputComp = ({
    inputStyle={},
    textScale={},
    value='',
    onChangeText,
    placeholder='',
    secureText= false,
    onPressSecure = () => {},
    placeholderTextColor = colors.whiteColorOpacity70,
    ...props
}) => {
  return (
    <View style={{...styles.inputStyle,...inputStyle}}>
      <TextInput
        style={{...styles.textStyle}}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {!!secureText? <Text style={{...styles.textStyle,flex:0}} onPress={onPressSecure}>{secureText}</Text>:null}
    </View>
  )
}

export default TextImputComp

const styles = StyleSheet.create({
    inputStyle:{
        height:spacing.HEIGHT_52,
        borderRadius:spacing.RADIUS_8,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:spacing.PADDING_16,
        alignItems:"center",
        backgroundColor:colors.gray2,
        marginBottom:spacing.MARGIN_16
    },
    textStyle:{
        fontSize:textScale(14),
        fontFamily:fontFamily.regular,
        flex:1,
        color:colors.whiteColor
    }
})