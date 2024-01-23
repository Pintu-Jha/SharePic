import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import {textScale} from '../styles/responsiveStyles';
import {useSelector} from 'react-redux';

const TextComp = ({text = '', style = {}, children, ...props}) => {
  const {selectedTheme} = useSelector(state => state.appSetting);
  return (
    <Text
      style={{
        ...styles.textStyle,
        color: selectedTheme == 'dark' ? colors.whiteColor : colors.blackColor,
        ...style,
      }}
      {...props}
      >
      {text}
      {children}
    </Text>
  );
};

export default TextComp;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fontFamily.regular,
    color: colors.whiteColor,
    fontSize: textScale(12),
  },
});
