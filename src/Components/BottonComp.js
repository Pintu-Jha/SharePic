import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { spacing } from '../styles/spacing';
import { textScale } from '../styles/responsiveStyles';

const BottonComp = ({
  onPress = () => {},
  text = '',
  style = {},
  leftImg = null,
  textStyle = {},
}) => {
  return (
    <TouchableOpacity style={{...styles.container, ...style}} onPress={onPress} activeOpacity={0.6}>
      {!!leftImg ? <Image source={leftImg} /> : <View />}
      <Text style={{...styles.textStyle, ...textStyle}}>{text}</Text>
      <View />
    </TouchableOpacity>
  );
};

export default BottonComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.redColor,
    height: spacing.HEIGHT_52,
    borderRadius: spacing.RADIUS_8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: spacing.PADDING_16,
  },
  textStyle: {
    fontFamily: fontFamily.Medium,
    color: colors.whiteColor,
    fontSize: textScale(14),
  },
});
