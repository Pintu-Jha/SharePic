import strings from '../../Constants/lang';
import {storeData} from '../../Utills/HelperFunctions';
import {ChangeLang, ChangeTheme} from '../reducers/appSettings';
import store from '../store';

const {dispatch} = store;

export const changeLanguage = data => {
  strings.setLanguage(data); 
  storeData('Language', data)
    .then(res => {
      dispatch(ChangeLang(data));
     
    })
    .catch(error => {
      console.log('error during store data', error);
    });
    // dispatch(ChangeLang(data))
};

export const changeTheme = data => {
  storeData('theme', data)
    .then(res => { 
      dispatch(ChangeTheme(data));
    })
    .catch(error => {
      console.log('error during store data', error);
    });
    // dispatch(ChangeTheme(data));
};
