import { combineReducers } from 'redux';
import auth from "./auth";
import types from '../types';
import appSetting from '../reducers/appSettings'
import AsyncStorage from '@react-native-async-storage/async-storage';

const appReducer = combineReducers({
    auth,
    appSetting
});
const rootReducer = (state, action) => {
    if (action.type == types.CLEAR_REDUX_STATE) {
        state = undefined;
    }
    return appReducer(state, action)
}
export default rootReducer;