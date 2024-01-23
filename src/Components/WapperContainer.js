import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import { useSelector } from 'react-redux';

const WapperContainer = ({style={}, children}) => {
  const selectedTheme = useSelector(state => state.appSetting.selectedTheme)
  return (
   
    <SafeAreaView style={{flex:1}}>
      <View
        style={{
          ...styles.container,
          ...style,
          backgroundColor: selectedTheme=='dark'? colors.themeColor: colors.whiteColor,
        }}>
        {children}
      </View>
    </SafeAreaView>
    //
  );
};

export default WapperContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeColor,
  },
});
