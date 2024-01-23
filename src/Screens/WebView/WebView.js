import {View, Text} from 'react-native';
import React from 'react';
import WapperContainer from '../../Components/WapperContainer';
import HeaderComp from '../../Components/HeaderComp';
import {WebView} from 'react-native-webview';

const Webview = () => {
  return (
    <WapperContainer>
      <HeaderComp />
      <WebView source={{uri: 'https://google.com'}} style={{flex: 1}} />
    </WapperContainer>
  );
};

export default Webview;
