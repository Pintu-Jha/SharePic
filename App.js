import React, {useEffect} from 'react';
import Routes from './src/Navigations/Routes';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import {getData} from './src/Utills/HelperFunctions';
import {changeLanguage, changeTheme} from './src/Redux/actions/appSettings';
import FlashMessage from 'react-native-flash-message';
import fontFamily from './src/styles/fontFamily';
import { textScale } from './src/styles/responsiveStyles';


const App = () => {
  useEffect(() => {
    initiateLang();
    initiateTheme();
  }, []);

  const initiateTheme = async () => {
    try {
      let myTheme = await getData('theme');
      if (myTheme) {
        changeTheme(myTheme);
      }
    } catch (error) {
      console.log('no data found T', error);
    }
  };

  const initiateLang = async () => {
    try {
      let myLang = await getData('Language');
      if (myLang) {
        changeLanguage(myLang);
      }
    } catch (error) {
      console.log('no data found L', error);
    }
  };
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage
        position={'top'}
        titleStyle={{
          fontFamily:fontFamily.Medium,
          fontSize:textScale(14)
        }}
      />
    </Provider>
  );
};

export default App;
